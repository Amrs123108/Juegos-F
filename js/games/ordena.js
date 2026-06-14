/* ===========================================================
   games/ordena.js — ORDENA LA PALABRA (anagramas)
   Modos: Clásico / Difícil / Caos / Categoría. Por turnos.
   =========================================================== */
import { ORDENA, ORDENA_CONFIG } from '../data/ordena.js';
import { $, esc, shuffle, makeTimer, paintTimer, confettiBurst, confettiBig, sfx, toast, backBtn } from '../ui.js';
import { drawNext } from '../memory.js';

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, '').trim();

const MODES = {
  clasico:   { label: 'Clásico', min: 4, max: 6,  time: 25, mult: 1,   hint: false },
  dificil:   { label: 'Difícil', min: 7, max: 10, time: 18, mult: 1.5, hint: false },
  caos:      { label: 'Caos 🔥', min: 4, max: 10, time: 12, mult: 2,   hint: false, penal: true },
  categoria: { label: 'Categoría', min: 4, max: 8, time: 25, mult: 1,  hint: true },
};

function scramble(word) {
  const chars = [...word];
  let out, tries = 0;
  do { out = shuffle(chars).join(''); tries++; }
  while (out.toUpperCase() === word.toUpperCase() && tries < 30);
  return out.toUpperCase();
}

