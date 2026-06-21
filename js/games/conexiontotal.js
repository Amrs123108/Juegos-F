/* ===========================================================
   games/conexiontotal.js — CONEXIÓN TOTAL
   2 jugadores. Fase MENTE (escriben en secreto, deben coincidir)
   + Fase ACCIÓN (gesto físico a la cuenta de 3, validación manual).
   Ganan la ronda solo si COINCIDEN en ambas.
   =========================================================== */
import { PROMPTS, ACCIONES, CONEXIONTOTAL_CONFIG } from '../data/conexiontotal.js';
import { $, esc, shuffle, confettiBig, sfx, toast, backBtn } from '../ui.js';
import { drawNext } from '../memory.js';

function normAns(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
    .replace(/^(el|la|los|las|un|una|unos|unas)\s+/, '').replace(/\s+/g, ' ');
}

function makePairQueue(players, rounds) {
  if (players.length < 2) return Array(rounds).fill(0).map(() => [players[0], players[0]]);
  if (players.length === 2) return Array(rounds).fill(0).map(() => shuffle([players[0], players[1]]));
  const allPairs = [];
  for (let i = 0; i < players.length; i++)
    for (let j = i + 1; j < players.length; j++)
      allPairs.push([players[i], players[j]]);
  const queue = [];
  while (queue.length < rounds) queue.push(...shuffle([...allPairs]));
  return queue.slice(0, rounds).map(p => shuffle([...p]));
}

