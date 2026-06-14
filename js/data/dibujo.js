/* ===========================================================
   data/dibujo.js — Banco para "¿Qué Dibujo?"
   El sistema dibuja la figura trazo por trazo (cada 'step' es
   un fragmento SVG que se va pintando). viewBox 0 0 100 100.
   { name, cat, age, steps:[...] }
   =========================================================== */

export const DIBUJOS = [
  /* ---------------- NIÑA (fáciles) ---------------- */
  { name: 'Casa', cat: 'Objetos', age: 'nina', steps: [
    '<rect x="25" y="45" width="50" height="40"/>',
    '<polyline points="20,46 50,18 80,46"/>',
    '<rect x="43" y="62" width="14" height="23"/>',
    '<rect x="30" y="52" width="11" height="11"/>',
    '<rect x="59" y="52" width="11" height="11"/>',
  ]},
  { name: 'Sol', cat: 'Naturaleza', age: 'nina', steps: [
    '<circle cx="50" cy="50" r="16"/>',
    '<g><line x1="50" y1="10" x2="50" y2="24"/><line x1="50" y1="76" x2="50" y2="90"/><line x1="10" y1="50" x2="24" y2="50"/><line x1="76" y1="50" x2="90" y2="50"/></g>',
    '<g><line x1="22" y1="22" x2="32" y2="32"/><line x1="78" y1="22" x2="68" y2="32"/><line x1="22" y1="78" x2="32" y2="68"/><line x1="78" y1="78" x2="68" y2="68"/></g>',
    '<g><circle cx="44" cy="47" r="2" fill="#e2e8f0"/><circle cx="56" cy="47" r="2" fill="#e2e8f0"/><path d="M43 56 Q50 62 57 56"/></g>',
  ]},
  { name: 'Árbol', cat: 'Naturaleza', age: 'nina', steps: [
    '<rect x="45" y="58" width="10" height="28"/>',
    '<circle cx="50" cy="42" r="22"/>',
    '<g><circle cx="42" cy="40" r="3"/><circle cx="58" cy="44" r="3"/><circle cx="50" cy="32" r="3"/></g>',
  ]},
  { name: 'Pez', cat: 'Animales', age: 'nina', steps: [
    '<ellipse cx="46" cy="50" rx="26" ry="15"/>',
    '<polygon points="72,50 88,38 88,62"/>',
    '<circle cx="34" cy="46" r="2.5" fill="#e2e8f0"/>',
    '<line x1="56" y1="38" x2="56" y2="62"/>',
  ]},
  { name: 'Carro', cat: 'Transporte', age: 'nina', steps: [
    '<rect x="18" y="52" width="64" height="16" rx="3"/>',
    '<polyline points="30,52 38,40 62,40 70,52"/>',
    '<g><circle cx="32" cy="70" r="7"/><circle cx="68" cy="70" r="7"/></g>',
    '<line x1="50" y1="40" x2="50" y2="52"/>',
  ]},
  { name: 'Flor', cat: 'Naturaleza', age: 'nina', steps: [
    '<line x1="50" y1="55" x2="50" y2="88"/>',
    '<g><circle cx="50" cy="34" r="9"/><circle cx="36" cy="44" r="9"/><circle cx="64" cy="44" r="9"/><circle cx="42" cy="58" r="9"/><circle cx="58" cy="58" r="9"/></g>',
    '<circle cx="50" cy="48" r="8" fill="#e2e8f0"/>',
    '<path d="M50 72 Q64 66 66 76"/>',
  ]},
  { name: 'Globo', cat: 'Objetos', age: 'nina', steps: [
    '<ellipse cx="50" cy="40" rx="22" ry="26"/>',
    '<polygon points="46,65 54,65 50,72"/>',
    '<path d="M50 72 Q56 84 48 92"/>',
  ]},
  { name: 'Gato', cat: 'Animales', age: 'nina', steps: [
    '<circle cx="50" cy="52" r="26"/>',
    '<g><polygon points="30,32 26,12 44,26"/><polygon points="70,32 74,12 56,26"/></g>',
    '<g><circle cx="40" cy="50" r="3" fill="#e2e8f0"/><circle cx="60" cy="50" r="3" fill="#e2e8f0"/><polygon points="47,58 53,58 50,63"/></g>',
    '<g><line x1="20" y1="58" x2="38" y2="60"/><line x1="20" y1="66" x2="38" y2="64"/><line x1="80" y1="58" x2="62" y2="60"/><line x1="80" y1="66" x2="62" y2="64"/></g>',
  ]},
  { name: 'Helado', cat: 'Comida', age: 'nina', steps: [
    '<polygon points="38,52 62,52 50,92"/>',
    '<circle cx="42" cy="46" r="12"/>',
    '<circle cx="58" cy="46" r="12"/>',
    '<circle cx="50" cy="34" r="12"/>',
  ]},
  { name: 'Pelota', cat: 'Deportes', age: 'nina', steps: [
    '<circle cx="50" cy="50" r="30"/>',
    '<polygon points="50,38 60,46 56,58 44,58 40,46"/>',
    '<g><line x1="50" y1="38" x2="50" y2="20"/><line x1="60" y1="46" x2="76" y2="40"/><line x1="56" y1="58" x2="66" y2="74"/><line x1="44" y1="58" x2="34" y2="74"/><line x1="40" y1="46" x2="24" y2="40"/></g>',
  ]},
  { name: 'Pato', cat: 'Animales', age: 'nina', steps: [
    '<ellipse cx="44" cy="60" rx="26" ry="16"/>',
    '<circle cx="70" cy="42" r="11"/>',
    '<polygon points="80,40 92,44 80,48"/>',
    '<g><circle cx="72" cy="40" r="2" fill="#e2e8f0"/><path d="M30 58 Q44 70 58 58"/></g>',
  ]},
  { name: 'Nube con lluvia', cat: 'Naturaleza', age: 'nina', steps: [
    '<g><circle cx="38" cy="44" r="12"/><circle cx="54" cy="40" r="15"/><circle cx="68" cy="46" r="11"/></g>',
    '<line x1="30" y1="56" x2="76" y2="56"/>',
    '<g><line x1="40" y1="62" x2="36" y2="76"/><line x1="52" y1="62" x2="48" y2="76"/><line x1="64" y1="62" x2="60" y2="76"/></g>',
  ]},

  /* ---------------- JOVEN (medias) ---------------- */
  { name: 'Barco', cat: 'Transporte', age: 'ado', steps: [
    '<path d="M18 64 L82 64 L72 80 L28 80 Z"/>',
    '<line x1="50" y1="64" x2="50" y2="20"/>',
    '<polygon points="50,24 50,58 78,58"/>',
    '<g><path d="M10 86 Q18 80 26 86"/><path d="M30 86 Q38 80 46 86"/><path d="M50 86 Q58 80 66 86"/></g>',
  ]},
  { name: 'Cohete', cat: 'Espacio', age: 'ado', steps: [
    '<path d="M50 12 L62 40 L62 72 L38 72 L38 40 Z"/>',
    '<polygon points="38,60 24,80 38,74"/>',
    '<polygon points="62,60 76,80 62,74"/>',
    '<circle cx="50" cy="44" r="7"/>',
    '<g><path d="M44 74 L42 88"/><path d="M50 74 L50 92"/><path d="M56 74 L58 88"/></g>',
  ]},
  { name: 'Robot', cat: 'Tecnología', age: 'ado', steps: [
    '<rect x="34" y="14" width="32" height="26" rx="3"/>',
    '<g><circle cx="44" cy="27" r="3" fill="#e2e8f0"/><circle cx="56" cy="27" r="3" fill="#e2e8f0"/><line x1="50" y1="6" x2="50" y2="14"/><circle cx="50" cy="5" r="2"/></g>',
    '<rect x="30" y="42" width="40" height="34" rx="3"/>',
    '<g><line x1="30" y1="50" x2="16" y2="64"/><line x1="70" y1="50" x2="84" y2="64"/></g>',
    '<g><line x1="40" y1="76" x2="40" y2="92"/><line x1="60" y1="76" x2="60" y2="92"/></g>',
  ]},
  { name: 'Reloj', cat: 'Objetos', age: 'ado', steps: [
    '<circle cx="50" cy="50" r="34"/>',
    '<g><line x1="50" y1="18" x2="50" y2="24"/><line x1="50" y1="76" x2="50" y2="82"/><line x1="18" y1="50" x2="24" y2="50"/><line x1="76" y1="50" x2="82" y2="50"/></g>',
    '<line x1="50" y1="50" x2="50" y2="30"/>',
    '<line x1="50" y1="50" x2="66" y2="56"/>',
  ]},
  { name: 'Taza de café', cat: 'Cocina', age: 'ado', steps: [
    '<path d="M26 40 L26 70 Q26 80 38 80 L58 80 Q70 80 70 70 L70 40 Z"/>',
    '<path d="M70 46 Q84 46 84 56 Q84 66 70 66"/>',
    '<g><path d="M40 16 Q34 24 40 32"/><path d="M52 16 Q46 24 52 32"/></g>',
  ]},
  { name: 'Paraguas', cat: 'Objetos', age: 'ado', steps: [
    '<path d="M16 52 Q50 14 84 52 Z"/>',
    '<g><path d="M16 52 Q24 46 32 52"/><path d="M32 52 Q40 46 50 52"/><path d="M50 52 Q60 46 68 52"/><path d="M68 52 Q76 46 84 52"/></g>',
    '<line x1="50" y1="52" x2="50" y2="84"/>',
    '<path d="M50 84 Q50 92 60 90"/>',
  ]},
  { name: 'Avión', cat: 'Transporte', age: 'ado', steps: [
    '<ellipse cx="50" cy="52" rx="34" ry="9"/>',
    '<g><polygon points="48,50 28,72 56,54"/><polygon points="48,54 28,32 56,52"/></g>',
    '<polygon points="80,52 92,42 84,52"/>',
    '<g><circle cx="40" cy="52" r="2.5"/><circle cx="52" cy="52" r="2.5"/><circle cx="64" cy="52" r="2.5"/></g>',
  ]},
  { name: 'Mariposa', cat: 'Animales', age: 'ado', steps: [
    '<line x1="50" y1="30" x2="50" y2="72"/>',
    '<path d="M50 36 Q22 18 30 44 Q22 56 50 50"/>',
    '<path d="M50 36 Q78 18 70 44 Q78 56 50 50"/>',
    '<g><line x1="50" y1="30" x2="44" y2="20"/><line x1="50" y1="30" x2="56" y2="20"/></g>',
  ]},

  /* ---------------- ADULTO (difíciles) ---------------- */
  { name: 'Caracol', cat: 'Animales', age: 'adulto', steps: [
    '<path d="M58 64 Q58 40 40 40 Q26 40 26 54 Q26 64 38 64 Q46 64 46 56 Q46 50 40 50"/>',
    '<path d="M58 64 Q70 64 74 56"/>',
    '<g><line x1="74" y1="56" x2="78" y2="46"/><line x1="74" y1="56" x2="82" y2="50"/></g>',
    '<line x1="20" y1="70" x2="80" y2="70"/>',
  ]},
  { name: 'Llave', cat: 'Objetos', age: 'adulto', steps: [
    '<circle cx="30" cy="50" r="14"/>',
    '<circle cx="30" cy="50" r="5"/>',
    '<line x1="44" y1="50" x2="84" y2="50"/>',
    '<g><line x1="76" y1="50" x2="76" y2="60"/><line x1="84" y1="50" x2="84" y2="62"/></g>',
  ]},
  { name: 'Guitarra', cat: 'Música', age: 'adulto', steps: [
    '<g><circle cx="38" cy="62" r="16"/><circle cx="52" cy="50" r="11"/></g>',
    '<circle cx="42" cy="58" r="5"/>',
    '<g><line x1="56" y1="46" x2="80" y2="24"/><line x1="60" y1="50" x2="84" y2="28"/></g>',
    '<rect x="78" y="16" width="11" height="9"/>',
  ]},
  { name: 'Copa', cat: 'Objetos', age: 'adulto', steps: [
    '<path d="M34 24 L66 24 Q60 50 50 50 Q40 50 34 24 Z"/>',
    '<line x1="50" y1="50" x2="50" y2="78"/>',
    '<line x1="34" y1="80" x2="66" y2="80"/>',
    '<path d="M40 28 Q50 38 60 28"/>',
  ]},
  { name: 'Bombillo', cat: 'Objetos', age: 'adulto', steps: [
    '<circle cx="50" cy="42" r="22"/>',
    '<path d="M40 60 L60 60 L57 70 L43 70 Z"/>',
    '<g><line x1="43" y1="74" x2="57" y2="74"/><line x1="44" y1="78" x2="56" y2="78"/></g>',
    '<path d="M44 42 Q50 52 56 42"/>',
  ]},
  { name: 'Cactus', cat: 'Naturaleza', age: 'adulto', steps: [
    '<path d="M44 88 L44 40 Q44 32 50 32 Q56 32 56 40 L56 88 Z"/>',
    '<path d="M44 56 Q30 56 30 44"/>',
    '<path d="M56 60 Q70 60 70 48"/>',
    '<rect x="38" y="86" width="24" height="8"/>',
  ]},
  { name: 'Ancla', cat: 'Objetos', age: 'adulto', steps: [
    '<circle cx="50" cy="20" r="7"/>',
    '<line x1="50" y1="27" x2="50" y2="78"/>',
    '<line x1="34" y1="38" x2="66" y2="38"/>',
    '<path d="M26 60 Q30 82 50 82 Q70 82 74 60"/>',
    '<g><polygon points="26,60 20,56 28,52"/><polygon points="74,60 80,56 72,52"/></g>',
  ]},
  { name: 'Bandera de Panamá', cat: 'Panamá', age: 'adulto', steps: [
    '<rect x="20" y="24" width="60" height="52"/>',
    '<g><line x1="50" y1="24" x2="50" y2="76"/><line x1="20" y1="50" x2="80" y2="50"/></g>',
    '<polygon points="35,34 37,40 43,40 38,44 40,50 35,46 30,50 32,44 27,40 33,40"/>',
    '<polygon points="65,60 67,66 73,66 68,70 70,76 65,72 60,76 62,70 57,66 63,66"/>',
  ]},
];

export const DIBUJO_CONFIG = {
  id: 'dibujo',
  name: '¿Qué Dibujo?',
  emoji: '🎨',
  color: 'sky',
  short: 'El sistema dibuja trazo por trazo. ¡Adivina antes de que termine!',
};
