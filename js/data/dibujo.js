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

  /* ---- NIÑA (ampliación) ---- */
  { name: 'Manzana', cat: 'Comida', age: 'nina', steps: [
    '<path d="M30 50 Q30 30 46 32 Q50 26 54 32 Q70 30 70 50 Q70 74 50 74 Q30 74 30 50 Z"/>',
    '<path d="M50 32 L50 22"/>',
    '<path d="M50 26 Q60 20 62 28 Q54 30 50 26"/>',
  ]},
  { name: 'Corazón', cat: 'Formas', age: 'nina', steps: [
    '<path d="M50 45 C44 33 26 33 26 50 C26 64 50 76 50 76"/>',
    '<path d="M50 45 C56 33 74 33 74 50 C74 64 50 76 50 76"/>',
  ]},
  { name: 'Paleta', cat: 'Comida', age: 'nina', steps: [
    '<circle cx="50" cy="38" r="20"/>',
    '<line x1="50" y1="58" x2="50" y2="88"/>',
    '<path d="M40 38 Q50 28 60 38 Q50 48 40 38"/>',
  ]},

  /* ---- JOVEN (ampliación) ---- */
  { name: 'Bicicleta', cat: 'Transporte', age: 'ado', steps: [
    '<circle cx="28" cy="64" r="13"/>',
    '<circle cx="72" cy="64" r="13"/>',
    '<g><line x1="28" y1="64" x2="50" y2="64"/><line x1="50" y1="64" x2="60" y2="42"/><line x1="60" y1="42" x2="72" y2="64"/><line x1="50" y1="64" x2="42" y2="42"/><line x1="42" y1="42" x2="60" y2="42"/></g>',
    '<line x1="42" y1="42" x2="38" y2="36"/>',
  ]},
  { name: 'Cámara', cat: 'Tecnología', age: 'ado', steps: [
    '<rect x="24" y="38" width="52" height="34" rx="4"/>',
    '<rect x="40" y="30" width="20" height="10" rx="2"/>',
    '<circle cx="50" cy="55" r="12"/>',
    '<circle cx="50" cy="55" r="6"/>',
    '<circle cx="68" cy="44" r="2"/>',
  ]},
  { name: 'Pingüino', cat: 'Animales', age: 'ado', steps: [
    '<ellipse cx="50" cy="55" rx="20" ry="28"/>',
    '<ellipse cx="50" cy="58" rx="11" ry="20"/>',
    '<g><circle cx="44" cy="40" r="2.5" fill="#e2e8f0"/><circle cx="56" cy="40" r="2.5" fill="#e2e8f0"/><polygon points="47,46 53,46 50,52"/></g>',
    '<g><polygon points="44,82 36,86 46,86"/><polygon points="56,82 64,86 54,86"/></g>',
  ]},

  /* ---- ADULTO (ampliación) ---- */
  { name: 'Brújula', cat: 'Objetos', age: 'adulto', steps: [
    '<circle cx="50" cy="50" r="30"/>',
    '<g><line x1="50" y1="20" x2="50" y2="26"/><line x1="50" y1="74" x2="50" y2="80"/><line x1="20" y1="50" x2="26" y2="50"/><line x1="74" y1="50" x2="80" y2="50"/></g>',
    '<polygon points="50,30 56,50 50,70 44,50"/>',
  ]},
  { name: 'Faro', cat: 'Lugares', age: 'adulto', steps: [
    '<path d="M40 80 L44 36 L56 36 L60 80 Z"/>',
    '<rect x="42" y="30" width="16" height="8"/>',
    '<polygon points="44,30 56,30 50,20"/>',
    '<g><line x1="41" y1="52" x2="59" y2="52"/><line x1="40" y1="64" x2="60" y2="64"/></g>',
    '<g><line x1="58" y1="34" x2="72" y2="30"/><line x1="58" y1="34" x2="72" y2="40"/></g>',
  ]},
  { name: 'Corona', cat: 'Objetos', age: 'adulto', steps: [
    '<path d="M28 64 L34 36 L42 52 L50 32 L58 52 L66 36 L72 64 Z"/>',
    '<line x1="28" y1="70" x2="72" y2="70"/>',
    '<g><circle cx="34" cy="36" r="2"/><circle cx="50" cy="32" r="2"/><circle cx="66" cy="36" r="2"/></g>',
  ]},

  /* ======================================================
     GRAN AMPLIACIÓN — objetivo 20-25 por grupo de edad
  ====================================================== */

  /* ---- NIÑA +10 (15 → 25) ---- */
  { name: 'Estrella', cat: 'Formas', age: 'nina', steps: [
    '<polygon points="50,14 56,38 80,38 62,54 68,78 50,62 32,78 38,54 20,38 44,38"/>',
    '<g><line x1="50" y1="14" x2="50" y2="62"/><line x1="80" y1="38" x2="32" y2="78"/><line x1="20" y1="38" x2="68" y2="78"/></g>',
  ]},
  { name: 'Luna', cat: 'Naturaleza', age: 'nina', steps: [
    '<path d="M56 18 Q28 50 56 82 Q18 74 18 50 Q18 26 56 18 Z"/>',
    '<g><circle cx="34" cy="30" r="2.5"/><circle cx="26" cy="50" r="1.5"/><circle cx="34" cy="70" r="2.5"/></g>',
  ]},
  { name: 'Ojo', cat: 'Cuerpo', age: 'nina', steps: [
    '<path d="M14 50 Q50 16 86 50 Q50 84 14 50 Z"/>',
    '<circle cx="50" cy="50" r="14"/>',
    '<circle cx="50" cy="50" r="6"/>',
    '<circle cx="55" cy="46" r="4" fill="#e2e8f0"/>',
  ]},
  { name: 'Libro', cat: 'Objetos', age: 'nina', steps: [
    '<rect x="22" y="20" width="56" height="66" rx="3"/>',
    '<line x1="50" y1="20" x2="50" y2="86"/>',
    '<g><line x1="56" y1="32" x2="70" y2="32"/><line x1="56" y1="40" x2="70" y2="40"/><line x1="56" y1="48" x2="70" y2="48"/></g>',
    '<path d="M22 84 Q26 90 50 88 Q74 90 78 84"/>',
  ]},
  { name: 'Bandera', cat: 'Objetos', age: 'nina', steps: [
    '<line x1="26" y1="14" x2="26" y2="90"/>',
    '<polygon points="26,20 80,38 26,56"/>',
    '<path d="M26 88 Q36 84 46 88 Q56 84 66 88"/>',
  ]},
  { name: 'Árbol de Navidad', cat: 'Festividades', age: 'nina', steps: [
    '<polygon points="50,10 72,46 28,46"/>',
    '<polygon points="50,34 78,74 22,74"/>',
    '<rect x="44" y="74" width="12" height="16"/>',
    '<g><circle cx="44" cy="54" r="3"/><circle cx="60" cy="58" r="3"/><circle cx="36" cy="64" r="3"/><circle cx="65" cy="64" r="3"/><circle cx="50" cy="44" r="3"/></g>',
  ]},
  { name: 'Tren', cat: 'Transporte', age: 'nina', steps: [
    '<rect x="16" y="46" width="68" height="22" rx="4"/>',
    '<rect x="24" y="32" width="22" height="16" rx="2"/>',
    '<g><circle cx="30" cy="70" r="8"/><circle cx="54" cy="70" r="8"/><circle cx="74" cy="70" r="6"/></g>',
    '<g><line x1="44" y1="46" x2="44" y2="68"/><line x1="62" y1="46" x2="62" y2="68"/></g>',
    '<circle cx="48" cy="52" r="4" fill="#e2e8f0"/>',
  ]},
  { name: 'Ratón', cat: 'Animales', age: 'nina', steps: [
    '<ellipse cx="50" cy="56" rx="22" ry="17"/>',
    '<g><circle cx="36" cy="34" r="10"/><circle cx="64" cy="34" r="10"/></g>',
    '<g><circle cx="44" cy="53" r="2.5" fill="#e2e8f0"/><circle cx="56" cy="53" r="2.5" fill="#e2e8f0"/><ellipse cx="50" cy="61" rx="5" ry="3"/></g>',
    '<path d="M62 64 Q74 68 82 82"/>',
  ]},
  { name: 'Conejo', cat: 'Animales', age: 'nina', steps: [
    '<ellipse cx="50" cy="60" rx="22" ry="20"/>',
    '<g><ellipse cx="38" cy="28" rx="7" ry="16"/><ellipse cx="62" cy="28" rx="7" ry="16"/></g>',
    '<g><circle cx="42" cy="56" r="3" fill="#e2e8f0"/><circle cx="58" cy="56" r="3" fill="#e2e8f0"/><ellipse cx="50" cy="64" rx="5" ry="3"/></g>',
    '<path d="M50 79 Q36 80 36 86 Q44 86 50 79 Q56 86 64 86 Q64 80 50 79"/>',
  ]},
  { name: 'Bota', cat: 'Ropa', age: 'nina', steps: [
    '<path d="M38 20 L38 62 Q38 80 54 80 L74 80 Q82 80 82 72 L82 68 L52 68 L52 20 Z"/>',
    '<line x1="38" y1="44" x2="52" y2="44"/>',
    '<path d="M38 62 Q30 70 38 78"/>',
    '<line x1="40" y1="80" x2="78" y2="80"/>',
  ]},

  /* ---- JOVEN +10 (11 → 21) ---- */
  { name: 'Celular', cat: 'Tecnología', age: 'ado', steps: [
    '<rect x="32" y="12" width="36" height="76" rx="5"/>',
    '<rect x="36" y="18" width="28" height="52" rx="2"/>',
    '<circle cx="50" cy="80" r="4"/>',
    '<g><line x1="38" y1="15" x2="46" y2="15"/><circle cx="52" cy="15" r="1.5"/></g>',
  ]},
  { name: 'Pizza', cat: 'Comida', age: 'ado', steps: [
    '<polygon points="50,14 82,80 18,80"/>',
    '<path d="M29 62 Q50 72 71 62"/>',
    '<g><circle cx="40" cy="60" r="4"/><circle cx="56" cy="52" r="4"/><circle cx="48" cy="44" r="3"/><circle cx="64" cy="66" r="4"/></g>',
    '<path d="M18 80 Q50 90 82 80"/>',
  ]},
  { name: 'Montaña', cat: 'Naturaleza', age: 'ado', steps: [
    '<polygon points="50,10 88,82 12,82"/>',
    '<polygon points="50,10 64,42 36,42"/>',
    '<line x1="12" y1="82" x2="88" y2="82"/>',
    '<g><path d="M28 60 Q36 56 44 62"/><path d="M56 54 Q64 50 72 56"/></g>',
  ]},
  { name: 'Trofeo', cat: 'Deportes', age: 'ado', steps: [
    '<path d="M34 22 L66 22 Q60 54 50 54 Q40 54 34 22 Z"/>',
    '<path d="M34 28 Q22 28 22 40 Q22 52 36 52"/>',
    '<path d="M66 28 Q78 28 78 40 Q78 52 64 52"/>',
    '<line x1="50" y1="54" x2="50" y2="72"/>',
    '<rect x="34" y="74" width="32" height="8" rx="2"/>',
  ]},
  { name: 'Nave espacial', cat: 'Espacio', age: 'ado', steps: [
    '<ellipse cx="50" cy="54" rx="36" ry="12"/>',
    '<path d="M30 54 Q30 36 50 36 Q70 36 70 54"/>',
    '<g><circle cx="34" cy="58" r="2.5" fill="#e2e8f0"/><circle cx="50" cy="60" r="2.5" fill="#e2e8f0"/><circle cx="66" cy="58" r="2.5" fill="#e2e8f0"/></g>',
    '<g><line x1="36" y1="64" x2="30" y2="80"/><line x1="50" y1="66" x2="50" y2="82"/><line x1="64" y1="64" x2="70" y2="80"/></g>',
  ]},
  { name: 'Castillo', cat: 'Lugares', age: 'ado', steps: [
    '<rect x="18" y="50" width="64" height="40"/>',
    '<g><rect x="18" y="34" width="14" height="22"/><rect x="43" y="34" width="14" height="22"/><rect x="68" y="34" width="14" height="22"/></g>',
    '<g><rect x="22" y="28" width="5" height="8"/><rect x="29" y="28" width="5" height="8"/><rect x="47" y="28" width="5" height="8"/><rect x="54" y="28" width="5" height="8"/><rect x="72" y="28" width="5" height="8"/><rect x="79" y="28" width="5" height="8"/></g>',
    '<path d="M40 90 L40 68 Q40 60 50 60 Q60 60 60 68 L60 90"/>',
  ]},
  { name: 'Sombrero de fiesta', cat: 'Celebración', age: 'ado', steps: [
    '<path d="M18 70 Q50 68 82 70"/>',
    '<path d="M36 70 L50 18 L64 70"/>',
    '<path d="M18 70 Q20 78 26 78 L74 78 Q80 78 82 70"/>',
    '<g><circle cx="50" cy="18" r="4"/><circle cx="38" cy="44" r="3"/><circle cx="62" cy="44" r="3"/><circle cx="44" cy="58" r="2"/><circle cx="56" cy="58" r="2"/></g>',
  ]},
  { name: 'Volcán', cat: 'Naturaleza', age: 'ado', steps: [
    '<polygon points="50,16 82,80 18,80"/>',
    '<path d="M36 52 L50 16 L64 52 Z"/>',
    '<g><path d="M43 16 Q40 6 48 9 Q44 4 52 6"/><path d="M50 16 Q50 4 56 8"/></g>',
    '<path d="M36 52 Q50 60 64 52 Q58 72 42 72 Z"/>',
  ]},
  { name: 'Taco', cat: 'Comida', age: 'ado', steps: [
    '<path d="M16 68 Q50 18 84 68"/>',
    '<path d="M16 68 Q50 78 84 68"/>',
    '<g><rect x="34" y="54" width="10" height="12" rx="2"/><rect x="48" y="50" width="14" height="16" rx="2"/><circle cx="66" cy="60" r="6"/></g>',
    '<g><path d="M30 56 Q22 50 20 60"/><path d="M70 56 Q78 50 80 60"/></g>',
  ]},
  { name: 'Teléfono clásico', cat: 'Tecnología', age: 'ado', steps: [
    '<rect x="22" y="32" width="56" height="46" rx="6"/>',
    '<rect x="30" y="38" width="40" height="14" rx="2"/>',
    '<g><circle cx="36" cy="62" r="4"/><circle cx="50" cy="62" r="4"/><circle cx="64" cy="62" r="4"/><circle cx="36" cy="72" r="4"/><circle cx="50" cy="72" r="4"/><circle cx="64" cy="72" r="4"/></g>',
    '<path d="M26 32 Q22 18 50 18 Q78 18 74 32"/>',
  ]},

  /* ---- ADULTO +10 (11 → 21) ---- */
  { name: 'Átomo', cat: 'Ciencia', age: 'adulto', steps: [
    '<ellipse cx="50" cy="50" rx="36" ry="14"/>',
    '<ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(60 50 50)"/>',
    '<ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(120 50 50)"/>',
    '<circle cx="50" cy="50" r="6"/>',
  ]},
  { name: 'Paloma', cat: 'Animales', age: 'adulto', steps: [
    '<ellipse cx="44" cy="58" rx="20" ry="12"/>',
    '<circle cx="70" cy="42" r="8"/>',
    '<path d="M58 48 Q80 36 92 44 Q78 54 60 52"/>',
    '<path d="M24 58 Q18 46 24 38 Q34 52 44 46"/>',
    '<g><polygon points="66,46 70,52 74,46"/><circle cx="71" cy="40" r="1.5" fill="#e2e8f0"/></g>',
  ]},
  { name: 'Reloj de arena', cat: 'Objetos', age: 'adulto', steps: [
    '<path d="M24 16 L76 16 L76 22 L58 50 L76 78 L76 84 L24 84 L24 78 L42 50 L24 22 Z"/>',
    '<g><line x1="24" y1="16" x2="76" y2="16"/><line x1="24" y1="84" x2="76" y2="84"/></g>',
    '<path d="M42 50 Q50 46 58 50 Q50 54 42 50"/>',
    '<path d="M40 72 Q50 68 60 72 Q50 76 40 72"/>',
  ]},
  { name: 'Timón', cat: 'Náutica', age: 'adulto', steps: [
    '<circle cx="50" cy="50" r="34"/>',
    '<circle cx="50" cy="50" r="10"/>',
    '<g><line x1="50" y1="16" x2="50" y2="40"/><line x1="50" y1="60" x2="50" y2="84"/><line x1="16" y1="50" x2="40" y2="50"/><line x1="60" y1="50" x2="84" y2="50"/></g>',
    '<g><line x1="26" y1="26" x2="43" y2="43"/><line x1="57" y1="57" x2="74" y2="74"/><line x1="74" y1="26" x2="57" y2="43"/><line x1="43" y1="57" x2="26" y2="74"/></g>',
  ]},
  { name: 'Anillo', cat: 'Joyería', age: 'adulto', steps: [
    '<circle cx="50" cy="64" r="18"/>',
    '<polygon points="50,16 62,34 50,44 38,34"/>',
    '<g><line x1="38" y1="34" x2="50" y2="44"/><line x1="62" y1="34" x2="50" y2="44"/></g>',
    '<line x1="38" y1="44" x2="62" y2="44"/>',
    '<g><line x1="50" y1="44" x2="43" y2="48"/><line x1="50" y1="44" x2="57" y2="48"/></g>',
  ]},
  { name: 'Llave inglesa', cat: 'Herramientas', age: 'adulto', steps: [
    '<line x1="28" y1="50" x2="84" y2="50"/>',
    '<circle cx="24" cy="50" r="14"/>',
    '<circle cx="24" cy="50" r="7"/>',
    '<g><rect x="74" y="42" width="14" height="7" rx="1"/><rect x="74" y="51" width="14" height="7" rx="1"/></g>',
  ]},
  { name: 'Pipa', cat: 'Objetos', age: 'adulto', steps: [
    '<path d="M54 26 Q72 26 72 44 Q72 58 54 58 L42 58 L42 44 Q42 26 54 26 Z"/>',
    '<circle cx="54" cy="44" r="9"/>',
    '<path d="M42 56 Q28 60 16 74"/>',
    '<line x1="16" y1="70" x2="16" y2="74"/>',
  ]},
  { name: 'Sombrero de copa', cat: 'Ropa', age: 'adulto', steps: [
    '<rect x="38" y="26" width="24" height="38" rx="3"/>',
    '<ellipse cx="50" cy="64" rx="32" ry="8"/>',
    '<line x1="38" y1="38" x2="62" y2="38"/>',
    '<path d="M46 26 Q46 20 50 18 Q54 20 54 26"/>',
  ]},
  { name: 'Microscopio', cat: 'Ciencia', age: 'adulto', steps: [
    '<rect x="44" y="12" width="12" height="28" rx="3"/>',
    '<rect x="38" y="38" width="24" height="10" rx="2"/>',
    '<line x1="50" y1="48" x2="50" y2="66"/>',
    '<path d="M40 66 Q40 56 50 56 Q60 56 60 66 Q60 76 50 78 Q40 76 40 66"/>',
    '<line x1="28" y1="86" x2="72" y2="86"/>',
  ]},
  { name: 'Candado', cat: 'Seguridad', age: 'adulto', steps: [
    '<rect x="26" y="48" width="48" height="40" rx="4"/>',
    '<path d="M36 48 L36 36 Q36 20 50 20 Q64 20 64 36 L64 48"/>',
    '<circle cx="50" cy="64" r="8"/>',
    '<line x1="50" y1="70" x2="50" y2="78"/>',
  ]},
];

export const DIBUJO_CONFIG = {
  id: 'dibujo',
  name: '¿Qué Dibujo?',
  emoji: '🎨',
  color: 'sky',
  short: 'El sistema dibuja trazo por trazo. ¡Adivina antes de que termine!',
};
