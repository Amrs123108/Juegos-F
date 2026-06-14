# 🇵🇦 Panama Family Party Game 🎉

Juego de fiesta **para jugarse en la TV de la sala en familia**, con sabor 100 % panameño.
Altamente animado, moderno y responsivo. **Sin build step**: solo HTML + ES Modules + Tailwind y `canvas-confetti` por CDN. Listo para desplegar en **Vercel** desde **GitHub**.

---

## 🎮 Modos de juego

| Modo | Emoji | Descripción |
|------|-------|-------------|
| **Stop Veloz en la Sala** | ⚡ | Letra + categoría **según la edad** del jugador. Di una palabra y presiona **ESPACIO** antes del 0. Eliminatorio por vidas hasta un solo ganador. |
| **Ahorcado Cooperativo** | 💀 | Toda la familia contra la máquina. Frases panameñas, **3 niveles de pistas** y 6 errores antes de dibujar el ahorcado (animado en CSS). |
| **Trivia del Patio** | 🧠 | Opción múltiple A–D. Preguntas **filtradas por edad** (Niña 8 / Joven 14+ / Adulto): Disney para todos, **matemáticas 14+**, pelis famosas, Canal, música nacional, hogar/cocina y más. |
| **Charadas y Mímicas** | 🎭 | Actúa **palabras por tema** (animales, profesiones, comida…) sin hablar. La dificultad se ajusta a la edad del actor. Botones gigantes **¡Adivinó!** / **Pasar**. |
| **Crucigrama Familiar** | 🧩 | Cooperativo. Cuadrícula **generada automáticamente** con pistas (¡varias con emoji-imagen!). Revelar-letra como ayuda. |
| **¡Adivínalo!** | 🔍 | Una **imagen (emoji) se revela por mosaicos** poco a poco. Adivina antes de que se descubra: mientras menos pistas, más puntos. Dificultad por edad. |
| **¿Qué Dibujo?** | 🎨 | El sistema **dibuja trazo por trazo** (figuras en SVG animado). Adivina antes de que termine: menos trazos, más puntos. Dificultad por edad. |
| **Película en Emojis** | 🎬 | Adivina el título de la peli por sus emojis. Opción múltiple A-D, por edad (infantiles, famosas y clásicos). |
| **Respuesta Incorrecta** | ❌ | Tipo Stop, ¡al revés! Responde la pregunta con un **disparate**. Pierde vida quien responda **bien** (botón manual) o se quede sin tiempo. |
| **¿Coincidimos?** | 🤝 | 2 jugadores al azar escriben **en secreto** una palabra para un tema. El objetivo (coincidir / NO coincidir) es **al azar** cada ronda. |

Cada modo tiene un **banco de datos con 50+ elementos**. La clasificación por edad usa **🧒 Niña (8) = fácil**, **🧑 Joven (14+) = medio (incluye mates)**, **🧔 Adulto = difícil**.

---

## ✨ Características

- 🧑‍🤝‍🧑 Registro de hasta **5 jugadores** con avatares divertidos.
- 🏅 **Tablero de puntuación global persistente** (se guarda en el navegador con `localStorage`).
- ⚙️ **Configuración por partida**: tiempo de turno, número de rondas/vueltas, vidas y puntos.
- 🎯 **Participantes por juego**: al entrar a cada modo eliges **cuáles de los jugadores registrados juegan** esa partida (toca para incluir/excluir).
- 🎊 **Confeti** a pantalla completa al ganar (vía `canvas-confetti`).
- ⏱️ Temporizadores que **parpadean en rojo** cuando quedan ≤ 5 segundos.
- 🔊 Efectos de sonido generados con **Web Audio** (sin archivos externos).
- 📱 **Responsivo** y pensado para verse grande en la TV.

---

## 📁 Estructura

```
JF/
├── index.html              # Punto de entrada (CDN de Tailwind + confetti)
├── vercel.json             # Configuración de despliegue
├── package.json            # Scripts opcionales (dev/start con `serve`)
├── css/
│   └── styles.css          # Animaciones y estilos custom
└── js/
    ├── main.js             # Orquestador: router de pantallas + API
    ├── state.js            # Estado global persistente (jugadores/puntajes)
    ├── ui.js               # Helpers: render, confeti, sonidos, timers, toast
    ├── data/               # 🗃️ Bancos de datos (50+ c/u)
    │   ├── stop.js         # categorías etiquetadas por edad
    │   ├── ahorcado.js
    │   ├── trivia.js       # preguntas por edad (Disney, mates, etc.)
    │   ├── charadas.js     # palabras por tema y nivel
    │   ├── crucigrama.js   # palabras + pistas (con emoji)
    │   └── adivinalo.js    # imágenes-emoji por edad
    └── games/              # 🎮 Lógica de cada modo
        ├── stop.js
        ├── ahorcado.js
        ├── trivia.js
        ├── charadas.js
        ├── crucigrama.js   # incluye el generador de cuadrícula
        └── adivinalo.js
```

---

## ▶️ Cómo correrlo localmente

Como usa **ES Modules**, no se puede abrir con doble clic (`file://`). Necesitas un servidor local:

```bash
# Opción 1: con npx (sin instalar nada permanente)
npx serve .

# Opción 2: con Python
python -m http.server 8000
```

Luego abre `http://localhost:3000` (o el puerto que indique) en el navegador.

> 💡 **Truco para la TV:** conecta tu laptop al televisor por HDMI, abre el juego y presiona `F11` para pantalla completa.

---

## 🚀 Desplegar en Vercel (vía GitHub)

1. Crea un repositorio en GitHub y sube esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Panama Family Party Game 🎉"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/panama-family-party-game.git
   git push -u origin main
   ```
2. Entra a [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
3. No requiere configuración (Framework: **Other** / sin build command). Da clic en **Deploy**.
4. ¡Listo! Vercel te dará una URL pública para jugar desde cualquier dispositivo. 🎉

---

## 🎛️ Controles rápidos

- **Stop:** `ESPACIO` = "lo dije" (pasa el turno) · `Esc` = salir.
- **Charadas:** `ESPACIO`/`Enter` = ¡Adivinó! · `→` o `P` = Pasar.
- **Trivia:** teclas `A B C D` o `1 2 3 4` para responder.
- **Ahorcado:** escribe las letras con el teclado o tócalas en pantalla.

---

## 🛠️ Cómo agregar más contenido

Edita los archivos en `js/data/`:
- **Categorías de Stop** → `stop.js` (`{ name, ages:[...] }`).
- **Frases de Ahorcado** → `ahorcado.js` (`answer`, `category` y 3 `hints`).
- **Preguntas de Trivia** → `trivia.js` (`age`, `cat`, `q`, 4 `options` y el índice `correct`).
- **Palabras de Charadas** → `charadas.js` (`word`, `cat`, `nivel`).
- **Crucigrama** → `crucigrama.js` (`word` en MAYÚSCULAS sin acentos, `clue`, `emoji?`, `nivel`).
- **¡Adivínalo!** → `adivinalo.js` (`emoji`, `answer`, `cat`, `age`).

> Las edades usan los valores `nina`, `ado`, `adulto`. Los niveles de Charadas son `facil`, `media`, `dificil`.

¡A disfrutar en familia! 🇵🇦❤️
