/* ===========================================================
   main.js — Orquestador del juego (router de pantallas + API)
   Panama Family Party Game 🇵🇦
   =========================================================== */
import {
  AVATARS, getPlayers, setPlayers, getRanking, getScore,
  addScore, resetScores, fullReset, logGame,
} from './state.js';
import { app, render, $, $$, esc, confettiBurst, confettiBig, sfx, toast } from './ui.js';
import { syncFromCloud, resetSeen } from './memory.js';

import { stopGame } from './games/stop.js';
import { ahorcadoGame } from './games/ahorcado.js';
import { triviaGame } from './games/trivia.js';
import { charadasGame } from './games/charadas.js';
import { crucigramaGame } from './games/crucigrama.js';
import { adivinaloGame } from './games/adivinalo.js';
import { dibujoGame } from './games/dibujo.js';
import { emojipelisGame } from './games/emojipelis.js';
import { respincorrectaGame } from './games/respincorrecta.js';
import { coincidimosGame } from './games/coincidimos.js';
import { ordenaGame } from './games/ordena.js';
import { hablaSinDecirGame } from './games/hablasindecir.js';
import { dibujaAdivinaGame } from './games/dibujaadivina.js';
import { conexionTotalGame } from './games/conexiontotal.js';

const GAMES = [
  stopGame, ahorcadoGame, triviaGame, charadasGame, crucigramaGame, adivinaloGame,
  dibujoGame, emojipelisGame, respincorrectaGame, coincidimosGame,
  ordenaGame, hablaSinDecirGame, dibujaAdivinaGame, conexionTotalGame,
];
const gameById = (id) => GAMES.find(g => g.id === id);

const COLOR = {
  amber:   { ring: 'ring-amber-400',   text: 'text-amber-400',   btn: 'bg-amber-500 text-slate-900', glow: 'shadow-amber-500/30' },
  emerald: { ring: 'ring-emerald-400', text: 'text-emerald-400', btn: 'bg-emerald-500 text-white',   glow: 'shadow-emerald-500/30' },
  violet:  { ring: 'ring-violet-400',  text: 'text-violet-400',  btn: 'bg-violet-500 text-white',    glow: 'shadow-violet-500/30' },
  pink:    { ring: 'ring-pink-400',    text: 'text-pink-400',    btn: 'bg-pink-500 text-white',      glow: 'shadow-pink-500/30' },
  cyan:    { ring: 'ring-cyan-400',    text: 'text-cyan-400',    btn: 'bg-cyan-500 text-slate-900',  glow: 'shadow-cyan-500/30' },
  rose:    { ring: 'ring-rose-400',    text: 'text-rose-400',    btn: 'bg-rose-500 text-white',      glow: 'shadow-rose-500/30' },
  sky:     { ring: 'ring-sky-400',     text: 'text-sky-400',     btn: 'bg-sky-500 text-slate-900',   glow: 'shadow-sky-500/30' },
  indigo:  { ring: 'ring-indigo-400',  text: 'text-indigo-400',  btn: 'bg-indigo-500 text-white',    glow: 'shadow-indigo-500/30' },
  orange:  { ring: 'ring-orange-400',  text: 'text-orange-400',  btn: 'bg-orange-500 text-slate-900',glow: 'shadow-orange-500/30' },
  teal:    { ring: 'ring-teal-400',    text: 'text-teal-400',    btn: 'bg-teal-500 text-slate-900',  glow: 'shadow-teal-500/30' },
  lime:    { ring: 'ring-lime-400',    text: 'text-lime-400',    btn: 'bg-lime-500 text-slate-900',  glow: 'shadow-lime-500/30' },
  fuchsia: { ring: 'ring-fuchsia-400', text: 'text-fuchsia-400', btn: 'bg-fuchsia-500 text-white',   glow: 'shadow-fuchsia-500/30' },
  yellow:  { ring: 'ring-yellow-400',  text: 'text-yellow-400',  btn: 'bg-yellow-400 text-slate-900',glow: 'shadow-yellow-500/30' },
  red:     { ring: 'ring-red-400',     text: 'text-red-400',     btn: 'bg-red-500 text-white',       glow: 'shadow-red-500/30' },
};

// Estado de navegación
let currentTeardown = null;
let lastGameId = null;
let lastConfig = null;
let lastPlayers = null;
let lastTeams = null;   // { A:[...], B:[...] } cuando se juega por equipos
let lastFlavor = null;  // 'color' (Azul/Rojo) | 'gender' (Hombres/Mujeres)
let tournament = null;  // Noche Familiar activa (o null)

