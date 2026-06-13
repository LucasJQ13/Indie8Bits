# Fase Visual 01: estética RPG pixel art

Objetivo: llevar el prototipo hacia una estética más cercana a un RPG 8-bit/16-bit narrativo, con campo vivo, personajes más claros, atmósfera y caja de diálogo con retrato.

## Principios visuales

- Cámara superior con personajes pequeños pero legibles.
- Suelo con variaciones y textura, no un color plano.
- Props que cuenten historia: fogata, pozo, rocas, pastos, carteles.
- Sombras simples debajo de personajes y objetos.
- Paleta nocturna/fría con luces cálidas puntuales.
- Caja de diálogo grande, clara y con retrato del hablante.

## Implementación inicial

Esta fase agrega una mejora visual sin depender todavía de archivos de imagen externos. Todo se dibuja por canvas para mantener el prototipo liviano.

Archivos nuevos:

```txt
src/config/artConfig.js
src/data/props.js
src/render/drawProps.js
src/render/drawLighting.js
```

Archivos modificados:

```txt
src/main.js
src/render/colors.js
src/render/drawUi.js
```

## Próxima fase

La siguiente mejora real debe ser reemplazar dibujos por spritesheets:

```txt
public/assets/characters/player.png
public/assets/characters/npcs/elder.png
public/assets/portraits/player.png
public/assets/tilesets/village-night.png
```

Hasta entonces, esta fase deja lista la intención visual y la estructura para crecer.
