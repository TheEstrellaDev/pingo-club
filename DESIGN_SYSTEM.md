# Sistema de diseño — Pingo Club

## Identidad

La composición usa el logotipo y las mascotas originales proporcionados en `src/assets/images/`. El naranja es el acento protagonista y el morado el secundario; los fondos crema y blancos dan descanso al contenido. No se dibuja ni sustituye el logotipo.

## Colores

- Naranja `#f47721`: llamadas a la acción y énfasis.
- Morado `#623bb5`: navegación, etiquetas y superficies de marca.
- Crema `#fff8ed`: hero y galería.
- Blanco cálido `#fffdf9`: fondo general.
- Tinta `#292330`: texto principal.
- Gris malva `#736b78`: texto secundario.

## Tipografía

Manrope para titulares y DM Sans para texto/interfaz, con Arial como respaldo. Las fuentes web se cargan desde Google Fonts.

## Composición y componentes

- Contenedor fluido, rejillas que cambian a una columna en pantallas pequeñas y navegación móvil plegable.
- Titulares grandes con acento naranja, tarjetas y controles con esquinas discretas.
- Botones y enlaces con estados hover y foco visible.
- Galería mediante diálogo modal navegable por botones y teclado.
- Acordeón operable con botones y `aria-expanded`.

## Accesibilidad y movimiento

El documento declara `es-MX`, tiene enlace para saltar al contenido, etiquetas semánticas, textos alternativos, controles de teclado y foco visible. Las animaciones y el desplazamiento suave se reducen cuando el sistema solicita movimiento reducido.
