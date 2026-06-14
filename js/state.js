/* ===========================================================
   state.js — Estado global persistente (jugadores + puntajes)
   =========================================================== */

const STORAGE_KEY = 'panama-party-game:v1';

// Avatares divertidos (emojis) para elegir
export const AVATARS = [
  '🦥', '🐸', '🦜', '🐢', '🦦', '🐆', '🐬', '🦋',
  '🐙', '🦩', '🐝', '🦈', '🐧', '🦚', '🐳', '🦊',
  '👾', '🤠', '🥸', '🤡', '👽', '🤖', '🦸', '🧙',
];

const DEFAULT_STATE = () => ({
  players: [],          // { id, name, avatar }
  scores: {},           // { [playerId]: number }
  history: [],          // { game, ts, summary }
  lastGame: null,
});

let state = load();

/* ---------- Persistencia ---------- */
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE();
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE(), ...parsed };
  } catch (e) {
    console.warn('No se pudo cargar el estado, empezando limpio.', e);
    return DEFAULT_STATE();
  }
}

export function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('No se pudo guardar el estado.', e);
  }
}

/* ---------- Lectura ---------- */
export function getState() { return state; }
export function getPlayers() { return state.players; }
export function getPlayer(id) { return state.players.find(p => p.id === id); }
export function getScore(id) { return state.scores[id] || 0; }

export function getRanking() {
  return [...state.players]
    .map(p => ({ ...p, score: getScore(p.id) }))
    .sort((a, b) => b.score - a.score);
}

/* ---------- Jugadores ---------- */
export function setPlayers(list) {
  state.players = list.map((p, i) => ({
    id: p.id || `p${Date.now()}-${i}`,
    name: (p.name || `Jugador ${i + 1}`).trim().slice(0, 18),
    avatar: p.avatar || AVATARS[i % AVATARS.length],
  }));
  // Inicializa puntajes que falten
  state.players.forEach(p => {
    if (typeof state.scores[p.id] !== 'number') state.scores[p.id] = 0;
  });
  // Limpia puntajes huérfanos
  Object.keys(state.scores).forEach(id => {
    if (!state.players.some(p => p.id === id)) delete state.scores[id];
  });
  save();
}

/* ---------- Puntajes ---------- */
export function addScore(id, points) {
  if (!id) return;
  state.scores[id] = (state.scores[id] || 0) + points;
  if (state.scores[id] < 0) state.scores[id] = 0;
  save();
}

export function resetScores() {
  state.players.forEach(p => { state.scores[p.id] = 0; });
  save();
}

export function fullReset() {
  state = DEFAULT_STATE();
  save();
}

/* ---------- Historial ---------- */
export function logGame(game, summary) {
  state.lastGame = game;
  state.history.unshift({ game, summary, ts: Date.now() });
  state.history = state.history.slice(0, 30);
  save();
}