// Juegos donde NO aplica el modo Equipos global (cooperativos o con su propio modo)
const TEAMS_DISABLED = ['ahorcado', 'crucigrama', 'dibujaadivina'];
const teamFlavorLabels = (flavor) => flavor === 'gender'
  ? { A: '👨 Hombres', B: '👩 Mujeres', aClr: 'blue', bClr: 'pink' }
  : { A: '🔵 Azul', B: '🔴 Rojo', aClr: 'blue', bClr: 'rose' };

function clearGame() {
  if (currentTeardown) { try { currentTeardown(); } catch (e) {} currentTeardown = null; }
}

/* =====================================================================
   API que se pasa a cada juego (se construye por lanzamiento).
   ctx opcional: { onResult(ranking), onExit() } para Noche Familiar.
   ===================================================================== */
function buildApi(ctx) {
  return {
    addPoints: (id, pts) => addScore(id, pts),
    logGame: (g, s) => logGame(g, s),
    exit: ctx && ctx.onExit ? ctx.onExit : () => { clearGame(); screenMenu(); },
    result: ctx && ctx.onResult ? ctx.onResult : undefined,
  };
}

/* =====================================================================
   PANTALLA: Registro de jugadores
   ===================================================================== */
function screenHome() {
  clearGame();
  const existing = getPlayers();
  const MIN = 2, MAX = 12;
  // Carga TODOS los jugadores guardados; si no hay, arranca con 4 espacios
  const slots = existing.length
    ? existing.map(p => ({ name: p.name, avatar: p.avatar }))
    : Array.from({ length: 4 }, (_, i) => ({ name: '', avatar: AVATARS[i % AVATARS.length] }));

  function nextAvatar() {
    const used = slots.map(s => s.avatar);
    return AVATARS.find(a => !used.includes(a)) || AVATARS[slots.length % AVATARS.length];
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
        <div class="flex items-center justify-between mb-1">
          <h2 class="text-2xl font-display font-bold">🎮 Registra a los jugadores</h2>
          <span class="text-sm font-bold bg-slate-800 px-3 py-1 rounded-xl">👥 <span id="playerCount">0</span></span>
        </div>
        <p class="text-slate-400 text-sm mb-5">Toca el avatar para cambiarlo. Mínimo 2 · agrega a los que lleguen (máx ${MAX}).</p>
        <div id="slots" class="space-y-3"></div>
        <button id="addBtn" class="btn-press w-full mt-3 py-3 rounded-2xl border-2 border-dashed border-slate-600 hover:border-violet-400 text-slate-300 font-bold">
          ➕ Agregar jugador
        </button>
        <button id="startBtn" class="btn-press w-full mt-4 py-4 rounded-2xl bg-emerald-500 text-white text-xl font-extrabold">
          🚀 ¡A jugar!
        </button>
        ${existing.length ? `<button id="resetAll" class="w-full mt-3 py-2 text-sm text-slate-500 hover:text-rose-400 underline">Borrar todo y empezar de cero</button>` : ''}
      </div>
    </div>
  `);

  function renderSlots() {
    $('#slots').innerHTML = slots.map((s, i) => `
      <div class="flex items-center gap-3 bg-slate-800/50 rounded-2xl p-2 pr-3 animate-pop-in">
        <button data-avatar="${i}" class="btn-press text-4xl w-16 h-16 grid place-items-center rounded-2xl bg-slate-900/60 hover:bg-violet-600/40 shrink-0" title="Cambiar avatar">${s.avatar}</button>
        <input data-name="${i}" type="text" maxlength="18" value="${esc(s.name)}" placeholder="Jugador ${i + 1}"
          class="flex-1 min-w-0 bg-transparent border-b-2 border-slate-600 focus:border-violet-400 outline-none text-xl font-bold py-2 placeholder:text-slate-600" />
        ${slots.length > MIN ? `<button data-remove="${i}" class="btn-press w-9 h-9 grid place-items-center rounded-xl bg-slate-700 hover:bg-rose-600 text-lg shrink-0" title="Quitar jugador">✕</button>` : ''}
      </div>
    `).join('');
  }

  function updateCounter() {
    const el = $('#playerCount');
    if (el) el.textContent = slots.length;
    const add = $('#addBtn');
    if (add) {
      add.disabled = slots.length >= MAX;
      add.classList.toggle('opacity-40', slots.length >= MAX);
    }
  }

  renderSlots();
  updateCounter();

  // Delegación de eventos en #slots: avatar y quitar
  $('#slots').addEventListener('click', (e) => {
    const av = e.target.closest('[data-avatar]');
    if (av) { openAvatarPicker(slots, Number(av.getAttribute('data-avatar')), av); return; }
    const rm = e.target.closest('[data-remove]');
    if (rm) {
      slots.splice(Number(rm.getAttribute('data-remove')), 1);
      renderSlots(); updateCounter(); sfx.pass();
    }
  });
  $('#slots').addEventListener('input', (e) => {
    const inp = e.target.closest('[data-name]');
    if (inp) { slots[Number(inp.getAttribute('data-name'))].name = inp.value; updateCounter(); }
  });

  $('#addBtn').onclick = () => {
    if (slots.length >= MAX) { toast(`Máximo ${MAX} jugadores`, 'warn'); return; }
    slots.push({ name: '', avatar: nextAvatar() });
    renderSlots(); updateCounter(); sfx.tick();
    const inputs = $$('#slots [data-name]');
    if (inputs.length) inputs[inputs.length - 1].focus();
  };

  $('#startBtn').onclick = () => {
    const chosen = slots.filter(s => s.name.trim().length > 0);
    if (chosen.length < MIN) { toast('Necesitas al menos 2 jugadores 😉', 'warn'); return; }
    setPlayers(chosen);
    confettiBurst(); sfx.good();
    screenMenu();
  };

  const reset = $('#resetAll');
  if (reset) reset.onclick = () => {
    if (confirm('¿Borrar jugadores y puntajes? Esta acción no se puede deshacer.')) {
      fullReset(); resetSeen(); screenHome();
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
  modal.setAttribute('data-overlay', '');
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
// Mínimo de participantes por juego (versus / parejas necesitan 2)
function minPlayersFor(game) {
  return ['stop', 'respincorrecta', 'coincidimos', 'conexiontotal'].includes(game.id) ? 2 : 1;
}

function screenConfig(game) {
  clearGame();
  const c = COLOR[game.color] || COLOR.violet;
  const allPlayers = getPlayers();
  const gameMin = minPlayersFor(game);
  const selected = new Set(allPlayers.map(p => p.id)); // todos por defecto
  const teamsAllowed = !TEAMS_DISABLED.includes(game.id);
  let teamMode = false;

  const chipCls = (on) => `btn-press px-3 py-2 rounded-xl border-2 text-sm font-bold flex items-center gap-1.5 ${on ? 'bg-emerald-600 border-emerald-300' : 'bg-slate-800/60 border-slate-700 opacity-55'}`;
  const modeCls = (on) => `btn-press flex-1 px-4 py-3 rounded-xl border-2 font-bold ${on ? 'bg-violet-500 border-violet-300' : 'bg-slate-800/60 border-slate-700'}`;

  render(`
    <div class="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div class="card p-8 w-full max-w-lg animate-pop-in relative">
        <button data-action="home" class="btn-press absolute top-4 left-4 text-sm px-3 py-1 rounded-lg bg-slate-800 border border-slate-600">← Volver</button>
        <div class="text-center mb-6 pt-6">
          <div class="text-6xl mb-2">${game.emoji}</div>
          <h2 class="text-3xl font-display font-extrabold ${c.text}">${esc(game.name)}</h2>
          <p class="text-slate-400 text-sm mt-1">${esc(game.short)}</p>
        </div>

        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold">¿Quiénes juegan?</span>
            <span class="text-sm text-slate-400"><span id="selCount">${allPlayers.length}</span>/${allPlayers.length}</span>
          </div>
          <div id="parts" class="flex flex-wrap gap-2">
            ${allPlayers.map(p => `
              <button data-tog="${p.id}" class="${chipCls(true)}"><span class="text-xl">${p.avatar}</span> ${esc(p.name)}</button>
            `).join('')}
          </div>
          <p class="text-xs text-slate-500 mt-2">Toca para incluir/excluir. Mínimo ${gameMin}.</p>
        </div>

        ${teamsAllowed ? `
        <div class="mb-6">
          <span class="font-bold block mb-2">Modo de competencia</span>
          <div class="flex gap-3">
            <button data-mode="individual" id="modeIndiv" class="${modeCls(true)}">👤 Individual</button>
            <button data-mode="equipos" id="modeTeam" class="${modeCls(false)}">👥 Equipos</button>
          </div>
        </div>` : ''}

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

  // Selección de participantes
  function updateCount() { $('#selCount').textContent = selected.size; }
  $$('[data-tog]').forEach(b => {
    b.onclick = () => {
      const id = b.getAttribute('data-tog');
      if (selected.has(id)) selected.delete(id); else selected.add(id);
      b.className = chipCls(selected.has(id));
      updateCount();
      sfx.tick();
    };
  });

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

  // Toggle Individual / Equipos
  if (teamsAllowed) {
    $('#modeIndiv').onclick = () => { teamMode = false; $('#modeIndiv').className = modeCls(true); $('#modeTeam').className = modeCls(false); sfx.tick(); };
    $('#modeTeam').onclick = () => { teamMode = true; $('#modeTeam').className = modeCls(true); $('#modeIndiv').className = modeCls(false); sfx.tick(); };
  }

  $('#playBtn').onclick = () => {
    if (selected.size < gameMin) { toast(`Este juego necesita al menos ${gameMin} jugador${gameMin === 1 ? '' : 'es'} 😉`, 'warn'); return; }
    const cfg = {};
    game.config.forEach(f => {
      const el = $(`#cfg-${f.key}`);
      let v = f.type === 'select' ? el.value : Number(el.value);
      if (f.type !== 'select') v = Math.max(f.min, Math.min(f.max, isNaN(v) ? f.default : v));
      cfg[f.key] = v;
    });
    // Mantiene el orden de registro
    const participants = allPlayers.filter(p => selected.has(p.id));
    if (teamMode) {
      if (participants.length < 2) { toast('Equipos necesita al menos 2 jugadores 😉', 'warn'); return; }
      return screenTeamSetup(game, cfg, participants);
    }
    lastTeams = null; lastFlavor = null;
    launchGame(game.id, cfg, participants);
  };
}

/* =====================================================================
   PANTALLA: Armar equipos (Azul/Rojo u Hombres/Mujeres)
   ===================================================================== */
function screenTeamSetup(game, cfg, participants) {
  clearGame();
  let flavor = 'color';
  const sel = {}; participants.forEach((p, i) => sel[p.id] = i % 2 === 0 ? 'A' : 'B');

  function render() {
    const L = teamFlavorLabels(flavor);
    const teamBtn = (team, on) => {
      const clr = team === 'A' ? L.aClr : L.bClr;
      return `btn-press px-4 py-2 rounded-xl font-bold border-2 ${on ? `bg-${clr}-500 border-${clr}-300` : 'bg-slate-800/60 border-slate-700'}`;
    };
    const flavCls = (on) => `btn-press flex-1 px-4 py-3 rounded-xl border-2 font-bold ${on ? 'bg-amber-500 border-amber-300 text-slate-900' : 'bg-slate-800/60 border-slate-700'}`;
    app().innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative">
        <button id="tback" class="btn-press absolute top-5 left-5 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-600 text-sm font-bold">← Volver</button>
        <div class="max-w-2xl mx-auto pt-16">
          <h1 class="text-3xl md:text-4xl font-display font-extrabold text-center mb-1">${game.emoji} ${esc(game.name)}</h1>
          <p class="text-center text-slate-300 mb-5">Modo Equipos 👥 — arma los 2 equipos</p>

          <div class="flex gap-3 mb-5">
            <button data-flavor="color" class="${flavCls(flavor === 'color')}">🔵 Azul vs 🔴 Rojo</button>
            <button data-flavor="gender" class="${flavCls(flavor === 'gender')}">👨 Hombres vs 👩 Mujeres</button>
          </div>

          <div class="space-y-3">
            ${participants.map(p => `
              <div class="card p-4 flex items-center gap-3">
                <div class="flex items-center gap-2 font-bold text-lg flex-1"><span class="text-3xl">${p.avatar}</span> ${esc(p.name)}</div>
                <div class="grid grid-cols-2 gap-2" data-player="${p.id}">
                  <button data-team="A" class="${teamBtn('A', sel[p.id] === 'A')}">${L.A}</button>
                  <button data-team="B" class="${teamBtn('B', sel[p.id] === 'B')}">${L.B}</button>
                </div>
              </div>`).join('')}
          </div>
          <div class="text-center mt-8">
            <button id="startTeams" class="btn-press px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-500 to-rose-500 text-white text-xl font-extrabold">▶️ ¡A competir por equipos!</button>
          </div>
        </div>
      </div>`;

    $('#tback').onclick = () => screenConfig(game);
    $$('[data-flavor]').forEach(b => b.onclick = () => { flavor = b.getAttribute('data-flavor'); render(); sfx.tick(); });
    $$('[data-player]').forEach(g => {
      const pid = g.getAttribute('data-player');
      g.querySelectorAll('[data-team]').forEach(b => b.onclick = () => { sel[pid] = b.getAttribute('data-team'); render(); sfx.tick(); });
    });
    $('#startTeams').onclick = () => {
      const A = participants.filter(p => sel[p.id] === 'A');
      const B = participants.filter(p => sel[p.id] === 'B');
      if (!A.length || !B.length) { toast('Cada equipo necesita al menos 1 jugador', 'warn'); return; }
      lastTeams = { A, B }; lastFlavor = flavor;
      confettiBurst();
      launchGame(game.id, cfg, participants, { onResult: (r) => showTeamResult(r) });
    };
  }
  render();
}

/* =====================================================================
   Resultado por equipos (al terminar un juego en modo Equipos)
   ===================================================================== */
function showTeamResult(ranking) {
  clearGame();
  if (!lastTeams) return screenMenu();
  const L = teamFlavorLabels(lastFlavor);
  const teamOf = {}; lastTeams.A.forEach(p => teamOf[p.id] = 'A'); lastTeams.B.forEach(p => teamOf[p.id] = 'B');
  const hasScores = ranking.some(r => typeof r.s === 'number');

  let winTeam, sA = 0, sB = 0;
  if (hasScores) {
    ranking.forEach(r => { if (teamOf[r.id] === 'A') sA += (r.s || 0); else if (teamOf[r.id] === 'B') sB += (r.s || 0); });
    winTeam = sA === sB ? null : (sA > sB ? 'A' : 'B');
  } else {
    // Juegos "versus": ranking[0] es el ganador único
    winTeam = ranking[0] ? teamOf[ranking[0].id] : null;
  }

  const banner = winTeam === null ? '🤝 ¡Empate!' : `${winTeam === 'A' ? L.A : L.B} 🎉 ¡GANA!`;
  if (winTeam !== null) { sfx.win(); confettiBig(3000); }

  const teamCard = (team) => {
    const members = lastTeams[team];
    const label = team === 'A' ? L.A : L.B;
    const score = team === 'A' ? sA : sB;
    const isWin = winTeam === team;
    return `
      <div class="card p-5 ${isWin ? 'ring-2 ring-amber-400' : ''}">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xl font-display font-extrabold">${label}</span>
          ${hasScores ? `<span class="text-2xl font-display font-extrabold text-amber-300">${score}</span>` : ''}
        </div>
        <div class="space-y-1">
          ${members.map(m => {
            const r = ranking.find(x => x.id === m.id);
            const ps = r && typeof r.s === 'number' ? r.s : null;
            return `<div class="flex items-center justify-between text-sm bg-slate-800/50 rounded-lg px-3 py-1.5">
              <span>${m.avatar} ${esc(m.name)}</span>${ps !== null ? `<span class="font-bold text-slate-300">${ps}</span>` : ''}</div>`;
          }).join('')}
        </div>
      </div>`;
  };

  render(`
    <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
      <h1 class="text-4xl md:text-6xl font-display font-extrabold mb-6 ${winTeam === null ? 'text-slate-200' : 'text-amber-300'}">${banner}</h1>
      <div class="grid sm:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
        ${teamCard('A')}
        ${teamCard('B')}
      </div>
      <div class="flex gap-3 flex-wrap justify-center">
        <button data-action="replay" class="btn-press px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-rose-500 text-white text-lg font-extrabold">🔁 Otra vez</button>
        <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-lg font-extrabold">🏅 Tablero</button>
        <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-lg font-extrabold">🏠 Menú</button>
      </div>
    </div>
  `);
}

/* =====================================================================
   Lanzar un juego
   ===================================================================== */
function launchGame(gameId, cfg, participants, ctx) {
  const game = gameById(gameId);
  if (!game) return screenMenu();
  clearGame();
  // Valida que los participantes sigan existiendo (por si se editaron jugadores)
  const validIds = new Set(getPlayers().map(p => p.id));
  let players = (participants && participants.length ? participants : getPlayers()).filter(p => validIds.has(p.id));
  if (!players.length) players = getPlayers();
  lastGameId = gameId;
  lastConfig = cfg;
  lastPlayers = players;
  currentTeardown = game.start(app(), players, cfg, buildApi(ctx)) || null;
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

        <button data-action="noche" class="btn-press w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xl font-extrabold shadow-lg shadow-amber-500/30">
          🏆 Noche Familiar (torneo con ruleta y premios)
        </button>

        <div class="flex gap-3 justify-center mt-4">
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
   🏆 NOCHE FAMILIAR — torneo con ruleta y premios
   ===================================================================== */
// Juegos elegibles en la ruleta (se excluyen los cooperativos sin ganador único)
const NOCHE_EXCLUDE = ['crucigrama', 'ahorcado'];
const tournamentGames = () => GAMES.filter(g => !NOCHE_EXCLUDE.includes(g.id));

function defaultCfg(game) {
  const cfg = {};
  (game.config || []).forEach(f => { cfg[f.key] = f.default; });
  return cfg;
}

function screenNocheSetup() {
  clearGame();
  const all = getPlayers();
  if (all.length < 2) { toast('Necesitas al menos 2 jugadores', 'warn'); return screenScoreboard(); }
  const selected = new Set(all.map(p => p.id));
  let mode = 'count';
  let target = 3;
  const chipCls = (on) => `btn-press px-3 py-2 rounded-xl border-2 text-sm font-bold flex items-center gap-1.5 ${on ? 'bg-amber-500 border-amber-300 text-slate-900' : 'bg-slate-800/60 border-slate-700 opacity-55'}`;
  const modeCls = (on) => `btn-press flex-1 px-4 py-4 rounded-2xl border-2 font-bold ${on ? 'bg-amber-500 border-amber-300 text-slate-900' : 'bg-slate-800/60 border-slate-700'}`;

  function render() {
    const totalGames = tournamentGames().length;
    app().innerHTML = `
      <div class="min-h-screen p-4 md:p-8 relative">
        <button data-action="scoreboard" class="btn-press absolute top-5 left-5 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-600 text-sm font-bold">← Tablero</button>
        <div class="max-w-2xl mx-auto pt-16">
          <h1 class="text-4xl md:text-5xl font-display font-extrabold text-center mb-1"><span class="text-amber-400">🏆 Noche</span> <span class="text-rose-400">Familiar</span></h1>
          <p class="text-center text-slate-300 mb-6">Una ruleta elige el juego; el 1.º se lleva el premio. ¡A ser el Campeón!</p>

          <div class="card p-5 mb-4">
            <p class="font-bold mb-2">Modalidad</p>
            <div class="flex gap-3">
              <button data-mode="count" class="${modeCls(mode === 'count')}">🎯 Llegar a N premios<span class="block text-xs font-normal opacity-80">en cualquier juego</span></button>
              <button data-mode="each" class="${modeCls(mode === 'each')}">🧩 1 de cada juego<span class="block text-xs font-normal opacity-80">completarlos todos (${totalGames})</span></button>
            </div>
            ${mode === 'count' ? `
              <div class="flex items-center justify-center gap-3 mt-4">
                <span class="font-bold">Premios para ganar:</span>
                <button data-t="-1" class="btn-press w-10 h-10 rounded-xl bg-slate-700 text-2xl font-extrabold">−</button>
                <span id="tval" class="text-3xl font-display font-extrabold w-10 text-center">${target}</span>
                <button data-t="1" class="btn-press w-10 h-10 rounded-xl bg-slate-700 text-2xl font-extrabold">+</button>
              </div>` : `<p class="text-center text-slate-400 text-sm mt-3">Gana quien primero consiga un premio de los ${totalGames} juegos.</p>`}
          </div>

          <div class="card p-5 mb-6">
            <p class="font-bold mb-2">¿Quiénes compiten?</p>
            <div id="np" class="flex flex-wrap gap-2"></div>
          </div>

          <button id="startNoche" class="btn-press w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xl font-extrabold">▶️ ¡Comenzar Noche Familiar!</button>
        </div>
      </div>`;

    $('#np').innerHTML = all.map(p => `<button data-tog="${p.id}" class="${chipCls(selected.has(p.id))}"><span class="text-xl">${p.avatar}</span> ${esc(p.name)}</button>`).join('');
    $$('[data-tog]').forEach(b => b.onclick = () => {
      const id = b.getAttribute('data-tog');
      if (selected.has(id)) selected.delete(id); else selected.add(id);
      b.className = chipCls(selected.has(id)); sfx.tick();
    });
    $$('[data-mode]').forEach(b => b.onclick = () => { mode = b.getAttribute('data-mode'); render(); sfx.tick(); });
    $$('[data-t]').forEach(b => b.onclick = () => {
      target = Math.max(1, Math.min(15, target + Number(b.getAttribute('data-t'))));
      $('#tval').textContent = target; sfx.tick();
    });
    $('#startNoche').onclick = () => {
      const participants = all.filter(p => selected.has(p.id));
      if (participants.length < 2) { toast('Selecciona al menos 2 jugadores', 'warn'); return; }
      tournament = { participants, mode, target, prizes: {} };
      participants.forEach(p => tournament.prizes[p.id] = []);
      confettiBurst(); screenNocheStandings();
    };
  }
  render();
}

function prizeCount(pid) { return tournament.prizes[pid] ? tournament.prizes[pid].length : 0; }
function uniquePrizes(pid) { return new Set(tournament.prizes[pid] || []); }
function isChampion(pid) {
  if (!tournament) return false;
  if (tournament.mode === 'count') return prizeCount(pid) >= tournament.target;
  const need = tournamentGames().map(g => g.id);
  const have = uniquePrizes(pid);
  return need.every(id => have.has(id));
}

function screenNocheStandings() {
  clearGame();
  if (!tournament) return screenScoreboard();
  const t = tournament;
  const totalGames = tournamentGames().length;
  const standings = [...t.participants].sort((a, b) => (t.mode === 'count'
    ? prizeCount(b.id) - prizeCount(a.id)
    : uniquePrizes(b.id).size - uniquePrizes(a.id).size));

  render(`
    <div class="min-h-screen p-4 md:p-8 relative">
      <button data-action="home" class="btn-press absolute top-5 left-5 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-600 text-sm font-bold">🏠 Salir</button>
      <div class="max-w-2xl mx-auto pt-16 text-center">
        <h1 class="text-3xl md:text-4xl font-display font-extrabold mb-1"><span class="text-amber-400">🏆 Noche</span> <span class="text-rose-400">Familiar</span></h1>
        <p class="text-slate-300 mb-2">${t.mode === 'count' ? `Primero en llegar a <b>${t.target}</b> premios` : `Consigue 1 premio de cada juego (${totalGames})`}</p>

        <div class="card p-5 my-6 text-left space-y-2">
          ${standings.map((p, i) => {
            const c = t.mode === 'count' ? prizeCount(p.id) : uniquePrizes(p.id).size;
            const goal = t.mode === 'count' ? t.target : totalGames;
            const pct = Math.round((c / goal) * 100);
            return `
              <div class="px-3 py-3 rounded-xl ${i === 0 && c > 0 ? 'bg-amber-500/15 ring-1 ring-amber-400' : 'bg-slate-800/50'}">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold flex items-center gap-2"><span class="text-2xl">${p.avatar}</span> ${esc(p.name)}</span>
                  <span class="font-display font-extrabold text-amber-300">🏆 ${c}/${goal}</span>
                </div>
                <div class="h-2.5 rounded-full bg-slate-900 overflow-hidden"><div class="h-full bg-gradient-to-r from-amber-500 to-rose-500" style="width:${pct}%"></div></div>
              </div>`;
          }).join('')}
        </div>

        <button id="spin" class="btn-press w-full py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-2xl font-extrabold animate-pulse-fast">🎡 ¡Girar la ruleta!</button>
        <p class="text-slate-500 text-sm mt-4">La ruleta elige el juego donde competirán todos.</p>
      </div>
    </div>
  `);
  $('#spin').onclick = ruletaSpin;
}

function ruletaSpin() {
  clearGame();
  const games = tournamentGames();
  const COMODIN = { id: '__comodin__', name: '¡Comodín! Elige tú', emoji: '🃏', color: 'violet' };
  const wheel = [...games, COMODIN];
  const result = wheel[Math.floor(Math.random() * wheel.length)];

  render(`
    <div class="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <p class="uppercase tracking-widest text-amber-400 font-bold text-sm mb-4">🎡 Girando la ruleta…</p>
      <div id="wheel" class="card w-80 max-w-full py-12 px-6 mb-2">
        <div id="wheel-emoji" class="text-7xl mb-2">🎲</div>
        <div id="wheel-name" class="text-2xl font-display font-extrabold text-amber-300">…</div>
      </div>
    </div>
  `);

  const emojiEl = $('#wheel-emoji'), nameEl = $('#wheel-name'), box = $('#wheel');
  // Secuencia de "parpadeo" desacelerando hasta el resultado
  const steps = [];
  const N = 22;
  for (let i = 0; i < N; i++) steps.push(wheel[Math.floor(Math.random() * wheel.length)]);
  steps.push(result);

  let i = 0;
  function tick() {
    const g = steps[i];
    emojiEl.textContent = g.emoji;
    nameEl.textContent = g.name;
    sfx.tick();
    i++;
    if (i < steps.length) {
      const delay = 60 + Math.pow(i / steps.length, 3) * 320; // desacelera
      setTimeout(tick, delay);
    } else {
      // resultado final
      box.classList.add('animate-pop-in', 'ring-2', 'ring-amber-400');
      sfx.win(); confettiBurst();
      setTimeout(() => {
        if (result.id === '__comodin__') return comodinPick();
        showChosenGame(gameById(result.id));
      }, 900);
    }
  }
  tick();
}

function comodinPick() {
  render(`
    <div class="min-h-screen p-4 md:p-8">
      <div class="max-w-2xl mx-auto pt-12 text-center">
        <div class="text-7xl mb-2">🃏</div>
        <h1 class="text-3xl font-display font-extrabold text-violet-300 mb-1">¡Comodín!</h1>
        <p class="text-slate-300 mb-6">Elige el juego donde competirán todos:</p>
        <div class="grid grid-cols-2 gap-3">
          ${tournamentGames().map(g => `<button data-pick="${g.id}" class="btn-press card p-4 text-left ring-1 ${(COLOR[g.color] || COLOR.violet).ring}">
            <div class="text-4xl">${g.emoji}</div><div class="font-display font-extrabold ${(COLOR[g.color] || COLOR.violet).text}">${esc(g.name)}</div></button>`).join('')}
        </div>
      </div>
    </div>
  `);
  $$('[data-pick]').forEach(b => b.onclick = () => showChosenGame(gameById(b.getAttribute('data-pick'))));
}

function showChosenGame(game) {
  const c = COLOR[game.color] || COLOR.violet;
  render(`
    <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
      <p class="uppercase tracking-widest text-amber-400 font-bold text-sm mb-2">La ruleta eligió</p>
      <div class="text-8xl mb-3 animate-float">${game.emoji}</div>
      <h1 class="text-4xl md:text-6xl font-display font-extrabold ${c.text} mb-2">${esc(game.name)}</h1>
      <p class="text-slate-300 mb-8 max-w-md">${esc(game.short)}</p>
      <button id="goGame" class="btn-press px-12 py-5 rounded-2xl ${c.btn} text-xl font-extrabold">▶️ ¡A competir!</button>
    </div>
  `);
  $('#goGame').onclick = () => startTournamentGame(game);
}

function startTournamentGame(game) {
  lastTeams = null; lastFlavor = null; // el torneo es individual
  launchGame(game.id, defaultCfg(game), tournament.participants, {
    onResult: (ranking) => onTournamentGameDone(game, ranking),
    onExit: () => screenNocheStandings(),
  });
}

function onTournamentGameDone(game, ranking) {
  clearGame();
  const winner = ranking && ranking[0];
  if (!winner || !tournament) return screenNocheStandings();
  tournament.prizes[winner.id] = tournament.prizes[winner.id] || [];
  tournament.prizes[winner.id].push(game.id);
  sfx.win(); confettiBig(2500);

  const champ = isChampion(winner.id);
  const goal = tournament.mode === 'count' ? tournament.target : tournamentGames().length;
  const have = tournament.mode === 'count' ? prizeCount(winner.id) : uniquePrizes(winner.id).size;

  render(`
    <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
      <p class="uppercase tracking-widest text-amber-400 font-bold text-sm mb-2">Premio de ${esc(game.name)} ${game.emoji}</p>
      <div class="text-8xl mb-3 animate-float">${winner.avatar}</div>
      <h1 class="text-4xl md:text-5xl font-display font-extrabold text-amber-300 mb-1">¡${esc(winner.name)} gana el premio! 🏆</h1>
      <p class="text-xl text-slate-300 mb-8">Lleva <b class="text-amber-300">${have}/${goal}</b> premios</p>
      <button id="cont" class="btn-press px-12 py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xl font-extrabold">${champ ? '👑 ¡Ver al Campeón!' : '➡️ Seguir la Noche'}</button>
    </div>
  `);
  $('#cont').onclick = () => { if (champ) championScreen(winner); else screenNocheStandings(); };
}

function championScreen(winner) {
  clearGame();
  confettiBig(4000);
  render(`
    <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 animate-pop-in">
      <p class="uppercase tracking-widest text-amber-400 font-bold text-lg mb-2">👑 Campeón de la Noche Familiar 👑</p>
      <div class="text-[8rem] leading-none mb-4 animate-float">${winner.avatar}</div>
      <h1 class="text-5xl md:text-7xl font-display font-extrabold text-amber-300 mb-3">¡${esc(winner.name)}!</h1>
      <p class="text-xl text-slate-300 mb-8">Ganó la Noche Familiar 🎉🏆🎉</p>
      <div class="flex gap-3 flex-wrap justify-center">
        <button id="again" class="btn-press px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-lg font-extrabold">🔁 Otra Noche</button>
        <button data-action="scoreboard" class="btn-press px-8 py-4 rounded-2xl bg-slate-700 text-lg font-extrabold">🏅 Tablero</button>
        <button data-action="home" class="btn-press px-8 py-4 rounded-2xl bg-slate-800 text-lg font-extrabold">🏠 Menú</button>
      </div>
    </div>
  `);
  tournament = null;
  $('#again').onclick = () => screenNocheSetup();
}

/* =====================================================================
   Delegación global de acciones (data-action)
   ===================================================================== */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action], [data-game]');
  if (!el) return;

  // Red de seguridad: elimina cualquier ventana emergente que haya quedado
  // pegada (paneles con data-overlay) antes de navegar de pantalla.
  document.querySelectorAll('[data-overlay]').forEach(n => n.remove());

  const game = el.getAttribute('data-game');
  if (game) { screenConfig(gameById(game)); return; }

  const action = el.getAttribute('data-action');
  switch (action) {
    case 'home':       tournament = null; screenMenu(); break;
    case 'players':    tournament = null; screenHome(); break;
    case 'scoreboard': screenScoreboard(); break;
    case 'noche':      screenNocheSetup(); break;
    case 'replay':
      if (lastGameId && lastConfig) {
        if (lastTeams) launchGame(lastGameId, lastConfig, lastPlayers, { onResult: (r) => showTeamResult(r) });
        else launchGame(lastGameId, lastConfig, lastPlayers);
      } else screenMenu();
      break;
  }
});

/* =====================================================================
   Arranque
   ===================================================================== */
syncFromCloud(); // trae de la nube lo que ya salió (best-effort)
getPlayers().length ? screenMenu() : screenHome();
