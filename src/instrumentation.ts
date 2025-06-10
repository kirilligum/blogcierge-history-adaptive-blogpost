import { diag, DiagConsoleLogger, DiagLogLevel, trace } from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { BasicTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SEMRESATTRS_PROJECT_NAME } from "@arizeai/openinference-semantic-conventions";
import { FetchOTLPTraceExporter } from "./utils/phoenix-exporter";

// For troubleshooting, set the log level to DiagLogLevel.INFO
/*
 * Reduce OpenTelemetry diagnostic output during local development.
 * Setting the log level to WARN suppresses the "[ERROR]" banner that
 * caused Wrangler to treat the start-up notice as a fatal error and
 * shut the dev server down.
 */
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.WARN);

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "blogcierge-ai-assistant",
  [SEMRESATTRS_PROJECT_NAME]: "blogcierge",
});

export const provider = new BasicTracerProvider({ resource });

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

// Function to initialize the exporter with runtime environment variables
export function initializeExporter(env: any) {
  // Check if exporter is already initialized in this worker instance
  if ((globalThis as any).__phoenixExporterInitialized) {
    return;
  }

  const phoenixApiKey = env?.PHOENIX_API_KEY;
  // Default to cloud if API key is present, otherwise default to local.
  // Allow override with PHOENIX_COLLECTOR_ENDPOINT.
  const defaultEndpoint = phoenixApiKey ? "https://app.phoenix.arize.com" : "http://127.0.0.1:6006";
  const phoenixEndpoint = env?.PHOENIX_COLLECTOR_ENDPOINT || defaultEndpoint;

  console.log(`[instrumentation] Initializing FetchOTLPTraceExporter with endpoint: ${phoenixEndpoint}, API key present: ${!!phoenixApiKey}`);

  try {
    const exporter = new FetchOTLPTraceExporter({
      url: `${phoenixEndpoint}/v1/traces`,
      headers: phoenixApiKey ? { "X-API-KEY": phoenixApiKey } : {},
    });
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    (globalThis as any).__phoenixExporterInitialized = true; // Set flag
    console.log("[instrumentation] FetchOTLPTraceExporter successfully initialized and added to provider.");
  } catch (e) {
    console.warn(
      "[instrumentation] FetchOTLPTraceExporter initialization failed:",
      e
    );
  }
}
