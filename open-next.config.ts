import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config for the initial deploy: no R2/D1/KV bindings provisioned yet.
// Add an incremental cache override (e.g. r2-incremental-cache) once an R2
// bucket is created and bound in wrangler.jsonc.
export default defineCloudflareConfig({});
