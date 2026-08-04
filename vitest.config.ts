import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    include: ["tests/runner/**/*.test.ts", "tests/kennisbank/**/*.test.{ts,tsx}", "tests/publications/**/*.test.ts", "tests/integrations/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
