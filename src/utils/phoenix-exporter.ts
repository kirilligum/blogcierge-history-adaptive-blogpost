import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { IExportTraceServiceRequest } from "@opentelemetry/otlp-transformer";

/**
 * A custom OTLP Trace Exporter that uses `fetch` to send Protobuf payloads,
 * making it compatible with environments like Cloudflare Workers.
 * It extends the official OTLPTraceExporter to leverage its Protobuf serialization logic.
 */
export class FetchOTLPProtobufTraceExporter extends OTLPTraceExporter {
  // Override the `send` method to use `fetch` instead of `XMLHttpRequest`.
  send(
    items: ReadableSpan[],
    onSuccess: () => void,
    onError: (error: ExportResult) => void,
  ): void {
    // Convert spans to a Protobuf-compatible request object using the base class's method.
    const serviceRequest = this.convert(items);

    // Serialize the request object to a binary Protobuf payload.
    const body = this.serialize(serviceRequest);

    // Send the binary payload using fetch.
    fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-protobuf", // The correct content type for binary Protobuf
        ...this.headers,
      },
      body,
    })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          console.error(
            `[FetchOTLPProtobufTraceExporter] Export failed with status ${response.status}: ${response.statusText}`,
          );
          onError({
            code: ExportResultCode.FAILED,
            error: new Error(`Status ${response.status}`),
          });
        }
      })
      .catch((error) => {
        console.error("[FetchOTLPProtobufTraceExporter] Export error:", error);
        onError({ code: ExportResultCode.FAILED, error });
      });
  }

  // Helper method to serialize the request object to a Uint8Array.
  private serialize(request: IExportTraceServiceRequest): Uint8Array {
    // This relies on the internal `_export` method of the base class, which is not ideal
    // but is the most direct way to access the Protobuf serialization.
    // The `toBinary` method on the service request is what we need.
    return request.toBinary();
  }
}
