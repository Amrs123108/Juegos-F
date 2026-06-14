/* ===========================================================
   games/crucigrama.js — CRUCIGRAMA FAMILIAR (cooperativo)
   Genera una cuadrícula conectada a partir del banco de palabras,
   con pistas (varias con emoji-imagen). Toda la familia la resuelve.
   =========================================================== */
import { CRUCIGRAMA, CRUCIGRAMA_CONFIG } from '../data/crucigrama.js';
import { $, $$, esc, shuffle, confettiBig, confettiBurst, sfx, toast, backBtn } from '../ui.js';

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-ZÑ]/g, '');

/* ---------- Generador de crucigrama ---------- */
function tryBuild(entries, target) {
  const occ = new Map();           // "r,c" -> letra
  const placed = [];
  const key = (r, c) => r + ',' + c;
  const getL = (r, c) => occ.get(key(r, c));

  function canPlace(word, r, c, dir) {
    const dr = dir === 'V' ? 1 : 0, dc = dir === 'H' ? 1 : 0;
    if (getL(r - dr, c - dc)) return false;                       // antes
    if (getL(r + dr * word.length, c + dc * word.length)) return false; // después
    let inter = 0;
    for (let i = 0; i < word.length; i++) {
      const rr = r + dr * i, cc = c + dc * i;
      const cur = getL(rr, cc);
      if (cur) {
        if (cur !== word[i]) return false;
        inter++;
      } else if (dir === 'H') {
        if (getL(rr - 1, cc) || getL(rr + 1, cc)) return false;
      } else {
        if (getL(rr, cc - 1) || getL(rr, cc + 1)) return false;
      }
    }
    return inter;
  }

  function place(entry, r, c, dir) {
    const dr = dir === 'V' ? 1 : 0, dc = dir === 'H' ? 1 : 0;
    const cells = [];
    for (let i = 0; i < entry.W.length; i++) {
      const rr = r + dr * i, cc = c + dc * i;
      occ.set(key(rr, cc), entry.W[i]);
      cells.push({ r: rr, c: cc });
    }
    placed.push({ ...entry, r, c, dir, cells });
  }

  place(entries[0], 0, 0, 'H');

  for (let idx = 1; idx < entries.length && placed.length < target; idx++) {
    const entry = entries[idx], word = entry.W;
    let best = null;
    for (let i = 0; i < word.length && !best; i++) {
      for (const [k, letter] of occ) {
        if (letter !== word[i]) continue;
        const [pr, pc] = k.split(',').map(Number);
        for (const dir of ['H', 'V']) {
          const dr = dir === 'V' ? 1 : 0, dc = dir === 'H' ? 1 : 0;
          const r = pr - dr * i, c = pc - dc * i;
          const res = canPlace(word, r, c, dir);
          if (res !== false && res >= 1) { best = { r, c, dir }; break; }
        }
        if (best) break;
      }
    }
    if (best) place(entry, best.r, best.c, best.dir);
  }
  return placed;
}

function buildCrossword(pool, target) {
  const entries = pool.map(e => ({ ...e, W: norm(e.word) })).filter(e => e.W.length >= 3);
  let best = [];
  for (let a = 0; a < 60; a++) {
    const res = tryBuild(shuffle(entries), target);
    if (res.length > best.length) best = res;
    if (best.length >= target) break;
  }
  // Normaliza coordenadas a (0,0)
  let minR = Infinity, minC = Infinity, maxR = -Infinity, maxC = -Infinity;
  best.forEach(p => p.cells.forEach(({ r, c }) => {
    minR = Math.min(minR, r); minC = Math.min(minC, c);
    maxR = Math.max(maxR, r); maxC = Math.max(maxC, c);
  }));
  best.forEach(p => {
    p.r -= minR; p.c -= minC;
    p.cells = p.cells.map(({ r, c }) => ({ r: r - minR, c: c - minC }));
  });
  const rows = maxR - minR + 1, cols = maxC - minC + 1;

  // Mapa solución + numeración
  const sol = new Map();
  best.forEach(p => p.cells.forEach((cell, i) => sol.set(cell.r + ',' + cell.c, p.W[i])));
  const has = (r, c) => sol.has(r + ',' + c);

  let num = 0;
  const numberAt = new Map();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!has(r, c)) continue;
      const startA = !has(r, c - 1) && has(r, c + 1);
      const startD = !has(r - 1, c) && has(r + 1, c);
      if (startA || startD) numberAt.set(r + ',' + c, ++num);
    }
  }
  best.forEach(p => { p.num = numberAt.get(p.cells[0].r + ',' + p.cells[0].c); });

  return { placed: best, rows, cols, sol };
}

