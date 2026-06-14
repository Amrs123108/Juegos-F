/* ===========================================================
   games/ahorcado.js — AHORCADO COOPERATIVO CON PISTAS
   Toda la familia vs. la máquina. 3 pistas (difícil/media/fácil),
   6 errores antes de dibujar el ahorcado (CSS animado).
   =========================================================== */
import { AHORCADO, AHORCADO_CONFIG } from '../data/ahorcado.js';
import { $, $$, esc, shuffle, confettiBig, confettiBurst, sfx, toast, backBtn } from '../ui.js';

const ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
const ERROR_PARTS = ['g-head', 'g-body', 'g-arm-l', 'g-arm-r', 'g-leg-l', 'g-leg-r'];

export const ahorcadoGame = {
  ...AHORCADO_CONFIG,
  config: [
    { key: 'rounds', label: 'Palabras a jugar', type: 'number', min: 1, max: 10, step: 1, default: 3 },
    { key: 'maxErrors', label: 'Errores permitidos', type: 'number', min: 4, max: 6, step: 1, default: 6 },
  ],

  start(root, players, cfg, api) {
    const maxErrors = Math.min(cfg.maxErrors, 6);
    let deck = shuffle(AHORCADO).slice(0, cfg.rounds);
    let roundIdx = 0;
    let solved = 0;
    let teamPointsTotal = 0;
    let currentTeardown = null; // declarado ANTES de usarse (evita TDZ)

    nextRound();

    function nextRound() {
      if (roundIdx >= deck.length) return showFinal();
      playWord(deck[roundIdx]);
    }

    function playWord(item) {
      const answer = item.answer;
      const answerLetters = new Set(norm(answer).split('').filter(c => /[A-ZÑ]/.test(c)));
      // Conteo de casillas: total de letras y longitud de cada palabra
      const wordLens = answer.split(' ').filter(Boolean).map(w => norm(w).replace(/[^A-ZÑ]/g, '').length);
      const totalLetters = wordLens.reduce((a, b) => a + b, 0);
      const guessed = new Set();
      let errors = 0;
      let hintsUsed = 0;
      let done = false;
      let teardownKey = null;

      root.innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative">
        ${backBtn()}
        <div class="max-w-4xl mx-auto pt-14">
          <div class="text-center mb-4">
            <p class="uppercase tracking-widest text-emerald-400 font-bold text-sm">Ahorcado Cooperativo · Palabra ${roundIdx + 1}/${deck.length}</p>
            <p class="text-slate-400 text-sm mt-1">Categoría: <b class="text-emerald-300">${esc(item.category)}</b> · Errores: <span id="ah-err">0</span>/${maxErrors}</p>
            <p class="text-slate-300 text-base mt-2">🔤 <b class="text-amber-300">${totalLetters}</b> ${totalLetters === 1 ? 'letra' : 'letras'}${wordLens.length > 1 ? ` · ${wordLens.length} palabras (${wordLens.join(', ')})` : ''}</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 items-center">
            <!-- Dibujo CSS -->
            <div class="card p-6 flex items-center justify-center">
              <div class="gallows" id="ah-gallows">
                <div class="part g-base"></div>
                <div class="part g-pole"></div>
                <div class="part g-beam"></div>
                <div class="part g-rope"></div>
                <div class="part g-head"></div>
                <div class="part g-body"></div>
                <div class="part g-arm-l"></div>
                <div class="part g-arm-r"></div>
                <div class="part g-leg-l"></div>
                <div class="part g-leg-r"></div>
              </div>
            </div>

            <!-- Pistas -->
            <div class="card p-6">
              <p class="font-bold text-lg mb-3">💡 Pistas</p>
              <div class="space-y-2" id="ah-hints">
                ${['Pista 1 · Difícil', 'Pista 2 · Media', 'Pista 3 · Regalada'].map((lbl, i) => `
                  <button data-hint="${i}" class="btn-press w-full text-left px-4 py-3 rounded-xl bg-slate-800/70 border border-emerald-500/30 font-bold">
                    🔒 ${lbl}
                  </button>
                  <p data-hinttext="${i}" class="hidden px-4 pb-2 text-emerald-200 text-sm"></p>`).join('')}
              </div>
            </div>
          </div>

          <!-- Casillas -->
          <div id="ah-word" class="flex flex-wrap gap-x-2 gap-y-4 justify-center my-8"></div>

          <!-- Teclado -->
          <div id="ah-keyboard" class="flex flex-wrap gap-1.5 justify-center max-w-2xl mx-auto"></div>
        </div>
      </div>`;

      // Render casillas
      const wordEl = $('#ah-word');
      function renderWord() {
        wordEl.innerHTML = answer.split('').map(ch => {
          if (ch === ' ') return `<span class="w-5 md:w-8"></span>`;
          const N = norm(ch);
          if (!/[A-ZÑ]/.test(N)) return `<span class="letter-slot border-none">${esc(ch)}</span>`;
          const show = guessed.has(N) || done;
          return `<span class="letter-slot ${show ? 'animate-pop-in' : ''}">${show ? esc(ch) : ''}</span>`;
        }).join('');
      }
      renderWord();

      // Teclado
      const kb = $('#ah-keyboard');
      kb.innerHTML = ALPHABET.map(L =>
        `<button data-key="${L}" class="key btn-press rounded-lg bg-slate-700 hover:bg-emerald-600 font-extrabold text-lg">${L}</button>`
      ).join('');

      const errEl = $('#ah-err');

      function showPart() {
        const part = $('#ah-gallows .' + ERROR_PARTS[errors - 1]);
        if (part) part.classList.add('show');
      }
      // Mostrar la horca base desde el inicio
      ['g-base', 'g-pole', 'g-beam', 'g-rope'].forEach(c => $('#ah-gallows .' + c).classList.add('show'));

      function guess(L) {
        if (done || guessed.has(L)) return;
        guessed.add(L);
        const btn = $(`[data-key="${L}"]`);
        if (btn) { btn.disabled = true; btn.classList.add('opacity-40'); }

        if (answerLetters.has(L)) {
          if (btn) btn.classList.add('bg-emerald-600');
          sfx.good();
          renderWord();
          // ¿ganamos?
          const allRevealed = [...answerLetters].every(x => guessed.has(x));
          if (allRevealed) win();
        } else {
          errors++;
          errEl.textContent = errors;
          if (btn) btn.classList.add('bg-rose-700');
          sfx.bad();
          showPart();
          $('#ah-gallows').classList.add('animate-shake');
          setTimeout(() => $('#ah-gallows').classList.remove('animate-shake'), 500);
          if (errors >= maxErrors) lose();
        }
      }

      function win() {
        done = true;
        const pts = Math.max(50, 150 - hintsUsed * 30);
        teamPointsTotal += pts;
        solved++;
        players.forEach(p => api.addPoints(p.id, pts)); // cooperativo: todos ganan
        sfx.win(); confettiBig(2200);
        endPanel(true, pts);
      }

      function lose() {
        done = true;
        // revela la palabra
        ERROR_PARTS.forEach(c => $('#ah-gallows .' + c).classList.add('show'));
        renderWord();
        sfx.buzz();
        endPanel(false, 0);
      }

      function endPanel(won, pts) {
        if (teardownKey) teardownKey();
        const panel = document.createElement('div');
        panel.setAttribute('data-overlay', '');
        panel.className = 'fixed inset-0 z-40 bg-slate-900/80 backdrop-blur flex items-center justify-center p-6 animate-pop-in';
        panel.innerHTML = `
          <div class="card p-8 text-center max-w-lg">
            <div class="text-6xl mb-3">${won ? '🎉' : '💀'}</div>
            <h2 class="text-3xl font-display font-extrabold mb-2 ${won ? 'text-emerald-400' : 'text-rose-400'}">${won ? '¡La familia adivinó!' : '¡Los venció la máquina!'}</h2>
            <p class="text-slate-300 mb-1">La palabra era:</p>
            <p class="text-2xl font-display font-extrabold text-amber-300 mb-4">${esc(answer)}</p>
            ${won ? `<p class="text-emerald-300 font-bold mb-4">+${pts} pts para todos (usaron ${hintsUsed} pista${hintsUsed === 1 ? '' : 's'})</p>` : ''}
            <button data-cont class="btn-press px-10 py-4 rounded-2xl ${won ? 'bg-emerald-500' : 'bg-slate-700'} text-white text-xl font-extrabold">
              ${roundIdx + 1 >= deck.length ? '🏁 Ver resultado' : '➡️ Siguiente palabra'}
            </button>
          </div>`;
        document.body.appendChild(panel);
        panel.querySelector('[data-cont]').onclick = () => {
          panel.remove();
          roundIdx++;
          nextRound();
        };
      }

      // Pistas
      $$('[data-hint]').forEach(btn => {
        btn.onclick = () => {
          const i = Number(btn.getAttribute('data-hint'));
          const txtEl = $(`[data-hinttext="${i}"]`);
          if (!txtEl.classList.contains('hidden')) return;
          txtEl.textContent = '➡️ ' + item.hints[i];
          txtEl.classList.remove('hidden');
          txtEl.classList.add('animate-slide-up');
          btn.classList.add('opacity-50');
          btn.textContent = '🔓 ' + btn.textContent.replace('🔒 ', '');
          hintsUsed++;
          sfx.tick();
        };
      });

      // Click en teclado virtual
      kb.addEventListener('click', (e) => {
        const b = e.target.closest('[data-key]');
        if (b && !b.disabled) guess(b.getAttribute('data-key'));
      });

      // Teclado físico
      function onKey(e) {
        if (e.key === 'Escape') { api.exit(); return; }
        const L = norm(e.key);
        if (L.length === 1 && ALPHABET.includes(L)) guess(L);
      }
      document.addEventListener('keydown', onKey);
      teardownKey = () => document.removeEventListener('keydown', onKey);
      // Expone teardown a la sesión
      currentTeardown = teardownKey;
    }

    function showFinal() {
      if (currentTeardown) currentTeardown();
      api.logGame(ahorcadoGame.name, `${solved}/${deck.length} palabras`);
      root.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
        <div class="text-7xl mb-3">${solved >= Math.ceil(deck.length / 2) ? '🏆' : '🤝'}</div>
        <h1 class="text-4xl md:text-5xl font-display font-extrabold text-emerald-400 mb-2">¡Equipo terminó!</h1>
        <p class="text-xl text-slate-300 mb-1">Adivinaron <b>${solved}</b> de <b>${deck.length}</b> palabras.</p>
        <p class="text-lg text-emerald-300 font-bold mb-8">Total cooperativo: +${teamPointsTotal} pts por jugador</p>
        <div class="flex gap-3 flex-wrap justify-center">
          <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-emerald-500 text-white text-lg font-extrabold">🔁 Otra vez</button>
          <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-lg font-extrabold">🏅 Tablero</button>
          <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-lg font-extrabold">🏠 Menú</button>
        </div>
      </div>`;
    }

    return () => { if (currentTeardown) currentTeardown(); };
  },
};
