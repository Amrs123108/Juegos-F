/* ===========================================================
   ui.js — Helpers de render, animaciones, confeti y sonidos
   =========================================================== */

export const app = () => document.getElementById('app');

/** Renderiza HTML en el contenedor principal y hace scroll arriba. */
export function render(html) {
  const root = app();
  root.innerHTML = html;
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  return root;
}

/** querySelector cortito sobre #app. */
export function $(sel, scope) { return (scope || app()).querySelector(sel); }
export function $$(sel, scope) { return Array.from((scope || app()).querySelectorAll(sel)); }

/** Escapa texto para evitar romper el HTML al inyectar nombres. */
export function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Elemento aleatorio de un arreglo. */
export function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/** Baraja (Fisher–Yates) devolviendo copia. */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------- Confeti ---------------- */
const C = () => window.confetti;

export function confettiBurst() {
  if (!C()) return;
  C()({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
}

/** Ráfaga grande de pantalla completa (victoria de partida). */
export function confettiBig(duration = 2500) {
  if (!C()) return;
  const end = Date.now() + duration;
  const colors = ['#a855f7', '#10b981', '#f59e0b', '#ec4899', '#22d3ee'];
  (function frame() {
    C()({ particleCount: 4, angle: 60, spread: 65, origin: { x: 0 }, colors });
    C()({ particleCount: 4, angle: 120, spread: 65, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  C()({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors });
}

/* ---------------- Toast ---------------- */
let toastTimer = null;
export function toast(msg, type = 'info') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300';
    document.body.appendChild(el);
  }
  const styles = {
    info: 'bg-slate-800 text-white border border-neon-violet/50',
    ok: 'bg-emerald-600 text-white',
    bad: 'bg-rose-600 text-white',
    warn: 'bg-amber-500 text-slate-900',
  };
  el.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ' + (styles[type] || styles.info);
  el.textContent = msg;
  el.style.opacity = '1';
  el.style.transform = 'translate(-50%, 0)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translate(-50%, -20px)';
  }, 2200);
}

/* ---------------- Sonido (Web Audio, sin assets) ---------------- */
let audioCtx = null;
function ctx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch { audioCtx = null; }
  }
  return audioCtx;
}
function beep(freq, time = 0.12, type = 'sine', gain = 0.08) {
  const c = ctx(); if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type; osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g); g.connect(c.destination);
  const t = c.currentTime;
  osc.start(t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + time);
  osc.stop(t + time);
}
export const sfx = {
  tick:   () => beep(880, 0.05, 'square', 0.04),
  good:   () => { beep(660, 0.1, 'triangle'); setTimeout(() => beep(990, 0.14, 'triangle'), 90); },
  bad:    () => { beep(200, 0.18, 'sawtooth', 0.06); },
  win:    () => { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 0.18, 'triangle'), i * 110)); },
  pass:   () => beep(300, 0.1, 'sine', 0.05),
  buzz:   () => { beep(140, 0.4, 'sawtooth', 0.07); },
};

/* ---------------- Botón "Volver" reutilizable ---------------- */
export function backBtn(label = '← Volver al menú') {
  return `<button data-action="home" class="btn-press absolute top-5 left-5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-sm font-bold">${label}</button>`;
}

/* ---------------- Temporizador reutilizable ----------------
   Devuelve un controlador { stop } y llama onTick(segRestantes) y onEnd().
   Marca de peligro <= dangerAt segundos. */
export function makeTimer(seconds, { onTick, onEnd, dangerAt = 5, tickSound = true } = {}) {
  let remaining = seconds;
  let stopped = false;
  let intervalId = null;

  function tickFn() {
    if (stopped) return;
    remaining -= 1;
    if (onTick) onTick(remaining);
    if (tickSound && remaining <= dangerAt && remaining > 0) sfx.tick();
    if (remaining <= 0) {
      stop();
      if (onEnd) onEnd();
    }
  }

  if (onTick) onTick(remaining); // pinta el valor inicial
  intervalId = setInterval(tickFn, 1000);

  function stop() {
    stopped = true;
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }
  return {
    stop,
    add(s) { remaining += s; if (onTick) onTick(remaining); },
    reset(s) { remaining = s; if (onTick) onTick(remaining); },
    get remaining() { return remaining; },
  };
}

/** Aplica/quita la clase de peligro a un elemento de timer. */
export function paintTimer(el, remaining, dangerAt = 5) {
  if (!el) return;
  if (remaining <= dangerAt) el.classList.add('timer-danger');
  else el.classList.remove('timer-danger');
}
