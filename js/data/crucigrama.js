/* ===========================================================
   data/crucigrama.js — Banco de palabras para "Crucigrama"
   El generador arma una cuadrícula conectada a partir de estas
   palabras. Palabras en MAYÚSCULAS, sin espacios ni acentos.
   { word, clue, emoji?, nivel }  nivel: 'facil' | 'media' | 'dificil'
   Las 'facil' (con emoji) ayudan a la niña de 8.
   =========================================================== */

export const CRUCIGRAMA = [
  // Fáciles (con emoji-imagen de apoyo) — aptas para niños
  { word: 'GATO', clue: 'Animal que dice "miau"', emoji: '🐱', nivel: 'facil' },
  { word: 'PERRO', clue: 'El mejor amigo del hombre, ladra', emoji: '🐶', nivel: 'facil' },
  { word: 'SOL', clue: 'Brilla en el cielo de día', emoji: '☀️', nivel: 'facil' },
  { word: 'LUNA', clue: 'Se ve en el cielo de noche', emoji: '🌙', nivel: 'facil' },
  { word: 'CASA', clue: 'Lugar donde vivimos', emoji: '🏠', nivel: 'facil' },
  { word: 'MANO', clue: 'Tiene cinco dedos', emoji: '✋', nivel: 'facil' },
  { word: 'PEZ', clue: 'Animal que vive en el agua', emoji: '🐟', nivel: 'facil' },
  { word: 'OSO', clue: 'Animal grande y peludo, come miel', emoji: '🐻', nivel: 'facil' },
  { word: 'FLOR', clue: 'Nace en las plantas y huele rico', emoji: '🌸', nivel: 'facil' },
  { word: 'PATO', clue: 'Ave que nada y hace "cuac"', emoji: '🦆', nivel: 'facil' },
  { word: 'LEON', clue: 'El rey de la selva', emoji: '🦁', nivel: 'facil' },
  { word: 'MAR', clue: 'Agua salada con olas', emoji: '🌊', nivel: 'facil' },
  { word: 'PAN', clue: 'Se come en el desayuno', emoji: '🍞', nivel: 'facil' },
  { word: 'OJO', clue: 'Con esto vemos', emoji: '👁️', nivel: 'facil' },
  { word: 'RANA', clue: 'Salta y vive en el charco', emoji: '🐸', nivel: 'facil' },
  { word: 'NUBE', clue: 'Blanca y flota en el cielo', emoji: '☁️', nivel: 'facil' },
  { word: 'ROSA', clue: 'Flor con espinas', emoji: '🌹', nivel: 'facil' },
  { word: 'PIE', clue: 'Parte del cuerpo para caminar', emoji: '🦶', nivel: 'facil' },

  // Medias
  { word: 'ESCUELA', clue: 'Lugar donde estudias', nivel: 'media' },
  { word: 'MAESTRO', clue: 'Persona que enseña en clase', nivel: 'media' },
  { word: 'COCINA', clue: 'Cuarto donde se prepara la comida', nivel: 'media' },
  { word: 'VENTANA', clue: 'Por aquí entra la luz al cuarto', nivel: 'media' },
  { word: 'CAMISA', clue: 'Prenda para el torso con botones', nivel: 'media' },
  { word: 'ZAPATO', clue: 'Se usa en los pies', nivel: 'media' },
  { word: 'PELOTA', clue: 'Redonda, se usa en muchos deportes', nivel: 'media' },
  { word: 'MONTANA', clue: 'Elevación muy alta de tierra', nivel: 'media' },
  { word: 'ESTRELLA', clue: 'Punto brillante en el cielo nocturno', nivel: 'media' },
  { word: 'TORTUGA', clue: 'Reptil lento con caparazón', nivel: 'media' },
  { word: 'MANZANA', clue: 'Fruta roja o verde', nivel: 'media' },
  { word: 'CULANTRO', clue: 'Hierba clave del sancocho', nivel: 'media' },
  { word: 'PLAYA', clue: 'Arena junto al mar', nivel: 'media' },
  { word: 'RELOJ', clue: 'Marca la hora', nivel: 'media' },
  { word: 'LLAVE', clue: 'Sirve para abrir la puerta', nivel: 'media' },

  // Difíciles (Panamá / cultura)
  { word: 'POLLERA', clue: 'Traje típico femenino de Panamá', nivel: 'dificil' },
  { word: 'TAMBORITO', clue: 'Baile folclórico panameño', nivel: 'dificil' },
  { word: 'BALBOA', clue: 'Moneda panameña y un explorador', nivel: 'dificil' },
  { word: 'ESCLUSA', clue: 'Sube y baja los barcos en el Canal', nivel: 'dificil' },
  { word: 'CHIRIQUI', clue: 'Provincia del volcán Barú', nivel: 'dificil' },
  { word: 'ISTMO', clue: 'Franja de tierra entre dos mares', nivel: 'dificil' },
  { word: 'CANAL', clue: 'Une dos océanos en Panamá', nivel: 'dificil' },
  { word: 'CARNAVAL', clue: 'Fiesta grande de Las Tablas', nivel: 'dificil' },
  { word: 'HOJALDRA', clue: 'Masa frita del desayuno panameño', nivel: 'dificil' },
  { word: 'PATACON', clue: 'Plátano verde frito y aplastado', nivel: 'dificil' },
];

export const CRUCIGRAMA_CONFIG = {
  id: 'crucigrama',
  name: 'Crucigrama Familiar',
  emoji: '🧩',
  color: 'cyan',
  short: 'Toda la familia llena la cuadrícula con pistas (¡algunas con imagen!).',
};
