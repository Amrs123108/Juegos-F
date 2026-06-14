/* ===========================================================
   data/emojipelis.js — Banco para "Película en Emojis"
   { emojis, answer, age }  (las opciones se generan con otras
   respuestas del mismo grupo de edad)
   =========================================================== */

export const EMOJIPELIS = [
  /* ---------------- NIÑA (infantiles) ---------------- */
  { emojis: '🦁👑', answer: 'El Rey León', age: 'nina' },
  { emojis: '❄️👸⛄', answer: 'Frozen', age: 'nina' },
  { emojis: '🏠🎈👴', answer: 'Up: Una aventura de altura', age: 'nina' },
  { emojis: '🐠🔎🌊', answer: 'Buscando a Nemo', age: 'nina' },
  { emojis: '🤠🚀🧸', answer: 'Toy Story', age: 'nina' },
  { emojis: '🚗⚡🏁', answer: 'Cars', age: 'nina' },
  { emojis: '🐉🥋🐼', answer: 'Kung Fu Panda', age: 'nina' },
  { emojis: '🏝️🌺🐔', answer: 'Moana', age: 'nina' },
  { emojis: '🇨🇴🏠🦋', answer: 'Encanto', age: 'nina' },
  { emojis: '💀🎸🇲🇽', answer: 'Coco', age: 'nina' },
  { emojis: '👹🧅🐴', answer: 'Shrek', age: 'nina' },
  { emojis: '🐭🍝👨‍🍳', answer: 'Ratatouille', age: 'nina' },
  { emojis: '🦕🦖🌋', answer: 'El viaje de Arlo', age: 'nina' },
  { emojis: '🐘👂🎪', answer: 'Dumbo', age: 'nina' },
  { emojis: '👧👗🎃🐭', answer: 'Cenicienta', age: 'nina' },
  { emojis: '🧜‍♀️🌊🐠', answer: 'La Sirenita', age: 'nina' },
  { emojis: '🦓🦁🦒🌴', answer: 'Madagascar', age: 'nina' },
  { emojis: '💛👖🍌', answer: 'Minions', age: 'nina' },

  /* ---------------- JOVEN (famosas / pop) ---------------- */
  { emojis: '🕷️🕸️🦸', answer: 'Spider-Man', age: 'ado' },
  { emojis: '🦇🌃🃏', answer: 'Batman', age: 'ado' },
  { emojis: '⚡🧙📕', answer: 'Harry Potter', age: 'ado' },
  { emojis: '⭐⚔️🚀', answer: 'Star Wars', age: 'ado' },
  { emojis: '🦖🏝️🧬', answer: 'Jurassic Park', age: 'ado' },
  { emojis: '💍🌋🧝', answer: 'El Señor de los Anillos', age: 'ado' },
  { emojis: '🦔💨🏃', answer: 'Sonic', age: 'ado' },
  { emojis: '🤡🎈😱', answer: 'It (Eso)', age: 'ado' },
  { emojis: '🐀🥋🍕🐢', answer: 'Las Tortugas Ninja', age: 'ado' },
  { emojis: '🚢🧊💔', answer: 'Titanic', age: 'ado' },
  { emojis: '🦍🏙️✈️', answer: 'King Kong', age: 'ado' },
  { emojis: '🤖🚗😎', answer: 'Transformers', age: 'ado' },
  { emojis: '🟦👨🌍', answer: 'Avatar', age: 'ado' },
  { emojis: '🦸‍♂️🦸‍♀️🌐', answer: 'Los Vengadores', age: 'ado' },
  { emojis: '🐉🔥🐲', answer: 'Cómo entrenar a tu dragón', age: 'ado' },
  { emojis: '🧟🏃🌆', answer: 'Guerra Mundial Z', age: 'ado' },
  { emojis: '🎮👾🕹️', answer: 'Ralph el demoledor', age: 'ado' },

  /* ---------------- ADULTO (clásicos / generales) ---------------- */
  { emojis: '🦈🌊🏖️', answer: 'Tiburón', age: 'adulto' },
  { emojis: '👽📞🏠🚲', answer: 'E.T.', age: 'adulto' },
  { emojis: '🥊🇺🇸🏆', answer: 'Rocky', age: 'adulto' },
  { emojis: '🤖🔫🕶️', answer: 'Terminator', age: 'adulto' },
  { emojis: '💊🕶️🟢', answer: 'Matrix', age: 'adulto' },
  { emojis: '🍫🏭🎫', answer: 'Charlie y la fábrica de chocolate', age: 'adulto' },
  { emojis: '👻🏚️🔫', answer: 'Cazafantasmas', age: 'adulto' },
  { emojis: '🏃🍫🏈', answer: 'Forrest Gump', age: 'adulto' },
  { emojis: '🏴‍☠️⚓🦜', answer: 'Piratas del Caribe', age: 'adulto' },
  { emojis: '⏰🚗⚡', answer: 'Volver al Futuro', age: 'adulto' },
  { emojis: '👨🐴🔫', answer: 'El Padrino', age: 'adulto' },
  { emojis: '📦🏝️🏐', answer: 'Náufrago', age: 'adulto' },
  { emojis: '⚔️🏛️🦁', answer: 'Gladiador', age: 'adulto' },
  { emojis: '🐝🎬🎥', answer: 'La La Land', age: 'adulto' },
  { emojis: '🃏🎭🔫', answer: 'Guasón (Joker)', age: 'adulto' },
  { emojis: '🚙🦕🧬', answer: 'Jurassic Park', age: 'adulto' },

  /* ---- Ampliación ---- */
  { emojis: '🤖🌱❤️', answer: 'WALL-E', age: 'nina' },
  { emojis: '🧞✨🪔', answer: 'Aladdín', age: 'nina' },
  { emojis: '🐶🐶🔢🟦⬜', answer: '101 Dálmatas', age: 'nina' },
  { emojis: '🐰🦊🚓', answer: 'Zootopia', age: 'nina' },
  { emojis: '🏹👧🐻🏰', answer: 'Valiente', age: 'nina' },
  { emojis: '⚔️👧🐉🇨🇳', answer: 'Mulán', age: 'nina' },
  { emojis: '💪🏛️⚡🐴', answer: 'Hércules', age: 'nina' },
  { emojis: '🧚⏰🐊🏴‍☠️', answer: 'Peter Pan', age: 'nina' },
  { emojis: '🦍👦🌴🐆', answer: 'Tarzán', age: 'nina' },
  { emojis: '🛡️🦸‍♂️🇺🇸', answer: 'Capitán América', age: 'ado' },
  { emojis: '🔴🤖🦾', answer: 'Iron Man', age: 'ado' },
  { emojis: '🐆🦸🌍', answer: 'Pantera Negra', age: 'ado' },
  { emojis: '🔨⚡👱‍♂️', answer: 'Thor', age: 'ado' },
  { emojis: '🦈🌪️', answer: 'Sharknado', age: 'ado' },
  { emojis: '👨‍🚀🌌🪐⏳', answer: 'Interestelar', age: 'adulto' },
  { emojis: '🧛🦇🌙🏰', answer: 'Drácula', age: 'adulto' },
  { emojis: '👩‍🚀🌍🛰️', answer: 'Gravedad', age: 'adulto' },
  { emojis: '👻🏚️😱🕯️', answer: 'El Conjuro', age: 'adulto' },
];

export const EMOJIPELIS_CONFIG = {
  id: 'emojipelis',
  name: 'Película en Emojis',
  emoji: '🎬',
  color: 'indigo',
  short: 'Adivina la película por sus emojis. Opción múltiple por edad.',
};
