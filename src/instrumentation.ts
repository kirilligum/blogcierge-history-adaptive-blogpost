import { diag, DiagConsoleLogger, DiagLogLevel, trace } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { BasicTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SEMRESATTRS_PROJECT_NAME } from "@arizeai/openinference-semantic-conventions";

// For troubleshooting, set the log level to DiagLogLevel.INFO
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// In Cloudflare Pages, environment variables are available on `process.env`
// when using the nodejs_compat flag.
const phoenixApiKey = (globalThis as any)?.process?.env?.PHOENIX_API_KEY;

// Default to cloud if API key is present, otherwise default to local.
// Allow override with PHOENIX_COLLECTOR_ENDPOINT.
const defaultEndpoint = phoenixApiKey ? "https://app.phoenix.arize.com" : "http://127.0.0.1:6006";
const phoenixEndpoint = (globalThis as any)?.process?.env?.PHOENIX_COLLECTOR_ENDPOINT || defaultEndpoint;

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "blogcierge-ai-assistant",
  [SEMRESATTRS_PROJECT_NAME]: "blogcierge",
});

let exporter: OTLPTraceExporter | undefined;

if (typeof (globalThis as any).XMLHttpRequest !== "undefined") {
  exporter = new OTLPTraceExporter({
    url: `${phoenixEndpoint}/v1/traces`,
    headers: phoenixApiKey ? { "api_key": phoenixApiKey } : {},
  });
}

export const provider = new BasicTracerProvider({ resource });

if (exporter) {
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
} else {
  console.warn(
    "[instrumentation] OTLPTraceExporter disabled: XMLHttpRequest is not available in this runtime."
  );
}

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
