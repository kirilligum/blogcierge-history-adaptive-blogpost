// src/env.d.ts
/// <reference types="astro/client" />
import type { KVNamespace } from "@cloudflare/workers-types";

// Assuming User type itself will define readHistory: string[] which is then included here
type UserForLocals = Omit<import('@/types/user').User, 'passwordHash'>;


declare namespace App {
  interface Locals {
    user?: UserForLocals; // User object, undefined if not logged in
    runtime: {
      env: {
        AUTH_KV: KVNamespace; // For user accounts, sessions
        BLGC_USER_INTERACTIONS_KV: KVNamespace; // For anonymous device history
        // Add any other KV namespaces or bindings your app uses from wrangler.toml here
        // For example, if you still have general site content cache:
        // BLGC_SITE_CONTENT_CACHE?: KVNamespace;
      };
      // ctx needed for waitUntil, usually provided by Cloudflare adapter
      ctx: {
        waitUntil: (promise: Promise<any>) => void;
      };
    };
    // If you were extending the Cloudflare Runtime before, ensure any other necessary properties
    // from that runtime (like 'cf', 'caches') are added here if used elsewhere.
    // For instance:
    // cf?: CfProperties;
    // caches?: CacheStorage;
  }
}

// Note: If you have an `Env` interface for `wrangler pages dev --compatibility-date=... --kv=...`,
// ensure that `AUTH_KV` and `BLGC_USER_INTERACTIONS_KV` are defined there as well
// for local development with Wrangler.
// Example:
// interface Env {
//   AUTH_KV: KVNamespace;
//   BLGC_USER_INTERACTIONS_KV: KVNamespace;
//   // other bindings
// }
// Then your Astro context might look like:
// interface Locals extends PagesRuntime<Env> { ... }
// For simplicity, this file focuses on the direct App.Locals definition as per recent prompts.
