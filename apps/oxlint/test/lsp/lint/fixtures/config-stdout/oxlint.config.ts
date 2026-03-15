import { defineConfig } from "#oxlint";

export default defineConfig({
  jsPlugins: ['./plugin.js'],

  rules: {
    "js-plugin/no-export-default": "error",
  }
});

// Should not be written to stdout
console.log("oxlint.config.ts loading");
