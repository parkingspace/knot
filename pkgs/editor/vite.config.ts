import solidPlugin from "vite-plugin-solid";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    transformMode: { web: [/\.[jt]sx?$/] },
    deps: {
      registerNodeLoader: true,
      inline: [/solid-js/, /solid-testing-library/],
    },
    exclude: [...configDefaults.exclude],
    setupFiles: [
      "node_modules/@testing-library/jest-dom/extend-expect",
      "./setupVitest.js",
    ],
    coverage: {
      reportsDirectory: "../../coverage/editor",
    },
  },
  resolve: {
    conditions: ["development", "browser"],
  },
});
