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
  if (!avail.length) {
    // Reset selectivo: solo borra los items de ESTE pool, no de otros pools
    // que comparten la misma clave. Evita que un reset de un sub-pool
    // limpie el historial de otro sub-pool distinto (bug cross-edad).
    pool.forEach(it => mem[key].delete(String(id(it))));
    avail = pool.slice();
  }
  const choice = avail[Math.floor(Math.random() * avail.length)];
  mem[key].add(String(id(choice)));
  schedulePersist();
  return choice;
}

/** Saca n items distintos del pool sin repetir en la misma tanda.
    Dibuja sobre el pool completo de una vez para evitar que items "quemados"
    por el loop interno acaben en mem[key] sin llegar al output. */
export function drawMany(key, pool, n, idFn) {
  const id = idFn || ((x) => x);
  if (!pool || !pool.length) return [];
  if (!mem[key]) mem[key] = new Set();

  const need = Math.min(n, pool.length);
  const out = [];

  // 1. Items del pool que aún no han salido en esta clave
  let avail = pool.filter(it => !mem[key].has(String(id(it))));

  // 2. Si no hay suficientes, reset selectivo y vuelve a llenar
  if (avail.length < need) {
    pool.forEach(it => mem[key].delete(String(id(it))));
    avail = pool.slice();
  }

  // 3. Barajar y tomar los primeros `need`
  const shuffled = [...avail].sort(() => Math.random() - 0.5);
  for (let i = 0; i < need && i < shuffled.length; i++) {
    const it = shuffled[i];
    mem[key].add(String(id(it)));
    out.push(it);
  }

  schedulePersist();
  return out;
}

/** Borra toda la memoria de "ya salió" (para una noche nueva). */
export function resetSeen() {
  for (const k in mem) delete mem[k];
  persistLocal();
  pushCloud();
}
