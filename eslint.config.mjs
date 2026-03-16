import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      "@typescript-eslint/no-floating-promises": "error",

      "@typescript-eslint/require-await": "error",

      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false },
      ],

      "@typescript-eslint/prefer-nullish-coalescing": "warn",

      "@typescript-eslint/prefer-optional-chain": "warn",

      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
        },
      ],

      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],

      "@typescript-eslint/no-unnecessary-condition": "warn",

      "@typescript-eslint/switch-exhaustiveness-check": "error",

      "@typescript-eslint/return-await": ["error", "in-try-catch"],

      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    },
  },

  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-strict"],

  {
    rules: {
      curly: ["error", "all"],

      eqeqeq: ["error", "always", { null: "ignore" }],

      "no-console": ["warn", { allow: ["warn", "error"] }],

      "no-var": "error",

      "object-shorthand": ["warn", "always"],

      "prefer-const": [
        "error",
        { destructuring: "all", ignoreReadBeforeAssign: true },
      ],

      "prefer-template": "warn",

      radix: "error",

      "no-return-await": "off",

      "no-cond-assign": ["error", "except-parens"],

      "no-debugger": "error",

      "no-eval": "error",

      "no-implied-eval": "error",

      "no-warning-comments": [
        "warn",
        { terms: ["todo", "fixme", "hack"], location: "start" },
      ],
    },
  },

  {
    files: ["**/*.test.ts", "**/*.spec.ts", "**/*.test.js", "**/*.spec.js"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-console": "off",
      "no-warning-comments": "off",
    },
  },
];
