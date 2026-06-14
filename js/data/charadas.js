/* ===========================================================
   data/charadas.js — Acciones para "Charadas y Mímicas"
   El jugador actúa SIN HABLAR. 60+ con sabor panameño.
   nivel: 'facil' (niños) | 'media' | 'dificil'
   =========================================================== */

export const CHARADAS = [
  // ---- Fáciles (ideales para la niña de 8) ----
  { text: 'Comiendo un raspao en el parque', nivel: 'facil' },
  { text: 'Bailando al ritmo de música típica', nivel: 'facil' },
  { text: 'Pateando un balón de fútbol', nivel: 'facil' },
  { text: 'Comiendo una hojaldra bien caliente', nivel: 'facil' },
  { text: 'Montando bicicleta en la calle', nivel: 'facil' },
  { text: 'Bañándose en la playa con olas', nivel: 'facil' },
  { text: 'Comiendo helado que se derrite', nivel: 'facil' },
  { text: 'Saltando charcos en la lluvia', nivel: 'facil' },
  { text: 'Volando un papagayo (cometa)', nivel: 'facil' },
  { text: 'Un perro persiguiendo su cola', nivel: 'facil' },
  { text: 'Un mono robando comida', nivel: 'facil' },
  { text: 'Soplando las velitas del cumpleaños', nivel: 'facil' },
  { text: 'Pescando en el muelle', nivel: 'facil' },
  { text: 'Un gato durmiendo todo el día', nivel: 'facil' },
  { text: 'Comiendo patacones uno por uno', nivel: 'facil' },
  { text: 'Jugando escondite', nivel: 'facil' },
  { text: 'Lavándose los dientes', nivel: 'facil' },
  { text: 'Una rana saltando en el charco', nivel: 'facil' },

  // ---- Medias (familia en general) ----
  { text: 'Tratando de tomar un metrobús bien lleno', nivel: 'media' },
  { text: 'Atrapado en el tranque de la Arraiján', nivel: 'media' },
  { text: 'Comiendo sancocho con la cuchara', nivel: 'media' },
  { text: 'Echando carne al asado en el patio', nivel: 'media' },
  { text: 'Bailando el punto en un festival', nivel: 'media' },
  { text: 'Regateando en el mercado de Abastos', nivel: 'media' },
  { text: 'Espantando zancudos toda la noche', nivel: 'media' },
  { text: 'Cargando bolsas pesadas del super', nivel: 'media' },
  { text: 'Cruzando el Canal de Panamá en barco', nivel: 'media' },
  { text: 'Sacándose una selfie en el Casco Viejo', nivel: 'media' },
  { text: 'Buscando señal de celular en el interior', nivel: 'media' },
  { text: 'Abriendo un coco con machete', nivel: 'media' },
  { text: 'Manejando en hora pico por la Transístmica', nivel: 'media' },
  { text: 'Exprimiendo limón sobre ceviche', nivel: 'media' },
  { text: 'Subiendo al Cerro Ancón a pie', nivel: 'media' },
  { text: 'Pidiendo "dame un poco más" en la fonda', nivel: 'media' },
  { text: 'Apurándose porque viene el aguacero', nivel: 'media' },
  { text: 'Espantando una iguana del techo', nivel: 'media' },
  { text: 'Vendiendo raspao bajo el sol', nivel: 'media' },
  { text: 'Bailando reggae en seco en una fiesta', nivel: 'media' },
  { text: 'Echándose protector solar en la playa', nivel: 'media' },
  { text: 'Comiendo carimañola sin quemarse', nivel: 'media' },
  { text: 'Esperando que cambie el semáforo eterno', nivel: 'media' },
  { text: 'Inflando una piscina plástica', nivel: 'media' },

  // ---- Difíciles (para los adultos) ----
  { text: 'Un guía turístico explicando las esclusas de Miraflores', nivel: 'dificil' },
  { text: 'Un pescador de Coclé recogiendo la red', nivel: 'dificil' },
  { text: 'Alguien armando una tienda de campaña en la lluvia', nivel: 'dificil' },
  { text: 'Un policía dirigiendo el tráfico en la 50', nivel: 'dificil' },
  { text: 'Una persona bailando tamborito con pollera', nivel: 'dificil' },
  { text: 'Un campesino ordeñando una vaca al amanecer', nivel: 'dificil' },
  { text: 'Alguien escalando el volcán Barú con frío', nivel: 'dificil' },
  { text: 'Un mesero balanceando muchos platos', nivel: 'dificil' },
  { text: 'Un buzo viendo peces en Bocas del Toro', nivel: 'dificil' },
  { text: 'Alguien haciendo una pollera de molas', nivel: 'dificil' },
  { text: 'Un DJ poniendo música en una fiesta de pueblo', nivel: 'dificil' },
  { text: 'Una persona corriendo de una abeja africana', nivel: 'dificil' },
  { text: 'Un árbitro pitando un penal polémico', nivel: 'dificil' },
  { text: 'Alguien recogiendo café en las montañas de Boquete', nivel: 'dificil' },
  { text: 'Un vendedor de lotería cantando los números', nivel: 'dificil' },
  { text: 'Una persona pintando una mola a mano', nivel: 'dificil' },
  { text: 'Alguien remando en una piragua por el río Chagres', nivel: 'dificil' },
  { text: 'Un turista perdido pidiendo direcciones', nivel: 'dificil' },
  { text: 'Una abuela amasando para hacer tortillas', nivel: 'dificil' },
  { text: 'Un electricista arreglando un poste de luz', nivel: 'dificil' },
];

export const CHARADAS_CONFIG = {
  id: 'charadas',
  name: 'Charadas y Mímicas',
  emoji: '🎭',
  color: 'pink',
  short: 'Actúa sin hablar. ¡La familia adivina!',
};
