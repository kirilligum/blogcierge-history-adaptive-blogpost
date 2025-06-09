import OpenInferenceTracer from "@arizeai/phoenix";
import type { App } from "astro/app";

let phoenix: OpenInferenceTracer | undefined;

export function getPhoenixInstance(locals: App.Locals): OpenInferenceTracer | undefined {
    if (phoenix) {
        return phoenix;
    }

    const endpoint = locals.runtime?.env?.PHOENIX_COLLECTOR_ENDPOINT;
    const apiKey = locals.runtime?.env?.PHOENIX_API_KEY;

    if (!endpoint) {
        // Phoenix is optional, so we just log a warning if it's not configured.
        console.warn("[Phoenix] PHOENIX_COLLECTOR_ENDPOINT is not set. Tracing is disabled.");
        return undefined;
    }

    console.log(`[Phoenix] Initializing tracer with endpoint: ${endpoint}`);
    phoenix = new OpenInferenceTracer({
        endpoint,
        apiKey,
        projectName: "blogcierge",
    });

    return phoenix;
}