export const ordenaGame = {
  ...ORDENA_CONFIG,
  config: [
    { key: 'mode', label: 'Modo de juego', type: 'select', default: 'clasico', options: [
      { value: 'clasico', label: 'Clásico (4-6 letras, 25s)' },
      { value: 'dificil', label: 'Difícil (7-10 letras, 18s)' },
      { value: 'caos', label: 'Caos 🔥 (12s, penaliza fallar)' },
      { value: 'categoria', label: 'Categoría (con pista)' },
    ] },
    { key: 'rounds', label: 'Palabras por jugador', type: 'number', min: 1, max: 8, step: 1, default: 3 },
  ],

  start(root, players, cfg, api) {
    const M = MODES[cfg.mode] || MODES.clasico;
    const pool = ORDENA.filter(w => { const L = norm(w.word).length; return L >= M.min && L <= M.max; });
    const sessionScore = Object.fromEntries(players.map(p => [p.id, 0]));
    let timer = null, teardownKey = null;

    let turns = [], turnIdx = 0;
    (function begin() {
      for (let r = 0; r < cfg.rounds; r++) players.forEach(p => turns.push(p));
      turnIdx = 0; askNext();
    })();

    function askNext() {
      cleanup();
      if (turnIdx >= turns.length) return showFinal();
      const p = turns[turnIdx];
      const item = drawNext('ordena:' + cfg.mode, pool, w => w.word) || pool[0];
      const scrambled = scramble(item.word);
      let answered = false;

      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative flex flex-col">
        ${backBtn()}
        <div class="flex items-center justify-between pt-12 max-w-3xl mx-auto w-full">
          <div class="flex items-center gap-2 font-display font-extrabold text-2xl md:text-4xl text-lime-300"><span class="text-4xl md:text-5xl">${p.avatar}</span> ${esc(p.name)}</div>
          <div id="or-timer" class="text-5xl md:text-6xl font-display font-extrabold">${M.time}</div>
        </div>

        <div class="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full">
          <p class="uppercase tracking-widest text-lime-400 font-bold text-sm mb-2">Modo ${M.label}${M.hint ? ' · Pista: ' + esc(item.cat) : ''}</p>
          <div class="flex flex-wrap gap-2 justify-center mb-6">
            ${[...scrambled].map(ch => `<span class="w-12 h-14 md:w-16 md:h-20 grid place-items-center rounded-xl bg-slate-800 border-2 border-lime-500/50 text-2xl md:text-4xl font-display font-extrabold">${esc(ch)}</span>`).join('')}
          </div>
          <input id="or-input" type="text" autocomplete="off" maxlength="20" placeholder="Escribe la palabra…"
            class="w-full max-w-md text-center bg-slate-800 border-2 border-lime-500/50 focus:border-lime-400 rounded-2xl px-5 py-4 text-2xl font-bold outline-none uppercase" />
          <div class="flex gap-3 mt-5">
            <button data-ok class="btn-press px-8 py-4 rounded-2xl bg-lime-500 text-slate-900 text-xl font-extrabold">Comprobar ✓ (ENTER)</button>
            <button data-skip class="btn-press px-6 py-4 rounded-2xl bg-slate-700 text-white text-xl font-extrabold">Pasar</button>
          </div>
        </div>
      </div>`;

      const input = $('#or-input'); input.focus();
      const timerEl = $('#or-timer');

      function finish(correct) {
        if (answered) return;
        answered = true;
        const remaining = timer ? Math.max(0, timer.remaining) : 0;
        if (timer) timer.stop();
        let pts = 0;
        if (correct) {
          pts = Math.round((100 + remaining * 5) * M.mult);
          sessionScore[p.id] += pts; api.addPoints(p.id, pts);
          sfx.good(); confettiBurst();
        } else {
          sfx.bad();
          if (M.penal) { sessionScore[p.id] -= 20; api.addPoints(p.id, -20); }
        }
        showFeedback(correct, pts, item.word);
      }

      function tryAnswer() {
        if (answered) return;
        if (norm(input.value) === norm(item.word)) finish(true);
        else { input.classList.add('animate-shake'); sfx.bad(); toast('Mmm, no… ¡sigue!', 'bad'); setTimeout(() => input.classList.remove('animate-shake'), 500); }
      }
      $('[data-ok]').onclick = tryAnswer;
      $('[data-skip]').onclick = () => finish(false);

      function onKey(e) {
        if (e.key === 'Enter') { e.preventDefault(); tryAnswer(); }
        else if (e.key === 'Escape') { api.exit(); }
      }
      document.addEventListener('keydown', onKey);
      teardownKey = () => document.removeEventListener('keydown', onKey);

      timer = makeTimer(M.time, {
        dangerAt: 5,
        onTick: (r) => { timerEl.textContent = r; paintTimer(timerEl, r, 5); },
        onEnd: () => { if (!answered) { sfx.buzz(); finish(false); } },
      });
    }

    function showFeedback(correct, pts, answer) {
      cleanup();
      const p = turns[turnIdx];
      turnIdx++;
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <div class="text-7xl mb-3">${correct ? '✅' : '❌'}</div>
        <h2 class="text-3xl md:text-4xl font-display font-extrabold mb-1 ${correct ? 'text-lime-400' : 'text-rose-400'}">${correct ? '¡Correcto!' : 'Era…'} ${esc(answer.toUpperCase())}</h2>
        ${correct ? `<p class="text-2xl text-lime-300 font-bold mb-6">+${pts} pts para ${esc(p.name)}</p>` : `<p class="text-slate-400 mb-6">¡La próxima! 💪</p>`}
        <button data-next class="btn-press px-10 py-5 rounded-2xl bg-lime-500 text-slate-900 text-xl font-extrabold">${turnIdx >= turns.length ? '🏁 Resultados' : '➡️ Siguiente'}</button>
      </div>`;
      $('[data-next]').onclick = askNext;
    }

    function showFinal() {
      cleanup();
      api.logGame(ordenaGame.name, 'Modo ' + M.label);
      const ranking = players.map(p => ({ ...p, s: sessionScore[p.id] })).sort((a, b) => b.s - a.s);
      if (api.result) { api.result(ranking); return; }
      const top = ranking[0];
      if (top.s > 0) { sfx.win(); confettiBig(2500); }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-lime-400 mb-2">¡Fin de Ordena la Palabra! 🔤</h1>
        <p class="text-slate-300 mb-6">Mente ágil: <b>${esc(top.name)}</b> ${top.avatar}</p>
        <div class="card p-6 w-full max-w-md mb-8 text-left space-y-2">
          ${ranking.map((r, i) => `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-lime-500/20 ring-1 ring-lime-400' : 'bg-slate-800/50'}">
              <span class="font-bold">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <span class="font-extrabold text-lime-300">${r.s} pts</span>
            </div>`).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-lime-500 text-slate-900 text-lg font-extrabold">🔁 Otra vez</button>
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
