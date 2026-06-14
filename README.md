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
| **Crucigrama Familiar** | 🧩 | Cooperativo. Cuadrícula **generada automáticamente** con **selector de dificultad** (Fácil/Medio/Difícil/Mixto) y **tamaño** (6–20 palabras). Pistas con emoji; **revelar-letra penaliza puntos** (escalado por dificultad). |
| **¡Adivínalo!** | 🔍 | Una **imagen (emoji) se revela por mosaicos** poco a poco. Adivina antes de que se descubra: mientras menos pistas, más puntos. Dificultad por edad. |
| **¿Qué Dibujo?** | 🎨 | El sistema **dibuja trazo por trazo** (figuras en SVG animado). Adivina antes de que termine: menos trazos, más puntos. Dificultad por edad. |
| **Película en Emojis** | 🎬 | Adivina el título de la peli por sus emojis. Opción múltiple A-D, por edad (infantiles, famosas y clásicos). |
| **Respuesta Incorrecta** | ❌ | Tipo Stop, ¡al revés! Responde la pregunta con un **disparate**. Pierde vida quien responda **bien** (botón manual) o se quede sin tiempo. |
| **¿Coincidimos?** | 🤝 | 2 jugadores al azar escriben **en secreto** una palabra para un tema. El objetivo (coincidir / NO coincidir) es **al azar** cada ronda. |
| **Ordena la Palabra** | 🔤 | Letras revueltas a ordenar contra el tiempo. Modos **Clásico / Difícil / Caos / Categoría**. |
| **Habla Sin Decir…** | 🤫 | Describe la palabra **sin usar las palabras prohibidas** (tipo Tabú). Por edad. |
| **Dibuja y Adivina** | ✏️ | **Pictionary con papel y lápiz real**: la app solo da la palabra. Modos **Individual** y **Equipos** (Azul vs Rojo). El dibujante elige categoría. |
| **Conexión Total** | 🤜🤛 | 2 jugadores: **Fase MENTE** (piensan igual) + **Fase ACCIÓN** (gesto sincronizado). Ganan si coinciden en ambas. |

### 🏆 Noche Familiar (meta-modo, desde el **menú principal** o el Tablero)
Un torneo de la noche: una **ruleta** elige al azar el juego donde compiten todos (con un **comodín 🃏** para elegir). El **1.º se lleva el premio** de ese juego. Antes de empezar **eliges con cuáles juegos** se juega, los participantes y la modalidad: **llegar a N premios** o **conseguir 1 de cada juego elegido**. El primero en cumplir es el **👑 Campeón de la Noche Familiar**. *(La ruleta excluye Crucigrama y Ahorcado por ser cooperativos sin ganador único.)*

Cada modo tiene un **banco de datos con 50+ elementos**. La clasificación por edad usa **🧒 Niña (8) = fácil**, **🧑 Joven (14+) = medio (incluye mates)**, **🧔 Adulto = difícil**.

---

## ✨ Características

- 🧑‍🤝‍🧑 Registro de hasta **5 jugadores** con avatares divertidos.
- 🏅 **Tablero de puntuación global persistente** (se guarda en el navegador con `localStorage`).
- ⚙️ **Configuración por partida**: tiempo de turno, número de rondas/vueltas, vidas y puntos.
- 🎯 **Participantes por juego**: al entrar a cada modo eliges **cuáles de los jugadores registrados juegan** esa partida (toca para incluir/excluir).
- 🔁 **Sin repetir en la noche**: el sistema recuerda qué preguntas/ítems ya salieron y **no los repite** hasta agotar el banco (persistido en `localStorage` y, si está configurado, en **Vercel Blob**).
- 👥 **Modo Equipos (global)**: en la mayoría de juegos puedes elegir **Individual** o **Equipos** y repartir a los jugadores en **🔵 Azul vs 🔴 Rojo** o **👨 Hombres vs 👩 Mujeres**. Al final se suman los puntos por equipo y se corona al equipo ganador. *(No aplica en Ahorcado/Crucigrama cooperativos ni en Dibuja y Adivina, que ya tiene su propio modo equipos.)*
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

### 🧠 Memoria en la nube (opcional, Vercel Blob)
Para que la lista de "ya salió" sobreviva entre dispositivos, el proyecto incluye una función serverless en `api/state.js` que usa **Vercel Blob**:
- En tu proyecto de Vercel: **Storage → Create → Blob** y conéctalo. Esto crea la variable `BLOB_READ_WRITE_TOKEN` automáticamente.
- No hace falta nada más: el juego detecta el Blob y lo usa. **Si no lo configuras, funciona igual** con la memoria local del navegador (`localStorage`).

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
