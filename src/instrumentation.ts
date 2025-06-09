// src/instrumentation.ts
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { Resource } from "@opentelemetry/resources";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SEMRESATTRS_PROJECT_NAME } from "@arizeai/openinference-semantic-conventions";

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// In local development, this will point to your local Phoenix instance.
// For production, set PHOENIX_COLLECTOR_ENDPOINT in your Cloudflare environment.
const PHOENIX_COLLECTOR_ENDPOINT =
  process.env.PHOENIX_COLLECTOR_ENDPOINT || "http://127.0.0.1:6006";

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "blogcierge",
  [SEMRESATTRS_PROJECT_NAME]: "blogcierge-prod",
});

const headers: { [key: string]: string } = {};
if (process.env.PHOENIX_API_KEY) {
  headers.Authorization = `Bearer ${process.env.PHOENIX_API_KEY}`;
}

const exporter = new OTLPTraceExporter({
  url: `${PHOENIX_COLLECTOR_ENDPOINT}/v1/traces`,
  headers,
});

const processor = new BatchSpanProcessor(exporter);

const provider = new NodeTracerProvider({
  resource: resource,
});
provider.addSpanProcessor(processor);
provider.register();

console.log("Phoenix tracer initialized.");
