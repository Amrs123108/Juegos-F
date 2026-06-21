/* ===========================================================
   games/agilidadmental.js — AGILIDAD MENTAL
   Por turnos, 4 bandas de edad, 7 tipos de pregunta.
   Anti-repetición via drawNext. Compatible con Noche Familiar.
   =========================================================== */
import { AGILIDAD, AGILIDAD_CONFIG, BANDAS, PTS } from '../data/agilidadmental.js';
import {
  $, esc, shuffle, makeTimer, paintTimer, confettiBurst, confettiBig, sfx, toast, backBtn,
} from '../ui.js';
import { drawNext } from '../memory.js';

const norm = s =>
  String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

function tipoBadge(tipo) {
  return { calculo:'🔢 Cálculo', acertijo:'🧩 Acertijo', completar:'🔡 Completar',
           logica:'💡 Lógica', lenguaje:'🔤 Lenguaje', similares:'🔎 Similares',
           memoria:'🧠 Memoria' }[tipo] || tipo;
}

export const agilidadMentalGame = {
  ...AGILIDAD_CONFIG,
  config: [
    { key: 'rounds', label: 'Preguntas por jugador', type: 'number', min: 2, max: 10, step: 1, default: 5 },
  ],

  start(root, players, cfg, api) {
    const ageOf  = Object.fromEntries(players.map(p => [p.id, 'junior']));
    const score  = Object.fromEntries(players.map(p => [p.id, 0]));
    const stats  = Object.fromEntries(players.map(p => [p.id, { ok: 0, total: 0 }]));
    let timer = null, offKey = null;

    // ─── SELECCIÓN DE EDAD ────────────────────────────────
    showAgeSelect();

    function showAgeSelect() {
      cleanup();
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        ${backBtn()}
        <div class="pt-14 text-center mb-6">
          <div class="text-6xl mb-2">🧠</div>
          <h1 class="text-4xl font-display font-extrabold text-fuchsia-300">Agilidad Mental</h1>
          <p class="text-slate-400 mt-1">Elige la banda de edad de cada jugador</p>
        </div>
        <div class="card p-6 w-full max-w-2xl space-y-4">
          ${players.map(p => `
            <div class="flex flex-wrap items-center gap-3" data-pid="${p.id}">
              <span class="text-3xl shrink-0">${p.avatar}</span>
              <span class="font-bold text-lg flex-1 min-w-[6rem]">${esc(p.name)}</span>
              <div class="flex flex-wrap gap-2">
                ${Object.entries(BANDAS).map(([k, b]) => `
                  <button data-age="${k}" data-for="${p.id}"
                    class="btn-press px-3 py-2 rounded-xl border-2 text-sm font-bold
                    ${k === 'junior' ? 'bg-fuchsia-600 border-fuchsia-300' : 'bg-slate-800/60 border-slate-700'}">
                    ${b.emoji} ${b.label}
                  </button>`).join('')}
              </div>
            </div>`).join('')}
        </div>
        <button id="ag-go" class="btn-press mt-6 px-12 py-5 rounded-2xl bg-fuchsia-500 text-white text-xl font-extrabold">▶️ ¡Comenzar!</button>
      </div>`;

      root.addEventListener('click', function ageClick(e) {
        const btn = e.target.closest('[data-age]');
        if (!btn) return;
        const pid = btn.getAttribute('data-for');
        const age = btn.getAttribute('data-age');
        ageOf[pid] = age;
        const row = root.querySelector(`[data-pid="${pid}"]`);
        row.querySelectorAll('[data-age]').forEach(b => {
          const on = b.getAttribute('data-age') === age;
          b.className = `btn-press px-3 py-2 rounded-xl border-2 text-sm font-bold ${on ? 'bg-fuchsia-600 border-fuchsia-300' : 'bg-slate-800/60 border-slate-700'}`;
        });
        sfx.tick();
      });

      root.querySelector('#ag-go').onclick = beginGame;
    }

    // ─── QUEUE DE TURNOS ──────────────────────────────────
    let turns = [], turnIdx = 0;

    function beginGame() {
      turns = [];
      for (let r = 0; r < cfg.rounds; r++) players.forEach(p => turns.push(p));
      turnIdx = 0;
      nextTurn();
    }

    function nextTurn() {
      cleanup();
      if (turnIdx >= turns.length) return showFinal();
      const p = turns[turnIdx];
      const edad  = ageOf[p.id] || 'junior';
      const banda = BANDAS[edad];
      const vuelta = Math.floor(turnIdx / players.length) + 1;
      const pool = AGILIDAD.filter(q => q.edad === edad);
      const item = drawNext(`agilidad:${edad}`, pool, q => q.q) || pool[0];
      if (!item) { turnIdx++; return nextTurn(); }
      stats[p.id].total++;
      renderQuestion(p, item, banda, vuelta);
    }

    // ─── HEADER COMÚN ─────────────────────────────────────
    function hdr(p, banda, vuelta, initTime) {
      return `
        <div class="flex items-center justify-between pt-12 max-w-3xl mx-auto w-full mb-4">
          <div class="flex items-center gap-2 font-display font-extrabold text-xl md:text-3xl text-fuchsia-300">
            <span class="text-4xl">${p.avatar}</span> ${esc(p.name)}
            <span class="ml-2 text-xs font-body px-2 py-1 rounded-lg bg-fuchsia-500/30 text-fuchsia-100 self-center">${banda.emoji} Vuelta ${vuelta}</span>
          </div>
          <div id="ag-t" class="text-5xl md:text-6xl font-display font-extrabold">${initTime}</div>
        </div>`;
    }

    // ─── DESPACHADOR DE TIPO ──────────────────────────────
    function renderQuestion(p, item, banda, vuelta) {
      if (item.tipo === 'memoria')   return renderMemoria(p, item, banda, vuelta);
      if (item.tipo === 'similares') return renderSimilares(p, item, banda, vuelta);
      if (item.opciones)             return renderMC(p, item, banda, vuelta);
      return renderTexto(p, item, banda, vuelta);
    }

    // ─── TEXTO LIBRE ──────────────────────────────────────
    function renderTexto(p, item, banda, vuelta) {
      const T = banda.tiempo;
      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative flex flex-col">
        ${backBtn()}
        ${hdr(p, banda, vuelta, T)}
        <div class="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full">
          <p class="uppercase tracking-widest text-fuchsia-400 font-bold text-sm mb-3">${tipoBadge(item.tipo)}</p>
          <div class="card p-6 md:p-10 w-full text-center mb-6">
            <p class="text-2xl md:text-3xl font-display font-bold text-white leading-snug">${esc(item.q)}</p>
          </div>
          <input id="ag-inp" type="text" autocomplete="off" maxlength="60" placeholder="Escribe tu respuesta…"
            class="w-full max-w-md text-center bg-slate-800 border-2 border-fuchsia-500/50 focus:border-fuchsia-400
                   rounded-2xl px-5 py-4 text-2xl font-bold outline-none mb-4" />
          <div class="flex gap-3">
            <button data-ok class="btn-press px-8 py-4 rounded-2xl bg-fuchsia-500 text-white text-xl font-extrabold">Responder ✓</button>
            <button data-skip class="btn-press px-6 py-4 rounded-2xl bg-slate-700 text-white text-xl font-extrabold">Pasar</button>
          </div>
        </div>
      </div>`;

      const inp = root.querySelector('#ag-inp'); inp.focus();
      const tEl = root.querySelector('#ag-t');
      let done = false, t0 = Date.now();

      function check() {
        if (done) return;
        const v = norm(inp.value);
        if (!v) { toast('Escribe algo primero 😉', 'warn'); return; }
        const alts = [norm(item.r), ...(item.alt || []).map(norm)];
        if (alts.includes(v)) {
          done = true; if (timer) timer.stop();
          const pts = ((Date.now() - t0) / 1000) <= T / 2 ? PTS.rapido : PTS.correcto;
          score[p.id] += pts; stats[p.id].ok++;
          api.addPoints(p.id, pts);
          sfx.good(); confettiBurst();
          feedback(true, pts, item.r);
        } else {
          inp.classList.add('animate-shake'); sfx.bad();
          toast('Incorrecto, intenta de nuevo', 'bad');
          setTimeout(() => inp.classList.remove('animate-shake'), 500);
        }
      }

      root.querySelector('[data-ok]').onclick = check;
      root.querySelector('[data-skip]').onclick = () => {
        if (done) return; done = true; if (timer) timer.stop(); feedback(false, 0, item.r);
      };
      bindKey(e => { if (e.key === 'Enter') { e.preventDefault(); check(); } });

      timer = makeTimer(T, {
        dangerAt: 3,
        onTick:  r => { tEl.textContent = r; paintTimer(tEl, r, 3); },
        onEnd:   () => { if (!done) { done = true; sfx.buzz(); feedback(false, 0, item.r); } },
      });
    }

    // ─── MULTIPLE CHOICE ──────────────────────────────────
    function renderMC(p, item, banda, vuelta) {
      const T = banda.tiempo;
      const opts = shuffle([...item.opciones]);
      const correctIdx = opts.indexOf(item.opciones[0]);

      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative flex flex-col">
        ${backBtn()}
        ${hdr(p, banda, vuelta, T)}
        <div class="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full">
          <p class="uppercase tracking-widest text-fuchsia-400 font-bold text-sm mb-3">${tipoBadge(item.tipo)}</p>
          <div class="card p-6 md:p-8 w-full text-center mb-6">
            <p class="text-xl md:text-2xl font-display font-bold text-white leading-snug">${esc(item.q)}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
            ${opts.map((op, i) => `
              <button data-opt="${i}" class="btn-press p-5 rounded-2xl bg-slate-800 border-2 border-slate-600
                hover:border-fuchsia-400 text-left font-bold text-lg transition-all">
                <span class="text-fuchsia-400 font-extrabold mr-2">${['A','B','C','D'][i]}.</span>${esc(op)}
              </button>`).join('')}
          </div>
        </div>
      </div>`;

      const tEl = root.querySelector('#ag-t');
      let done = false, t0 = Date.now();

      root.querySelectorAll('[data-opt]').forEach(btn => {
        btn.onclick = () => {
          if (done) return; done = true; if (timer) timer.stop();
          const chose = Number(btn.getAttribute('data-opt'));
          const ok = chose === correctIdx;
          root.querySelectorAll('[data-opt]').forEach((b, i) => {
            if (i === correctIdx) b.classList.add('!bg-emerald-600', '!border-emerald-400');
            else if (i === chose && !ok) b.classList.add('!bg-rose-700', '!border-rose-400');
          });
          if (ok) {
            const pts = ((Date.now() - t0) / 1000) <= T / 2 ? PTS.rapido : PTS.correcto;
            score[p.id] += pts; stats[p.id].ok++;
            api.addPoints(p.id, pts);
            sfx.good(); confettiBurst();
            setTimeout(() => feedback(true, pts, opts[correctIdx]), 700);
          } else {
            sfx.bad();
            setTimeout(() => feedback(false, 0, opts[correctIdx]), 700);
          }
        };
      });
      bindKey(() => {});

      timer = makeTimer(T, {
        dangerAt: 3,
        onTick:  r => { tEl.textContent = r; paintTimer(tEl, r, 3); },
        onEnd:   () => {
          if (!done) {
            done = true;
            root.querySelectorAll('[data-opt]').forEach((b, i) => {
              if (i === correctIdx) b.classList.add('!bg-emerald-600', '!border-emerald-400');
            });
            sfx.buzz();
            setTimeout(() => feedback(false, 0, opts[correctIdx]), 700);
          }
        },
      });
    }

    // ─── SIMILARES ────────────────────────────────────────
    function renderSimilares(p, item, banda, vuelta) {
      const T = banda.tiempo * 3;
      const validList = item.r.map(norm);
      const min = item.min || 3;
      const found = [];

      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative flex flex-col">
        ${backBtn()}
        ${hdr(p, banda, vuelta, T)}
        <div class="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full">
          <p class="uppercase tracking-widest text-fuchsia-400 font-bold text-sm mb-2">🔎 Similares — nombra ${min} o más</p>
          <div class="card p-5 w-full text-center mb-4">
            <p class="text-xl md:text-2xl font-display font-bold text-white">${esc(item.q)}</p>
          </div>
          <div id="ag-tags" class="flex flex-wrap gap-2 w-full min-h-[3rem] mb-4 p-3 bg-slate-800/60 rounded-2xl border-2 border-slate-600">
            <span class="text-slate-500 text-sm self-center" id="ag-ph">Tus respuestas aparecen aquí…</span>
          </div>
          <p class="text-slate-400 text-sm mb-2">Válidas: <span id="ag-cnt" class="font-bold text-fuchsia-300">0</span> / ${min} necesarias</p>
          <div class="flex gap-2 w-full max-w-md">
            <input id="ag-sinp" type="text" autocomplete="off" maxlength="40" placeholder="Una respuesta y ENTER…"
              class="flex-1 bg-slate-800 border-2 border-fuchsia-500/50 focus:border-fuchsia-400
                     rounded-2xl px-4 py-3 text-lg font-bold outline-none" />
            <button data-add class="btn-press px-5 py-3 rounded-2xl bg-fuchsia-500 text-white font-extrabold text-lg">+</button>
          </div>
          <button id="ag-listo" class="btn-press mt-4 px-8 py-4 rounded-2xl bg-slate-700 text-white text-lg font-extrabold opacity-40 cursor-not-allowed" disabled>
            ✅ ¡Listo!
          </button>
        </div>
      </div>`;

      const sinp = root.querySelector('#ag-sinp'); sinp.focus();
      const tagsEl = root.querySelector('#ag-tags');
      const cntEl  = root.querySelector('#ag-cnt');
      const listoBtn = root.querySelector('#ag-listo');
      const tEl = root.querySelector('#ag-t');
      let done = false, t0 = Date.now();

      function addOne() {
        const raw = sinp.value.trim();
        const v   = norm(raw);
        if (!v) return;
        sinp.value = '';
        if (found.some(f => f.v === v)) { toast('Ya la dijiste', 'warn'); return; }
        const ok = validList.some(vl => v === vl || v.includes(vl) || vl.includes(v));
        const ph = root.querySelector('#ag-ph');
        if (ph) ph.remove();
        const tag = document.createElement('span');
        tag.className = `px-3 py-1 rounded-xl text-sm font-bold ${ok ? 'bg-emerald-600 text-white' : 'bg-rose-700/70 text-white'}`;
        tag.textContent = (ok ? '✅ ' : '❌ ') + raw;
        tagsEl.appendChild(tag);
        if (ok) {
          found.push({ v });
          sfx.tick();
          cntEl.textContent = found.length;
          if (found.length >= min) {
            listoBtn.disabled = false;
            listoBtn.classList.remove('opacity-40', 'cursor-not-allowed');
            listoBtn.classList.add('animate-pulse-fast');
          }
        } else sfx.bad();
        sinp.focus();
      }

      function finalize() {
        if (done) return; done = true; if (timer) timer.stop();
        const pts = found.length >= min ? (found.length > min ? PTS.rapido : PTS.correcto) : 0;
        if (pts > 0) {
          score[p.id] += pts; stats[p.id].ok++;
          api.addPoints(p.id, pts);
          sfx.good(); confettiBurst();
        } else sfx.bad();
        feedback(pts > 0, pts, `${found.length} válidas de ${min} necesarias`);
      }

      root.querySelector('[data-add]').onclick = addOne;
      listoBtn.onclick = finalize;
      bindKey(e => { if (e.key === 'Enter') { e.preventDefault(); addOne(); } });

      timer = makeTimer(T, {
        dangerAt: 8,
        onTick:  r => { tEl.textContent = r; paintTimer(tEl, r, 8); },
        onEnd:   () => { if (!done) finalize(); },
      });
    }

    // ─── MEMORIA ──────────────────────────────────────────
    function renderMemoria(p, item, banda, vuelta) {
      const seq = item.secuencia;
      const T   = banda.tiempo + 3;

      // Fase 1: mostrar secuencia
      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative flex flex-col">
        ${backBtn()}
        <div class="flex items-center justify-between pt-12 max-w-3xl mx-auto w-full mb-4">
          <div class="flex items-center gap-2 font-display font-extrabold text-xl md:text-3xl text-fuchsia-300">
            <span class="text-4xl">${p.avatar}</span> ${esc(p.name)}
            <span class="ml-2 text-xs font-body px-2 py-1 rounded-lg bg-fuchsia-500/30 text-fuchsia-100 self-center">${banda.emoji} Vuelta ${vuelta}</span>
          </div>
        </div>
        <div class="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full">
          <p class="uppercase tracking-widest text-fuchsia-400 font-bold text-sm mb-6">🧠 Memoria — ¡Memoriza la secuencia!</p>
          <div id="ag-seq" class="flex flex-wrap gap-4 justify-center mb-6 min-h-24"></div>
          <p class="text-slate-400 text-sm">Observa bien… luego te preguntaremos</p>
        </div>
      </div>`;

      const seqEl = root.querySelector('#ag-seq');
      let i = 0;
      function showItem() {
        seqEl.innerHTML = '';
        if (i < seq.length) {
          const el = document.createElement('div');
          el.className = 'card px-8 py-6 text-5xl md:text-7xl font-display font-extrabold text-center animate-pop-in min-w-20';
          el.textContent = seq[i];
          seqEl.appendChild(el);
          sfx.tick(); i++;
          setTimeout(showItem, 1500);
        } else {
          seqEl.innerHTML = `<div class="text-6xl animate-pulse-fast">🤔</div>`;
          setTimeout(askMemoria, 900);
        }
      }
      showItem();

      function askMemoria() {
        root.innerHTML = `
        <div class="min-h-screen p-4 md:p-8 relative flex flex-col">
          ${backBtn()}
          ${hdr(p, banda, vuelta, T)}
          <div class="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full">
            <p class="uppercase tracking-widest text-fuchsia-400 font-bold text-sm mb-3">🧠 Memoria</p>
            <div class="card p-6 w-full text-center mb-6">
              <p class="text-xl md:text-2xl font-display font-bold text-white">${esc(item.q)}</p>
              <p class="text-slate-500 text-sm mt-2">Secuencia: ${seq.map(() => '?').join(' · ')}</p>
            </div>
            <input id="ag-minp" type="text" autocomplete="off" maxlength="40" placeholder="Tu respuesta…"
              class="w-full max-w-md text-center bg-slate-800 border-2 border-fuchsia-500/50 focus:border-fuchsia-400
                     rounded-2xl px-5 py-4 text-2xl font-bold outline-none mb-4" />
            <div class="flex gap-3">
              <button data-ok class="btn-press px-8 py-4 rounded-2xl bg-fuchsia-500 text-white text-xl font-extrabold">Responder ✓</button>
              <button data-skip class="btn-press px-6 py-4 rounded-2xl bg-slate-700 text-white text-xl font-extrabold">Pasar</button>
            </div>
          </div>
        </div>`;

        const minp = root.querySelector('#ag-minp'); minp.focus();
        const tEl  = root.querySelector('#ag-t');
        let done = false, t0 = Date.now();

        function checkMem() {
          if (done) return;
          const v = norm(minp.value);
          const alts = [norm(item.r), ...(item.alt || []).map(norm)];
          if (alts.includes(v)) {
            done = true; if (timer) timer.stop();
            const pts = ((Date.now() - t0) / 1000) <= T / 2 ? PTS.rapido : PTS.correcto;
            score[p.id] += pts; stats[p.id].ok++;
            api.addPoints(p.id, pts);
            sfx.good(); confettiBurst();
            feedback(true, pts, item.r);
          } else {
            minp.classList.add('animate-shake'); sfx.bad();
            setTimeout(() => minp.classList.remove('animate-shake'), 500);
          }
        }

        root.querySelector('[data-ok]').onclick = checkMem;
        root.querySelector('[data-skip]').onclick = () => {
          if (done) return; done = true; if (timer) timer.stop(); feedback(false, 0, item.r);
        };
        bindKey(e => { if (e.key === 'Enter') { e.preventDefault(); checkMem(); } });

        timer = makeTimer(T, {
          dangerAt: 3,
          onTick:  r => { tEl.textContent = r; paintTimer(tEl, r, 3); },
          onEnd:   () => { if (!done) { done = true; sfx.buzz(); feedback(false, 0, item.r); } },
        });
      }
    }

    // ─── FEEDBACK ─────────────────────────────────────────
    function feedback(ok, pts, answer) {
      cleanup();
      const p = turns[turnIdx];
      turnIdx++;
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <div class="text-7xl mb-3">${ok ? '✅' : '❌'}</div>
        <h2 class="text-3xl md:text-4xl font-display font-extrabold mb-1 ${ok ? 'text-fuchsia-400' : 'text-rose-400'}">
          ${ok ? (pts >= PTS.rapido ? '⚡ ¡Rapidísimo!' : '¡Correcto!') : '¡Incorrecto!'}
        </h2>
        <p class="text-slate-300 text-lg mb-1">Respuesta: <b class="text-white">${esc(String(answer))}</b></p>
        ${ok
          ? `<p class="text-2xl text-fuchsia-300 font-bold mb-6">+${pts} pt${pts !== 1 ? 's' : ''} para ${esc(p.name)}</p>`
          : `<p class="text-slate-400 mb-6">¡La próxima! 💪</p>`}
        <button data-next class="btn-press px-10 py-5 rounded-2xl bg-fuchsia-500 text-white text-xl font-extrabold">
          ${turnIdx >= turns.length ? '🏁 Ver resultados' : '➡️ Siguiente'}
        </button>
      </div>`;
      root.querySelector('[data-next]').onclick = nextTurn;
    }

    // ─── RESULTADOS ───────────────────────────────────────
    function showFinal() {
      cleanup();
      api.logGame(agilidadMentalGame.name, `${cfg.rounds} preguntas`);
      const ranking = players.map(p => ({
        ...p,
        s:      score[p.id],
        ok:     stats[p.id].ok,
        total:  stats[p.id].total,
      })).sort((a, b) => b.s - a.s);

      if (api.result) { api.result(ranking); return; }

      const top = ranking[0];
      const pct = top.total ? Math.round((top.ok / top.total) * 100) : 0;
      const msg = pct >= 90 ? '¡Mente brillante! 🌟'
                : pct >= 70 ? '¡Muy ágil! 💪'
                : pct >= 50 ? '¡Bien! Sigue practicando 👍'
                :             '¡La mente se entrena! 🧠';
      if (top.s > 0) { sfx.win(); confettiBig(2500); }

      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-fuchsia-400 mb-1">¡Fin de Agilidad Mental! 🧠</h1>
        <p class="text-slate-300 mb-6">${esc(msg)}</p>
        <div class="card p-6 w-full max-w-lg mb-8 text-left space-y-3">
          ${ranking.map((r, i) => {
            const acc = r.total ? Math.round((r.ok / r.total) * 100) : 0;
            return `
            <div class="flex items-center justify-between px-4 py-3 rounded-xl ${i === 0 ? 'bg-fuchsia-500/20 ring-1 ring-fuchsia-400' : 'bg-slate-800/50'}">
              <span class="font-bold flex items-center gap-2">${['🥇','🥈','🥉'][i] || '▫️'} ${r.avatar} ${esc(r.name)}</span>
              <div class="text-right">
                <div class="font-extrabold text-fuchsia-300 text-xl">${r.s} pts</div>
                <div class="text-xs text-slate-400">${r.ok}/${r.total} correctas · ${acc}%</div>
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay"      class="btn-press px-8 py-4 rounded-2xl bg-fuchsia-500 text-white text-lg font-extrabold">🔁 Otra vez</button>
          <button data-action="scoreboard"  class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-lg font-extrabold">🏅 Tablero</button>
          <button data-action="home"        class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-lg font-extrabold">🏠 Menú</button>
        </div>
      </div>`;
    }

    // ─── HELPERS ──────────────────────────────────────────
    function bindKey(fn) {
      if (offKey) offKey();
      function handler(e) { if (e.key === 'Escape') api.exit(); fn(e); }
      document.addEventListener('keydown', handler);
      offKey = () => document.removeEventListener('keydown', handler);
    }

    function cleanup() {
      if (timer)  { timer.stop(); timer = null; }
      if (offKey) { offKey(); offKey = null; }
    }

    return cleanup;
  },
};
