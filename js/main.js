/* ===========================================================
   main.js — Orquestador del juego (router de pantallas + API)
   Panama Family Party Game 🇵🇦
   =========================================================== */
import {
  AVATARS, getPlayers, setPlayers, getRanking, getScore,
  addScore, resetScores, fullReset, logGame,
} from './state.js';
import { app, render, $, $$, esc, confettiBurst, sfx, toast } from './ui.js';

import { stopGame } from './games/stop.js';
import { ahorcadoGame } from './games/ahorcado.js';
import { triviaGame } from './games/trivia.js';
import { charadasGame } from './games/charadas.js';
import { crucigramaGame } from './games/crucigrama.js';
import { adivinaloGame } from './games/adivinalo.js';

const GAMES = [stopGame, ahorcadoGame, triviaGame, charadasGame, crucigramaGame, adivinaloGame];
const gameById = (id) => GAMES.find(g => g.id === id);

const COLOR = {
  amber:   { ring: 'ring-amber-400',   text: 'text-amber-400',   btn: 'bg-amber-500 text-slate-900', glow: 'shadow-amber-500/30' },
  emerald: { ring: 'ring-emerald-400', text: 'text-emerald-400', btn: 'bg-emerald-500 text-white',   glow: 'shadow-emerald-500/30' },
  violet:  { ring: 'ring-violet-400',  text: 'text-violet-400',  btn: 'bg-violet-500 text-white',    glow: 'shadow-violet-500/30' },
  pink:    { ring: 'ring-pink-400',    text: 'text-pink-400',    btn: 'bg-pink-500 text-white',      glow: 'shadow-pink-500/30' },
  cyan:    { ring: 'ring-cyan-400',    text: 'text-cyan-400',    btn: 'bg-cyan-500 text-slate-900',  glow: 'shadow-cyan-500/30' },
  rose:    { ring: 'ring-rose-400',    text: 'text-rose-400',    btn: 'bg-rose-500 text-white',      glow: 'shadow-rose-500/30' },
};

// Estado de navegación
let currentTeardown = null;
let lastGameId = null;
let lastConfig = null;

function clearGame() {
  if (currentTeardown) { try { currentTeardown(); } catch (e) {} currentTeardown = null; }
}

/* =====================================================================
   API que se pasa a cada juego
   ===================================================================== */
const api = {
  addPoints: (id, pts) => addScore(id, pts),
  logGame: (g, s) => logGame(g, s),
  exit: () => { clearGame(); screenMenu(); },
};

/* =====================================================================
   PANTALLA: Registro de jugadores
   ===================================================================== */