export const conexionTotalGame = {
  ...CONEXIONTOTAL_CONFIG,
  config: [
    { key: 'rounds', label: 'Número de rondas', type: 'number', min: 2, max: 12, step: 1, default: 5 },
    { key: 'points', label: 'Puntos por conexión', type: 'number', min: 50, max: 200, step: 25, default: 100 },
  ],

  start(root, players, cfg, api) {
    const sessionScore = Object.fromEntries(players.map(p => [p.id, 0]));
    let teardownKey = null;
    let roundIdx = 0;
    let pair = null, prompt = '', ansA = '', menteMatch = false;
    const pairQueue = makePairQueue(players, cfg.rounds);

    roundIntro();

    function cleanupKey() { if (teardownKey) { teardownKey(); teardownKey = null; } }

    function roundIntro() {
      cleanupKey();
      if (roundIdx >= cfg.rounds) return showFinal();
      pair = pairQueue[roundIdx];
      prompt = drawNext('conexion:mente', PROMPTS, s => s);
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 relative">
        ${backBtn()}
        <p class="uppercase tracking-widest text-red-400 font-bold text-sm mb-3">Conexión Total · Ronda ${roundIdx + 1}/${cfg.rounds}</p>
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="flex flex-col items-center"><span class="text-6xl">${pair[0].avatar}</span><span class="font-bold mt-1">${esc(pair[0].name)}</span></div>
          <span class="text-3xl font-display font-extrabold text-red-400">🤜🤛</span>
          <div class="flex flex-col items-center"><span class="text-6xl">${pair[1].avatar}</span><span class="font-bold mt-1">${esc(pair[1].name)}</span></div>
        </div>
        <p class="text-slate-300 mb-1">FASE 1 · MENTE 🧠 — el tema es:</p>
        <p class="text-3xl md:text-4xl font-display font-extrabold text-red-300 mb-3">${esc(prompt)}</p>
        <p class="text-slate-400 mb-8 max-w-md">Cada uno escribe lo MISMO en secreto para conectar. ¡Piensen igual!</p>
        <button data-go class="btn-press px-12 py-5 rounded-2xl bg-red-500 text-white text-xl font-extrabold">▶️ Escribe ${esc(pair[0].name)}</button>
      </div>`;
      $('[data-go]').onclick = () => writePhase(0);
    }

    function writePhase(which) {
      cleanupKey();
      const writer = pair[which], other = pair[which === 0 ? 1 : 0];
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <p class="uppercase tracking-widest text-red-400 font-bold text-sm mb-2">MENTE · Tema: ${esc(prompt)}</p>
        <div class="text-7xl mb-2 animate-float">${writer.avatar}</div>
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-red-300 mb-1">Escribe, ${esc(writer.name)}</h1>
        <p class="text-2xl font-bold text-rose-400 mb-6 animate-pulse-fast">🙈 ${esc(other.name)}, ¡no mires!</p>
        <input id="ct-input" type="text" maxlength="24" autocomplete="off" placeholder="Tu respuesta…"
          class="w-full max-w-md text-center bg-slate-800 border-2 border-red-500/50 focus:border-red-400 rounded-2xl px-5 py-4 text-2xl font-bold outline-none" />
        <button data-ok class="btn-press mt-6 px-12 py-4 rounded-2xl bg-red-500 text-white text-xl font-extrabold">Listo ✓ (ENTER)</button>
      </div>`;
      const input = $('#ct-input'); input.focus();
      function submit() {
        const val = input.value.trim();
        if (!val) { toast('Escribe algo 😉', 'warn'); return; }
        if (which === 0) { ansA = val; writePhase(1); }
        else { menteReveal(ansA, val); }
      }
      $('[data-ok]').onclick = submit;
      function onKey(e) { if (e.key === 'Enter') { e.preventDefault(); submit(); } else if (e.key === 'Escape') { api.exit(); } }
      document.addEventListener('keydown', onKey);
      teardownKey = () => document.removeEventListener('keydown', onKey);
    }

    function menteReveal(a, b) {
      cleanupKey();
      menteMatch = normAns(a) === normAns(b);
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <p class="uppercase tracking-widest text-red-400 font-bold text-sm mb-3">Fase MENTE 🧠 · ${esc(prompt)}</p>
        <div class="flex items-stretch justify-center gap-4 mb-5 flex-wrap">
          <div class="card p-5 min-w-[140px]"><div class="text-5xl mb-1">${pair[0].avatar}</div><p class="text-2xl font-display font-extrabold text-red-300">${esc(a)}</p></div>
          <div class="self-center text-3xl">${menteMatch ? '🟰' : '≠'}</div>
          <div class="card p-5 min-w-[140px]"><div class="text-5xl mb-1">${pair[1].avatar}</div><p class="text-2xl font-display font-extrabold text-red-300">${esc(b)}</p></div>
        </div>
        <h2 class="text-3xl md:text-4xl font-display font-extrabold mb-2 ${menteMatch ? 'text-emerald-400' : 'text-rose-400'}">${menteMatch ? '¡Conexión mental! 🧠✨' : 'No pensaron igual 😅'}</h2>
        <p class="text-slate-300 mb-8">${menteMatch ? 'Ahora deben coincidir también en la ACCIÓN.' : 'Aún pueden intentar la acción, pero necesitan AMBAS para ganar.'}</p>
        <button data-go class="btn-press px-12 py-5 rounded-2xl bg-red-500 text-white text-xl font-extrabold">▶️ FASE 2 · ACCIÓN 🤜🤛</button>
      </div>`;
      $('[data-go]').onclick = accionPhase;
    }

    function accionPhase() {
      cleanupKey();
      const accion = drawNext('conexion:accion', ACCIONES, s => s);
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <p class="uppercase tracking-widest text-red-400 font-bold text-sm mb-3">Fase ACCIÓN 🤜🤛 · SIN hablar</p>
        <div class="card p-8 mb-6 max-w-lg">
          <p class="text-slate-400 text-sm mb-2">A la cuenta de 3, los dos:</p>
          <p class="text-3xl md:text-4xl font-display font-extrabold text-red-200">${esc(accion)}</p>
        </div>
        <div id="ct-count" class="text-7xl md:text-8xl font-display font-extrabold mb-6">3</div>
        <div id="ct-ask" class="hidden flex-col items-center gap-3">
          <p class="text-xl font-bold text-slate-200">¿Hicieron lo MISMO?</p>
          <div class="flex gap-4">
            <button data-yes class="btn-press px-10 py-5 rounded-2xl bg-emerald-500 text-white text-2xl font-extrabold">✅ Sí</button>
            <button data-no class="btn-press px-10 py-5 rounded-2xl bg-slate-700 text-white text-2xl font-extrabold">❌ No</button>
          </div>
        </div>
      </div>`;
      const countEl = $('#ct-count');
      let n = 3;
      sfx.tick();
      const iv = setInterval(() => {
        n--;
        if (n > 0) { countEl.textContent = n; sfx.tick(); }
        else {
          clearInterval(iv);
          countEl.textContent = '¡YA!';
          countEl.classList.add('text-red-400', 'animate-pop-in');
          sfx.buzz();
          const ask = $('#ct-ask');
          ask.classList.remove('hidden'); ask.classList.add('flex');
          $('[data-yes]').onclick = () => resolveRound(true);
          $('[data-no]').onclick = () => resolveRound(false);
        }
      }, 1000);
      teardownKey = () => clearInterval(iv);
    }

    function resolveRound(accionMatch) {
      cleanupKey();
      const win = menteMatch && accionMatch;
      if (win) { pair.forEach(p => { sessionScore[p.id] += cfg.points; api.addPoints(p.id, cfg.points); }); sfx.win(); confettiBig(2200); }
      else sfx.bad();
      roundIdx++;
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <div class="text-7xl mb-3">${win ? '🎉🔗' : '🙃'}</div>
        <h2 class="text-4xl md:text-5xl font-display font-extrabold mb-3 ${win ? 'text-emerald-400' : 'text-rose-400'}">${win ? '¡CONEXIÓN TOTAL!' : 'Casi…'}</h2>
        <div class="flex gap-4 justify-center mb-2 text-lg">
          <span class="${menteMatch ? 'text-emerald-300' : 'text-rose-300'}">🧠 Mente ${menteMatch ? '✓' : '✗'}</span>
          <span class="${accionMatch ? 'text-emerald-300' : 'text-rose-300'}">🤜 Acción ${accionMatch ? '✓' : '✗'}</span>
        </div>
        <p class="text-slate-300 mb-8">${win ? `${esc(pair[0].name)} y ${esc(pair[1].name)} ganan +${cfg.points} c/u` : 'Necesitan coincidir en AMBAS. ¡A la próxima!'}</p>
        <button data-next class="btn-press px-10 py-5 rounded-2xl bg-red-500 text-white text-xl font-extrabold">${roundIdx >= cfg.rounds ? '🏁 Ver resultados' : '➡️ Siguiente ronda'}</button>
      </div>`;
      $('[data-next]').onclick = roundIntro;
    }

    function showFinal() {
      cleanupKey();
      api.logGame(conexionTotalGame.name, `${cfg.rounds} rondas`);
      const ranking = players.map(p => ({ ...p, s: sessionScore[p.id] })).sort((a, b) => b.s - a.s);
      if (api.result) { api.result(ranking); return; }
      if (ranking[0].s > 0) { sfx.win(); confettiBig(2500); }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-red-400 mb-2">¡Fin de Conexión Total! 🤜🤛</h1>
        <p class="text-slate-300 mb-6">Más conectados: <b>${esc(ranking[0].name)}</b> ${ranking[0].avatar}</p>
        <div class="card p-6 w-full max-w-md mb-8 text-left space-y-2">
          ${ranking.map((r, i) => `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-red-500/20 ring-1 ring-red-400' : 'bg-slate-800/50'}">
              <span class="font-bold">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <span class="font-extrabold text-red-300">${r.s} pts</span>
            </div>`).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-red-500 text-white text-lg font-extrabold">🔁 Otra vez</button>
          <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-lg font-extrabold">🏅 Tablero</button>
          <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-lg font-extrabold">🏠 Menú</button>
        </div>
      </div>`;
    }

    return () => cleanupKey();
  },
};
