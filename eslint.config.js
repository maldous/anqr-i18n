import js from "@eslint/js";
import globals from "globals";

import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

import sonarjs from "eslint-plugin-sonarjs";
import security from "eslint-plugin-security";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import redos from "eslint-plugin-redos";
import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";
import securityNode from "eslint-plugin-security-node";

const COMMON_FILES = ["src/**/*.{js,mjs,cjs,ts,tsx}"];

export default [
  // Global ignores
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "releases/**",
      "reports/**",
      "coverage/**",
      ".netlify/**",
      "public/qrcode.js",
      "src/lib/**", // bundled/vendor-like helpers
    ],
  },

  // Base JS rules (applies to JS + TS)
  {
    ...js.configs.recommended,
    files: COMMON_FILES,
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      sonarjs,
      security,
      "no-unsanitized": noUnsanitized,
      redos,
      import: importPlugin,
      boundaries,
      "security-node": securityNode,
    },
    settings: {
      "import/resolver": {
        node: true,
      },
      // Basic architectural boundaries (tune later)
      "boundaries/elements": [
        { type: "app", pattern: "src/main.js" },
        { type: "modules", pattern: "src/modules/*" },
        { type: "styles", pattern: "src/styles/*" },
        { type: "public", pattern: "public/*" },
      ],
    },
    rules: {
      // Complexity / smells
      complexity: ["warn", 20],
      "sonarjs/cognitive-complexity": ["warn", 20],
      "sonarjs/no-collapsible-if": "warn",
      "sonarjs/no-collection-size-mischeck": "warn",
      "sonarjs/no-identical-functions": "warn",

      // Security heuristics (advisory, not blocking)
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-unsafe-regex": "warn",
      "no-unsanitized/method": "warn",
      "no-unsanitized/property": "warn",
      "redos/no-vulnerable": "warn",
      "security-node/detect-crlf": "warn",
      "security-node/detect-insecure-randomness": "warn",

      // Imports
      "import/no-cycle": ["warn", { maxDepth: 5 }],
      "import/no-duplicates": "warn",
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
        },
      ],

      // Boundaries (advisory, start with minimal enforcement)
      "boundaries/no-unknown": "warn",
      "boundaries/no-unknown-files": "warn",
    },
  },

  // TypeScript-aware linting
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
    },
  },
];
