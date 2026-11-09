import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

/**
 * Regla de dependencias de Clean Architecture:
 *   domain ← application ← infrastructure ← (composition) ← presentation ← app
 * Cada capa solo puede importar hacia adentro.
 */
const restrict = (files, patterns) => ({
  files,
  rules: { "no-restricted-imports": ["error", { patterns }] },
})

const FRAMEWORKS = [
  { group: ["react", "react-dom", "react/*", "next", "next/*"], message: "Esta capa debe ser independiente del framework." },
  { group: ["lucide-react", "react-simple-maps", "@john-guerra/*"], message: "Esta capa no depende de librerías de UI ni de datos externos." },
]

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  restrict(["src/domain/**"], [
    { group: ["@/application/*", "@/infrastructure/*", "@/presentation/*", "@/app/*", "@/lib/*"], message: "domain no puede depender de capas externas." },
    ...FRAMEWORKS,
  ]),
  restrict(["src/application/**"], [
    { group: ["@/infrastructure/*", "@/presentation/*", "@/app/*"], message: "application solo depende de domain." },
    ...FRAMEWORKS,
  ]),
  restrict(["src/infrastructure/**"], [
    { group: ["@/presentation/*", "@/app/*"], message: "infrastructure no conoce la presentación." },
  ]),
  restrict(["src/presentation/**"], [
    { group: ["@/infrastructure/geo/*", "@/infrastructure/mock/*"], message: "Usa un composition root (@/infrastructure/composition/*.client), no adaptadores directos." },
    { group: ["@/infrastructure/composition/server"], message: "El composition root del servidor solo se usa en src/app (Server Components)." },
    { group: ["@/app/*"], message: "presentation no depende de las rutas." },
  ]),
  restrict(["src/app/**"], [
    { group: ["@/infrastructure/geo/*", "@/infrastructure/mock/*"], message: "Las rutas consumen casos de uso vía @/infrastructure/composition/server." },
  ]),
])

export default eslintConfig