function screenHome() {
  clearGame();
  const existing = getPlayers();
  // 5 slots; precarga lo guardado
  const slots = [];
  for (let i = 0; i < 5; i++) {
    const p = existing[i];
    slots.push({
      name: p ? p.name : '',
      avatar: p ? p.avatar : AVATARS[i % AVATARS.length],
    });
  }

  render(`
    <div class="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div class="text-center mb-8 animate-slide-up">
        <div class="text-6xl md:text-7xl mb-2 animate-float">🇵🇦🎉</div>
        <h1 class="text-4xl md:text-6xl font-display font-extrabold leading-none">
          <span class="text-violet-400">Panama</span> <span class="text-emerald-400">Family</span> <span class="text-amber-400">Party</span>
        </h1>
        <p class="text-slate-400 mt-2 text-lg">El juego de la sala con sabor 100% panameño</p>
      </div>

      <div class="card p-6 md:p-8 w-full max-w-2xl animate-pop-in">
        <h2 class="text-2xl font-display font-bold mb-1">🎮 Registra a los jugadores</h2>
        <p class="text-slate-400 text-sm mb-5">Toca el avatar para cambiarlo. Mínimo 2, máximo 5.</p>
        <div id="slots" class="space-y-3"></div>
        <button id="startBtn" class="btn-press w-full mt-6 py-4 rounded-2xl bg-emerald-500 text-white text-xl font-extrabold">
          🚀 ¡A jugar!
        </button>
        ${existing.length ? `<button id="resetAll" class="w-full mt-3 py-2 text-sm text-slate-500 hover:text-rose-400 underline">Borrar todo y empezar de cero</button>` : ''}
      </div>
    </div>
  `);

  function renderSlots() {
    $('#slots').innerHTML = slots.map((s, i) => `
      <div class="flex items-center gap-3 bg-slate-800/50 rounded-2xl p-2 pr-4">
        <button data-avatar="${i}" class="btn-press text-4xl w-16 h-16 grid place-items-center rounded-2xl bg-slate-900/60 hover:bg-violet-600/40 shrink-0" title="Cambiar avatar">${s.avatar}</button>
        <input data-name="${i}" type="text" maxlength="18" value="${esc(s.name)}" placeholder="Jugador ${i + 1}${i >= 2 ? ' (opcional)' : ''}"
          class="flex-1 bg-transparent border-b-2 border-slate-600 focus:border-violet-400 outline-none text-xl font-bold py-2 placeholder:text-slate-600" />
      </div>
    `).join('');
  }
  renderSlots();

  // Delegación de eventos: abre el selector amplio de avatares
  $('#slots').addEventListener('click', (e) => {
    const b = e.target.closest('[data-avatar]');
    if (!b) return;
    const i = Number(b.getAttribute('data-avatar'));
    openAvatarPicker(slots, i, b);
  });
  $('#slots').addEventListener('input', (e) => {
    const inp = e.target.closest('[data-name]');
    if (inp) slots[Number(inp.getAttribute('data-name'))].name = inp.value;
  });

  $('#startBtn').onclick = () => {
    const chosen = slots.filter(s => s.name.trim().length > 0);
    if (chosen.length < 2) { toast('Necesitas al menos 2 jugadores 😉', 'warn'); return; }
    setPlayers(chosen);
    confettiBurst(); sfx.good();
    screenMenu();
  };

  const reset = $('#resetAll');
  if (reset) reset.onclick = () => {
    if (confirm('¿Borrar jugadores y puntajes? Esta acción no se puede deshacer.')) {
      fullReset(); screenHome();
    }
  };
}

/* =====================================================================
   Selector amplio de avatares (modal con cuadrícula)
   ===================================================================== */
