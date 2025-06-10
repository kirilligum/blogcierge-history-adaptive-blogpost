import { SpanExporter, ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { ExportResult, ExportResultCode, hrTimeToMicroseconds } from "@opentelemetry/core";

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
    const otlpSpans = this.groupSpansByScope(spans);
    const resource = spans.length > 0 ? this.toOtlpResource(spans[0].resource) : {};

    const body = JSON.stringify({
      resourceSpans: [{
        resource,
        scopeSpans: otlpSpans,
      }],
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

  private groupSpansByScope(spans: ReadableSpan[]) {
    const scopeSpansMap = new Map<string, { scope: any; spans: any[] }>();
    for (const span of spans) {
      const scope = span.instrumentationLibrary;
      const scopeKey = `${scope.name}@${scope.version}`;
      if (!scopeSpansMap.has(scopeKey)) {
        scopeSpansMap.set(scopeKey, {
          scope: { name: scope.name, version: scope.version },
          spans: [],
        });
      }
      scopeSpansMap.get(scopeKey)!.spans.push(this.toOtlpSpan(span));
    }
    return Array.from(scopeSpansMap.values());
  }

  private toOtlpResource(resource: ReadableSpan['resource']) {
    return {
      attributes: Object.entries(resource.attributes).map(([key, value]) => this.toKeyValue(key, value)),
    };
  }

  private toOtlpSpan(span: ReadableSpan) {
    return {
      traceId: span.spanContext().traceId,
      spanId: span.spanContext().spanId,
      parentSpanId: span.parentSpanId,
      name: span.name,
      kind: span.kind + 1, // OTLP span kind is 1-indexed
      startTimeUnixNano: hrTimeToMicroseconds(span.startTime) * 1000,
      endTimeUnixNano: hrTimeToMicroseconds(span.endTime) * 1000,
      attributes: Object.entries(span.attributes).map(([key, value]) => this.toKeyValue(key, value)),
      status: {
        code: span.status.code + 1, // OTLP status code is 1-indexed
        message: span.status.message,
      },
      events: span.events.map(event => ({
        name: event.name,
        timeUnixNano: hrTimeToMicroseconds(event.time) * 1000,
        attributes: Object.entries(event.attributes || {}).map(([key, value]) => this.toKeyValue(key, value)),
      })),
    };
  }

  private toKeyValue(key: string, value: any) {
    return { key, value: this.toAnyValue(value) };
  }

  private toAnyValue(value: any) {
    const type = typeof value;
    if (type === 'string') return { stringValue: value };
    if (type === 'number') {
      return Number.isInteger(value) ? { intValue: value } : { doubleValue: value };
    }
    if (type === 'boolean') return { boolValue: value };
    if (value === null) return {};
    if (Array.isArray(value)) {
      return { arrayValue: { values: value.map(v => this.toAnyValue(v)) } };
    }
    return { stringValue: String(value) };
  }
}
