/* ===========================================================
   games/charadas.js — CHARADAS Y MÍMICAS
   Palabras por TEMA, sin hablar. Dificultad según la edad del actor
   (la niña recibe solo palabras fáciles). +pts por acierto.
   =========================================================== */
import { CHARADAS, CHARADAS_CONFIG } from '../data/charadas.js';
import {
  $, esc, shuffle, makeTimer, paintTimer, confettiBurst, confettiBig, sfx,
  backBtn, ageAssignScreen, AGE_TO_LEVELS, AGE_LABELS,
} from '../ui.js';
import { drawNext } from '../memory.js';

export const charadasGame = {
  ...CHARADAS_CONFIG,
  config: [
    { key: 'time', label: 'Segundos por turno', type: 'number', min: 30, max: 120, step: 5, default: 75 },
    { key: 'rounds', label: 'Vueltas (cada quien actúa)', type: 'number', min: 1, max: 6, step: 1, default: 2 },
    { key: 'points', label: 'Puntos por acierto', type: 'number', min: 50, max: 200, step: 25, default: 100 },
  ],

  start(root, players, cfg, api) {
    const time = cfg.time, ptsPerHit = cfg.points;
    const ageOf = {};
    let timer = null, teardownKey = null;
    const sessionScore = Object.fromEntries(players.map(p => [p.id, 0]));

    // Palabras por nivel sin repetir en la noche (ver memory.js)
    function nextWordFor(band) {
      const levels = AGE_TO_LEVELS[band] || ['facil'];
      const pool = CHARADAS.filter(c => levels.includes(c.nivel));
      return drawNext('charadas:' + band, pool, c => c.word);
    }

    // 1) Asignar edades
    ageAssignScreen(root, players, ageOf, {
      title: 'Charadas: nivel de cada jugador',
      color: 'pink', emoji: '🎭',
      intro: 'La niña actúa palabras fáciles; los mayores, más difíciles.',
      onStart: beginGame,
    });

    // 2) Secuencia de turnos
    let turns = [], turnIdx = 0;
    function beginGame() {
      turns = [];
      for (let r = 0; r < cfg.rounds; r++) players.forEach(p => turns.push(p));
      turnIdx = 0;
      showReady();
    }

    function showReady() {
      cleanup();
      if (turnIdx >= turns.length) return showFinal();
      const p = turns[turnIdx];
      const vuelta = Math.floor(turnIdx / players.length) + 1;
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 relative">
        ${backBtn()}
        <p class="uppercase tracking-widest text-pink-400 font-bold text-sm mb-2">Charadas · Vuelta ${vuelta}/${cfg.rounds}</p>
        <div class="text-[7rem] md:text-9xl mb-2 animate-float">${p.avatar}</div>
        <p class="uppercase tracking-widest text-slate-400 text-sm font-bold">Le toca a</p>
        <h1 class="text-5xl md:text-7xl font-display font-extrabold mb-1 text-pink-300">${esc(p.name)}</h1>
        <p class="text-slate-400 mb-6">${AGE_LABELS[ageOf[p.id]].emoji} Nivel ${AGE_LABELS[ageOf[p.id]].tip.toLowerCase()}</p>
        <p class="text-slate-300 text-lg mb-8 max-w-md">Párate al frente 🙆 Actúa <b>SIN HABLAR</b>. Tu familia adivina. El que opera el teclado marca los aciertos.</p>
        <button data-go class="btn-press px-12 py-6 rounded-2xl bg-pink-500 text-white text-2xl font-extrabold animate-pulse-fast">▶️ ¡Empezar!</button>
        <p class="text-slate-500 text-sm mt-6">Tendrás <b>${time}s</b>. Cada acierto suma <b>+${ptsPerHit}</b>.</p>
      </div>`;
      $('[data-go]').onclick = playTurn;
    }

    function playTurn() {
      const p = turns[turnIdx];
      const band = ageOf[p.id];
      let hits = 0;
      let current = nextWordFor(band);

      root.innerHTML = `
      <div class="min-h-screen flex flex-col p-4 md:p-8 relative">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2 text-2xl md:text-4xl font-display font-extrabold text-pink-300"><span class="text-4xl md:text-5xl">${p.avatar}</span> ${esc(p.name)}</div>
          <div id="ch-timer" class="text-5xl md:text-6xl font-display font-extrabold">${time}</div>
          <div class="text-lg font-bold text-pink-400">Aciertos: <span id="ch-hits">0</span></div>
        </div>

        <div class="flex-1 flex items-center justify-center">
          <div class="card p-8 md:p-12 max-w-3xl w-full text-center">
            <p id="ch-cat" class="text-base md:text-xl uppercase tracking-widest text-pink-400 font-bold mb-3"></p>
            <p id="ch-word" class="text-4xl md:text-6xl font-display font-extrabold text-pink-200 leading-tight"></p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-6 max-w-3xl mx-auto w-full">
          <button data-hit class="btn-press py-8 rounded-3xl bg-emerald-500 text-white text-2xl md:text-3xl font-extrabold">✅ ¡Adivinó! <span class="block text-base opacity-80">(ESPACIO)</span></button>
          <button data-skip class="btn-press py-8 rounded-3xl bg-slate-700 text-white text-2xl md:text-3xl font-extrabold">⏭️ Pasar <span class="block text-base opacity-80">(→)</span></button>
        </div>
        <p class="text-center text-slate-500 text-sm mt-4">ESPACIO/Enter = adivinó · Flecha derecha o P = pasar</p>
      </div>`;

      const wordEl = $('#ch-word'), catEl = $('#ch-cat'), timerEl = $('#ch-timer'), hitsEl = $('#ch-hits');

      function paintWord(animClass) {
        catEl.textContent = '🏷️ ' + current.cat;
        wordEl.textContent = current.word;
        wordEl.classList.remove('animate-pop-in', 'animate-shake'); void wordEl.offsetWidth;
        wordEl.classList.add(animClass);
      }
      paintWord('animate-pop-in');

      function refresh(anim) { current = nextWordFor(band); paintWord(anim); }
      function doHit() {
        hits++; sessionScore[p.id] += ptsPerHit;
        api.addPoints(p.id, ptsPerHit);
        hitsEl.textContent = hits;
        sfx.good(); confettiBurst();
        refresh('animate-pop-in');
      }
      function doSkip() { sfx.pass(); refresh('animate-shake'); }

      $('[data-hit]').onclick = doHit;
      $('[data-skip]').onclick = doSkip;

      function onKey(e) {
        if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); doHit(); }
        else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'p') { e.preventDefault(); doSkip(); }
        else if (e.key === 'Escape') { api.exit(); }
      }
      document.addEventListener('keydown', onKey);
      teardownKey = () => document.removeEventListener('keydown', onKey);

      timer = makeTimer(time, {
        dangerAt: 5,
        onTick: (r) => { timerEl.textContent = r; paintTimer(timerEl, r, 5); },
        onEnd: () => { sfx.buzz(); endTurn(hits); },
      });
    }

    function endTurn(hits) {
      cleanup();
      const p = turns[turnIdx];
      turnIdx++;
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <div class="text-7xl mb-3">${p.avatar}</div>
        <h2 class="text-3xl font-display font-extrabold mb-1">${esc(p.name)} logró ${hits} ${hits === 1 ? 'acierto' : 'aciertos'}</h2>
        <p class="text-2xl text-emerald-400 font-bold mb-8">+${hits * ptsPerHit} puntos</p>
        <button data-next class="btn-press px-10 py-5 rounded-2xl bg-pink-500 text-white text-xl font-extrabold">${turnIdx >= turns.length ? '🏁 Ver resultados' : '➡️ Siguiente turno'}</button>
      </div>`;
      $('[data-next]').onclick = showReady;
    }

    function showFinal() {
      cleanup();
      api.logGame(charadasGame.name, 'Ronda completada');
      const ranking = players.map(p => ({ ...p, s: sessionScore[p.id] })).sort((a, b) => b.s - a.s);
      if (api.result) { api.result(ranking); return; }
      const top = ranking[0];
      if (top.s > 0) { sfx.win(); confettiBig(2500); }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-pink-400 mb-2">¡Fin de las Charadas! 🎭</h1>
        <p class="text-slate-300 mb-6">Mejor actor de la ronda: <b>${esc(top.name)}</b> ${top.avatar}</p>
        <div class="card p-6 w-full max-w-md mb-8 text-left space-y-2">
          ${ranking.map((r, i) => `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-pink-500/20 ring-1 ring-pink-400' : 'bg-slate-800/50'}">
              <span class="font-bold">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <span class="font-extrabold text-pink-300">${r.s} pts</span>
            </div>`).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-pink-500 text-white text-lg font-extrabold">🔁 Otra vez</button>
          <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-lg font-extrabold">🏅 Tablero</button>
          <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-lg font-extrabold">🏠 Menú</button>
        </div>
      </div>`;
    }

    function cleanup() {
      if (timer) { timer.stop(); timer = null; }
      if (teardownKey) { teardownKey(); teardownKey = null; }
    }
    return cleanup;
  },
};
