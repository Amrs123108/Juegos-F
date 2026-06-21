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

  /* ======================================================
     AMPLIACIÓN — palabras agrupadas por rango de longitud
     nina (3-5): +44  |  ado (5-7): +19  |  adulto (6-10): +15
  ====================================================== */

  // --- CORTAS 3-5 letras (nina) ---
  // Animales
  { word: 'Oso', cat: 'Animales' }, { word: 'Pez', cat: 'Animales' }, { word: 'Ave', cat: 'Animales' },
  { word: 'Loro', cat: 'Animales' }, { word: 'Mono', cat: 'Animales' }, { word: 'Zorro', cat: 'Animales' },
  { word: 'Lobo', cat: 'Animales' }, { word: 'Mula', cat: 'Animales' }, { word: 'Vaca', cat: 'Animales' },
  { word: 'Orca', cat: 'Animales' }, { word: 'Lince', cat: 'Animales' },
  // Frutas
  { word: 'Kiwi', cat: 'Frutas' }, { word: 'Pina', cat: 'Frutas' }, { word: 'Guava', cat: 'Frutas' },
  // Comida
  { word: 'Pan', cat: 'Comida' }, { word: 'Sal', cat: 'Comida' }, { word: 'Carne', cat: 'Comida' },
  { word: 'Leche', cat: 'Comida' }, { word: 'Torta', cat: 'Comida' }, { word: 'Arroz', cat: 'Comida' },
  // Objetos cortos
  { word: 'Dado', cat: 'Objetos' }, { word: 'Cama', cat: 'Objetos' }, { word: 'Taza', cat: 'Objetos' },
  { word: 'Vela', cat: 'Objetos' }, { word: 'Caja', cat: 'Objetos' }, { word: 'Bola', cat: 'Objetos' },
  { word: 'Olla', cat: 'Objetos' }, { word: 'Jarra', cat: 'Objetos' }, { word: 'Nube', cat: 'Naturaleza' },
  { word: 'Luna', cat: 'Naturaleza' }, { word: 'Lago', cat: 'Naturaleza' }, { word: 'Roca', cat: 'Naturaleza' },
  // Acciones / palabras sencillas
  { word: 'Jugar', cat: 'Acciones' }, { word: 'Amar', cat: 'Acciones' }, { word: 'Reír', cat: 'Acciones' },
  { word: 'Nadar', cat: 'Acciones' }, { word: 'Volar', cat: 'Acciones' }, { word: 'Leer', cat: 'Acciones' },
  { word: 'Correr', cat: 'Acciones' },
  // Colores cortos
  { word: 'Cyan', cat: 'Colores' }, { word: 'Gris', cat: 'Colores' }, { word: 'Coral', cat: 'Colores' },
  // Lugares cortos
  { word: 'Mar', cat: 'Lugares' }, { word: 'Isla', cat: 'Lugares' }, { word: 'Río', cat: 'Lugares' },
  { word: 'Selva', cat: 'Lugares' },

  // --- MEDIAS 5-7 letras (ado) ---
  { word: 'Flauta', cat: 'Música' }, { word: 'Guitarra', cat: 'Música' }, { word: 'Tambor', cat: 'Música' },
  { word: 'Violín', cat: 'Música' }, { word: 'Trompeta', cat: 'Música' },
  { word: 'Brújula', cat: 'Objetos' }, { word: 'Espada', cat: 'Objetos' }, { word: 'Escudo', cat: 'Objetos' },
  { word: 'Mochila', cat: 'Objetos' }, { word: 'Cámara', cat: 'Objetos' },
  { word: 'Dragón', cat: 'Fantasía' }, { word: 'Hechizo', cat: 'Fantasía' }, { word: 'Castillo', cat: 'Lugares' },
  { word: 'Volcán', cat: 'Naturaleza' }, { word: 'Desierto', cat: 'Naturaleza' },
  { word: 'Ciclismo', cat: 'Deportes' }, { word: 'Patinaje', cat: 'Deportes' },
  { word: 'Mercado', cat: 'Lugares' }, { word: 'Oficina', cat: 'Lugares' },

  // --- LARGAS 6-10 letras (adulto) ---
  { word: 'Abogado', cat: 'Profesiones' }, { word: 'Farmacia', cat: 'Lugares' },
  { word: 'Volcánico', cat: 'Naturaleza' }, { word: 'Periódico', cat: 'Objetos' },
  { word: 'Diccionario', cat: 'Objetos' }, { word: 'Telescopio', cat: 'Ciencia' },
  { word: 'Microscopio', cat: 'Ciencia' }, { word: 'Electrodoméstico', cat: 'Hogar' },
  { word: 'Presupuesto', cat: 'Finanzas' }, { word: 'Parlamento', cat: 'Política' },
  { word: 'Terremoto', cat: 'Naturaleza' }, { word: 'Economista', cat: 'Profesiones' },
  { word: 'Cirugía', cat: 'Salud' }, { word: 'Democracia', cat: 'Política' },
  { word: 'Arquitecto', cat: 'Profesiones' },

  // ── Ampliación ─────────────────────────────────────────
  // Animales extra
  { word: 'Pingüino', cat: 'Animales' }, { word: 'Camaleón', cat: 'Animales' },
  { word: 'Hipopótamo', cat: 'Animales' }, { word: 'Murciélago', cat: 'Animales' },
  { word: 'Canguro', cat: 'Animales' }, { word: 'Flamenco', cat: 'Animales' },
  { word: 'Colibrí', cat: 'Animales' }, { word: 'Guepardo', cat: 'Animales' },
  // Frutas panameñas / tropicales
  { word: 'Guayaba', cat: 'Frutas' }, { word: 'Marañón', cat: 'Frutas' },
  { word: 'Maracuyá', cat: 'Frutas' }, { word: 'Níspero', cat: 'Frutas' },
  { word: 'Carambola', cat: 'Frutas' }, { word: 'Tamarindo', cat: 'Frutas' },
  { word: 'Caimito', cat: 'Frutas' }, { word: 'Nance', cat: 'Frutas' },
  // Comida panameña
  { word: 'Sancocho', cat: 'Comida' }, { word: 'Hojaldra', cat: 'Comida' },
  { word: 'Patacón', cat: 'Comida' }, { word: 'Chicheme', cat: 'Comida' },
  { word: 'Carimanola', cat: 'Comida' }, { word: 'Tortilla', cat: 'Comida' },
  // Países
  { word: 'Colombia', cat: 'Países' }, { word: 'Venezuela', cat: 'Países' },
  { word: 'Honduras', cat: 'Países' }, { word: 'Guatemala', cat: 'Países' },
  { word: 'Nicaragua', cat: 'Países' }, { word: 'El Salvador', cat: 'Países' },
  { word: 'Jamaica', cat: 'Países' }, { word: 'Ecuador', cat: 'Países' },
  // Objetos y tecnología
  { word: 'Teclado', cat: 'Tecnología' }, { word: 'Audífono', cat: 'Tecnología' },
  { word: 'Impresora', cat: 'Tecnología' }, { word: 'Proyector', cat: 'Tecnología' },
  { word: 'Calculadora', cat: 'Tecnología' }, { word: 'Altavoz', cat: 'Tecnología' },
  // Ciencias / naturaleza
  { word: 'Átomo', cat: 'Ciencia' }, { word: 'Molécula', cat: 'Ciencia' },
  { word: 'Gravedad', cat: 'Ciencia' }, { word: 'Fotosíntesis', cat: 'Ciencia' },
  { word: 'Evolución', cat: 'Ciencia' }, { word: 'Metabolismo', cat: 'Ciencia' },
  // Profesiones
  { word: 'Programador', cat: 'Profesiones' }, { word: 'Contador', cat: 'Profesiones' },
  { word: 'Enfermero', cat: 'Profesiones' }, { word: 'Ingeniero', cat: 'Profesiones' },
  { word: 'Veterinario', cat: 'Profesiones' }, { word: 'Cocinero', cat: 'Profesiones' },
  // Hogar / vida diaria
  { word: 'Refrigerador', cat: 'Hogar' }, { word: 'Lavadora', cat: 'Hogar' },
  { word: 'Ventilador', cat: 'Hogar' }, { word: 'Interruptor', cat: 'Hogar' },
  // Historia / Panamá
  { word: 'Torrijos', cat: 'Historia' }, { word: 'Independencia', cat: 'Historia' },
  { word: 'Miraflores', cat: 'Historia' }, { word: 'Balboa', cat: 'Historia' },
  { word: 'Canalero', cat: 'Historia' }, { word: 'Separación', cat: 'Historia' },
];

export const ORDENA_CONFIG = {
  id: 'ordena',
  name: 'Ordena la Palabra',
  emoji: '🔤',
  color: 'lime',
  short: 'Letras revueltas: ¡ordena la palabra antes del tiempo!',
};
