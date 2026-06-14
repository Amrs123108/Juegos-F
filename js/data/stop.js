/* ===========================================================
   data/stop.js — Categorías para "Stop Veloz en la Sala"
   El juego combina una LETRA aleatoria + una CATEGORÍA.
   60+ categorías con sabor panameño.
   =========================================================== */

// Letras (sin las muy difíciles para que el juego fluya en familia)
export const LETTERS = 'ABCDEFGHIJLMNOPRSTUV'.split('');

export const CATEGORIES = [
  // Clásicas con sabor local
  'Comidas típicas panameñas',
  'Provincias o comarcas de Panamá',
  'Playas de Panamá',
  'Jergas / palabras del patio',
  'Artistas o famosos panameños',
  'Equipos o deportistas panameños',
  'Lugares turísticos de Panamá',
  'Ríos o lagos de Panamá',
  'Islas de Panamá',
  'Barrios o corregimientos',
  'Frutas que se dan en Panamá',
  'Bebidas (con o sin alcohol)',
  'Apellidos panameños',
  'Nombres de personas',
  'Animales de la fauna panameña',
  'Marcas o tiendas de Panamá',
  'Cantantes de música típica',
  'Canciones que todos conocen',
  'Plazas o centros comerciales',
  'Calles o avenidas conocidas',

  // Universales (para variar el ritmo)
  'Cosas que hay en la cocina',
  'Cosas que hay en la escuela',
  'Profesiones u oficios',
  'Países del mundo',
  'Ciudades del mundo',
  'Películas',
  'Series de TV o novelas',
  'Personajes de caricaturas',
  'Videojuegos',
  'Colores',
  'Partes del cuerpo',
  'Ropa o accesorios',
  'Útiles escolares',
  'Insectos o bichos',
  'Aves',
  'Pescados o mariscos',
  'Verduras o vegetales',
  'Postres o dulces',
  'Instrumentos musicales',
  'Deportes',

  // Divertidas / familiares
  'Algo que encuentras en el supermercado',
  'Algo que llevas a la playa',
  'Algo que da miedo',
  'Algo que huele rico',
  'Algo que es frío',
  'Algo redondo',
  'Algo que vuela',
  'Algo que encuentras en el carro',
  'Cosas que hace tu mamá',
  'Cosas de la fiesta de cumpleaños',
  'Apodos cariñosos panameños',
  'Excusas para llegar tarde',
  'Cosas que dice el profesor',
  'Cosas que hay en el celular (apps)',
  'Personajes de Disney o Pixar',
  'Superhéroes o villanos',
  'Animales del mar',
  'Cosas que compras en el chino',
  'Comidas chatarra',
  'Tradiciones o fiestas de Panamá',
  'Personajes históricos de Panamá',
  'Cosas que hay en el patio',
  'Marcas de carros',
  'Juguetes',
];

export const STOP_CONFIG = {
  id: 'stop',
  name: 'Stop Veloz en la Sala',
  emoji: '⚡',
  color: 'amber',
  short: 'Letra + categoría. ¡Di una palabra antes de que llegue a 0!',
};
