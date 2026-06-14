/* ===========================================================
   games/respincorrecta.js — RESPUESTA INCORRECTA
   Tipo Stop: turnos rápidos, vidas, eliminatorio. Hay que responder
   con un DISPARATE. Pierde vida quien: (a) se queda sin tiempo, o
   (b) responde BIEN (la familia lo marca con el botón rojo).
   =========================================================== */
import { PROMPTS, RESPINC_CONFIG } from '../data/respuestaincorrecta.js';
import { $, esc, shuffle, makeTimer, paintTimer, confettiBig, sfx, toast, backBtn } from '../ui.js';

export const respincorrectaGame = {
  ...RESPINC_CONFIG,
  config: [
    { key: 'time', label: 'Segundos por turno', type: 'number', min: 4, max: 15, step: 1, default: 7 },
    { key: 'lives', label: 'Vidas por jugador', type: 'number', min: 1, max: 5, step: 1, default: 3 },
  ],

  start(root, players, cfg, api) {
    const time = cfg.time, startLives = cfg.lives;
    let alive = players.map(p => ({ ...p, lives: startLives }));
    let turnPos = 0;
    let timer = null;
    let finished = false;
    let placement = alive.length;
    const PLACEMENT_POINTS = { 1: 300, 2: 200, 3: 150, 4: 100, 5: 50 };

    let deck = shuffle(PROMPTS), deckPos = 0;
    function nextPrompt() {
      if (deckPos >= deck.length) { deck = shuffle(PROMPTS); deckPos = 0; }
      return deck[deckPos++];
    }

    let els = {};
    root.innerHTML = shell();
    els = {
      who: $('#ri-who'), prompt: $('#ri-prompt'), timer: $('#ri-timer'),
      lives: $('#ri-lives'), msg: $('#ri-msg'),
    };
    document.addEventListener('keydown', onKey);
    root.addEventListener('click', onClick);
    startTurn();

    function currentPlayer() { return alive[turnPos]; }

    function startTurn() {
      if (finished) return;
      const p = currentPlayer();
      els.prompt.textContent = nextPrompt();
      els.prompt.classList.remove('animate-pop-in'); void els.prompt.offsetWidth;
      els.prompt.classList.add('animate-pop-in');

      els.who.innerHTML = `
        <p class="uppercase tracking-widest text-slate-400 text-sm font-bold">Turno de</p>
        <div class="flex items-center justify-center gap-3 mt-1">
          <span class="text-6xl md:text-7xl animate-float inline-block">${p.avatar}</span>
          <span class="text-4xl md:text-6xl font-display font-extrabold text-orange-300">${esc(p.name)}</span>
        </div>`;
      els.lives.innerHTML = alive.map(a =>
        `<div class="px-3 py-1 rounded-xl ${a.id === p.id ? 'bg-orange-500/30 ring-2 ring-orange-400' : 'bg-slate-800/60'} text-sm font-bold flex items-center gap-1">
          <span>${a.avatar}</span><span>${esc(a.name)}</span><span class="ml-1">${'❤️'.repeat(a.lives)}</span>
        </div>`).join('');
      els.msg.textContent = '¡Responde algo ABSURDO y presiona ESPACIO!';

      if (timer) timer.stop();
      timer = makeTimer(time, {
        dangerAt: 5,
        onTick: (r) => { els.timer.textContent = r; paintTimer(els.timer, r, 5); },
        onEnd: () => loseLife('Se quedó sin tiempo ⏰'),
      });
    }

    function passSafe() {
      if (finished) return;
      sfx.good();
      turnPos = (turnPos + 1) % alive.length;
      startTurn();
    }

    function loseLife(reason) {
      if (finished) return;
      sfx.buzz();
      const p = currentPlayer();
      p.lives -= 1;
      els.timer.classList.add('animate-shake');
      setTimeout(() => els.timer.classList.remove('animate-shake'), 500);

      if (p.lives <= 0) {
        eliminate(turnPos);
      } else {
        toast(`${p.name}: ${reason} (-1 vida)`, 'bad');
        turnPos = (turnPos + 1) % alive.length;
        startTurn();
      }
    }

    function eliminate(pos) {
      const out = alive[pos];
      const lugar = placement;
      api.addPoints(out.id, PLACEMENT_POINTS[lugar] || 50);
      toast(`${out.name} quedó fuera — Lugar #${lugar} (+${PLACEMENT_POINTS[lugar] || 50} pts)`, 'warn');
      alive.splice(pos, 1);
      placement -= 1;
      if (alive.length === 1) return win(alive[0]);
      if (pos >= alive.length) pos = 0;
      turnPos = pos;
      startTurn();
    }

    function win(player) {
      finished = true;
      if (timer) timer.stop();
      api.addPoints(player.id, PLACEMENT_POINTS[1]);
      api.logGame(respincorrectaGame.name, `Ganó ${player.name}`);
      sfx.win(); confettiBig(3000);
      root.innerHTML = `
        <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
          <div class="text-8xl mb-4 animate-float">${player.avatar}</div>
          <h1 class="text-5xl md:text-6xl font-display font-extrabold text-orange-400 mb-2">¡${esc(player.name)} GANA!</h1>
          <p class="text-xl text-slate-300 mb-8">El más disparatado de la mesa 🏆 (+${PLACEMENT_POINTS[1]} pts)</p>
          <div class="flex gap-4 flex-wrap justify-center">
            <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-orange-500 text-slate-900 text-xl font-extrabold">🔁 Otra vez</button>
            <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-white text-xl font-extrabold">🏅 Tablero</button>
            <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-white text-xl font-extrabold">🏠 Menú</button>
          </div>
        </div>`;
    }

    function onKey(e) {
      if (finished) return;
      if (e.code === 'Space') { e.preventDefault(); passSafe(); }
      else if (e.key === 'Enter') { e.preventDefault(); loseLife('Respondió bien 😅'); }
      else if (e.key === 'Escape') { api.exit(); }
    }
    function onClick(e) {
      if (e.target.closest('[data-safe]')) { if (!finished) passSafe(); }
      else if (e.target.closest('[data-fail]')) { if (!finished) loseLife('Respondió bien 😅'); }
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      root.removeEventListener('click', onClick);
      if (timer) timer.stop();
    };

    function shell() {
      return `
      <div class="min-h-screen p-4 md:p-8 relative">
        ${backBtn()}
        <div class="max-w-4xl mx-auto pt-16">
          <div class="text-center mb-5">
            <p class="uppercase tracking-widest text-orange-400 font-bold text-sm">Respuesta Incorrecta</p>
            <div id="ri-who" class="mt-2"></div>
          </div>

          <div class="card p-8 text-center mb-6">
            <p class="text-slate-400 uppercase text-sm tracking-wider mb-3">La pregunta es…</p>
            <p id="ri-prompt" class="text-3xl md:text-5xl font-display font-extrabold text-orange-200 leading-tight min-h-[3.5rem]"></p>
            <div id="ri-timer" class="text-6xl md:text-7xl font-display font-extrabold mt-5">${time}</div>
            <p id="ri-msg" class="text-slate-300 mt-3 text-lg"></p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <button data-safe class="btn-press py-6 rounded-3xl bg-emerald-500 text-white text-2xl font-extrabold">✅ Dije algo absurdo <span class="block text-base opacity-80">(ESPACIO → siguiente)</span></button>
            <button data-fail class="btn-press py-6 rounded-3xl bg-rose-600 text-white text-2xl font-extrabold">😅 Respondió bien <span class="block text-base opacity-80">(ENTER → pierde vida)</span></button>
          </div>

          <div id="ri-lives" class="flex flex-wrap gap-2 justify-center mt-6"></div>
          <p class="text-center text-slate-500 text-sm mt-4">Gana el que diga puras tonterías. Si respondes <b>correctamente</b> (o se acaba el tiempo), pierdes una vida.</p>
        </div>
      </div>`;
    }
  },
};
