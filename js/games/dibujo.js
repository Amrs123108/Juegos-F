/* ===========================================================
   games/dibujo.js — ¿QUÉ DIBUJO?
   El sistema dibuja la figura trazo por trazo (SVG animado).
   La familia adivina antes de que termine. Menos trazos = más pts.
   Dificultad según la edad del jugador en turno.
   =========================================================== */
import { DIBUJOS, DIBUJO_CONFIG } from '../data/dibujo.js';
import {
  $, $$, esc, shuffle, makeTimer, paintTimer, confettiBurst, confettiBig, sfx,
  backBtn, ageAssignScreen, AGE_LABELS,
} from '../ui.js';
import { drawNext } from '../memory.js';

const BASE_PTS = 40;
const PER_STEP = 20;
const SVGNS = 'http://www.w3.org/2000/svg';

export const dibujoGame = {
  ...DIBUJO_CONFIG,
  config: [
    { key: 'time', label: 'Segundos por dibujo', type: 'number', min: 15, max: 60, step: 5, default: 30 },
    { key: 'rounds', label: 'Dibujos por jugador', type: 'number', min: 1, max: 6, step: 1, default: 2 },
  ],

  start(root, players, cfg, api) {
    const time = cfg.time;
    const ageOf = {};
    let timer = null, drawInt = null, teardownKey = null;
    const sessionScore = Object.fromEntries(players.map(p => [p.id, 0]));

    function nextItemFor(band) {
      const list = DIBUJOS.filter(d => d.age === band);
      return drawNext('dibujo:' + band, list.length ? list : DIBUJOS, d => d.name);
    }

    ageAssignScreen(root, players, ageOf, {
      title: '¿Qué Dibujo?: nivel de cada jugador', color: 'sky', emoji: '🎨',
      intro: 'A la niña le tocan dibujos fáciles; a los mayores, más difíciles.',
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
        <p class="uppercase tracking-widest text-sky-400 font-bold text-sm mb-2">¿Qué Dibujo? · Vuelta ${vuelta}/${cfg.rounds}</p>
        <div class="text-[7rem] md:text-9xl mb-2 animate-float">${p.avatar}</div>
        <p class="uppercase tracking-widest text-slate-400 text-sm font-bold">Adivina</p>
        <h1 class="text-5xl md:text-7xl font-display font-extrabold mb-1 text-sky-300">${esc(p.name)}</h1>
        <p class="text-slate-400 mb-6">${AGE_LABELS[ageOf[p.id]].emoji} Nivel ${AGE_LABELS[ageOf[p.id]].tip.toLowerCase()}</p>
        <p class="text-slate-300 text-lg mb-8 max-w-md">El sistema empezará a dibujar. ¡Grita qué es! El operador marca si adivinaste. Mientras menos trazos, ¡más puntos!</p>
        <button data-go class="btn-press px-12 py-6 rounded-2xl bg-sky-500 text-slate-900 text-2xl font-extrabold animate-pulse-fast">▶️ ¡Empezar!</button>
      </div>`;
      $('[data-go]').onclick = playTurn;
    }

    function playTurn() {
      const p = turns[turnIdx];
      const item = nextItemFor(ageOf[p.id]);
      const totalSteps = item.steps.length;
      let drawn = 0;
      let done = false;

      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative flex flex-col">
        <div class="flex items-center justify-between max-w-3xl mx-auto w-full">
          <div class="flex items-center gap-2 font-display font-extrabold text-2xl md:text-4xl text-sky-300"><span class="text-4xl md:text-5xl">${p.avatar}</span> ${esc(p.name)}</div>
          <div id="dr-timer" class="text-5xl md:text-6xl font-display font-extrabold">${time}</div>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center gap-4">
          <p class="text-sm uppercase tracking-widest text-sky-300">Categoría: ${esc(item.cat)}</p>
          <div class="rounded-3xl bg-slate-800/60 border border-slate-700 shadow-2xl p-2" style="width:min(82vw,440px);height:min(82vw,440px)">
            <svg id="dr-canvas" viewBox="0 0 100 100" width="100%" height="100%"
              fill="none" stroke="#e2e8f0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></svg>
          </div>
          <p class="text-slate-400 text-sm">Trazos: <span id="dr-count">0</span>/${totalSteps}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-2 max-w-3xl mx-auto w-full">
          <button data-hit class="btn-press py-7 rounded-3xl bg-emerald-500 text-white text-2xl md:text-3xl font-extrabold">✅ ¡Adivinó! <span class="block text-base opacity-80">(ESPACIO)</span></button>
          <button data-skip class="btn-press py-7 rounded-3xl bg-slate-700 text-white text-2xl md:text-3xl font-extrabold">🙈 Rendirse <span class="block text-base opacity-80">(→)</span></button>
        </div>
      </div>`;

      const canvas = $('#dr-canvas'), timerEl = $('#dr-timer'), countEl = $('#dr-count');

      function animateEl(el) {
        if (el.tagName && el.tagName.toLowerCase() === 'g') { Array.from(el.children).forEach(animateEl); return; }
        if (typeof el.getTotalLength === 'function') {
          try {
            const len = el.getTotalLength();
            if (len && isFinite(len) && len > 0) {
              el.style.transition = 'none';
              el.style.strokeDasharray = len;
              el.style.strokeDashoffset = len;
              el.getBoundingClientRect();
              el.style.transition = 'stroke-dashoffset .6s ease';
              requestAnimationFrame(() => { el.style.strokeDashoffset = '0'; });
              return;
            }
          } catch (e) { /* fallback abajo */ }
        }
        el.style.opacity = '0';
        el.style.transition = 'opacity .4s ease';
        requestAnimationFrame(() => { el.style.opacity = '1'; });
      }

      function drawStep() {
        if (done || drawn >= totalSteps) return;
        const before = canvas.childNodes.length;
        canvas.insertAdjacentHTML('beforeend', item.steps[drawn]);
        // anima los nodos recién agregados
        for (let i = before; i < canvas.childNodes.length; i++) {
          const node = canvas.childNodes[i];
          if (node.nodeType === 1) animateEl(node);
        }
        drawn++;
        countEl.textContent = drawn;
        sfx.tick();
      }

      drawStep(); // primer trazo de una vez
      const stepMs = Math.max(700, Math.floor((time * 1000) / (totalSteps + 1)));
      drawInt = setInterval(drawStep, stepMs);

      function finish(guessed) {
        if (done) return;
        done = true;
        stopTimers();
        // completa el dibujo
        while (drawn < totalSteps) { canvas.insertAdjacentHTML('beforeend', item.steps[drawn]); drawn++; }
        countEl.textContent = drawn;
        let pts = 0;
        if (guessed) {
          pts = BASE_PTS + (totalSteps - Math.min(drawn, totalSteps)) * PER_STEP;
          if (pts < BASE_PTS) pts = BASE_PTS;
          sessionScore[p.id] += pts;
          api.addPoints(p.id, pts);
          sfx.good(); confettiBurst();
        } else { sfx.buzz(); }
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
        <div class="rounded-3xl bg-slate-800/60 border border-slate-700 p-2 mb-4" style="width:min(60vw,260px);height:min(60vw,260px)">
          <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="#e2e8f0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${item.steps.join('')}</svg>
        </div>
        <h2 class="text-3xl md:text-4xl font-display font-extrabold mb-1 ${guessed ? 'text-emerald-400' : 'text-sky-400'}">${guessed ? '¡Adivinado!' : 'Era…'} ${esc(item.name)}</h2>
        ${guessed ? `<p class="text-2xl text-emerald-300 font-bold mb-6">+${pts} pts para ${esc(p.name)}</p>` : `<p class="text-slate-400 mb-6">¡La próxima será! 💪</p>`}
        <button data-next class="btn-press px-10 py-5 rounded-2xl bg-sky-500 text-slate-900 text-xl font-extrabold">${turnIdx >= turns.length ? '🏁 Ver resultados' : '➡️ Siguiente'}</button>
      </div>`;
      $('[data-next]').onclick = showReady;
    }

    function showFinal() {
      stopTimers();
      api.logGame(dibujoGame.name, 'Ronda completada');
      const ranking = players.map(p => ({ ...p, s: sessionScore[p.id] })).sort((a, b) => b.s - a.s);
      if (api.result) { api.result(ranking); return; }
      const top = ranking[0];
      if (top.s > 0) { sfx.win(); confettiBig(2500); }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-sky-400 mb-2">¡Fin de ¿Qué Dibujo?! 🎨</h1>
        <p class="text-slate-300 mb-6">Ojo más rápido: <b>${esc(top.name)}</b> ${top.avatar}</p>
        <div class="card p-6 w-full max-w-md mb-8 text-left space-y-2">
          ${ranking.map((r, i) => `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-sky-500/20 ring-1 ring-sky-400' : 'bg-slate-800/50'}">
              <span class="font-bold">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <span class="font-extrabold text-sky-300">${r.s} pts</span>
            </div>`).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-sky-500 text-slate-900 text-lg font-extrabold">🔁 Otra vez</button>
          <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-lg font-extrabold">🏅 Tablero</button>
          <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-lg font-extrabold">🏠 Menú</button>
        </div>
      </div>`;
    }

    function stopTimers() {
      if (timer) { timer.stop(); timer = null; }
      if (drawInt) { clearInterval(drawInt); drawInt = null; }
      if (teardownKey) { teardownKey(); teardownKey = null; }
    }
    return stopTimers;
  },
};
