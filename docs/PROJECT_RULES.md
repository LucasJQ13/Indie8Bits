# Reglas de orden del proyecto

Este proyecto debe crecer de forma modular. La prioridad es que el juego pueda volverse grande sin que un archivo se transforme en una bola de código imposible de mantener.

## Límite sano de líneas

Regla obligatoria:

- Máximo por archivo de código: 200 líneas.
- Objetivo ideal por archivo: 120 a 160 líneas.
- Si un archivo se acerca a 180 líneas, hay que planear su división.
- Si supera 200 líneas, no se agrega más funcionalidad ahí: primero se refactoriza.

Archivos alcanzados:

- `.js`
- `.css`
- `.html`
- `.json`
- `.md`

Excepciones permitidas solo con justificación:

- Documentación larga.
- Archivos generados automáticamente.
- Mapas o datos grandes, si luego se migran a JSON o herramientas de edición.

## Criterio de separación

Cada archivo debe tener una responsabilidad principal.

Estructura actual:

```txt
src/
├─ config/      Configuración global.
├─ data/        Mapas, entidades y diálogos.
├─ engine/      Núcleo técnico: DOM, input, loop, cámara, colisiones.
├─ render/      Dibujo en pantalla.
├─ state/       Estado inicial del juego.
└─ systems/     Reglas jugables: movimiento, interacción, objetos.
```

## Regla práctica

Cuando aparezca una nueva mecánica, no se agrega directo en `main.js`.

Ejemplos:

- Inventario: `src/systems/inventory.js`
- Combate: `src/systems/combat.js`
- Misiones: `src/systems/quests.js`
- Mapas múltiples: `src/systems/mapTransitions.js`
- Guardado: `src/engine/storage.js`

## Verificación

Antes de considerar sano un cambio:

```bash
npm run check:lines
```

Si el script falla, el cambio no está listo.
