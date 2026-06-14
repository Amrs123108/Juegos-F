/* ===========================================================
   memory.js — Memoria anti-repetición de la noche.
   Recuerda qué preguntas/ítems ya salieron para NO repetirlos
   hasta agotar el banco. Persiste en:
     1) localStorage  (siempre, instantáneo, por dispositivo)
     2) Vercel Blob   (best-effort vía /api/state, en la nube)
   Si el Blob/API no está disponible, todo sigue funcionando con
   localStorage (no rompe nada).
   =========================================================== */

const LS_SEEN = 'panama-party-game:seen';
const LS_SID = 'panama-party-game:session';

function sid() {
  let s = null;
  try { s = localStorage.getItem(LS_SID); } catch (e) {}
  if (!s) {
    s = 's-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    try { localStorage.setItem(LS_SID, s); } catch (e) {}
  }
  return s;
}

const mem = {}; // key -> Set de ids ya vistos

(function hydrate() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_SEEN) || '{}');
    for (const k in raw) mem[k] = new Set(raw[k]);
  } catch (e) {}
})();

function persistLocal() {
  try {
    const o = {};
    for (const k in mem) o[k] = [...mem[k]];
    localStorage.setItem(LS_SEEN, JSON.stringify(o));
  } catch (e) {}
}

let pushT = null;
function schedulePersist() {
  persistLocal();
  clearTimeout(pushT);
  pushT = setTimeout(pushCloud, 1500); // agrupa escrituras a la nube
}

async function pushCloud() {
  try {
    const o = {};
    for (const k in mem) o[k] = [...mem[k]];
    await fetch('/api/state', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sid: sid(), state: o }),
    });
  } catch (e) { /* sin nube: seguimos con localStorage */ }
}

/** Trae el estado guardado en la nube y lo fusiona con el local. */
export async function syncFromCloud() {
  try {
    const r = await fetch('/api/state?sid=' + encodeURIComponent(sid()));
    if (!r.ok) return;
    const data = await r.json();
    if (data && data.state) {
      for (const k in data.state) mem[k] = new Set([...(mem[k] || []), ...data.state[k]]);
      persistLocal();
    }
  } catch (e) { /* sin nube: ignoramos */ }
}

/** Devuelve un elemento del pool que NO haya salido aún (marcándolo).
    Cuando se agotan todos, reinicia el ciclo de esa clave. */
export function drawNext(key, pool, idFn) {
  if (!pool || !pool.length) return undefined;
  const id = idFn || ((x) => x);
  if (!mem[key]) mem[key] = new Set();
  let avail = pool.filter((it) => !mem[key].has(String(id(it))));
  if (!avail.length) {           // ya salieron todos -> ciclo nuevo
    mem[key].clear();
    avail = pool.slice();
  }
  const choice = avail[Math.floor(Math.random() * avail.length)];
  mem[key].add(String(id(choice)));
  schedulePersist();
  return choice;
}

/** Saca varios distintos (sin repetir dentro de la misma tanda). */
export function drawMany(key, pool, n, idFn) {
  const id = idFn || ((x) => x);
  const out = [];
  const used = new Set();
  let guard = 0;
  while (out.length < n && guard < n * 5) {
    guard++;
    const it = drawNext(key, pool, id);
    if (it === undefined) break;
    const k = String(id(it));
    if (used.has(k)) continue; // evita duplicado dentro de la tanda
    used.add(k);
    out.push(it);
  }
  return out;
}

/** Borra toda la memoria de "ya salió" (para una noche nueva). */
export function resetSeen() {
  for (const k in mem) delete mem[k];
  persistLocal();
  pushCloud();
}
