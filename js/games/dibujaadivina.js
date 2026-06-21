/* ===========================================================
   games/dibujaadivina.js — DIBUJA Y ADIVINA (papel y lápiz real)
   La app SOLO da la palabra. Modos: Individual y Equipos.
   El dibujante elige la categoría. El operador marca resultados.
   =========================================================== */
import { DIBUJAADIVINA, DIBUJAADIVINA_CONFIG } from '../data/dibujaadivina.js';
import { $, $$, esc, shuffle, makeTimer, paintTimer, confettiBurst, confettiBig, sfx, toast, backBtn, ageAssignScreen, AGE_LABELS } from '../ui.js';
import { drawNext } from '../memory.js';

// Largo máximo de palabra según la edad del dibujante
const MAXLEN = { nina: 6, ado: 10, adulto: 99 };

export const dibujaAdivinaGame = {
  ...DIBUJAADIVINA_CONFIG,
  config: [
    { key: 'mode', label: 'Modalidad', type: 'select', default: 'individual', options: [
      { value: 'individual', label: 'Individual (todos vs dibujante)' },
      { value: 'equipos', label: 'Equipos (Azul vs Rojo)' },
    ] },
    { key: 'time', label: 'Segundos para dibujar', type: 'number', min: 30, max: 120, step: 10, default: 60 },
    { key: 'rounds', label: 'Rondas por jugador/equipo', type: 'number', min: 1, max: 6, step: 1, default: 2 },
    { key: 'points', label: 'Puntos por adivinar', type: 'number', min: 50, max: 200, step: 25, default: 100 },
  ],

  start(root, players, cfg, api) {
    const points = cfg.points, time = cfg.time;
    const mode = cfg.mode === 'equipos' ? 'equipos' : 'individual';
    const cats = [...new Set(DIBUJAADIVINA.map(d => d.cat))];
    const poolByCat = {}; cats.forEach(c => poolByCat[c] = DIBUJAADIVINA.filter(d => d.cat === c));
    const sessionScore = Object.fromEntries(players.map(p => [p.id, 0]));
    const teams = { A: [], B: [] };
    const ageOf = {};
    let timer = null, teardownKey = null;
    let indivTurns = [], turnIdx = 0, totalTurns = 0;

    // 1) Asignar edad (ajusta la dificultad de la palabra al dibujante)
    ageAssignScreen(root, players, ageOf, {
      title: 'Dibuja y Adivina: nivel de cada jugador', color: 'yellow', emoji: '✏️',
      intro: 'Palabras fáciles para la niña; más difíciles para los mayores.',
      onStart: () => { if (mode === 'equipos') teamAssign(); else startIndividual(); },
    });

    /* ---------- Asignar equipos ---------- */
    function teamAssign() {
      const sel = {}; players.forEach((p, i) => sel[p.id] = i % 2 === 0 ? 'A' : 'B');
      const render = () => {
        root.innerHTML = `
        <div class="min-h-screen p-4 md:p-8 relative">
          ${backBtn('← Menú')}
          <div class="max-w-2xl mx-auto pt-16">
            <h1 class="text-3xl md:text-4xl font-display font-extrabold text-center text-yellow-300 mb-1">✏️ Equipos</h1>
            <p class="text-center text-slate-300 mb-6">Asigna cada jugador a su equipo:</p>
            <div class="space-y-3">
              ${players.map(p => `
                <div class="card p-4 flex items-center gap-3">
                  <div class="flex items-center gap-2 font-bold text-lg flex-1"><span class="text-3xl">${p.avatar}</span> ${esc(p.name)}</div>
                  <div class="grid grid-cols-2 gap-2" data-player="${p.id}">
                    <button data-team="A" class="btn-press px-4 py-2 rounded-xl font-bold border-2 ${sel[p.id] === 'A' ? 'bg-blue-500 border-blue-300' : 'bg-slate-800/60 border-slate-700'}">🔵 Azul</button>
                    <button data-team="B" class="btn-press px-4 py-2 rounded-xl font-bold border-2 ${sel[p.id] === 'B' ? 'bg-rose-500 border-rose-300' : 'bg-slate-800/60 border-slate-700'}">🔴 Rojo</button>
                  </div>
                </div>`).join('')}
            </div>
            <div class="text-center mt-8">
              <button data-start class="btn-press px-12 py-5 rounded-2xl bg-yellow-400 text-slate-900 text-xl font-extrabold">▶️ Empezar</button>
            </div>
          </div>
        </div>`;
        $$('[data-player]').forEach(g => {
          const pid = g.getAttribute('data-player');
          g.querySelectorAll('[data-team]').forEach(b => b.onclick = () => { sel[pid] = b.getAttribute('data-team'); render(); sfx.tick(); });
        });
        $('[data-start]').onclick = () => {
          teams.A = players.filter(p => sel[p.id] === 'A');
          teams.B = players.filter(p => sel[p.id] === 'B');
          if (!teams.A.length || !teams.B.length) { toast('Cada equipo necesita al menos 1 jugador', 'warn'); return; }
          totalTurns = cfg.rounds * 2; turnIdx = 0; nextTurn();
        };
      };
      render();
    }

    function startIndividual() {
      indivTurns = [];
      for (let r = 0; r < cfg.rounds; r++) players.forEach(p => indivTurns.push(p));
      totalTurns = indivTurns.length; turnIdx = 0; nextTurn();
    }

    function currentInfo() {
      if (mode === 'individual') return { drawer: indivTurns[turnIdx], team: null };
      const t = turnIdx % 2 === 0 ? 'A' : 'B';
      const arr = teams[t];
      return { drawer: arr[Math.floor(turnIdx / 2) % arr.length], team: t };
    }

    /* ---------- Flujo del turno ---------- */
    function nextTurn() {
      cleanup();
      if (turnIdx >= totalTurns) return showFinal();
      const { drawer, team } = currentInfo();
      pickCategory(drawer, team);
    }

    function pickCategory(drawer, team) {
      const teamTxt = team ? (team === 'A' ? ' · 🔵 Equipo Azul' : ' · 🔴 Equipo Rojo') : '';
      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative">
        ${backBtn()}
        <div class="max-w-2xl mx-auto pt-14 text-center">
          <p class="uppercase tracking-widest text-yellow-300 font-bold text-sm">Dibuja${esc(teamTxt)}</p>
          <div class="text-7xl my-3 animate-float">${drawer.avatar}</div>
          <h1 class="text-3xl md:text-5xl font-display font-extrabold text-yellow-200 mb-1">${esc(drawer.name)}, dibujas tú</h1>
          <p class="text-slate-400 mb-3">${AGE_LABELS[ageOf[drawer.id]].emoji} Nivel ${AGE_LABELS[ageOf[drawer.id]].tip.toLowerCase()}</p>
          <p class="text-slate-300 mb-6">✍️ Busca <b>papel y lápiz</b>. Elige una categoría:</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            ${cats.map(c => `<button data-cat="${esc(c)}" class="btn-press px-4 py-5 rounded-2xl bg-slate-800/70 border border-yellow-500/30 hover:border-yellow-400 font-bold">${esc(c)}</button>`).join('')}
          </div>
        </div>
      </div>`;
      $$('[data-cat]').forEach(b => b.onclick = () => {
        const cat = b.getAttribute('data-cat');
        // Filtra por la edad del dibujante (clave compartida: nadie repite lo ya visto)
        const maxLen = MAXLEN[ageOf[drawer.id]] || 99;
        let cpool = poolByCat[cat].filter(w => w.word.replace(/\s/g, '').length <= maxLen);
        if (!cpool.length) cpool = poolByCat[cat];
        const item = drawNext('dibujaadivina:' + cat, cpool, w => w.word) || cpool[0];
        secretWord(drawer, team, cat, item);
      });
    }

    function secretWord(drawer, team, cat, item) {
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <p class="uppercase tracking-widest text-yellow-300 font-bold text-sm mb-2">Categoría: ${esc(cat)}</p>
        <p class="text-2xl font-bold text-rose-400 mb-5 animate-pulse-fast">🙈 ¡Solo ${esc(drawer.name)} debe mirar!</p>
        <div class="card p-8 mb-6">
          <p class="text-slate-400 text-sm mb-2">Tu palabra para dibujar es:</p>
          <p class="text-4xl md:text-6xl font-display font-extrabold text-yellow-200">${esc(item.word)}</p>
        </div>
        <button data-go class="btn-press px-12 py-5 rounded-2xl bg-yellow-400 text-slate-900 text-xl font-extrabold">Ocultar y empezar a dibujar ✏️</button>
      </div>`;
      $('[data-go]').onclick = () => drawingPhase(drawer, team, cat, item);
    }

    function drawingPhase(drawer, team, cat, item) {
      const teamTxt = team ? (team === 'A' ? '🔵 Equipo Azul adivina' : '🔴 Equipo Rojo adivina') : 'Todos adivinan';
      root.innerHTML = `
      <div class="min-h-screen flex flex-col p-4 md:p-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-2xl md:text-3xl font-display font-extrabold text-yellow-200"><span class="text-4xl">${drawer.avatar}</span> ${esc(drawer.name)} dibuja</div>
          <div id="da-timer" class="text-5xl md:text-6xl font-display font-extrabold">${time}</div>
        </div>
        <div class="flex-1 flex flex-col items-center justify-center text-center gap-3">
          <div class="text-8xl animate-float">✏️🎨</div>
          <p class="text-2xl font-bold text-slate-200">${esc(teamTxt)}</p>
          <p class="text-slate-400">Categoría: <b class="text-yellow-300">${esc(cat)}</b> · ¡a dibujar en el papel!</p>
        </div>
        <div class="grid grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
          <button data-yes class="btn-press py-7 rounded-3xl bg-emerald-500 text-white text-2xl md:text-3xl font-extrabold">✅ ¡Adivinaron!</button>
          <button data-no class="btn-press py-7 rounded-3xl bg-slate-700 text-white text-2xl md:text-3xl font-extrabold">⏰ Nadie / Tiempo</button>
        </div>
      </div>`;
      const timerEl = $('#da-timer');
      let resolved = false;
      function resolve(guessed) {
        if (resolved) return; resolved = true;
        if (timer) timer.stop();
        if (mode === 'individual') {
          if (guessed) return askWhoGuessed(drawer, item);
          sfx.buzz(); return afterScore(drawer, item, null);
        }
        // equipos
        if (guessed) {
          teams[team].forEach(m => { sessionScore[m.id] += points; api.addPoints(m.id, points); });
          sfx.good(); confettiBurst();
        } else sfx.buzz();
        afterScore(drawer, item, guessed ? team : null);
      }
      $('[data-yes]').onclick = () => resolve(true);
      $('[data-no]').onclick = () => resolve(false);
      timer = makeTimer(time, {
        dangerAt: 5,
        onTick: (r) => { timerEl.textContent = r; paintTimer(timerEl, r, 5); },
        onEnd: () => resolve(false),
      });
    }

    function askWhoGuessed(drawer, item) {
      cleanup();
      const others = players.filter(p => p.id !== drawer.id);
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 class="text-3xl md:text-4xl font-display font-extrabold text-yellow-200 mb-1">¿Quién adivinó?</h2>
        <p class="text-slate-400 mb-6">La palabra era <b class="text-yellow-300">${esc(item.word)}</b></p>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl w-full mb-4">
          ${others.map(o => `<button data-who="${o.id}" class="btn-press px-4 py-5 rounded-2xl bg-slate-800/70 border border-yellow-500/30 hover:border-yellow-400 font-bold flex flex-col items-center gap-1"><span class="text-3xl">${o.avatar}</span> ${esc(o.name)}</button>`).join('')}
        </div>
        <button data-who="" class="btn-press px-8 py-3 rounded-2xl bg-slate-700 font-bold">🤷 Nadie</button>
      </div>`;
      $$('[data-who]').forEach(b => b.onclick = () => {
        const id = b.getAttribute('data-who');
        if (id) {
          const guesser = players.find(p => p.id === id);
          sessionScore[guesser.id] += points; api.addPoints(guesser.id, points);
          const bonus = Math.round(points / 2);
          sessionScore[drawer.id] += bonus; api.addPoints(drawer.id, bonus);
          sfx.good(); confettiBurst();
          afterScore(drawer, item, guesser);
        } else { sfx.pass(); afterScore(drawer, item, null); }
      });
    }

    function afterScore(drawer, item, winnerInfo) {
      cleanup();
      turnIdx++;
      let msg = '';
      if (mode === 'individual') {
        msg = winnerInfo ? `${esc(winnerInfo.name)} adivinó (+${points}) · ${esc(drawer.name)} +${Math.round(points / 2)}` : 'Nadie adivinó esta vez 😅';
      } else {
        msg = winnerInfo ? `${winnerInfo === 'A' ? '🔵 Equipo Azul' : '🔴 Equipo Rojo'} adivinó (+${points} c/u)` : 'No adivinaron 😅';
      }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <div class="text-7xl mb-3">${winnerInfo ? '🎉' : '😅'}</div>
        <p class="text-slate-300 mb-1">La palabra era</p>
        <p class="text-3xl font-display font-extrabold text-yellow-300 mb-4">${esc(item.word)}</p>
        <p class="text-xl font-bold mb-8">${msg}</p>
        <button data-next class="btn-press px-10 py-5 rounded-2xl bg-yellow-400 text-slate-900 text-xl font-extrabold">${turnIdx >= totalTurns ? '🏁 Ver resultados' : '➡️ Siguiente'}</button>
      </div>`;
      $('[data-next]').onclick = nextTurn;
    }

    function showFinal() {
      cleanup();
      api.logGame(dibujaAdivinaGame.name, mode === 'equipos' ? 'Equipos' : 'Individual');
      const ranking = players.map(p => ({ ...p, s: sessionScore[p.id] })).sort((a, b) => b.s - a.s);
      if (api.result) { api.result(ranking); return; }
      if (ranking[0].s > 0) { sfx.win(); confettiBig(2500); }

      let teamBlock = '';
      if (mode === 'equipos') {
        const sA = teams.A.reduce((s, m) => s + sessionScore[m.id], 0);
        const sB = teams.B.reduce((s, m) => s + sessionScore[m.id], 0);
        const win = sA === sB ? '¡Empate!' : (sA > sB ? '🔵 ¡Gana el Equipo Azul!' : '🔴 ¡Gana el Equipo Rojo!');
        teamBlock = `<div class="card p-5 mb-6 text-center"><p class="text-2xl font-display font-extrabold mb-1">${win}</p><p class="text-slate-300">🔵 ${sA} pts · 🔴 ${sB} pts</p></div>`;
      }
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-yellow-300 mb-4">¡Fin de Dibuja y Adivina! ✏️</h1>
        ${teamBlock}
        <div class="card p-6 w-full max-w-md mb-8 text-left space-y-2">
          ${ranking.map((r, i) => `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-yellow-400/20 ring-1 ring-yellow-300' : 'bg-slate-800/50'}">
              <span class="font-bold">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <span class="font-extrabold text-yellow-300">${r.s} pts</span>
            </div>`).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-yellow-400 text-slate-900 text-lg font-extrabold">🔁 Otra vez</button>
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
