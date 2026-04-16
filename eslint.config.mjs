import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/**", ".expo/**", "dist/**", "build/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "@typescript-eslint/no-require-imports": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^react$", "^react-native$", "^react-dom$"],
            ["^expo($|/)", "^expo-", "^@react-navigation($|/)"],
            ["^@?\\w"],
            ["^@/app(/.*)?$"],
            ["^@/components(/.*)?$"],
            ["^@/constants(/.*)?$"],
            ["^@/context(/.*)?$"],
            ["^@/assets(/.*)?$"],
            ["^@/"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
);
