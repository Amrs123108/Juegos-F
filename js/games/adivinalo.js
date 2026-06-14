/* ===========================================================
   games/adivinalo.js — ¡ADIVÍNALO!
   Una imagen (emoji gigante) se revela por mosaicos poco a poco.
   La familia adivina; el operador marca acierto. Menos pistas = más pts.
   Dificultad según la edad del jugador en turno.
   =========================================================== */
import { ADIVINALO, ADIVINALO_CONFIG } from '../data/adivinalo.js';
import {
  $, $$, esc, shuffle, makeTimer, paintTimer, confettiBurst, confettiBig, sfx, toast,
  backBtn, ageAssignScreen, AGE_LABELS,
} from '../ui.js';

const TILES = 16;       // cuadrícula 4x4
const BASE_PTS = 50;
const PER_TILE = 15;    // puntos por cada mosaico aún oculto al adivinar

export const adivinaloGame = {
  ...ADIVINALO_CONFIG,
  config: [
    { key: 'time', label: 'Segundos por imagen', type: 'number', min: 15, max: 60, step: 5, default: 32 },
    { key: 'rounds', label: 'Imágenes por jugador', type: 'number', min: 1, max: 6, step: 1, default: 2 },
  ],

  start(root, players, cfg, api) {
    const time = cfg.time;
    const ageOf = {};
    let timer = null, revealInt = null, teardownKey = null;
    const sessionScore = Object.fromEntries(players.map(p => [p.id, 0]));

    // Colas por edad
    const queues = {};
    function nextItemFor(band) {
      if (!queues[band] || queues[band].pos >= queues[band].list.length) {
        const list = shuffle(ADIVINALO.filter(a => a.age === band));
        queues[band] = { list: list.length ? list : shuffle(ADIVINALO), pos: 0 };
      }
      return queues[band].list[queues[band].pos++];
    }

    ageAssignScreen(root, players, ageOf, {
      title: '¡Adivínalo!: nivel de cada jugador', color: 'rose', emoji: '🔍',
      intro: 'A la niña le tocan imágenes fáciles; a los mayores, más difíciles.',
      onStart: beginGame,
    });

    let turns = [], turnIdx = 0;
    function beginGame() {
      turns = [];
      for (let r = 0; r < cfg.rounds; r++) players.forEach(p => turns.push(p));
      turnIdx = 0;
      showReady();
    }

    function showReady() {
      stopTimers();
      if (turnIdx >= turns.length) return showFinal();
      const p = turns[turnIdx];
      const vuelta = Math.floor(turnIdx / players.length) + 1;
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 relative">
        ${backBtn()}
        <p class="uppercase tracking-widest text-rose-400 font-bold text-sm mb-2">¡Adivínalo! · Vuelta ${vuelta}/${cfg.rounds}</p>
        <div class="text-[7rem] md:text-9xl mb-2 animate-float">${p.avatar}</div>
        <p class="uppercase tracking-widest text-slate-400 text-sm font-bold">Adivina</p>
        <h1 class="text-5xl md:text-7xl font-display font-extrabold mb-1 text-rose-300">${esc(p.name)}</h1>
        <p class="text-slate-400 mb-6">${AGE_LABELS[ageOf[p.id]].emoji} Nivel ${AGE_LABELS[ageOf[p.id]].tip.toLowerCase()}</p>
        <p class="text-slate-300 text-lg mb-8 max-w-md">La imagen se irá descubriendo poco a poco. ¡Grita la respuesta! El operador marca si adivinaste. Mientras menos descubierta, ¡más puntos!</p>
        <button data-go class="btn-press px-12 py-6 rounded-2xl bg-rose-500 text-white text-2xl font-extrabold animate-pulse-fast">▶️ ¡Empezar!</button>
      </div>`;
      $('[data-go]').onclick = playTurn;
    }

    function playTurn() {
      const p = turns[turnIdx];
      const item = nextItemFor(ageOf[p.id]);
      const order = shuffle([...Array(TILES).keys()]);
      let revealed = 0;
      let done = false;

      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative flex flex-col">
        <div class="flex items-center justify-between max-w-3xl mx-auto w-full">
          <div class="flex items-center gap-2 font-display font-extrabold text-2xl md:text-4xl text-rose-300"><span class="text-4xl md:text-5xl">${p.avatar}</span> ${esc(p.name)}</div>
          <div id="ad-timer" class="text-5xl md:text-6xl font-display font-extrabold">${time}</div>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center gap-4">
          <p class="text-sm uppercase tracking-widest text-rose-300">Categoría: ${esc(item.cat)}</p>
          <div class="relative rounded-3xl overflow-hidden bg-slate-800 shadow-2xl" style="width:min(80vw,420px);height:min(80vw,420px)">
            <div class="absolute inset-0 grid place-items-center select-none" style="font-size:min(55vw,300px);line-height:1">${item.emoji}</div>
            <div id="ad-grid" class="absolute inset-0 grid" style="grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr)">
              ${Array.from({ length: TILES }).map((_, i) => `<div data-tile="${i}" class="bg-slate-700 border border-slate-800 transition-opacity duration-500"></div>`).join('')}
            </div>
          </div>
          <p class="text-slate-400 text-sm">Mosaicos ocultos: <span id="ad-hidden">${TILES}</span>/${TILES}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-2 max-w-3xl mx-auto w-full">
          <button data-hit class="btn-press py-7 rounded-3xl bg-emerald-500 text-white text-2xl md:text-3xl font-extrabold">✅ ¡Adivinó! <span class="block text-base opacity-80">(ESPACIO)</span></button>
          <button data-skip class="btn-press py-7 rounded-3xl bg-slate-700 text-white text-2xl md:text-3xl font-extrabold">🙈 Rendirse <span class="block text-base opacity-80">(→)</span></button>
        </div>
      </div>`;

      const timerEl = $('#ad-timer'), hiddenEl = $('#ad-hidden');

      function revealOne() {
        if (done || revealed >= TILES) return;
        const idx = order[revealed];
        const tile = $(`[data-tile="${idx}"]`);
        if (tile) tile.style.opacity = '0';
        revealed++;
        hiddenEl.textContent = TILES - revealed;
        sfx.tick();
      }

      // Revela un mosaico cada (time/TILES) segundos
      const stepMs = Math.max(500, Math.floor((time * 1000) / (TILES + 1)));
      revealInt = setInterval(revealOne, stepMs);

      function finish(guessed) {
        if (done) return;
        done = true;
        stopTimers();
        // descubre todo
        $$('#ad-grid [data-tile]').forEach(t => (t.style.opacity = '0'));
        let pts = 0;
        if (guessed) {
          pts = BASE_PTS + (TILES - revealed) * PER_TILE;
          sessionScore[p.id] += pts;
          api.addPoints(p.id, pts);
          sfx.good(); confettiBurst();
        } else {
          sfx.buzz();
        }
        showResult(guessed, pts, item);
      }

      $('[data-hit]').onclick = () => finish(true);
      $('[data-skip]').onclick = () => finish(false);

      function onKey(e) {
        if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); finish(true); }
        else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'p') { e.preventDefault(); finish(false); }
        else if (e.key === 'Escape') { api.exit(); }
      }
      document.addEventListener('keydown', onKey);
      teardownKey = () => document.removeEventListener('keydown', onKey);

      timer = makeTimer(time, {
        dangerAt: 5,
        onTick: (r) => { timerEl.textContent = r; paintTimer(timerEl, r, 5); },
        onEnd: () => finish(false),
      });
    }

    function showResult(guessed, pts, item) {
      const p = turns[turnIdx];
      turnIdx++;
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <div class="text-8xl mb-3">${item.emoji}</div>
        <h2 class="text-3xl md:text-4xl font-display font-extrabold mb-1 ${guessed ? 'text-emerald-400' : 'text-rose-400'}">${guessed ? '¡Adivinado!' : 'Era…'} ${esc(item.answer)}</h2>
        ${guessed ? `<p class="text-2xl text-emerald-300 font-bold mb-6">+${pts} pts para ${esc(p.name)}</p>` : `<p class="text-slate-400 mb-6">¡La próxima será! 💪</p>`}
        <button data-next class="btn-press px-10 py-5 rounded-2xl bg-rose-500 text-white text-xl font-extrabold">${turnIdx >= turns.length ? '🏁 Ver resultados' : '➡️ Siguiente'}</button>
      </div>`;
      $('[data-next]').onclick = showReady;
    }

    function showFinal() {
      stopTimers();
      api.logGame(adivinaloGame.name, 'Ronda completada');
      const ranking = players.map(p => ({ ...p, s: sessionScore[p.id] })).sort((a, b) => b.s - a.s);
      const top = ranking[0];
      if (top.s > 0) { sfx.win(); confettiBig(2500); }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-rose-400 mb-2">¡Fin de ¡Adivínalo!! 🔍</h1>
        <p class="text-slate-300 mb-6">Ojo más rápido: <b>${esc(top.name)}</b> ${top.avatar}</p>
        <div class="card p-6 w-full max-w-md mb-8 text-left space-y-2">
          ${ranking.map((r, i) => `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-rose-500/20 ring-1 ring-rose-400' : 'bg-slate-800/50'}">
              <span class="font-bold">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <span class="font-extrabold text-rose-300">${r.s} pts</span>
            </div>`).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-rose-500 text-white text-lg font-extrabold">🔁 Otra vez</button>
          <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-lg font-extrabold">🏅 Tablero</button>
          <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-lg font-extrabold">🏠 Menú</button>
        </div>
      </div>`;
    }

    function stopTimers() {
      if (timer) { timer.stop(); timer = null; }
      if (revealInt) { clearInterval(revealInt); revealInt = null; }
      if (teardownKey) { teardownKey(); teardownKey = null; }
    }
    return stopTimers;
  },
};
