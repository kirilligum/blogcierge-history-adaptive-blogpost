/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { D1Database, KVNamespace, R2Bucket, VectorizeIndex } from "@cloudflare/workers-types";

// Define the Env interface for Cloudflare bindings
interface Env {
  LLAMA_API_KEY: string; // For Cloudflare runtime
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_REPO_OWNER: string;
  GITHUB_REPO_NAME: string;
  GITHUB_READ_REPO_TOKEN: string; // New token for reading repo contents
  CLOUDFLARE_API_TOKEN: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_PROJECT_NAME: string;
  BLGC_BLOGPOST_AI_CACHE: KVNamespace; // KV namespace for "blgc blogpost ai"
  BLGC_AI_LOGS_BUCKET: R2Bucket; // R2 bucket binding for AI conversation logs
  BLGC_USER_INTERACTIONS_KV: KVNamespace; // KV namespace for user interactions
  // ADD: New KV namespace for all blog posts content
  BLGC_SITE_CONTENT_CACHE: KVNamespace;
  BLGC_ADMIN_KV: KVNamespace; // KV for admin password hash and sessions
  // Add other Cloudflare bindings (D1, R2, etc.) here if you use them
  BLGC_RAG_DB: D1Database;
  BLGC_RAG_VECTORS: VectorizeIndex;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

// Augment App.Locals for Cloudflare runtime
declare namespace App {
  interface Locals extends Runtime {}
}

// Augment ImportMetaEnv for Vite's .env handling
interface ImportMetaEnv {
  readonly LLAMA_API_KEY: string;
  // Add other environment variables from your .env file here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
