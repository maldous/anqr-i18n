import js from "@eslint/js";
import globals from "globals";

// ESLint v8 flat config (no `eslint/config` helper).
// File globs are handled here (do not use `--ext`).

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "releases/**",
      "coverage/**",
      ".netlify/**",
      "public/qrcode.js",
      "src/lib/**",
    ],
  },
  {
    ...js.configs.recommended,
    files: ["src/**/*.{js,ts,mjs,cjs}"],
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
  },
];
