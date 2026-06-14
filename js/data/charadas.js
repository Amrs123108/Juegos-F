/* ===========================================================
   data/charadas.js — Palabras para "Charadas y Mímicas"
   Ahora son PALABRAS por TEMA (no frases), con nivel por edad.
   { word, cat, nivel }  nivel: 'facil' | 'media' | 'dificil'
   La niña (8) recibe solo 'facil'.
   =========================================================== */

export const CHARADAS = [
  // ---- Animales ----
  { word: 'Perro', cat: 'Animales', nivel: 'facil' },
  { word: 'Gato', cat: 'Animales', nivel: 'facil' },
  { word: 'León', cat: 'Animales', nivel: 'facil' },
  { word: 'Elefante', cat: 'Animales', nivel: 'facil' },
  { word: 'Mono', cat: 'Animales', nivel: 'facil' },
  { word: 'Pato', cat: 'Animales', nivel: 'facil' },
  { word: 'Conejo', cat: 'Animales', nivel: 'facil' },
  { word: 'Serpiente', cat: 'Animales', nivel: 'facil' },
  { word: 'Rana', cat: 'Animales', nivel: 'facil' },
  { word: 'Tortuga', cat: 'Animales', nivel: 'facil' },
  { word: 'Pingüino', cat: 'Animales', nivel: 'media' },
  { word: 'Cangrejo', cat: 'Animales', nivel: 'media' },
  { word: 'Gallina', cat: 'Animales', nivel: 'facil' },
  { word: 'Caballo', cat: 'Animales', nivel: 'facil' },

  // ---- Profesiones ----
  { word: 'Doctor', cat: 'Profesiones', nivel: 'facil' },
  { word: 'Policía', cat: 'Profesiones', nivel: 'facil' },
  { word: 'Bombero', cat: 'Profesiones', nivel: 'facil' },
  { word: 'Maestro', cat: 'Profesiones', nivel: 'facil' },
  { word: 'Cocinero', cat: 'Profesiones', nivel: 'facil' },
  { word: 'Payaso', cat: 'Profesiones', nivel: 'facil' },
  { word: 'Futbolista', cat: 'Profesiones', nivel: 'facil' },
  { word: 'Astronauta', cat: 'Profesiones', nivel: 'media' },
  { word: 'Piloto', cat: 'Profesiones', nivel: 'media' },
  { word: 'Peluquero', cat: 'Profesiones', nivel: 'media' },
  { word: 'Mecánico', cat: 'Profesiones', nivel: 'media' },
  { word: 'Veterinario', cat: 'Profesiones', nivel: 'dificil' },
  { word: 'Arquitecto', cat: 'Profesiones', nivel: 'dificil' },
  { word: 'Fotógrafo', cat: 'Profesiones', nivel: 'dificil' },

  // ---- Comida / Cocina ----
  { word: 'Pizza', cat: 'Comida', nivel: 'facil' },
  { word: 'Helado', cat: 'Comida', nivel: 'facil' },
  { word: 'Hamburguesa', cat: 'Comida', nivel: 'facil' },
  { word: 'Banana', cat: 'Comida', nivel: 'facil' },
  { word: 'Manzana', cat: 'Comida', nivel: 'facil' },
  { word: 'Huevo frito', cat: 'Comida', nivel: 'facil' },
  { word: 'Sopa', cat: 'Comida', nivel: 'facil' },
  { word: 'Espagueti', cat: 'Comida', nivel: 'media' },
  { word: 'Patacón', cat: 'Comida', nivel: 'media' },

  // ---- Cosas del hogar / cocina ----
  { word: 'Escoba', cat: 'Hogar', nivel: 'facil' },
  { word: 'Teléfono', cat: 'Hogar', nivel: 'facil' },
  { word: 'Televisor', cat: 'Hogar', nivel: 'facil' },
  { word: 'Cama', cat: 'Hogar', nivel: 'facil' },
  { word: 'Cepillo de dientes', cat: 'Hogar', nivel: 'media' },
  { word: 'Aspiradora', cat: 'Hogar', nivel: 'media' },
  { word: 'Plancha', cat: 'Hogar', nivel: 'media' },
  { word: 'Licuadora', cat: 'Hogar', nivel: 'dificil' },

  // ---- Acciones ----
  { word: 'Dormir', cat: 'Acciones', nivel: 'facil' },
  { word: 'Llorar', cat: 'Acciones', nivel: 'facil' },
  { word: 'Reír', cat: 'Acciones', nivel: 'facil' },
  { word: 'Bailar', cat: 'Acciones', nivel: 'facil' },
  { word: 'Correr', cat: 'Acciones', nivel: 'facil' },
  { word: 'Nadar', cat: 'Acciones', nivel: 'facil' },
  { word: 'Saltar', cat: 'Acciones', nivel: 'facil' },
  { word: 'Cocinar', cat: 'Acciones', nivel: 'facil' },
  { word: 'Manejar', cat: 'Acciones', nivel: 'media' },
  { word: 'Pescar', cat: 'Acciones', nivel: 'media' },
  { word: 'Estar nervioso', cat: 'Acciones', nivel: 'dificil' },
  { word: 'Estar enamorado', cat: 'Acciones', nivel: 'dificil' },

  // ---- Deportes ----
  { word: 'Fútbol', cat: 'Deportes', nivel: 'facil' },
  { word: 'Básquetbol', cat: 'Deportes', nivel: 'facil' },
  { word: 'Béisbol', cat: 'Deportes', nivel: 'media' },
  { word: 'Natación', cat: 'Deportes', nivel: 'media' },
  { word: 'Boxeo', cat: 'Deportes', nivel: 'media' },
  { word: 'Tenis', cat: 'Deportes', nivel: 'media' },

  // ---- Personajes y pelis muy famosas ----
  { word: 'Spider-Man', cat: 'Personajes', nivel: 'facil' },
  { word: 'Elsa (Frozen)', cat: 'Personajes', nivel: 'facil' },
  { word: 'Mickey Mouse', cat: 'Personajes', nivel: 'facil' },
  { word: 'Buzz Lightyear', cat: 'Personajes', nivel: 'media' },
  { word: 'Superman', cat: 'Personajes', nivel: 'facil' },
  { word: 'Batman', cat: 'Personajes', nivel: 'facil' },
  { word: 'Pikachu', cat: 'Personajes', nivel: 'facil' },
  { word: 'Hulk', cat: 'Personajes', nivel: 'media' },

  // ---- Naturaleza ----
  { word: 'Lluvia', cat: 'Naturaleza', nivel: 'facil' },
  { word: 'Sol', cat: 'Naturaleza', nivel: 'facil' },
  { word: 'Árbol', cat: 'Naturaleza', nivel: 'facil' },
  { word: 'Flor', cat: 'Naturaleza', nivel: 'facil' },
  { word: 'Volcán', cat: 'Naturaleza', nivel: 'media' },
];

export const CHARADAS_CONFIG = {
  id: 'charadas',
  name: 'Charadas y Mímicas',
  emoji: '🎭',
  color: 'pink',
  short: 'Actúa una palabra (por temas) sin hablar. ¡La familia adivina!',
};
