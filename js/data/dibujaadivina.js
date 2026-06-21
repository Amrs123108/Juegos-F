/* ===========================================================
   data/dibujaadivina.js — Banco para "Dibuja y Adivina"
   La plataforma SOLO da la palabra; se dibuja en papel real.
   El dibujante elige la categoría. { word, cat }
   =========================================================== */

export const DIBUJAADIVINA = [
  // Animales
  { word: 'Perro', cat: 'Animales' }, { word: 'Gato', cat: 'Animales' }, { word: 'Elefante', cat: 'Animales' },
  { word: 'León', cat: 'Animales' }, { word: 'Jirafa', cat: 'Animales' }, { word: 'Tortuga', cat: 'Animales' },
  { word: 'Pulpo', cat: 'Animales' }, { word: 'Caballo', cat: 'Animales' }, { word: 'Mariposa', cat: 'Animales' },
  { word: 'Pingüino', cat: 'Animales' }, { word: 'Cangrejo', cat: 'Animales' }, { word: 'Serpiente', cat: 'Animales' },
  { word: 'Rana', cat: 'Animales' }, { word: 'Tiburón', cat: 'Animales' },
  // Frutas y Vegetales
  { word: 'Manzana', cat: 'Frutas y Vegetales' }, { word: 'Banano', cat: 'Frutas y Vegetales' }, { word: 'Piña', cat: 'Frutas y Vegetales' },
  { word: 'Zanahoria', cat: 'Frutas y Vegetales' }, { word: 'Sandía', cat: 'Frutas y Vegetales' }, { word: 'Uvas', cat: 'Frutas y Vegetales' },
  { word: 'Maíz', cat: 'Frutas y Vegetales' }, { word: 'Tomate', cat: 'Frutas y Vegetales' }, { word: 'Fresa', cat: 'Frutas y Vegetales' },
  { word: 'Brócoli', cat: 'Frutas y Vegetales' },
  // Profesiones
  { word: 'Doctor', cat: 'Profesiones' }, { word: 'Bombero', cat: 'Profesiones' }, { word: 'Policía', cat: 'Profesiones' },
  { word: 'Chef', cat: 'Profesiones' }, { word: 'Astronauta', cat: 'Profesiones' }, { word: 'Pintor', cat: 'Profesiones' },
  { word: 'Cartero', cat: 'Profesiones' }, { word: 'Buzo', cat: 'Profesiones' }, { word: 'Mago', cat: 'Profesiones' },
  // Objetos
  { word: 'Reloj', cat: 'Objetos' }, { word: 'Paraguas', cat: 'Objetos' }, { word: 'Bicicleta', cat: 'Objetos' },
  { word: 'Lámpara', cat: 'Objetos' }, { word: 'Tijeras', cat: 'Objetos' }, { word: 'Guitarra', cat: 'Objetos' },
  { word: 'Teléfono', cat: 'Objetos' }, { word: 'Llave', cat: 'Objetos' }, { word: 'Sombrero', cat: 'Objetos' },
  { word: 'Escalera', cat: 'Objetos' }, { word: 'Cámara', cat: 'Objetos' },
  // Marcas
  { word: 'Nike', cat: 'Marcas' }, { word: 'Apple', cat: 'Marcas' }, { word: 'McDonalds', cat: 'Marcas' },
  { word: 'Coca-Cola', cat: 'Marcas' }, { word: 'Adidas', cat: 'Marcas' }, { word: 'Ferrari', cat: 'Marcas' },
  { word: 'YouTube', cat: 'Marcas' }, { word: 'WhatsApp', cat: 'Marcas' }, { word: 'Toyota', cat: 'Marcas' },
  // Deportes
  { word: 'Fútbol', cat: 'Deportes' }, { word: 'Básquetbol', cat: 'Deportes' }, { word: 'Boxeo', cat: 'Deportes' },
  { word: 'Tenis', cat: 'Deportes' }, { word: 'Natación', cat: 'Deportes' }, { word: 'Béisbol', cat: 'Deportes' },
  { word: 'Surf', cat: 'Deportes' }, { word: 'Esquí', cat: 'Deportes' },
  // Comida
  { word: 'Pizza', cat: 'Comida' }, { word: 'Hamburguesa', cat: 'Comida' }, { word: 'Helado', cat: 'Comida' },
  { word: 'Hot dog', cat: 'Comida' }, { word: 'Sushi', cat: 'Comida' }, { word: 'Patacón', cat: 'Comida' },
  { word: 'Tamal', cat: 'Comida' }, { word: 'Sancocho', cat: 'Comida' },
  // Películas / Personajes
  { word: 'Spider-Man', cat: 'Personajes' }, { word: 'Pikachu', cat: 'Personajes' }, { word: 'Mickey Mouse', cat: 'Personajes' },
  { word: 'Elsa', cat: 'Personajes' }, { word: 'Mario', cat: 'Personajes' }, { word: 'Batman', cat: 'Personajes' },
  { word: 'Minion', cat: 'Personajes' }, { word: 'Shrek', cat: 'Personajes' },
  // Lugares
  { word: 'Playa', cat: 'Lugares' }, { word: 'Castillo', cat: 'Lugares' }, { word: 'Volcán', cat: 'Lugares' },
  { word: 'Puente', cat: 'Lugares' }, { word: 'Iglesia', cat: 'Lugares' }, { word: 'Faro', cat: 'Lugares' },
  // Acciones
  { word: 'Dormir', cat: 'Acciones' }, { word: 'Bailar', cat: 'Acciones' }, { word: 'Nadar', cat: 'Acciones' },
  { word: 'Cocinar', cat: 'Acciones' }, { word: 'Pescar', cat: 'Acciones' }, { word: 'Llorar', cat: 'Acciones' },
];

export const DIBUJAADIVINA_CONFIG = {
  id: 'dibujaadivina',
  name: 'Dibuja y Adivina',
  emoji: '✏️',
  color: 'yellow',
  short: 'Tú dibujas en papel, los demás adivinan. La app solo da la palabra.',
};
