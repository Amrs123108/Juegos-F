/* ===========================================================
   data/adivinalo.js — Banco para "¡Adivínalo!"
   Se muestra un EMOJI grande tapado por mosaicos que se revelan
   poco a poco. La familia adivina qué es. El operador marca acierto.
   { emoji, answer, cat, age }   age: 'nina' | 'ado' | 'adulto'
   =========================================================== */

export const ADIVINALO = [
  /* ---- NIÑA (8): animales y objetos fáciles ---- */
  { emoji: '🐶', answer: 'Perro', cat: 'Animales', age: 'nina' },
  { emoji: '🐱', answer: 'Gato', cat: 'Animales', age: 'nina' },
  { emoji: '🦁', answer: 'León', cat: 'Animales', age: 'nina' },
  { emoji: '🐘', answer: 'Elefante', cat: 'Animales', age: 'nina' },
  { emoji: '🐸', answer: 'Rana', cat: 'Animales', age: 'nina' },
  { emoji: '🐢', answer: 'Tortuga', cat: 'Animales', age: 'nina' },
  { emoji: '🦋', answer: 'Mariposa', cat: 'Animales', age: 'nina' },
  { emoji: '🐝', answer: 'Abeja', cat: 'Animales', age: 'nina' },
  { emoji: '🍎', answer: 'Manzana', cat: 'Comida', age: 'nina' },
  { emoji: '🍌', answer: 'Banana', cat: 'Comida', age: 'nina' },
  { emoji: '🍕', answer: 'Pizza', cat: 'Comida', age: 'nina' },
  { emoji: '🍦', answer: 'Helado', cat: 'Comida', age: 'nina' },
  { emoji: '☀️', answer: 'Sol', cat: 'Naturaleza', age: 'nina' },
  { emoji: '🌈', answer: 'Arcoíris', cat: 'Naturaleza', age: 'nina' },
  { emoji: '🏠', answer: 'Casa', cat: 'Objetos', age: 'nina' },
  { emoji: '🚗', answer: 'Carro', cat: 'Objetos', age: 'nina' },
  { emoji: '⚽', answer: 'Pelota de fútbol', cat: 'Objetos', age: 'nina' },
  { emoji: '🎈', answer: 'Globo', cat: 'Objetos', age: 'nina' },

  /* ---- JOVEN (14+): un poco más variado ---- */
  { emoji: '🎮', answer: 'Control / videojuego', cat: 'Tecnología', age: 'ado' },
  { emoji: '🚀', answer: 'Cohete', cat: 'Objetos', age: 'ado' },
  { emoji: '🍔', answer: 'Hamburguesa', cat: 'Comida', age: 'ado' },
  { emoji: '🏀', answer: 'Básquetbol', cat: 'Deportes', age: 'ado' },
  { emoji: '🎸', answer: 'Guitarra', cat: 'Música', age: 'ado' },
  { emoji: '📱', answer: 'Celular', cat: 'Tecnología', age: 'ado' },
  { emoji: '🎧', answer: 'Audífonos', cat: 'Tecnología', age: 'ado' },
  { emoji: '🦈', answer: 'Tiburón', cat: 'Animales', age: 'ado' },
  { emoji: '🦄', answer: 'Unicornio', cat: 'Fantasía', age: 'ado' },
  { emoji: '🍿', answer: 'Palomitas', cat: 'Comida', age: 'ado' },
  { emoji: '🏝️', answer: 'Isla', cat: 'Lugares', age: 'ado' },
  { emoji: '⛈️', answer: 'Tormenta', cat: 'Naturaleza', age: 'ado' },
  { emoji: '🤖', answer: 'Robot', cat: 'Tecnología', age: 'ado' },
  { emoji: '🛹', answer: 'Patineta', cat: 'Deportes', age: 'ado' },
  { emoji: '🍣', answer: 'Sushi', cat: 'Comida', age: 'ado' },
  { emoji: '🎯', answer: 'Diana / dardos', cat: 'Juegos', age: 'ado' },
  { emoji: '🧩', answer: 'Rompecabezas', cat: 'Juegos', age: 'ado' },

  /* ---- ADULTO: hogar, cocina, profesiones, abstractos ---- */
  { emoji: '☕', answer: 'Café', cat: 'Cocina', age: 'adulto' },
  { emoji: '🧹', answer: 'Escoba', cat: 'Hogar', age: 'adulto' },
  { emoji: '🔑', answer: 'Llave', cat: 'Hogar', age: 'adulto' },
  { emoji: '💡', answer: 'Bombillo / idea', cat: 'Hogar', age: 'adulto' },
  { emoji: '🍳', answer: 'Sartén / huevo frito', cat: 'Cocina', age: 'adulto' },
  { emoji: '🧊', answer: 'Hielo', cat: 'Cocina', age: 'adulto' },
  { emoji: '🧺', answer: 'Canasta de ropa', cat: 'Hogar', age: 'adulto' },
  { emoji: '🩺', answer: 'Estetoscopio / doctor', cat: 'Profesiones', age: 'adulto' },
  { emoji: '⚖️', answer: 'Balanza / justicia', cat: 'Profesiones', age: 'adulto' },
  { emoji: '🔨', answer: 'Martillo', cat: 'Herramientas', age: 'adulto' },
  { emoji: '🧯', answer: 'Extintor', cat: 'Hogar', age: 'adulto' },
  { emoji: '💼', answer: 'Maletín', cat: 'Profesiones', age: 'adulto' },
  { emoji: '🚢', answer: 'Barco', cat: 'Transporte', age: 'adulto' },
  { emoji: '🏦', answer: 'Banco', cat: 'Lugares', age: 'adulto' },
  { emoji: '📈', answer: 'Gráfica subiendo', cat: 'Trabajo', age: 'adulto' },
  { emoji: '🧠', answer: 'Cerebro', cat: 'Cuerpo', age: 'adulto' },
  { emoji: '🪙', answer: 'Moneda', cat: 'Dinero', age: 'adulto' },
  { emoji: '🌋', answer: 'Volcán', cat: 'Naturaleza', age: 'adulto' },
];

export const ADIVINALO_CONFIG = {
  id: 'adivinalo',
  name: '¡Adivínalo!',
  emoji: '🔍',
  color: 'rose',
  short: 'Una imagen se revela por partes. ¡Adivina antes que se descubra!',
};
