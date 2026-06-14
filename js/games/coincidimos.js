/* ===========================================================
   games/coincidimos.js — ¿COINCIDIMOS?
   2 jugadores al azar escriben EN SECRETO una palabra para un tema.
   El objetivo (coincidir / NO coincidir) es al azar cada ronda.
   Si lo cumplen, ambos ganan puntos.
   =========================================================== */
import { SEMILLAS, COINCIDIMOS_CONFIG } from '../data/coincidimos.js';
import { $, esc, pick, shuffle, confettiBig, confettiBurst, sfx, toast, backBtn } from '../ui.js';

// Normaliza para comparar: minúsculas, sin acentos, sin artículos, sin espacios extra
function normAns(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().trim()
    .replace(/^(el|la|los|las|un|una|unos|unas)\s+/, '')
    .replace(/\s+/g, ' ');
}

export const coincidimosGame = {
  ...COINCIDIMOS_CONFIG,
  config: [
    { key: 'rounds', label: 'Número de rondas', type: 'number', min: 2, max: 12, step: 1, default: 5 },
    { key: 'points', label: 'Puntos por acierto', type: 'number', min: 50, max: 200, step: 25, default: 100 },
  ],

  start(root, players, cfg, api) {
    const sessionScore = Object.fromEntries(players.map(p => [p.id, 0]));
    let teardownKey = null;
    let seedQueue = shuffle(SEMILLAS), seedPos = 0;
    function nextSeed() {
      if (seedPos >= seedQueue.length) { seedQueue = shuffle(SEMILLAS); seedPos = 0; }
      return seedQueue[seedPos++];
    }

    let roundIdx = 0;
    let pair = null, objective = 'match', seed = '', ansA = '';

    roundIntro();

    function cleanupKey() { if (teardownKey) { teardownKey(); teardownKey = null; } }

    function roundIntro() {
      cleanupKey();
      if (roundIdx >= cfg.rounds) return showFinal();
      pair = shuffle(players).slice(0, 2);
      objective = Math.random() < 0.5 ? 'match' : 'differ';
      seed = nextSeed();
      const isMatch = objective === 'match';
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 relative">
        ${backBtn()}
        <p class="uppercase tracking-widest text-teal-400 font-bold text-sm mb-3">¿Coincidimos? · Ronda ${roundIdx + 1}/${cfg.rounds}</p>
        <div class="flex items-center justify-center gap-4 mb-5">
          <div class="flex flex-col items-center"><span class="text-6xl">${pair[0].avatar}</span><span class="font-bold mt-1">${esc(pair[0].name)}</span></div>
          <span class="text-3xl font-display font-extrabold text-slate-500">vs</span>
          <div class="flex flex-col items-center"><span class="text-6xl">${pair[1].avatar}</span><span class="font-bold mt-1">${esc(pair[1].name)}</span></div>
        </div>
        <div class="card p-6 mb-5 ${isMatch ? 'ring-2 ring-emerald-400' : 'ring-2 ring-rose-400'}">
          <p class="uppercase tracking-widest text-sm font-bold ${isMatch ? 'text-emerald-300' : 'text-rose-300'}">Objetivo de la ronda</p>
          <p class="text-4xl md:text-5xl font-display font-extrabold mt-1 ${isMatch ? 'text-emerald-400' : 'text-rose-400'}">${isMatch ? '🟢 ¡COINCIDIR!' : '🔴 ¡NO COINCIDIR!'}</p>
          <p class="text-slate-300 mt-2">${isMatch ? 'Escriban LO MISMO para ganar' : 'Escriban algo DISTINTO para ganar'}</p>
        </div>
        <p class="text-slate-400 mb-1">El tema es:</p>
        <p class="text-3xl md:text-4xl font-display font-extrabold text-teal-300 mb-8">${esc(seed)}</p>
        <button data-go class="btn-press px-12 py-5 rounded-2xl bg-teal-500 text-slate-900 text-xl font-extrabold">▶️ Empezar (escribe ${esc(pair[0].name)})</button>
      </div>`;
      $('[data-go]').onclick = () => writePhase(0);
    }

    function writePhase(which) {
      cleanupKey();
      const writer = pair[which];
      const other = pair[which === 0 ? 1 : 0];
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <p class="uppercase tracking-widest text-teal-400 font-bold text-sm mb-2">Tema: ${esc(seed)}</p>
        <div class="text-7xl mb-2 animate-float">${writer.avatar}</div>
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-teal-300 mb-1">Escribe, ${esc(writer.name)}</h1>
        <p class="text-2xl font-bold text-rose-400 mb-6 animate-pulse-fast">🙈 ${esc(other.name)}, ¡voltéate y no mires!</p>
        <input id="ci-input" type="text" maxlength="24" autocomplete="off" placeholder="Tu palabra…"
          class="w-full max-w-md text-center bg-slate-800 border-2 border-teal-500/50 focus:border-teal-400 rounded-2xl px-5 py-4 text-2xl font-bold outline-none" />
        <button data-ok class="btn-press mt-6 px-12 py-4 rounded-2xl bg-teal-500 text-slate-900 text-xl font-extrabold">Listo ✓ (ENTER)</button>
        <p class="text-slate-500 text-sm mt-4">Tu respuesta se ocultará al continuar.</p>
      </div>`;
      const input = $('#ci-input');
      input.focus();

      function submit() {
        const val = input.value.trim();
        if (!val) { toast('Escribe algo 😉', 'warn'); return; }
        if (which === 0) { ansA = val; writePhase(1); }
        else { reveal(ansA, val); }
      }
      $('[data-ok]').onclick = submit;
      function onKey(e) {
        if (e.key === 'Enter') { e.preventDefault(); submit(); }
        else if (e.key === 'Escape') { api.exit(); }
      }
      document.addEventListener('keydown', onKey);
      teardownKey = () => document.removeEventListener('keydown', onKey);
    }

    function reveal(a, b) {
      cleanupKey();
      const coincide = normAns(a) === normAns(b);
      const success = objective === 'match' ? coincide : !coincide;
      if (success) {
        pair.forEach(p => { sessionScore[p.id] += cfg.points; api.addPoints(p.id, cfg.points); });
        sfx.win(); confettiBig(2200);
      } else { sfx.bad(); }

      roundIdx++;
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <p class="uppercase tracking-widest text-teal-400 font-bold text-sm mb-2">Tema: ${esc(seed)} · Objetivo: ${objective === 'match' ? '🟢 Coincidir' : '🔴 No coincidir'}</p>
        <div class="flex items-stretch justify-center gap-4 mb-6 flex-wrap">
          <div class="card p-5 min-w-[140px]">
            <div class="text-5xl mb-1">${pair[0].avatar}</div>
            <p class="text-sm text-slate-400">${esc(pair[0].name)}</p>
            <p class="text-2xl font-display font-extrabold text-teal-300 mt-1">${esc(a)}</p>
          </div>
          <div class="self-center text-3xl">${coincide ? '🟰' : '≠'}</div>
          <div class="card p-5 min-w-[140px]">
            <div class="text-5xl mb-1">${pair[1].avatar}</div>
            <p class="text-sm text-slate-400">${esc(pair[1].name)}</p>
            <p class="text-2xl font-display font-extrabold text-teal-300 mt-1">${esc(b)}</p>
          </div>
        </div>
        <h2 class="text-4xl md:text-5xl font-display font-extrabold mb-2 ${success ? 'text-emerald-400' : 'text-rose-400'}">${success ? '¡GANARON! 🎉' : '¡No esta vez! 😅'}</h2>
        <p class="text-slate-300 mb-1">${coincide ? 'Escribieron lo mismo' : 'Escribieron algo distinto'} → ${success ? `objetivo cumplido (+${cfg.points} pts c/u)` : 'objetivo no cumplido'}</p>
        <button data-next class="btn-press mt-6 px-10 py-5 rounded-2xl bg-teal-500 text-slate-900 text-xl font-extrabold">${roundIdx >= cfg.rounds ? '🏁 Ver resultados' : '➡️ Siguiente ronda'}</button>
      </div>`;
      $('[data-next]').onclick = roundIntro;
    }

    function showFinal() {
      cleanupKey();
      api.logGame(coincidimosGame.name, `${cfg.rounds} rondas`);
      const ranking = players.map(p => ({ ...p, s: sessionScore[p.id] })).sort((a, b) => b.s - a.s);
      const top = ranking[0];
      if (top.s > 0) { sfx.win(); confettiBig(2500); }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-teal-400 mb-2">¡Fin de ¿Coincidimos?! 🤝</h1>
        <p class="text-slate-300 mb-6">Más conectados: <b>${esc(top.name)}</b> ${top.avatar}</p>
        <div class="card p-6 w-full max-w-md mb-8 text-left space-y-2">
          ${ranking.map((r, i) => `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-teal-500/20 ring-1 ring-teal-400' : 'bg-slate-800/50'}">
              <span class="font-bold">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <span class="font-extrabold text-teal-300">${r.s} pts</span>
            </div>`).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-teal-500 text-slate-900 text-lg font-extrabold">🔁 Otra vez</button>
          <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-lg font-extrabold">🏅 Tablero</button>
          <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-lg font-extrabold">🏠 Menú</button>
        </div>
      </div>`;
    }

    return () => cleanupKey();
  },
};
