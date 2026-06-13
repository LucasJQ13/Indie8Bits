# Indie8Bits

Primer prototipo de juego indie estilo 8-bit inspirado en aventuras clásicas de exploración, con una base pensada para crecer hacia algo tipo Zelda/Pokémon: mapa, personaje, NPCs, diálogos, objetos, misiones y progresión.

## Estado actual

Versión inicial jugable en web:

- Movimiento del personaje con teclado.
- Controles táctiles para celular.
- Mapa 8-bit dibujado en canvas.
- Colisiones contra agua, árboles y casa.
- NPC inicial con diálogo.
- Primer objeto clave: Cristal Celeste.
- Primer loop de misión: hablar, explorar, recoger objeto y volver.

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

La idea no es hacer solo una demo técnica, sino construir un juego jugable, entretenido y con identidad propia.

La estructura futura recomendada:

1. Prototipo web funcional.
2. Separación en módulos: jugador, mapa, NPC, diálogos, inventario, misiones.
3. Reemplazo del dibujo por sprites reales pixel-art.
4. Sistema de mapas tipo aldea, bosque, ruta, cueva y santuario.
5. Sistema de combate o desafíos.
6. Guardado local.
7. Migración a Android usando una capa webview/Capacitor o empaquetado equivalente.

## Próximas tareas

- Separar el código de `main.js` en módulos.
- Agregar pantalla de inicio.
- Agregar transición entre mapas.
- Agregar inventario.
- Agregar sistema de diálogo con varias páginas.
- Agregar sprites reales.
- Definir nombre final, lore, mundo y protagonista.
