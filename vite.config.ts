/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // if you want to use globals like "describe", "it", etc.
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts", // optional, see next step
  },
});
