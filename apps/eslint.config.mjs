import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tailwind from "eslint-plugin-tailwindcss";

export default defineConfig([
  ...nextVitals,

  {
    plugins: {
      tailwindcss: tailwind,
    },
    rules: {
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/enforces-negative-arbitrary-values": "off",
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
]);
