/* ===========================================================
   memory.js — Anti-repetición robusta para cualquier cantidad de jugadores.

   DOS CAPAS DE TRACKING
   ──────────────────────────────────────────────────────────
   session{}  Solo en memoria (este page load).
              GARANTÍA ABSOLUTA: ningún ítem se repite mientras
              la página esté abierta, sin importar cuántos
              jugadores haya ni cuántas partidas seguidas jueguen.

   mem{}      Persiste (localStorage + Vercel Blob).
              Evita repetir ítems entre noches / sesiones distintas.
              Solo se usa como preferencia secundaria; nunca bloquea.

   FLUJO de drawNext():
     1. Filtra pool por session → candidatos "frescos esta noche"
     2. Si candidatos = 0: reset SELECTIVO de este sub-pool en session
        (borra solo los items del pool actual, no los de otros pools
        que compartan la misma clave) y reinicia el ciclo.
     3. Entre los candidatos, prefiere los que tampoco están en mem
        (variedad entre noches).
     4. Marca elegido en session Y mem.

   CLAVES usadas por cada juego
   ──────────────────────────────────────────────────────────
   trivia:nina / trivia:ado / trivia:adulto     (pools disjuntos por edad)
   habla:nina / habla:ado / habla:adulto        (pools disjuntos por edad)
   charadas                                     (pool global — niveles solapan)
   ordena                                       (pool global — longitud solapa)
   stop:cat                                     (pool global — categorías solapan)
   ahorcado:facil / ahorcado:media / ...        (por dificultad)
   dibujo:nina / dibujo:ado / dibujo:adulto
   adivinalo:nina / adivinalo:ado / ...
   agilidad:menor / agilidad:junior / ...
   emojipelis:nina / emojipelis:ado / ...
   coincidimos / respinc / conexion:mente / conexion:accion
   =========================================================== */

const LS_SEEN = 'panama-party-game:seen';
const LS_SID  = 'panama-party-game:session';

/* ── ID de sesión (para sincronizar con Vercel Blob) ── */
function sid() {
  let s = null;
  try { s = localStorage.getItem(LS_SID); } catch (e) {}
  if (!s) {
    s = 's-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    try { localStorage.setItem(LS_SID, s); } catch (e) {}
  }
  return s;
}

/* ── Capa 2: persistente entre sesiones ── */
const mem = {};

/* ── Capa 1: en memoria, esta página/noche ── */
const session = {};

/* ── Hidratación desde localStorage ── */
(function hydrate() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_SEEN) || '{}');
    for (const k in raw) mem[k] = new Set(raw[k]);
  } catch (e) {}
})();

/* ── Persistencia local ── */
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
  pushT = setTimeout(pushCloud, 1500);
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
  } catch (e) { /* sin nube: sigue con localStorage */ }
}

/** Trae el estado de la nube y lo fusiona con el local. */
export async function syncFromCloud() {
  try {
    const r = await fetch('/api/state?sid=' + encodeURIComponent(sid()));
    if (!r.ok) return;
    const data = await r.json();
    if (data && data.state) {
      for (const k in data.state) {
        mem[k] = new Set([...(mem[k] || []), ...data.state[k]]);
      }
      persistLocal();
    }
  } catch (e) { /* sin nube: ignoramos */ }
}

/* ──────────────────────────────────────────────────────────
   drawNext()
   Devuelve un elemento del pool que NO haya salido aún
   en esta sesión/noche. Garantiza cero repeticiones sin
   importar cuántos jugadores haya.
   ────────────────────────────────────────────────────────── */
export function drawNext(key, pool, idFn) {
  if (!pool || !pool.length) return undefined;
  const id = idFn || (x => x);

  if (!mem[key])     mem[key]     = new Set();
  if (!session[key]) session[key] = new Set();

  /* 1. Candidatos: no vistos en esta noche (session) */
  let avail = pool.filter(it => !session[key].has(String(id(it))));

  /* 2. Pool agotado en sesión → reset SELECTIVO de este sub-pool
        Solo borra los items de ESTE pool; los de otros pools que
        compartan la misma clave quedan intactos. */
  if (!avail.length) {
    pool.forEach(it => {
      session[key].delete(String(id(it)));
      mem[key].delete(String(id(it)));
    });
    avail = pool.slice();
  }

  /* 3. Preferir items también frescos entre sesiones (mem) */
  const fresh = avail.filter(it => !mem[key].has(String(id(it))));
  const fromPool = fresh.length ? fresh : avail;

  /* 4. Elegir al azar y marcar en ambas capas */
  const choice = fromPool[Math.floor(Math.random() * fromPool.length)];
  session[key].add(String(id(choice)));
  mem[key].add(String(id(choice)));
  schedulePersist();
  return choice;
}

/* ──────────────────────────────────────────────────────────
   drawMany()
   Saca n items distintos del pool sin repetir en la misma
   tanda. Usa las dos capas para garantizar sin repetición.
   ────────────────────────────────────────────────────────── */
export function drawMany(key, pool, n, idFn) {
  const id = idFn || (x => x);
  if (!pool || !pool.length) return [];

  if (!mem[key])     mem[key]     = new Set();
  if (!session[key]) session[key] = new Set();

  const need = Math.min(n, pool.length);

  /* 1. Candidatos: no vistos en sesión */
  let avail = pool.filter(it => !session[key].has(String(id(it))));

  /* 2. Si no hay suficientes, reset selectivo */
  if (avail.length < need) {
    pool.forEach(it => {
      session[key].delete(String(id(it)));
      mem[key].delete(String(id(it)));
    });
    avail = pool.slice();
  }

  /* 3. Preferir items frescos entre sesiones; si no alcanzan, usar todos */
  const fresh = avail.filter(it => !mem[key].has(String(id(it))));
  const source = fresh.length >= need ? fresh : avail;

  /* 4. Barajar, tomar los primeros `need` y marcar */
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  const picked   = shuffled.slice(0, need);
  picked.forEach(it => {
    session[key].add(String(id(it)));
    mem[key].add(String(id(it)));
  });

  schedulePersist();
  return picked;
}

/** Borra toda la memoria (nueva noche). Limpia también la sesión. */
export function resetSeen() {
  for (const k in mem)     delete mem[k];
  for (const k in session) delete session[k];
  persistLocal();
  pushCloud();
}
