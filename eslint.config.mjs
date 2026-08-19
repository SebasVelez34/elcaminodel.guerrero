import coreWebVitals from "eslint-config-next/core-web-vitals"
import typescript from "eslint-config-next/typescript"

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", "drizzle/**"],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // El copy en espanol lleva comillas y apostrofes por todas partes; Next ya
      // escapa el texto correctamente, la regla solo genera ruido.
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]

export default eslintConfig
