/* ===========================================================
   data/ordena.js — Banco para "Ordena la Palabra" (anagramas)
   { word, cat }   La dificultad se decide por longitud en el juego.
   =========================================================== */

export const ORDENA = [
  // Animales
  { word: 'Gato', cat: 'Animales' }, { word: 'Perro', cat: 'Animales' }, { word: 'León', cat: 'Animales' },
  { word: 'Pato', cat: 'Animales' }, { word: 'Rana', cat: 'Animales' }, { word: 'Tigre', cat: 'Animales' },
  { word: 'Caballo', cat: 'Animales' }, { word: 'Elefante', cat: 'Animales' }, { word: 'Cocodrilo', cat: 'Animales' },
  { word: 'Mariposa', cat: 'Animales' }, { word: 'Tortuga', cat: 'Animales' }, { word: 'Delfín', cat: 'Animales' },
  { word: 'Pájaro', cat: 'Animales' }, { word: 'Serpiente', cat: 'Animales' }, { word: 'Conejo', cat: 'Animales' },
  // Frutas
  { word: 'Pera', cat: 'Frutas' }, { word: 'Uva', cat: 'Frutas' }, { word: 'Mango', cat: 'Frutas' },
  { word: 'Fresa', cat: 'Frutas' }, { word: 'Banano', cat: 'Frutas' }, { word: 'Naranja', cat: 'Frutas' },
  { word: 'Sandía', cat: 'Frutas' }, { word: 'Manzana', cat: 'Frutas' }, { word: 'Limón', cat: 'Frutas' },
  { word: 'Cereza', cat: 'Frutas' }, { word: 'Durazno', cat: 'Frutas' },
  // Comida
  { word: 'Pizza', cat: 'Comida' }, { word: 'Taco', cat: 'Comida' }, { word: 'Arroz', cat: 'Comida' },
  { word: 'Sopa', cat: 'Comida' }, { word: 'Queso', cat: 'Comida' }, { word: 'Pollo', cat: 'Comida' },
  { word: 'Pescado', cat: 'Comida' }, { word: 'Tortilla', cat: 'Comida' }, { word: 'Empanada', cat: 'Comida' },
  { word: 'Helado', cat: 'Comida' }, { word: 'Galleta', cat: 'Comida' }, { word: 'Hojaldra', cat: 'Comida' },
  // Objetos
  { word: 'Mesa', cat: 'Objetos' }, { word: 'Silla', cat: 'Objetos' }, { word: 'Reloj', cat: 'Objetos' },
  { word: 'Llave', cat: 'Objetos' }, { word: 'Lápiz', cat: 'Objetos' }, { word: 'Teléfono', cat: 'Objetos' },
  { word: 'Ventana', cat: 'Objetos' }, { word: 'Espejo', cat: 'Objetos' }, { word: 'Sombrero', cat: 'Objetos' },
  { word: 'Mochila', cat: 'Objetos' }, { word: 'Paraguas', cat: 'Objetos' }, { word: 'Botella', cat: 'Objetos' },
  // Profesiones
  { word: 'Doctor', cat: 'Profesiones' }, { word: 'Maestro', cat: 'Profesiones' }, { word: 'Policía', cat: 'Profesiones' },
  { word: 'Bombero', cat: 'Profesiones' }, { word: 'Cocinero', cat: 'Profesiones' }, { word: 'Piloto', cat: 'Profesiones' },
  { word: 'Cantante', cat: 'Profesiones' }, { word: 'Pintor', cat: 'Profesiones' }, { word: 'Abogado', cat: 'Profesiones' },
  { word: 'Ingeniero', cat: 'Profesiones' },
  // Lugares
  { word: 'Playa', cat: 'Lugares' }, { word: 'Parque', cat: 'Lugares' }, { word: 'Escuela', cat: 'Lugares' },
  { word: 'Cine', cat: 'Lugares' }, { word: 'Hospital', cat: 'Lugares' }, { word: 'Mercado', cat: 'Lugares' },
  { word: 'Montaña', cat: 'Lugares' }, { word: 'Ciudad', cat: 'Lugares' }, { word: 'Puente', cat: 'Lugares' },
  { word: 'Castillo', cat: 'Lugares' },
  // Deportes
  { word: 'Fútbol', cat: 'Deportes' }, { word: 'Tenis', cat: 'Deportes' }, { word: 'Boxeo', cat: 'Deportes' },
  { word: 'Natación', cat: 'Deportes' }, { word: 'Ciclismo', cat: 'Deportes' }, { word: 'Béisbol', cat: 'Deportes' },
  { word: 'Karate', cat: 'Deportes' },
  // Colores
  { word: 'Rojo', cat: 'Colores' }, { word: 'Azul', cat: 'Colores' }, { word: 'Verde', cat: 'Colores' },
  { word: 'Amarillo', cat: 'Colores' }, { word: 'Morado', cat: 'Colores' }, { word: 'Rosado', cat: 'Colores' },
  { word: 'Negro', cat: 'Colores' }, { word: 'Blanco', cat: 'Colores' },
];

export const ORDENA_CONFIG = {
  id: 'ordena',
  name: 'Ordena la Palabra',
  emoji: '🔤',
  color: 'lime',
  short: 'Letras revueltas: ¡ordena la palabra antes del tiempo!',
};
