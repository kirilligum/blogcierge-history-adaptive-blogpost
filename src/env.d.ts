// src/env.d.ts
/// <reference types="astro/client" />
import type { KVNamespace } from "@cloudflare/workers-types"; // Added import

// Add User definition to Astro's Locals
// Make sure this User type doesn't include sensitive data like passwordHash
// Assuming User type itself will define readHistory: string[]
type UserForLocals = Omit<import('./types/user').User, 'passwordHash'>;


declare namespace App {
  interface Locals {
    user?: UserForLocals; // User object, undefined if not logged in
    runtime: {
      env: {
        KV: KVNamespace;
        // Add BLGC_USER_INTERACTIONS_KV if it's a separate KV namespace and still needed.
        // For now, assuming all goes into a single 'KV' namespace based on previous steps.
        // If other KV namespaces from the original Env are needed, they should be added here.
      };
      // ctx needed for waitUntil
      ctx: {
        waitUntil: (promise: Promise<any>) => void;
      };
    };
    // If other properties from the original `Runtime` (like `cf`, `caches`) are needed elsewhere,
    // this definition of App.Locals would need to be expanded or merged with the previous `extends Runtime`
  }
}

// Note: The original Env interface and ImportMetaEnv are removed in this version from the prompt.
// This might be an oversight if they are used for Cloudflare bindings elsewhere or for process.env typing.
// For now, sticking to the provided snippet for this specific subtask.
// A more robust change would merge the new `user` and `runtime.ctx` fields with the existing `Locals extends Runtime` structure.
// For example:
// interface Env { /* ... as before ... */ KV: KVNamespace; }
// type Runtime = import("@astrojs/cloudflare").Runtime<Env>;
// declare namespace App {
//   interface Locals extends Runtime { // Still extends Runtime
//     user?: UserForLocals;
//     // runtime.env.KV would come from Env
//     // runtime.ctx would be automatically available from @astrojs/cloudflare adapter
//   }
// }
// However, the prompt explicitly provided the new structure without `extends Runtime`.
// I've added the KVNamespace import that was missing.
// The `User` type in `types/user.ts` is assumed to have `readHistory: string[]` (non-optional).
// The middleware (`src/middleware.ts`) should ensure that `locals.user` (if set) includes `readHistory`.
// The `register.ts` endpoint should initialize `readHistory: []` for new users.
// These points are for overall consistency but not directly changed by this overwrite.
