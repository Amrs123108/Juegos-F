/* ===========================================================
   games/hablasindecir.js — HABLA SIN DECIR… (Tabú)
   Describe la palabra SIN usar las palabras prohibidas.
   Por turnos y por edad. El operador marca aciertos/pasar.
   =========================================================== */
import { HABLASINDECIR, HABLASINDECIR_CONFIG } from '../data/hablasindecir.js';
import {
  $, esc, makeTimer, paintTimer, confettiBurst, confettiBig, sfx,
  backBtn, ageAssignScreen, AGE_TO_LEVELS, AGE_LABELS,
} from '../ui.js';
import { drawNext } from '../memory.js';

export const hablaSinDecirGame = {
  ...HABLASINDECIR_CONFIG,
  config: [
    { key: 'time', label: 'Segundos por turno', type: 'number', min: 30, max: 120, step: 5, default: 70 },
    { key: 'rounds', label: 'Vueltas (cada quien describe)', type: 'number', min: 1, max: 6, step: 1, default: 2 },
    { key: 'points', label: 'Puntos por acierto', type: 'number', min: 50, max: 200, step: 25, default: 100 },
  ],

  start(root, players, cfg, api) {
    const time = cfg.time, ptsPerHit = cfg.points;
    const ageOf = {};
    let timer = null, teardownKey = null;
    const sessionScore = Object.fromEntries(players.map(p => [p.id, 0]));

    function nextWordFor(band) {
      const list = HABLASINDECIR.filter(w => w.age === band);
      return drawNext('habla:' + band, list.length ? list : HABLASINDECIR, w => w.word);
    }

    ageAssignScreen(root, players, ageOf, {
      title: 'Habla Sin Decir: nivel de cada jugador', color: 'fuchsia', emoji: '🤫',
      intro: 'La niña describe palabras fáciles; los mayores, más difíciles.',
      onStart: beginGame,
    });

    let turns = [], turnIdx = 0;
    function beginGame() {
      for (let r = 0; r < cfg.rounds; r++) players.forEach(p => turns.push(p));
      turnIdx = 0; showReady();
    }

    function showReady() {
      cleanup();
      if (turnIdx >= turns.length) return showFinal();
      const p = turns[turnIdx];
      const vuelta = Math.floor(turnIdx / players.length) + 1;
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 relative">
        ${backBtn()}
        <p class="uppercase tracking-widest text-fuchsia-400 font-bold text-sm mb-2">Habla Sin Decir · Vuelta ${vuelta}/${cfg.rounds}</p>
        <div class="text-[7rem] md:text-9xl mb-2 animate-float">${p.avatar}</div>
        <p class="uppercase tracking-widest text-slate-400 text-sm font-bold">Describe</p>
        <h1 class="text-5xl md:text-7xl font-display font-extrabold mb-1 text-fuchsia-300">${esc(p.name)}</h1>
        <p class="text-slate-400 mb-6">${AGE_LABELS[ageOf[p.id]].emoji} Nivel ${AGE_LABELS[ageOf[p.id]].tip.toLowerCase()}</p>
        <p class="text-slate-300 text-lg mb-8 max-w-md">Describe la palabra <b>SIN usar las palabras prohibidas</b> ni decir la palabra. Tu familia adivina. El operador marca aciertos.</p>
        <button data-go class="btn-press px-12 py-6 rounded-2xl bg-fuchsia-500 text-white text-2xl font-extrabold animate-pulse-fast">▶️ ¡Empezar!</button>
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
          <div class="flex items-center gap-2 text-2xl md:text-4xl font-display font-extrabold text-fuchsia-300"><span class="text-4xl md:text-5xl">${p.avatar}</span> ${esc(p.name)}</div>
          <div id="hd-timer" class="text-5xl md:text-6xl font-display font-extrabold">${time}</div>
          <div class="text-lg font-bold text-fuchsia-400">Aciertos: <span id="hd-hits">0</span></div>
        </div>

        <div class="flex-1 flex items-center justify-center">
          <div class="card p-8 md:p-10 max-w-2xl w-full text-center">
            <p class="text-slate-400 uppercase text-sm tracking-widest mb-2">Describe</p>
            <p id="hd-word" class="text-4xl md:text-6xl font-display font-extrabold text-fuchsia-200 leading-tight mb-5"></p>
            <p class="text-rose-400 uppercase text-sm tracking-widest mb-2">🚫 Prohibido decir</p>
            <div id="hd-forb" class="flex flex-wrap gap-2 justify-center"></div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-6 max-w-3xl mx-auto w-full">
          <button data-hit class="btn-press py-7 rounded-3xl bg-emerald-500 text-white text-2xl md:text-3xl font-extrabold">✅ ¡Adivinó! <span class="block text-base opacity-80">(ESPACIO)</span></button>
          <button data-skip class="btn-press py-7 rounded-3xl bg-slate-700 text-white text-2xl md:text-3xl font-extrabold">⏭️ Pasar <span class="block text-base opacity-80">(→)</span></button>
        </div>
        <p class="text-center text-slate-500 text-sm mt-4">Si dice una prohibida, ¡marca Pasar! · ESPACIO = adivinó · → o P = pasar</p>
      </div>`;

      const wordEl = $('#hd-word'), forbEl = $('#hd-forb'), timerEl = $('#hd-timer'), hitsEl = $('#hd-hits');

      function paint(anim) {
        wordEl.textContent = current.word;
        forbEl.innerHTML = current.forbidden.map(f => `<span class="px-3 py-1.5 rounded-xl bg-rose-600/30 border border-rose-500/50 font-bold">${esc(f)}</span>`).join('');
        wordEl.classList.remove('animate-pop-in', 'animate-shake'); void wordEl.offsetWidth; wordEl.classList.add(anim);
      }
      paint('animate-pop-in');

      function refresh(anim) { current = nextWordFor(band); paint(anim); }
      function doHit() { hits++; sessionScore[p.id] += ptsPerHit; api.addPoints(p.id, ptsPerHit); hitsEl.textContent = hits; sfx.good(); confettiBurst(); refresh('animate-pop-in'); }
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
        <button data-next class="btn-press px-10 py-5 rounded-2xl bg-fuchsia-500 text-white text-xl font-extrabold">${turnIdx >= turns.length ? '🏁 Ver resultados' : '➡️ Siguiente turno'}</button>
      </div>`;
      $('[data-next]').onclick = showReady;
    }

    function showFinal() {
      cleanup();
      api.logGame(hablaSinDecirGame.name, 'Ronda completada');
      const ranking = players.map(p => ({ ...p, s: sessionScore[p.id] })).sort((a, b) => b.s - a.s);
      if (api.result) { api.result(ranking); return; }
      const top = ranking[0];
      if (top.s > 0) { sfx.win(); confettiBig(2500); }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-fuchsia-400 mb-2">¡Fin de Habla Sin Decir! 🤫</h1>
        <p class="text-slate-300 mb-6">Mejor pico de oro: <b>${esc(top.name)}</b> ${top.avatar}</p>
        <div class="card p-6 w-full max-w-md mb-8 text-left space-y-2">
          ${ranking.map((r, i) => `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-fuchsia-500/20 ring-1 ring-fuchsia-400' : 'bg-slate-800/50'}">
              <span class="font-bold">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <span class="font-extrabold text-fuchsia-300">${r.s} pts</span>
            </div>`).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-fuchsia-500 text-white text-lg font-extrabold">🔁 Otra vez</button>
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
