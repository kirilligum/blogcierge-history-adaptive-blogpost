import { PhoenixTraceExporter } from "@arizeai/openinference-instrumentation-phoenix";
import {
  BasicTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { trace, Tracer } from "@opentelemetry/api";
import type { App } from "astro/app";

let tracer: Tracer | undefined;
let providerInitialized = false;

export function getPhoenixTracer(locals: App.Locals): Tracer | undefined {
    if (tracer) {
        return tracer;
    }

    // If we already tried and failed (e.g., no endpoint), don't try again.
    if (providerInitialized) {
        return undefined;
    }

    const endpoint = locals.runtime?.env?.PHOENIX_COLLECTOR_ENDPOINT;
    const apiKey = locals.runtime?.env?.PHOENIX_API_KEY;

    if (!endpoint) {
        console.warn("[Phoenix] PHOENIX_COLLECTOR_ENDPOINT is not set. Tracing is disabled.");
        providerInitialized = true;
        return undefined;
    }

    console.log(`[Phoenix] Initializing tracer with endpoint: ${endpoint}`);
    
    const provider = new BasicTracerProvider();
    const exporter = new PhoenixTraceExporter({
        endpoint,
        apiKey,
        projectName: "blogcierge",
    });
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    
    // Register the provider globally. This allows `trace.getTracer` to work correctly.
    provider.register();
    
    tracer = trace.getTracer("blogcierge-tracer");
    providerInitialized = true;
    return tracer;
}
