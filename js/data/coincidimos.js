/* ===========================================================
   data/coincidimos.js — Banco para "¿Coincidimos?"
   Palabra/tema disparador. 2 jugadores escriben una asociación.
   El objetivo (coincidir / no coincidir) lo elige el juego al azar.
   =========================================================== */

export const SEMILLAS = [
  'Playa', 'Animal', 'Color', 'Fruta', 'Comida', 'País', 'Película',
  'Deporte', 'Bebida', 'Profesión', 'Algo rojo', 'Algo frío',
  'Un superhéroe', 'Una emoción', 'Un día de la semana', 'Postre',
  'Instrumento musical', 'Algo que vuela', 'Un animal del mar',
  'Marca de carro', 'Una ciudad', 'Algo de la cocina', 'Un número del 1 al 10',
  'Una caricatura', 'Algo dulce', 'Una parte del cuerpo', 'Verdura',
  'Algo redondo', 'Un mes del año', 'Una flor', 'Un mueble',
  'Algo que da miedo', 'Una estación del año', 'Un planeta',
  'Algo en el baño', 'Una red social', 'Un videojuego', 'Una canción',
  'Un cantante', 'Algo en el carro', 'Un electrodoméstico',
  'Comida típica de Panamá', 'Una playa de Panamá', 'Una jerga panameña',
  'Un postre típico', 'Algo de la escuela', 'Una herramienta',
  'Algo que compras en el chino', 'Un personaje de Disney',
  'Un sabor de helado', 'Algo que llevas a la playa', 'Una mascota',
  'Un día festivo', 'Algo amarillo', 'Una bebida caliente',
  'Un medio de transporte', 'Algo que hay en el cielo',
  'Un juego de mesa', 'Una palabra cariñosa', 'Algo que es suave',
];

export const COINCIDIMOS_CONFIG = {
  id: 'coincidimos',
  name: '¿Coincidimos?',
  emoji: '🤝',
  color: 'teal',
  short: '2 jugadores escriben en secreto. ¡A ver si coinciden (o no)!',
};
