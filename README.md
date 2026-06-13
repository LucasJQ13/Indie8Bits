# Indie8Bits

Juego indie 8-bit en desarrollo, inspirado en aventuras clásicas de exploración tipo Zelda/Pokémon. La meta no es una demo técnica, sino un juego jugable, divertido y mantenible desde el principio.

## Estado actual

Versión inicial jugable en web:

- Movimiento del personaje con teclado.
- Controles táctiles para celular.
- Mapa 8-bit dibujado en canvas.
- Colisiones contra agua, árboles y casa.
- NPC inicial con diálogo.
- Primer objeto clave: Cristal Celeste.
- Primer loop de misión: hablar, explorar, recoger objeto y volver.

## Regla de orden obligatoria

Ningún archivo de código debe superar las 200 líneas.

Objetivo sano:

- Ideal: 120 a 160 líneas por archivo.
- Alerta: 180 líneas.
- Límite máximo: 200 líneas.

Antes de seguir agregando funcionalidades, correr:

```bash
npm run check:lines
```

La regla completa está en:

```txt
docs/PROJECT_RULES.md
```

## Estructura del proyecto

```txt
src/
├─ config/      Configuración global.
├─ data/        Mapas, entidades y diálogos.
├─ engine/      DOM, input, loop, cámara y colisiones.
├─ render/      Dibujo de mapa, entidades e interfaz.
├─ state/       Estado inicial del juego.
└─ systems/     Movimiento, interacción, objetos y reglas jugables.
```

## Controles

### PC

- Moverse: `WASD` o flechas.
- Acción / hablar / avanzar diálogo: `E`, `Enter` o `Espacio`.

### Android / móvil

- Usar la cruceta táctil.
- Botón `A` para acción.

## Instalación

```bash
npm install
npm run dev
```

Abrir el enlace local que muestra Vite.

## Build

```bash
npm run build
npm run preview
```

## Visión del proyecto

La idea es construir primero una versión web sólida y después migrar a Android con una base ordenada.

Camino recomendado:

1. Prototipo web funcional.
2. Separación modular permanente.
3. Sprites reales pixel-art.
4. Sistema de mapas: aldea, bosque, ruta, cueva y santuario.
5. Inventario, misiones y progresión.
6. Combate o desafíos.
7. Guardado local.
8. Empaquetado para Android.

## Próximas tareas

- Agregar pantalla de inicio.
- Agregar transición entre mapas.
- Agregar inventario.
- Agregar sistema de diálogo con varias páginas.
- Agregar sprites reales.
- Definir nombre final, lore, mundo y protagonista.
