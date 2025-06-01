// Helper function to retrieve API key
export function getApiKey(locals: App.Locals, devMode: boolean): string | undefined {
  // Attempt to get API key from Cloudflare runtime environment
  if (locals.runtime?.env?.LLAMA_API_KEY) {
    return locals.runtime.env.LLAMA_API_KEY;
  }

  // If API key is not found via runtime AND in local development mode,
  // attempt to get it from Vite's `import.meta.env`.
  if (devMode && import.meta.env.LLAMA_API_KEY) {
    return import.meta.env.LLAMA_API_KEY;
  }
  return undefined;
}
