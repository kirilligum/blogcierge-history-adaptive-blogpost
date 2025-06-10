import { diag, DiagConsoleLogger, DiagLogLevel, trace } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { Resource } from "@opentelemetry/resources";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SEMRESATTRS_PROJECT_NAME } from "@arizeai/openinference-semantic-conventions";

// For troubleshooting, set the log level to DiagLogLevel.INFO
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// In Cloudflare Pages, environment variables are available on `process.env`
// when using the nodejs_compat flag.
const phoenixEndpoint =
  (globalThis as any)?.process?.env?.PHOENIX_COLLECTOR_ENDPOINT || "http://127.0.0.1:6006";

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "blogcierge-ai-assistant",
  [SEMRESATTRS_PROJECT_NAME]: "blogcierge",
});

const exporter = new OTLPTraceExporter({
  url: `${phoenixEndpoint}/v1/traces`,
});

const provider = new NodeTracerProvider({ resource });
provider.addSpanProcessor(new BatchSpanProcessor(exporter));

// A global flag to ensure we only register once.
const OTEL_IS_REGISTERED = Symbol.for("otel.is_registered");
if (!(globalThis as any)[OTEL_IS_REGISTERED]) {
  provider.register();
  (globalThis as any)[OTEL_IS_REGISTERED] = true;
  console.log("👀 OpenInference tracer provider registered.");
}

// Export a tracer instance.
export const tracer = trace.getTracer(
  "blogcierge-tracer",
  "0.1.0",
);