export const crucigramaGame = {
  ...CRUCIGRAMA_CONFIG,
  config: [
    { key: 'words', label: 'Cantidad de palabras', type: 'number', min: 5, max: 12, step: 1, default: 8 },
  ],

  start(root, players, cfg, api) {
    const puzzle = buildCrossword(CRUCIGRAMA, cfg.words);
    const { placed, rows, cols, sol } = puzzle;
    const inputs = new Map();   // "r,c" -> input
    let activeWord = null;
    let activeDir = 'H';
    let focusedKey = null;
    let hintsUsed = 0;
    let solvedDone = false;

    const across = placed.filter(p => p.dir === 'H').sort((a, b) => a.num - b.num);
    const down = placed.filter(p => p.dir === 'V').sort((a, b) => a.num - b.num);

    render();

    function render() {
      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative">
        ${backBtn()}
        <div class="max-w-6xl mx-auto pt-14">
          <div class="text-center mb-4">
            <h1 class="text-3xl md:text-4xl font-display font-extrabold text-cyan-400">🧩 Crucigrama Familiar</h1>
            <p class="text-slate-400 text-sm">Toca una pista, escribe en la cuadrícula. ¡Resuélvanlo en equipo!</p>
          </div>

          <div class="grid lg:grid-cols-[auto,1fr] gap-6 items-start">
            <!-- Cuadrícula -->
            <div class="card p-4 mx-auto">
              <div id="cw-grid" class="grid gap-0.5" style="grid-template-columns:repeat(${cols}, max-content)"></div>
              <div class="flex flex-wrap gap-2 mt-4 justify-center">
                <button data-check class="btn-press px-5 py-3 rounded-xl bg-emerald-500 text-white font-extrabold">✅ Revisar</button>
                <button data-hint class="btn-press px-5 py-3 rounded-xl bg-cyan-500 text-slate-900 font-extrabold">💡 Pista (revelar letra)</button>
                <button data-reveal class="btn-press px-5 py-3 rounded-xl bg-slate-700 text-white font-bold">🙈 Rendirse</button>
              </div>
              <p class="text-center text-slate-500 text-xs mt-2">Pistas usadas: <span id="cw-hints">0</span></p>
            </div>

            <!-- Pistas -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="card p-4">
                <h3 class="font-display font-extrabold text-lg text-cyan-300 mb-2">➡️ Horizontales</h3>
                <div id="cw-across" class="space-y-1"></div>
              </div>
              <div class="card p-4">
                <h3 class="font-display font-extrabold text-lg text-cyan-300 mb-2">⬇️ Verticales</h3>
                <div id="cw-down" class="space-y-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

      // Construye la cuadrícula
      const grid = $('#cw-grid');
      const frag = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const k = r + ',' + c;
          if (sol.has(k)) {
            const n = startNumber(r, c);
            frag.push(`<div class="relative cw-cell-wrap">
              ${n ? `<span class="cw-num">${n}</span>` : ''}
              <input data-k="${k}" maxlength="1" inputmode="text" autocomplete="off"
                class="cw-cell" />
            </div>`);
          } else {
            frag.push(`<div class="cw-block"></div>`);
          }
        }
      }
      grid.innerHTML = frag.join('');

      $$('#cw-grid input').forEach(inp => {
        inputs.set(inp.getAttribute('data-k'), inp);
        inp.addEventListener('focus', () => onFocus(inp.getAttribute('data-k')));
        inp.addEventListener('input', () => onInput(inp));
        inp.addEventListener('keydown', (e) => onKeydown(e, inp));
      });

      $('#cw-across').innerHTML = across.map(p => clueRow(p)).join('') || '<p class="text-slate-500 text-sm">—</p>';
      $('#cw-down').innerHTML = down.map(p => clueRow(p)).join('') || '<p class="text-slate-500 text-sm">—</p>';
      $$('[data-clue]').forEach(el => el.onclick = () => selectByNum(el.getAttribute('data-clue'), el.getAttribute('data-dir')));

      $('[data-check]').onclick = check;
      $('[data-hint]').onclick = giveHint;
      $('[data-reveal]').onclick = surrender;
    }

    function clueRow(p) {
      return `<button data-clue="${p.num}" data-dir="${p.dir}" class="block w-full text-left px-3 py-2 rounded-lg hover:bg-cyan-500/10 text-sm">
        <b class="text-cyan-300">${p.num}.</b> ${p.emoji ? `<span class="text-xl align-middle">${p.emoji}</span> ` : ''}${esc(p.clue)}
        <span class="text-slate-500">(${p.W.length})</span>
      </button>`;
    }

    function startNumber(r, c) {
      const p = placed.find(pl => pl.cells[0].r === r && pl.cells[0].c === c);
      return p ? p.num : 0;
    }

    function wordsAt(k) {
      return placed.filter(p => p.cells.some(cell => cell.r + ',' + cell.c === k));
    }

    function onFocus(k) {
      focusedKey = k;
      const ws = wordsAt(k);
      let w = ws.find(p => p.dir === activeDir) || ws[0];
      if (w) { activeWord = w; activeDir = w.dir; }
      paint();
    }

    function onInput(inp) {
      let v = inp.value.toUpperCase().replace(/[^A-ZÑ]/g, '');
      inp.value = v.slice(-1);
      if (inp.value) moveStep(1);
    }

    function onKeydown(e, inp) {
      if (e.key === 'Escape') { api.exit(); return; }
      if (e.key === 'Backspace') {
        if (!inp.value) { e.preventDefault(); moveStep(-1, true); }
        return;
      }
      if (e.key === 'ArrowRight') { e.preventDefault(); activeDir = 'H'; refocusActive(); moveStep(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); activeDir = 'H'; refocusActive(); moveStep(-1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); activeDir = 'V'; refocusActive(); moveStep(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); activeDir = 'V'; refocusActive(); moveStep(-1); }
      else if (e.key === ' ') { e.preventDefault(); activeDir = activeDir === 'H' ? 'V' : 'H'; refocusActive(); }
    }

    function refocusActive() {
      if (!focusedKey) return;
      const ws = wordsAt(focusedKey);
      const w = ws.find(p => p.dir === activeDir) || ws[0];
      if (w) activeWord = w;
      paint();
    }

    function moveStep(delta, clear) {
      if (!activeWord) return;
      const idx = activeWord.cells.findIndex(cell => cell.r + ',' + cell.c === focusedKey);
      const ni = idx + delta;
      if (ni < 0 || ni >= activeWord.cells.length) return;
      const next = activeWord.cells[ni];
      const nk = next.r + ',' + next.c;
      const inp = inputs.get(nk);
      if (inp) {
        if (clear) inp.value = '';
        inp.focus();
      }
    }

    function selectByNum(num, dir) {
      const w = placed.find(p => String(p.num) === String(num) && p.dir === dir);
      if (!w) return;
      activeWord = w; activeDir = dir;
      const first = w.cells.find(cell => !inputs.get(cell.r + ',' + cell.c).disabled && !inputs.get(cell.r + ',' + cell.c).value) || w.cells[0];
      const inp = inputs.get(first.r + ',' + first.c);
      if (inp) inp.focus();
      paint();
    }

    function paint() {
      inputs.forEach((inp) => { if (!inp.disabled) inp.style.background = ''; });
      if (!activeWord) return;
      activeWord.cells.forEach(cell => {
        const inp = inputs.get(cell.r + ',' + cell.c);
        if (inp && !inp.disabled) inp.style.background = 'rgba(34,211,238,0.18)';
      });
      if (focusedKey) {
        const inp = inputs.get(focusedKey);
        if (inp && !inp.disabled) inp.style.background = 'rgba(34,211,238,0.4)';
      }
      // resalta pista activa
      $$('[data-clue]').forEach(el => el.classList.remove('bg-cyan-500/20'));
      const active = $(`[data-clue="${activeWord.num}"][data-dir="${activeWord.dir}"]`);
      if (active) active.classList.add('bg-cyan-500/20');
    }

    function giveHint() {
      // revela la letra de la celda enfocada (o la primera vacía de la palabra activa)
      let k = focusedKey;
      const empty = activeWord && activeWord.cells.map(c => c.r + ',' + c.c).find(kk => !inputs.get(kk).value);
      if (empty && (!k || inputs.get(k).value)) k = empty;
      if (!k) return;
      const inp = inputs.get(k);
      if (!inp || inp.disabled) return;
      inp.value = sol.get(k);
      inp.disabled = true;
      inp.style.background = 'rgba(16,185,129,0.35)';
      hintsUsed++;
      $('#cw-hints').textContent = hintsUsed;
      sfx.tick();
      checkWin();
    }

    function check() {
      let allFilled = true, wrong = 0;
      inputs.forEach((inp, k) => {
        if (inp.disabled) return;
        if (!inp.value) { allFilled = false; return; }
        if (inp.value === sol.get(k)) {
          inp.disabled = true;
          inp.style.background = 'rgba(16,185,129,0.35)';
        } else {
          wrong++;
          inp.classList.add('animate-shake');
          inp.style.background = 'rgba(244,63,94,0.4)';
          setTimeout(() => { inp.classList.remove('animate-shake'); inp.style.background = ''; inp.value = ''; }, 700);
        }
      });
      if (wrong > 0) { sfx.bad(); toast(`${wrong} letra(s) incorrecta(s)`, 'bad'); }
      else if (!allFilled) { sfx.pass(); toast('¡Vamos, faltan casillas!', 'warn'); }
      checkWin();
    }

    function checkWin() {
      if (solvedDone) return;
      let complete = true;
      inputs.forEach((inp, k) => { if (inp.value !== sol.get(k)) complete = false; });
      if (complete) win();
    }

    function win() {
      solvedDone = true;
      const pts = Math.max(60, 200 - hintsUsed * 20);
      players.forEach(p => api.addPoints(p.id, pts));
      api.logGame(crucigramaGame.name, `Resuelto (${placed.length} palabras)`);
      sfx.win(); confettiBig(3000);
      const panel = document.createElement('div');
      panel.setAttribute('data-overlay', '');
      panel.className = 'fixed inset-0 z-40 bg-slate-900/85 backdrop-blur flex items-center justify-center p-6 animate-pop-in';
      panel.innerHTML = `
        <div class="card p-8 text-center max-w-lg">
          <div class="text-7xl mb-3">🧩🎉</div>
          <h2 class="text-3xl font-display font-extrabold text-cyan-400 mb-2">¡Crucigrama resuelto!</h2>
          <p class="text-emerald-300 font-bold mb-6">+${pts} pts para todos (usaron ${hintsUsed} pista${hintsUsed === 1 ? '' : 's'})</p>
          <div class="flex gap-3 flex-wrap justify-center">
            <button data-action="replay" class="btn-press px-6 py-3 rounded-2xl bg-cyan-500 text-slate-900 font-extrabold">🔁 Otro</button>
            <button data-action="scoreboard" class="btn-press px-6 py-3 rounded-2xl bg-slate-700 font-bold">🏅 Tablero</button>
            <button data-action="home" class="btn-press px-6 py-3 rounded-2xl bg-slate-800 font-bold">🏠 Menú</button>
          </div>
        </div>`;
      root.appendChild(panel);
    }

    function surrender() {
      if (solvedDone) return;
      inputs.forEach((inp, k) => { inp.value = sol.get(k); inp.disabled = true; inp.style.background = 'rgba(148,163,184,0.2)'; });
      solvedDone = true;
      sfx.buzz();
      const panel = document.createElement('div');
      panel.setAttribute('data-overlay', '');
      panel.className = 'fixed inset-0 z-40 bg-slate-900/85 backdrop-blur flex items-center justify-center p-6 animate-pop-in';
      panel.innerHTML = `
        <div class="card p-8 text-center max-w-lg">
          <div class="text-7xl mb-3">🧩</div>
          <h2 class="text-2xl font-display font-extrabold text-slate-300 mb-2">Mostramos las respuestas</h2>
          <p class="text-slate-400 mb-6">¡La próxima lo resuelven! 💪</p>
          <div class="flex gap-3 flex-wrap justify-center">
            <button data-action="replay" class="btn-press px-6 py-3 rounded-2xl bg-cyan-500 text-slate-900 font-extrabold">🔁 Otro</button>
            <button data-action="home" class="btn-press px-6 py-3 rounded-2xl bg-slate-800 font-bold">🏠 Menú</button>
          </div>
        </div>`;
      root.appendChild(panel);
    }

    return () => {}; // sin timers globales que limpiar
  },
};
