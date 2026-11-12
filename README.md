# Pingo Club

Sitio web responsive para Pingo Club, estética infantil en Guadalupe, Zacatecas. Construido con React, TypeScript y Vite, preparado para GitHub Pages en `/pingo-club/`.

## Requisitos

- Node.js compatible con Vite 8.
- npm.

## Instalación y uso local

```bash
npm install
npm run dev
```

Vite muestra la URL local en la terminal.

## Comprobaciones y compilación

```bash
npm run lint
npm run build
npm run preview
```

La compilación final se genera en `dist/`. `vite.config.ts` fija `base: '/pingo-club/'`; la vista previa debe servirse bajo esa ruta al revisar rutas del despliegue.

## Despliegue

El repositorio conserva el workflow de GitHub Pages en `.github/workflows/`. Publica la rama configurada en GitHub Pages después de revisar el resultado compilado. No se incluye ningún cambio de publicación en esta entrega.

## Estructura

- `src/App.tsx`: secciones, navegación, acordeón y galería ampliable.
- `src/App.css`: estilos de componentes y diseño responsive.
- `src/index.css`: estilos globales, accesibilidad y movimiento reducido.
- `src/assets/images/`: recursos originales proporcionados; no se reemplazan.
- `PROJECT_BRIEF.md`: alcance y contenido comercial.
- `DESIGN_SYSTEM.md`: decisiones de identidad y componentes visuales.

## Información pendiente

La información publicada incluye los servicios, precios de inauguración y horarios comunicados por la dueña. Los números oficiales de teléfono y WhatsApp ya están integrados. Antes de desplegar, confirmar autorización para publicar fotografías en las que puedan aparecer menores identificables.
