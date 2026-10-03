import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    spa: true, // SPA মোড অন করে স্ট্যাটিক ফাইল জেনারেট করবে
  },
  base: "/",
});
