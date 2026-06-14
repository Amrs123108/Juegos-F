/* ===========================================================
   data/stop.js — Categorías para "Stop Veloz en la Sala"
   Cada categoría está etiquetada con las edades a las que aplica.
   En el turno de cada jugador se elige una categoría de SU edad.
   { name, ages:[...] }   ages: 'nina' | 'ado' | 'adulto'
   =========================================================== */

// Letras (sin las muy difíciles para que el juego fluya en familia)
export const LETTERS = 'ABCDEFGHIJLMNOPRSTUV'.split('');

export const CATEGORIES = [
  // ---- Fáciles (incluyen a la niña de 8) ----
  { name: 'Animales', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Frutas', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Colores', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Comidas que te gustan', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Juguetes', ages: ['nina', 'ado'] },
  { name: 'Partes del cuerpo', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Cosas de la casa', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Útiles escolares', ages: ['nina', 'ado'] },
  { name: 'Nombres de personas', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Películas o caricaturas', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Animales del mar', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Cosas de la cocina', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Ropa', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Algo que es dulce', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Personajes de Disney', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Verduras o vegetales', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Algo redondo', ages: ['nina', 'ado', 'adulto'] },
  { name: 'Cosas que vuelan', ages: ['nina', 'ado', 'adulto'] },

  // ---- Medias (joven 14+ y adultos) ----
  { name: 'Profesiones u oficios', ages: ['ado', 'adulto'] },
  { name: 'Países del mundo', ages: ['ado', 'adulto'] },
  { name: 'Ciudades del mundo', ages: ['ado', 'adulto'] },
  { name: 'Marcas conocidas', ages: ['ado', 'adulto'] },
  { name: 'Deportes', ages: ['ado', 'adulto'] },
  { name: 'Videojuegos', ages: ['ado', 'adulto'] },
  { name: 'Series o novelas', ages: ['ado', 'adulto'] },
  { name: 'Cantantes o artistas', ages: ['ado', 'adulto'] },
  { name: 'Apps del celular', ages: ['ado', 'adulto'] },
  { name: 'Instrumentos musicales', ages: ['ado', 'adulto'] },
  { name: 'Comidas típicas panameñas', ages: ['ado', 'adulto'] },
  { name: 'Playas de Panamá', ages: ['ado', 'adulto'] },
  { name: 'Bebidas', ages: ['ado', 'adulto'] },
  { name: 'Algo del supermercado', ages: ['ado', 'adulto'] },
  { name: 'Superhéroes', ages: ['ado', 'adulto'] },

  // ---- Difíciles (solo adultos) ----
  { name: 'Provincias o comarcas de Panamá', ages: ['adulto'] },
  { name: 'Jergas / palabras del patio', ages: ['adulto'] },
  { name: 'Famosos panameños', ages: ['adulto'] },
  { name: 'Ríos o lagos de Panamá', ages: ['adulto'] },
  { name: 'Apellidos panameños', ages: ['adulto'] },
  { name: 'Lugares turísticos de Panamá', ages: ['adulto'] },
  { name: 'Personajes históricos', ages: ['adulto'] },
  { name: 'Marcas de carros', ages: ['adulto'] },
  { name: 'Capitales del mundo', ages: ['adulto'] },
  { name: 'Tradiciones de Panamá', ages: ['adulto'] },
];

export const STOP_CONFIG = {
  id: 'stop',
  name: 'Stop Veloz en la Sala',
  emoji: '⚡',
  color: 'amber',
  short: 'Letra + categoría según tu edad. ¡Di una palabra antes del 0!',
};
