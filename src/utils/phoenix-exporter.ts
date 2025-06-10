import { SpanExporter, ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { ExportResult, ExportResultCode, hrTimeToMicroseconds } from "@opentelemetry/core";
import { SpanStatusCode } from "@opentelemetry/api";

// OTLP/JSON status codes are strings, not numbers.
// https://opentelemetry.io/docs/specs/otlp/#json-encoding
function toOtlpStatusCodeString(code: SpanStatusCode): string {
  switch (code) {
    case SpanStatusCode.OK:
      return "STATUS_CODE_OK";
    case SpanStatusCode.ERROR:
      return "STATUS_CODE_ERROR";
    case SpanStatusCode.UNSET:
    default:
      return "STATUS_CODE_UNSET";
  }
}

// A simplified OTLP/JSON over HTTP exporter that uses `fetch`
export class FetchOTLPTraceExporter implements SpanExporter {
  private url: string;
  private headers: Record<string, string>;

  constructor(config: { url: string; headers?: Record<string, string> }) {
    this.url = config.url;
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
    const resourceSpans = this.groupSpansByResource(spans);

    const body = JSON.stringify({
      resourceSpans,
    });

    fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: body,
    })
    .then(response => {
      if (response.ok) {
        resultCallback({ code: ExportResultCode.SUCCESS });
      } else {
        console.error(`[FetchOTLPTraceExporter] Export failed with status ${response.status}: ${response.statusText}`);
        resultCallback({ code: ExportResultCode.FAILED, error: new Error(`Status ${response.status}`)});
      }
    })
    .catch(error => {
      console.error('[FetchOTLPTraceExporter] Export error:', error);
      resultCallback({ code: ExportResultCode.FAILED, error });
    });
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }

  private groupSpansByResource(spans: ReadableSpan[]) {
    const resourceMap = new Map<ReadableSpan['resource'], Map<string, any[]>>();
    for (const span of spans) {
      if (!resourceMap.has(span.resource)) {
        resourceMap.set(span.resource, new Map<string, any[]>());
      }
      const scopeMap = resourceMap.get(span.resource)!;
      const scope = span.instrumentationLibrary;
      const scopeKey = `${scope.name}@${scope.version}`;
      if (!scopeMap.has(scopeKey)) {
        scopeMap.set(scopeKey, []);
      }
      scopeMap.get(scopeKey)!.push(this.toOtlpSpan(span));
    }

    const resourceSpans: any[] = [];
    for (const [resource, scopeMap] of resourceMap.entries()) {
      resourceSpans.push({
        resource: this.toOtlpResource(resource),
        scopeSpans: Array.from(scopeMap.entries()).map(([scopeKey, spans]) => {
          const [name, version] = scopeKey.split('@');
          return {
            scope: { name, version },
            spans,
          };
        }),
      });
    }
    return resourceSpans;
  }

  private toOtlpResource(resource: ReadableSpan['resource']) {
    return {
      attributes: Object.entries(resource.attributes).map(([key, value]) => this.toKeyValue(key, value)),
    };
  }

  private toOtlpSpan(span: ReadableSpan) {
    const otlpSpan: any = {
      traceId: span.spanContext().traceId,
      spanId: span.spanContext().spanId,
      name: span.name,
      kind: span.kind + 1, // OTLP span kind is 1-indexed
      startTimeUnixNano: (hrTimeToMicroseconds(span.startTime) * 1000).toString(),
      endTimeUnixNano: (hrTimeToMicroseconds(span.endTime) * 1000).toString(),
      attributes: Object.entries(span.attributes).map(([key, value]) => this.toKeyValue(key, value)),
      events: span.events.map(event => ({
        name: event.name,
        timeUnixNano: (hrTimeToMicroseconds(event.time) * 1000).toString(),
        attributes: Object.entries(event.attributes || {}).map(([key, value]) => this.toKeyValue(key, value)),
      })),
    };

    if (span.parentSpanId) {
      otlpSpan.parentSpanId = span.parentSpanId;
    }

    // The OTLP/JSON spec says the status code SHOULD be a string.
    // This is likely the cause of the 400 Bad Request.
    if (span.status.code !== SpanStatusCode.UNSET) {
      otlpSpan.status = {
        code: toOtlpStatusCodeString(span.status.code),
      };
      if (span.status.message) {
        otlpSpan.status.message = span.status.message;
      }
    }

    return otlpSpan;
  }

  private toKeyValue(key: string, value: any) {
    return { key, value: this.toAnyValue(value) };
  }

  private toAnyValue(value: any): { [key: string]: any } {
    const type = typeof value;
    if (type === 'string') return { stringValue: value };
    if (type === 'number') {
      // OTLP/JSON spec says intValue should be a string.
      return Number.isInteger(value) ? { intValue: String(value) } : { doubleValue: value };
    }
    if (type === 'boolean') return { boolValue: value };
    if (value === null) return {};
    if (Array.isArray(value)) {
      return { arrayValue: { values: value.map(v => this.toAnyValue(v)) } };
    }
    return { stringValue: String(value) };
  }
}
