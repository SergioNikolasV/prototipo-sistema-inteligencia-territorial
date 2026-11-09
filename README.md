# RNI · Sistema de Inteligencia Territorial (prototipo)

Prototipo frontend de análisis agregado de brechas territoriales. **Todos los datos son sintéticos** (mocks en `src/infrastructure/mock`).

## Arranque

Requisitos: Node `>=20.9` (el repo fija `26.13.0` en `.mise.toml`) y pnpm `12.18.0`.

```bash
pnpm install
pnpm dev          # http://localhost:3000 → /login
pnpm check        # typecheck + lint + build
```

## Stack

Next.js 16.4.5 (App Router, Turbopack) · React 19.3.1 · TypeScript 6 · Tailwind CSS 4 · react-simple-maps · ESLint 9.

## Arquitectura (Clean Architecture)

```
src/
├── domain/          Entidades y reglas puras (sin React, sin Next)
├── application/     Puertos (interfaces) y casos de uso
├── infrastructure/  Adaptadores: geo (GeoJSON DANE), mock (datos sintéticos)
│   └── composition/ Composition roots: server.ts (server-only) y *.client.ts por feature
├── presentation/    UI: features/, shell/, shared/, providers/
├── app/             Solo enrutamiento: (auth)/login, (console)/{mapa,etl,calidad}
├── components/ui/   Primitivas shadcn
├── lib/             Utilidades transversales
└── styles/          CSS por módulo (globals.css define el orden de cascada)
```

**Regla de dependencias** (la aplica `eslint.config.mjs` con `no-restricted-imports`):

```
domain ← application ← infrastructure ← composition ← presentation ← app
```

- Las rutas (`src/app`) son Server Components: cargan datos con `@/infrastructure/composition/server` y los pasan como props.
- La UI interactiva (procesar ETL, logs, exportes, geometrías del mapa) usa `composition/*.client.ts`, separados por feature para que el GeoJSON (~3 MB) solo se cargue en `/mapa`.

## Cómo conectar una fuente real

1. Crear el adaptador (p. ej. `src/infrastructure/http/etl.http-repository.ts`) que implemente el puerto `EtlRepository`.
2. Reemplazar `MockEtlRepository` en `composition/server.ts` (y en `etl.client.ts` si aplica).
3. Domain, casos de uso y UI no cambian.

## Limitaciones conocidas (prototipo)

- Sesión de demostración en memoria: no autentica y un refresh vuelve a `/login`.
- Los filtros se comunican con el mapa por eventos `window` (`presentation/shell/filter-events.ts`).
