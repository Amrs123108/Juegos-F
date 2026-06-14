/* ===========================================================
   data/hablasindecir.js — Banco para "Habla Sin Decir…" (Tabú)
   Describe la palabra SIN usar las palabras prohibidas.
   { word, forbidden:[...], cat, age }
   =========================================================== */

export const HABLASINDECIR = [
  /* ---- NIÑA (fáciles) ---- */
  { word: 'Perro', forbidden: ['Animal', 'Ladra', 'Mascota', 'Gato'], cat: 'Animales', age: 'nina' },
  { word: 'Sol', forbidden: ['Cielo', 'Día', 'Caliente', 'Amarillo'], cat: 'Naturaleza', age: 'nina' },
  { word: 'Pizza', forbidden: ['Comida', 'Queso', 'Italiana', 'Redonda'], cat: 'Comida', age: 'nina' },
  { word: 'Helado', forbidden: ['Frío', 'Dulce', 'Cono', 'Sabor'], cat: 'Comida', age: 'nina' },
  { word: 'Gato', forbidden: ['Animal', 'Maúlla', 'Mascota', 'Perro'], cat: 'Animales', age: 'nina' },
  { word: 'Lluvia', forbidden: ['Agua', 'Cielo', 'Nube', 'Mojado'], cat: 'Naturaleza', age: 'nina' },
  { word: 'Pelota', forbidden: ['Redonda', 'Jugar', 'Fútbol', 'Rebota'], cat: 'Objetos', age: 'nina' },
  { word: 'Manzana', forbidden: ['Fruta', 'Roja', 'Comer', 'Árbol'], cat: 'Frutas', age: 'nina' },
  { word: 'Carro', forbidden: ['Maneja', 'Ruedas', 'Calle', 'Motor'], cat: 'Transporte', age: 'nina' },
  { word: 'Payaso', forbidden: ['Circo', 'Risa', 'Nariz', 'Gracioso'], cat: 'Personas', age: 'nina' },
  { word: 'Luna', forbidden: ['Noche', 'Cielo', 'Blanca', 'Estrella'], cat: 'Naturaleza', age: 'nina' },
  { word: 'Pastel', forbidden: ['Cumpleaños', 'Dulce', 'Velas', 'Comer'], cat: 'Comida', age: 'nina' },
  { word: 'Flor', forbidden: ['Planta', 'Pétalos', 'Jardín', 'Huele'], cat: 'Naturaleza', age: 'nina' },
  { word: 'Pájaro', forbidden: ['Vuela', 'Animal', 'Alas', 'Nido'], cat: 'Animales', age: 'nina' },

  /* ---- JOVEN (medias) ---- */
  { word: 'Internet', forbidden: ['Red', 'Wifi', 'Computadora', 'Conexión'], cat: 'Tecnología', age: 'ado' },
  { word: 'Fortnite', forbidden: ['Juego', 'Battle', 'Disparar', 'Construir'], cat: 'Gaming', age: 'ado' },
  { word: 'Reggaetón', forbidden: ['Música', 'Bailar', 'Bad Bunny', 'Urbano'], cat: 'Música', age: 'ado' },
  { word: 'TikTok', forbidden: ['App', 'Videos', 'Bailes', 'Celular'], cat: 'Redes', age: 'ado' },
  { word: 'Spider-Man', forbidden: ['Araña', 'Héroe', 'Telaraña', 'Marvel'], cat: 'Cine', age: 'ado' },
  { word: 'Pizza', forbidden: ['Comida', 'Queso', 'Masa', 'Italiana'], cat: 'Comida', age: 'ado' },
  { word: 'Guitarra', forbidden: ['Música', 'Cuerdas', 'Tocar', 'Instrumento'], cat: 'Música', age: 'ado' },
  { word: 'Dinosaurio', forbidden: ['Extinto', 'Grande', 'Jurásico', 'Reptil'], cat: 'Animales', age: 'ado' },
  { word: 'Vampiro', forbidden: ['Sangre', 'Colmillos', 'Noche', 'Drácula'], cat: 'Fantasía', age: 'ado' },
  { word: 'Cámara', forbidden: ['Foto', 'Lente', 'Retrato', 'Imagen'], cat: 'Tecnología', age: 'ado' },
  { word: 'Skate', forbidden: ['Patineta', 'Ruedas', 'Trucos', 'Rampa'], cat: 'Deportes', age: 'ado' },
  { word: 'Halloween', forbidden: ['Disfraz', 'Dulces', 'Miedo', 'Calabaza'], cat: 'Fiestas', age: 'ado' },
  { word: 'Robot', forbidden: ['Máquina', 'Metal', 'Programar', 'Humano'], cat: 'Tecnología', age: 'ado' },
  { word: 'Selfie', forbidden: ['Foto', 'Celular', 'Cara', 'Solo'], cat: 'Redes', age: 'ado' },

  /* ---- ADULTO (difíciles) ---- */
  { word: 'Canal de Panamá', forbidden: ['Barco', 'Agua', 'Esclusa', 'Océano'], cat: 'Panamá', age: 'adulto' },
  { word: 'Hipoteca', forbidden: ['Banco', 'Casa', 'Préstamo', 'Deuda'], cat: 'Finanzas', age: 'adulto' },
  { word: 'Rubén Blades', forbidden: ['Salsa', 'Cantante', 'Panamá', 'Música'], cat: 'Música', age: 'adulto' },
  { word: 'Cafetera', forbidden: ['Café', 'Cocina', 'Caliente', 'Taza'], cat: 'Hogar', age: 'adulto' },
  { word: 'Democracia', forbidden: ['Votar', 'Gobierno', 'Pueblo', 'Elección'], cat: 'Política', age: 'adulto' },
  { word: 'Aguinaldo', forbidden: ['Dinero', 'Navidad', 'Trabajo', 'Sueldo'], cat: 'Trabajo', age: 'adulto' },
  { word: 'Carnaval', forbidden: ['Fiesta', 'Mojadera', 'Comparsa', 'Culeco'], cat: 'Panamá', age: 'adulto' },
  { word: 'Estetoscopio', forbidden: ['Doctor', 'Corazón', 'Escuchar', 'Médico'], cat: 'Salud', age: 'adulto' },
  { word: 'Tranque', forbidden: ['Tráfico', 'Carro', 'Calle', 'Hora pico'], cat: 'Panamá', age: 'adulto' },
  { word: 'Pasaporte', forbidden: ['Viaje', 'Documento', 'Avión', 'País'], cat: 'Viajes', age: 'adulto' },
  { word: 'Receta', forbidden: ['Cocinar', 'Ingredientes', 'Comida', 'Pasos'], cat: 'Cocina', age: 'adulto' },
  { word: 'Pollera', forbidden: ['Vestido', 'Típico', 'Panamá', 'Baile'], cat: 'Panamá', age: 'adulto' },
  { word: 'Jubilación', forbidden: ['Trabajo', 'Viejo', 'Pensión', 'Retiro'], cat: 'Trabajo', age: 'adulto' },
  { word: 'Termómetro', forbidden: ['Temperatura', 'Fiebre', 'Grados', 'Medir'], cat: 'Salud', age: 'adulto' },
  { word: 'Sancocho', forbidden: ['Sopa', 'Gallina', 'Culantro', 'Ñame'], cat: 'Comida', age: 'adulto' },
];

export const HABLASINDECIR_CONFIG = {
  id: 'hablasindecir',
  name: 'Habla Sin Decir…',
  emoji: '🤫',
  color: 'fuchsia',
  short: 'Describe la palabra SIN usar las palabras prohibidas.',
};
