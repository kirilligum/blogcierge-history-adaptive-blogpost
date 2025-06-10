import { ReadableSpan, SpanExporter } from "@opentelemetry/sdk-trace-base";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import {
  createExportTraceServiceRequest,
  IExportTraceServiceRequest,
} from "@opentelemetry/otlp-transformer";

/**
 * A custom OTLP Trace Exporter that uses `fetch` to send Protobuf payloads,
 * making it compatible with environments like Cloudflare Workers.
 * It uses the official OTLP Transformer to correctly serialize spans.
 */
export class FetchOTLPProtobufTraceExporter implements SpanExporter {
  private _url: string;
  private _headers: Record<string, string>;
  private _shutdown = false;

  constructor(config: { url: string; headers?: Record<string, string> }) {
    this._url = config.url;
    this._headers = config.headers || {};
  }

  export(
    spans: ReadableSpan[],
    resultCallback: (result: ExportResult) => void,
  ): void {
    if (this._shutdown) {
      return resultCallback({
        code: ExportResultCode.FAILED,
        error: new Error("Exporter has been shutdown"),
      });
    }

    // Create the protobuf request object from the spans.
    // The second argument `useHex` should be false to get byte arrays for IDs.
    const serviceRequest = createExportTraceServiceRequest(spans, false);

    // Serialize the request to a binary payload.
    const body = this.serialize(serviceRequest);

    fetch(this._url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-protobuf",
        ...this._headers,
      },
      body,
    })
      .then((response) => {
        if (response.ok) {
          resultCallback({ code: ExportResultCode.SUCCESS });
        } else {
          console.error(
            `[FetchOTLPProtobufTraceExporter] Export failed with status ${response.status}: ${response.statusText}`,
          );
          resultCallback({
            code: ExportResultCode.FAILED,
            error: new Error(`Status ${response.status}`),
          });
        }
      })
      .catch((error) => {
        console.error("[FetchOTLPProtobufTraceExporter] Export error:", error);
        resultCallback({ code: ExportResultCode.FAILED, error });
      });
  }

  shutdown(): Promise<void> {
    this._shutdown = true;
    return Promise.resolve();
  }

  // Helper method to serialize the request object to a Uint8Array.
  private serialize(request: IExportTraceServiceRequest): Uint8Array {
    return request.toBinary();
  }
}
