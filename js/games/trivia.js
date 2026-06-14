/* ===========================================================
   games/trivia.js — TRIVIA DEL PATIO
   Opción múltiple A-D, 20s. Preguntas filtradas por edad del jugador.
   Antes de jugar se asigna una banda de edad a cada participante.
   =========================================================== */
import { TRIVIA, TRIVIA_CONFIG, AGE_LABELS } from '../data/trivia.js';
import { $, $$, esc, shuffle, makeTimer, paintTimer, confettiBurst, confettiBig, sfx, toast, backBtn } from '../ui.js';

const LETTERS = ['A', 'B', 'C', 'D'];

export const triviaGame = {
  ...TRIVIA_CONFIG,
  config: [
    { key: 'time', label: 'Segundos por pregunta', type: 'number', min: 10, max: 40, step: 5, default: 20 },
    { key: 'rounds', label: 'Preguntas por jugador', type: 'number', min: 1, max: 6, step: 1, default: 3 },
  ],

  start(root, players, cfg, api) {
    const time = cfg.time;
    // Asignación de banda de edad por jugador (default round-robin sensato)
    const bands = ['nina', 'ado', 'adulto'];
    const ageOf = {};
    players.forEach((p, i) => { ageOf[p.id] = bands[i % bands.length]; });

    // Pools por edad
    const pools = {
      nina: shuffle(TRIVIA.filter(t => t.age === 'nina')),
      ado: shuffle(TRIVIA.filter(t => t.age === 'ado')),
      adulto: shuffle(TRIVIA.filter(t => t.age === 'adulto')),
    };
    const ptr = { nina: 0, ado: 0, adulto: 0 };
    function nextQuestion(age) {
      if (ptr[age] >= pools[age].length) { pools[age] = shuffle(pools[age]); ptr[age] = 0; }
      return pools[age][ptr[age]++];
    }

    const sessionScore = Object.fromEntries(players.map(p => [p.id, 0]));
    let timer = null, teardownKey = null;

    showAssign();

    /* ---------- Pantalla: asignar edades ---------- */
    function showAssign() {
      cleanup();
      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative">
        ${backBtn()}
        <div class="max-w-3xl mx-auto pt-16">
          <h1 class="text-3xl md:text-4xl font-display font-extrabold text-center text-violet-400 mb-1">🧠 Trivia del Patio</h1>
          <p class="text-center text-slate-300 mb-8">Asigna a cada jugador su nivel de preguntas:</p>
          <div class="space-y-3">
            ${players.map(p => `
              <div class="card p-4 flex flex-col md:flex-row md:items-center gap-3">
                <div class="flex items-center gap-2 font-bold text-lg flex-1"><span class="text-3xl">${p.avatar}</span> ${esc(p.name)}</div>
                <div class="grid grid-cols-3 gap-2" data-player="${p.id}">
                  ${bands.map(b => `
                    <button data-band="${b}" class="btn-press px-3 py-3 rounded-xl text-sm font-bold border-2 ${ageOf[p.id] === b ? 'bg-violet-500 border-violet-300' : 'bg-slate-800/60 border-slate-700'}">
                      ${AGE_LABELS[b].emoji} ${AGE_LABELS[b].label}
                    </button>`).join('')}
                </div>
              </div>`).join('')}
          </div>
          <p class="text-center text-slate-500 text-sm mt-4">Niña: pelis/animales · Ado: gaming/urbano · Adultos: Canal/historia/música nacional</p>
          <div class="text-center mt-8">
            <button data-start class="btn-press px-12 py-5 rounded-2xl bg-violet-500 text-white text-xl font-extrabold">▶️ Empezar Trivia</button>
          </div>
        </div>
      </div>`;

      $$('[data-player]').forEach(group => {
        const pid = group.getAttribute('data-player');
        group.querySelectorAll('[data-band]').forEach(btn => {
          btn.onclick = () => {
            ageOf[pid] = btn.getAttribute('data-band');
            group.querySelectorAll('[data-band]').forEach(b => {
              const on = b.getAttribute('data-band') === ageOf[pid];
              b.className = `btn-press px-3 py-3 rounded-xl text-sm font-bold border-2 ${on ? 'bg-violet-500 border-violet-300' : 'bg-slate-800/60 border-slate-700'}`;
            });
          };
        });
      });
      $('[data-start]').onclick = beginRounds;
    }

    /* ---------- Secuencia de turnos ---------- */
    let turns = [];
    let turnIdx = 0;
    function beginRounds() {
      turns = [];
      for (let r = 0; r < cfg.rounds; r++) players.forEach(p => turns.push(p));
      turnIdx = 0;
      askNext();
    }

    function askNext() {
      cleanup();
      if (turnIdx >= turns.length) return showFinal();
      const p = turns[turnIdx];
      const age = ageOf[p.id];
      const Q = nextQuestion(age);
      let answered = false;

      // Opciones barajadas manteniendo el índice correcto
      const opts = shuffle(Q.options.map((text, i) => ({ text, correct: i === Q.correct })));

      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative flex flex-col">
        ${backBtn()}
        <div class="flex items-center justify-between pt-12 max-w-4xl mx-auto w-full">
          <div class="flex items-center gap-2 font-bold text-lg"><span class="text-3xl">${p.avatar}</span> ${esc(p.name)}
            <span class="ml-2 text-xs px-2 py-1 rounded-lg bg-violet-500/30">${AGE_LABELS[age].emoji} ${AGE_LABELS[age].label}</span>
          </div>
          <div id="tv-timer" class="text-5xl md:text-6xl font-display font-extrabold">${time}</div>
        </div>

        <div class="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
          <div class="card p-6 md:p-10 mb-6 text-center">
            <p class="text-xs uppercase tracking-widest text-violet-300 mb-3">${esc(Q.cat)}</p>
            <p class="text-2xl md:text-3xl font-display font-bold leading-tight">${esc(Q.q)}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3" id="tv-opts">
            ${opts.map((o, i) => `
              <button data-opt="${i}" class="selectable text-left px-5 py-5 rounded-2xl bg-slate-800/70 border-2 border-slate-700 hover:border-violet-400 text-lg font-bold flex items-center gap-3">
                <span class="w-9 h-9 grid place-items-center rounded-lg bg-violet-500/30 font-extrabold shrink-0">${LETTERS[i]}</span>
                <span>${esc(o.text)}</span>
              </button>`).join('')}
          </div>
          <p class="text-center text-slate-500 text-sm mt-4">Responde con el mouse o teclas A/B/C/D (o 1-4)</p>
        </div>
      </div>`;

      const timerEl = $('#tv-timer');

      timer = makeTimer(time, {
        dangerAt: 5,
        onTick: (r) => { timerEl.textContent = r; paintTimer(timerEl, r, 5); },
        onEnd: () => { if (!answered) reveal(-1); },
      });

      function reveal(chosenIdx) {
        if (answered) return;
        answered = true;
        if (timer) timer.stop();
        const remaining = timer ? Math.max(0, timer.remaining) : 0;
        const buttons = $$('#tv-opts [data-opt]');
        let gotIt = false;

        buttons.forEach((b, i) => {
          b.disabled = true;
          if (opts[i].correct) {
            b.className = b.className.replace(/bg-slate-800\/70|border-slate-700/g, '') + ' bg-emerald-500/80 border-2 border-emerald-300';
          } else if (i === chosenIdx) {
            b.className = b.className.replace(/bg-slate-800\/70|border-slate-700/g, '') + ' bg-rose-600/80 border-2 border-rose-300 animate-shake';
          } else {
            b.classList.add('opacity-40');
          }
        });

        if (chosenIdx >= 0 && opts[chosenIdx].correct) {
          gotIt = true;
          const pts = 100 + remaining * 5;
          sessionScore[p.id] += pts;
          api.addPoints(p.id, pts);
          sfx.good(); confettiBurst();
          toast(`¡Correcto! +${pts} pts`, 'ok');
        } else if (chosenIdx === -1) {
          sfx.buzz(); toast('¡Se acabó el tiempo! ⏰', 'bad');
        } else {
          sfx.bad(); toast('Incorrecto 😅', 'bad');
        }

        // Botón continuar
        const cont = document.createElement('div');
        cont.className = 'text-center mt-6';
        cont.innerHTML = `<button data-next class="btn-press px-10 py-4 rounded-2xl ${gotIt ? 'bg-emerald-500' : 'bg-slate-700'} text-white text-xl font-extrabold">${turnIdx + 1 >= turns.length ? '🏁 Resultados' : '➡️ Siguiente'}</button>`;
        $('#tv-opts').after(cont);
        cont.querySelector('[data-next]').onclick = () => { turnIdx++; askNext(); };
      }

      $$('#tv-opts [data-opt]').forEach(b => {
        b.onclick = () => reveal(Number(b.getAttribute('data-opt')));
      });

      function onKey(e) {
        if (answered) {
          if (e.key === 'Enter' || e.code === 'Space') { e.preventDefault(); const n = $('[data-next]'); if (n) n.click(); }
          return;
        }
        const k = e.key.toUpperCase();
        let idx = -1;
        if (['A', 'B', 'C', 'D'].includes(k)) idx = ['A', 'B', 'C', 'D'].indexOf(k);
        else if (['1', '2', '3', '4'].includes(k)) idx = Number(k) - 1;
        else if (e.key === 'Escape') { api.exit(); return; }
        if (idx >= 0 && idx < opts.length) { e.preventDefault(); reveal(idx); }
      }
      document.addEventListener('keydown', onKey);
      teardownKey = () => document.removeEventListener('keydown', onKey);
    }

    /* ---------- Final ---------- */
    function showFinal() {
      cleanup();
      api.logGame(triviaGame.name, 'Ronda completada');
      const ranking = players.map(p => ({ ...p, s: sessionScore[p.id] })).sort((a, b) => b.s - a.s);
      const top = ranking[0];
      if (top.s > 0) { sfx.win(); confettiBig(2500); }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-violet-400 mb-2">¡Fin de la Trivia! 🧠</h1>
        <p class="text-slate-300 mb-6">Más sabido de la ronda: <b>${esc(top.name)}</b> ${top.avatar}</p>
        <div class="card p-6 w-full max-w-md mb-8 text-left space-y-2">
          ${ranking.map((r, i) => `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-violet-500/20 ring-1 ring-violet-400' : 'bg-slate-800/50'}">
              <span class="font-bold">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <span class="font-extrabold text-violet-300">${r.s} pts</span>
            </div>`).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-violet-500 text-white text-lg font-extrabold">🔁 Otra vez</button>
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
