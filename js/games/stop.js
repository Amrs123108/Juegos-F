/* ===========================================================
   games/stop.js — STOP VELOZ EN LA SALA
   Cada turno: letra aleatoria + categoría SEGÚN LA EDAD del jugador.
   Barra espaciadora para pasar. Quien llegue a 0 pierde una vida.
   Eliminatorio hasta que quede un solo ganador.
   =========================================================== */
import { LETTERS, CATEGORIES, STOP_CONFIG } from '../data/stop.js';
import {
  $, esc, pick, makeTimer, paintTimer, confettiBig, sfx, toast,
  backBtn, ageAssignScreen, AGE_LABELS,
} from '../ui.js';

export const stopGame = {
  ...STOP_CONFIG,
  config: [
    { key: 'time', label: 'Segundos por turno', type: 'number', min: 3, max: 15, step: 1, default: 6 },
    { key: 'lives', label: 'Vidas por jugador', type: 'number', min: 1, max: 5, step: 1, default: 3 },
  ],

  start(root, players, cfg, api) {
    const time = cfg.time, startLives = cfg.lives;
    const ageOf = {};

    let alive = [];
    let turnPos = 0;
    let timer = null;
    let finished = false;
    let placement = 0;
    const PLACEMENT_POINTS = { 1: 300, 2: 200, 3: 150, 4: 100, 5: 50 };

    let els = {};

    // 1) Asignar edades
    ageAssignScreen(root, players, ageOf, {
      title: 'Stop: nivel de cada jugador', color: 'amber', emoji: '⚡',
      intro: 'A cada quien le tocan categorías según su edad.',
      onStart: beginGame,
    });

    function beginGame() {
      alive = players.map(p => ({ ...p, lives: startLives }));
      placement = alive.length;
      turnPos = 0;
      finished = false;
      root.innerHTML = shell();
      els = {
        letter: $('#st-letter'), cat: $('#st-cat'), timer: $('#st-timer'),
        who: $('#st-who'), lives: $('#st-lives'), msg: $('#st-msg'),
      };
      document.addEventListener('keydown', onKey);
      root.addEventListener('click', onClick);
      startTurn();
    }

    function currentPlayer() { return alive[turnPos]; }

    function categoryFor(band) {
      const list = CATEGORIES.filter(c => c.ages.includes(band));
      return (pick(list) || pick(CATEGORIES)).name;
    }

    function startTurn() {
      if (finished) return;
      const p = currentPlayer();
      const letter = pick(LETTERS);
      const category = categoryFor(ageOf[p.id]);

      els.cat.textContent = category;
      els.letter.textContent = letter;
      els.letter.classList.remove('animate-pop-in'); void els.letter.offsetWidth;
      els.letter.classList.add('animate-pop-in');

      els.who.innerHTML = `
        <p class="uppercase tracking-widest text-slate-400 text-sm font-bold">Turno de</p>
        <div class="flex items-center justify-center gap-3 mt-1">
          <span class="text-6xl md:text-7xl animate-float inline-block">${p.avatar}</span>
          <span class="text-4xl md:text-6xl font-display font-extrabold text-amber-300">${esc(p.name)}</span>
        </div>
        <p class="text-slate-400 text-sm mt-1">${AGE_LABELS[ageOf[p.id]].emoji} ${AGE_LABELS[ageOf[p.id]].label}</p>`;

      els.lives.innerHTML = alive.map(a =>
        `<div class="px-3 py-1 rounded-xl ${a.id === p.id ? 'bg-amber-500/30 ring-2 ring-amber-400' : 'bg-slate-800/60'} text-sm font-bold flex items-center gap-1">
          <span>${a.avatar}</span><span>${esc(a.name)}</span><span class="ml-1">${'❤️'.repeat(a.lives)}</span>
        </div>`).join('');
      els.msg.textContent = '¡Di una palabra y presiona ESPACIO!';

      if (timer) timer.stop();
      timer = makeTimer(time, {
        dangerAt: 5,
        onTick: (r) => { els.timer.textContent = r; paintTimer(els.timer, r, 5); },
        onEnd: onTimeout,
      });
    }

    function passTurn() {
      if (finished) return;
      sfx.good();
      turnPos = (turnPos + 1) % alive.length;
      startTurn();
    }

    function onTimeout() {
      if (finished) return;
      sfx.buzz();
      const p = currentPlayer();
      p.lives -= 1;
      els.timer.textContent = '0';
      els.timer.classList.add('animate-shake');
      setTimeout(() => els.timer.classList.remove('animate-shake'), 500);

      if (p.lives <= 0) {
        eliminate(turnPos);
      } else {
        toast(`${p.name} se quedó limpio 😬 (-1 vida)`, 'bad');
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
      api.logGame(stopGame.name, `Ganó ${player.name}`);
      sfx.win(); confettiBig(3000);
      root.innerHTML = `
        <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
          <div class="text-8xl mb-4 animate-float">${player.avatar}</div>
          <h1 class="text-5xl md:text-6xl font-display font-extrabold text-amber-400 mb-2">¡${esc(player.name)} GANA!</h1>
          <p class="text-xl text-slate-300 mb-8">Último en pie de la mesa 🏆 (+${PLACEMENT_POINTS[1]} pts)</p>
          <div class="flex gap-4 flex-wrap justify-center">
            <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-amber-500 text-slate-900 text-xl font-extrabold">🔁 Otra vez</button>
            <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-white text-xl font-extrabold">🏅 Tablero</button>
            <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-white text-xl font-extrabold">🏠 Menú</button>
          </div>
        </div>`;
    }

    function onKey(e) {
      if (finished) return;
      if (e.code === 'Space') { e.preventDefault(); passTurn(); }
      else if (e.key === 'Escape') { api.exit(); }
    }
    function onClick(e) {
      if (e.target.closest('[data-pass]')) { if (!finished) passTurn(); }
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
          <div class="text-center mb-6">
            <p class="uppercase tracking-widest text-amber-400 font-bold text-sm">Stop Veloz en la Sala</p>
            <div id="st-who" class="mt-2"></div>
          </div>

          <div class="card p-8 text-center mb-6">
            <p class="text-slate-400 uppercase text-sm tracking-wider mb-2">Categoría</p>
            <p id="st-cat" class="text-2xl md:text-3xl font-display font-bold text-emerald-400 mb-6"></p>
            <p class="text-slate-400 uppercase text-sm tracking-wider mb-1">Letra</p>
            <div id="st-letter" class="giant-letter text-[7rem] md:text-[10rem] leading-none font-extrabold text-violet-400"></div>
            <div id="st-timer" class="text-6xl md:text-7xl font-display font-extrabold mt-4">${time}</div>
            <p id="st-msg" class="text-slate-300 mt-3 text-lg"></p>
            <button data-pass class="btn-press mt-6 px-10 py-5 rounded-2xl bg-amber-500 text-slate-900 text-2xl font-extrabold w-full md:w-auto">
              ⏭️ ¡Lo dije! (ESPACIO)
            </button>
          </div>

          <div id="st-lives" class="flex flex-wrap gap-2 justify-center"></div>
          <p class="text-center text-slate-500 text-sm mt-6">Presiona <b>ESPACIO</b> al decir tu palabra. Si el tiempo llega a 0, pierdes una vida.</p>
        </div>
      </div>`;
    }
  },
};