function openAvatarPicker(slots, index, btnEl) {
  sfx.tick();
  const taken = slots.map((s, i) => (i === index ? null : s.avatar)).filter(Boolean);

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 bg-slate-900/80 backdrop-blur flex items-center justify-center p-4 animate-pop-in';
  modal.innerHTML = `
    <div class="card p-6 w-full max-w-2xl max-h-[85vh] flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-2xl font-display font-extrabold">Elige un avatar</h3>
        <button data-close class="btn-press w-10 h-10 rounded-xl bg-slate-700 text-xl font-extrabold">✕</button>
      </div>
      <div class="grid grid-cols-6 sm:grid-cols-8 gap-2 overflow-y-auto pr-1">
        ${AVATARS.map(a => {
          const isCurrent = a === slots[index].avatar;
          const isTaken = taken.includes(a);
          return `<button data-pick="${a}" title="${isTaken ? 'En uso por otro jugador' : ''}"
            class="btn-press text-3xl md:text-4xl aspect-square grid place-items-center rounded-xl
            ${isCurrent ? 'bg-violet-600 ring-2 ring-violet-300' : 'bg-slate-800/70 hover:bg-violet-600/40'}
            ${isTaken && !isCurrent ? 'opacity-40' : ''}">${a}</button>`;
        }).join('')}
      </div>
      <p class="text-center text-slate-500 text-xs mt-3">Los atenuados ya los usa otro jugador (igual puedes elegirlos)</p>
    </div>`;
  document.body.appendChild(modal);

  const close = () => modal.remove();
  modal.querySelector('[data-close]').onclick = close;
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  modal.querySelectorAll('[data-pick]').forEach(b => {
    b.onclick = () => {
      slots[index].avatar = b.getAttribute('data-pick');
      btnEl.textContent = slots[index].avatar;
      btnEl.classList.remove('animate-pop-in'); void btnEl.offsetWidth; btnEl.classList.add('animate-pop-in');
      sfx.good();
      close();
    };
  });
}

/* =====================================================================
   PANTALLA: Menú de juegos
   ===================================================================== */
function screenMenu() {
  clearGame();
  const players = getPlayers();
  if (!players.length) return screenHome();
  const ranking = getRanking();
  const leader = ranking[0];

  render(`
    <div class="min-h-screen p-4 md:p-8">
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 max-w-5xl mx-auto">
        <div>
          <h1 class="text-3xl md:text-4xl font-display font-extrabold">
            <span class="text-violet-400">Panama</span> <span class="text-emerald-400">Party</span> <span class="text-amber-400">🎉</span>
          </h1>
          <p class="text-slate-400">${players.length} jugadores · Líder: <b class="text-amber-300">${esc(leader.name)} ${leader.avatar}</b> (${leader.score} pts)</p>
        </div>
        <div class="flex gap-2">
          <button data-action="scoreboard" class="btn-press px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 font-bold">🏅 Tablero</button>
          <button data-action="players" class="btn-press px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 font-bold">👥 Jugadores</button>
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        ${GAMES.map((g, i) => {
          const c = COLOR[g.color] || COLOR.violet;
          return `
          <button data-game="${g.id}" class="selectable card p-6 text-left ring-1 ${c.ring} shadow-xl ${c.glow} animate-pop-in" style="animation-delay:${i * 60}ms">
            <div class="flex items-center gap-4">
              <div class="text-5xl">${g.emoji}</div>
              <div>
                <h3 class="text-2xl font-display font-extrabold ${c.text}">${esc(g.name)}</h3>
                <p class="text-slate-400 text-sm mt-1">${esc(g.short)}</p>
              </div>
            </div>
          </button>`;
        }).join('')}
      </div>

      <p class="text-center text-slate-600 text-sm mt-10">Hecho para la TV de la sala 📺 · Conecta el laptop al televisor y ¡a jugar en familia!</p>
    </div>
  `);
}

/* =====================================================================
   PANTALLA: Configuración previa a la partida
   ===================================================================== */
function screenConfig(game) {
  clearGame();
  const c = COLOR[game.color] || COLOR.violet;
  render(`
    <div class="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div class="card p-8 w-full max-w-lg animate-pop-in relative">
        <button data-action="home" class="btn-press absolute top-4 left-4 text-sm px-3 py-1 rounded-lg bg-slate-800 border border-slate-600">← Volver</button>
        <div class="text-center mb-6 pt-6">
          <div class="text-6xl mb-2">${game.emoji}</div>
          <h2 class="text-3xl font-display font-extrabold ${c.text}">${esc(game.name)}</h2>
          <p class="text-slate-400 text-sm mt-1">${esc(game.short)}</p>
        </div>

        <div class="space-y-4 mb-6">
          ${game.config.map(f => `
            <label class="block">
              <span class="block font-bold mb-1">${esc(f.label)}</span>
              ${f.type === 'select'
                ? `<select id="cfg-${f.key}" class="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-lg font-bold">
                     ${f.options.map(o => `<option value="${o.value}" ${o.value === f.default ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}
                   </select>`
                : `<div class="flex items-center gap-3">
                     <button data-step="${f.key}:-1" class="btn-press w-12 h-12 rounded-xl bg-slate-700 text-2xl font-extrabold">−</button>
                     <input id="cfg-${f.key}" type="number" value="${f.default}" min="${f.min}" max="${f.max}" step="${f.step}"
                       class="flex-1 text-center bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-2xl font-extrabold" />
                     <button data-step="${f.key}:1" class="btn-press w-12 h-12 rounded-xl bg-slate-700 text-2xl font-extrabold">+</button>
                   </div>
                   <span class="text-xs text-slate-500">Entre ${f.min} y ${f.max}</span>`}
            </label>`).join('')}
        </div>

        <button id="playBtn" class="btn-press w-full py-4 rounded-2xl ${c.btn} text-xl font-extrabold">▶️ Comenzar</button>
      </div>
    </div>
  `);

  // Botones +/- para los campos numéricos (onclick directo: sin acumular listeners)
  $$('[data-step]').forEach(b => {
    b.onclick = () => {
      const [key, dir] = b.getAttribute('data-step').split(':');
      const field = game.config.find(f => f.key === key);
      const inp = $(`#cfg-${key}`);
      let v = Number(inp.value) + Number(dir) * field.step;
      v = Math.max(field.min, Math.min(field.max, v));
      inp.value = v;
      sfx.tick();
    };
  });

  $('#playBtn').onclick = () => {
    const cfg = {};
    game.config.forEach(f => {
      const el = $(`#cfg-${f.key}`);
      let v = f.type === 'select' ? el.value : Number(el.value);
      if (f.type !== 'select') v = Math.max(f.min, Math.min(f.max, isNaN(v) ? f.default : v));
      cfg[f.key] = v;
    });
    launchGame(game.id, cfg);
  };
}

/* =====================================================================
   Lanzar un juego
   ===================================================================== */
function launchGame(gameId, cfg) {
  const game = gameById(gameId);
  if (!game) return screenMenu();
  clearGame();
  lastGameId = gameId;
  lastConfig = cfg;
  const players = getPlayers();
  currentTeardown = game.start(app(), players, cfg, api) || null;
}

/* =====================================================================
   PANTALLA: Tablero de puntajes global
   ===================================================================== */
function screenScoreboard() {
  clearGame();
  const ranking = getRanking();
  render(`
    <div class="min-h-screen p-4 md:p-8">
      <div class="max-w-2xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl md:text-4xl font-display font-extrabold text-amber-400">🏅 Tablero de la Noche</h1>
          <button data-action="home" class="btn-press px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 font-bold">← Menú</button>
        </div>

        ${ranking[0] && ranking[0].score > 0 ? `
          <div class="card p-6 mb-6 text-center bg-gradient-to-br from-amber-500/20 to-violet-500/10 ring-2 ring-amber-400 animate-pop-in">
            <p class="uppercase tracking-widest text-amber-300 text-sm font-bold">👑 Ganador del día</p>
            <div class="text-7xl my-2 animate-float">${ranking[0].avatar}</div>
            <p class="text-4xl md:text-5xl font-display font-extrabold text-amber-300">${esc(ranking[0].name)}</p>
            <p class="text-xl text-slate-300 mt-1">${ranking[0].score} puntos</p>
          </div>` : `
          <div class="card p-5 mb-6 text-center text-slate-400">Aún no hay puntos. ¡Jueguen una ronda para coronar al ganador del día! 🎮</div>`}

        <div class="space-y-3">
          ${ranking.map((p, i) => {
            const medal = ['🥇', '🥈', '🥉'][i] || `#${i + 1}`;
            const max = ranking[0].score || 1;
            const pct = Math.round((p.score / max) * 100);
            return `
            <div class="card p-4 animate-slide-up" style="animation-delay:${i * 60}ms">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xl font-bold flex items-center gap-2"><span class="text-2xl">${medal}</span> <span class="text-3xl">${p.avatar}</span> ${esc(p.name)}</span>
                <span class="text-2xl font-display font-extrabold text-amber-300">${p.score}</span>
              </div>
              <div class="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-violet-500 via-emerald-500 to-amber-400 transition-all duration-700" style="width:${pct}%"></div>
              </div>
            </div>`;
          }).join('')}
        </div>

        <div class="flex gap-3 justify-center mt-8">
          <button data-action="home" class="btn-press px-6 py-3 rounded-2xl bg-emerald-500 text-white font-extrabold">🎮 Seguir jugando</button>
          <button id="resetScores" class="btn-press px-6 py-3 rounded-2xl bg-slate-800 border border-slate-600 font-bold">♻️ Reiniciar puntajes</button>
        </div>
      </div>
    </div>
  `);

  $('#resetScores').onclick = () => {
    if (confirm('¿Poner todos los puntajes en 0? Los jugadores se mantienen.')) {
      resetScores(); toast('Puntajes reiniciados', 'ok'); screenScoreboard();
    }
  };
}

/* =====================================================================
   Delegación global de acciones (data-action)
   ===================================================================== */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action], [data-game]');
  if (!el) return;

  const game = el.getAttribute('data-game');
  if (game) { screenConfig(gameById(game)); return; }

  const action = el.getAttribute('data-action');
  switch (action) {
    case 'home':       screenMenu(); break;
    case 'players':    screenHome(); break;
    case 'scoreboard': screenScoreboard(); break;
    case 'replay':
      if (lastGameId && lastConfig) launchGame(lastGameId, lastConfig);
      else screenMenu();
      break;
  }
});

/* =====================================================================
   Arranque
   ===================================================================== */
getPlayers().length ? screenMenu() : screenHome();
