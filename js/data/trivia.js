/* ===========================================================
   data/trivia.js — Preguntas para "Trivia del Patio"
   Cada entrada: { age, cat, q, options:[A,B,C,D], correct (0-3) }
   age: 'nina' (8) | 'ado' (14) | 'adulto' (27/50)
   60+ preguntas. correct = índice de la respuesta correcta.
   =========================================================== */

export const TRIVIA = [
  /* =================== NIÑA (8 años) ===================
     Películas animadas, animales de Panamá, tradiciones, escuela */
  { age: 'nina', cat: 'Animales', q: '¿Cuál es el ave nacional de Panamá?', options: ['El tucán', 'El águila harpía', 'El loro', 'El colibrí'], correct: 1 },
  { age: 'nina', cat: 'Animales', q: 'La rana dorada de Panamá es de color…', options: ['Azul', 'Verde', 'Amarilla/dorada', 'Roja'], correct: 2 },
  { age: 'nina', cat: 'Pelis', q: 'En "Frozen", ¿cómo se llama el muñeco de nieve?', options: ['Olaf', 'Sven', 'Kristoff', 'Hans'], correct: 0 },
  { age: 'nina', cat: 'Pelis', q: 'En "Encanto", la familia vive en…', options: ['México', 'Colombia', 'Brasil', 'España'], correct: 1 },
  { age: 'nina', cat: 'Pelis', q: '¿Quién es la princesa que tiene una iguana mascota llamada Pascal?', options: ['Moana', 'Rapunzel', 'Elsa', 'Ariel'], correct: 1 },
  { age: 'nina', cat: 'Pelis', q: 'En "El Rey León", ¿cómo se llama el león pequeño?', options: ['Mufasa', 'Simba', 'Scar', 'Timón'], correct: 1 },
  { age: 'nina', cat: 'Animales', q: '¿Qué animal perezoso vive en los árboles de Panamá?', options: ['El mono', 'El perezoso', 'El venado', 'El conejo'], correct: 1 },
  { age: 'nina', cat: 'Escuela', q: 'Si tienes 3 lápices y te regalan 2 más, ¿cuántos tienes?', options: ['4', '5', '6', '3'], correct: 1 },
  { age: 'nina', cat: 'Colores', q: 'La bandera de Panamá tiene estrellas de color…', options: ['Roja y azul', 'Verde y amarilla', 'Negra y blanca', 'Rosada y morada'], correct: 0 },
  { age: 'nina', cat: 'Animales', q: '¿Cuál de estos animales vive en el mar?', options: ['El tucán', 'El delfín', 'El mono', 'La iguana'], correct: 1 },
  { age: 'nina', cat: 'Pelis', q: 'En "Moana", su amigo gallito se llama…', options: ['Heihei', 'Pua', 'Maui', 'Tala'], correct: 0 },
  { age: 'nina', cat: 'Comida', q: '¿Con qué se hacen las hojaldras?', options: ['Con masa de harina', 'Con arroz', 'Con frijoles', 'Con papa'], correct: 0 },
  { age: 'nina', cat: 'Animales', q: '¿Qué come principalmente el perezoso?', options: ['Carne', 'Hojas', 'Pescado', 'Insectos'], correct: 1 },
  { age: 'nina', cat: 'Escuela', q: '¿Cuántos días tiene una semana?', options: ['5', '6', '7', '8'], correct: 2 },
  { age: 'nina', cat: 'Pelis', q: 'El personaje de Pixar que es un pez payaso se llama…', options: ['Dory', 'Nemo', 'Marlin', 'Bruce'], correct: 1 },
  { age: 'nina', cat: 'Tradición', q: '¿Qué se usa para bailar el tamborito?', options: ['Un vestido de baño', 'La pollera', 'Un disfraz de superhéroe', 'Pijama'], correct: 1 },
  { age: 'nina', cat: 'Animales', q: 'El tucán se reconoce por su gran…', options: ['Cola', 'Pico', 'Orejas', 'Cuerno'], correct: 1 },
  { age: 'nina', cat: 'Escuela', q: '¿Qué planeta es el nuestro?', options: ['Marte', 'La Tierra', 'Júpiter', 'La Luna'], correct: 1 },
  { age: 'nina', cat: 'Pelis', q: 'En "Toy Story", el vaquero se llama…', options: ['Buzz', 'Woody', 'Rex', 'Jessie'], correct: 1 },
  { age: 'nina', cat: 'Colores', q: 'Si mezclas azul y amarillo, ¿qué color sale?', options: ['Verde', 'Morado', 'Naranja', 'Rosado'], correct: 0 },

  /* =================== ADOLESCENTE (14 años) ===================
     Cultura pop, gaming, música urbana, redes */
  { age: 'ado', cat: 'Gaming', q: 'En Minecraft, ¿qué criatura explota si te acercas?', options: ['Zombie', 'Creeper', 'Esqueleto', 'Enderman'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: '¿En qué juego "construyes" y caes de un autobús volador?', options: ['Roblox', 'Fortnite', 'Among Us', 'FIFA'], correct: 1 },
  { age: 'ado', cat: 'Música', q: 'El cantante panameño de "Sandungueo" y dembow pionero fue…', options: ['Bad Bunny', 'El General', 'Sech', 'Daddy Yankee'], correct: 1 },
  { age: 'ado', cat: 'Música', q: 'El artista urbano panameño de "Otro Trago" es…', options: ['Sech', 'Boza', 'Ozuna', 'Anuel'], correct: 0 },
  { age: 'ado', cat: 'Música', q: '"Hecha Pa\' Mí" es un éxito del panameño…', options: ['Boza', 'Sech', 'Maluma', 'Feid'], correct: 0 },
  { age: 'ado', cat: 'Redes', q: '¿Qué app es famosa por sus videos cortos y bailes?', options: ['LinkedIn', 'TikTok', 'Excel', 'Zoom'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: 'En Among Us, al impostor hay que…', options: ['Curarlo', 'Votarlo (echarlo)', 'Seguirlo', 'Ignorarlo'], correct: 1 },
  { age: 'ado', cat: 'Cultura pop', q: 'El traje rojo y telarañas es de…', options: ['Batman', 'Spider-Man', 'Iron Man', 'Thor'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: '¿Qué empresa creó la consola PlayStation?', options: ['Nintendo', 'Sony', 'Microsoft', 'Sega'], correct: 1 },
  { age: 'ado', cat: 'Música', q: 'El género urbano nacido en Panamá fue base del…', options: ['Reggaetón', 'Jazz', 'Rock clásico', 'Ópera'], correct: 0 },
  { age: 'ado', cat: 'Cultura pop', q: '¿En qué red se "stremea" jugando videojuegos en vivo?', options: ['Twitch', 'Pinterest', 'Outlook', 'Spotify'], correct: 0 },
  { age: 'ado', cat: 'Gaming', q: 'En FIFA/EA FC, marcar significa…', options: ['Perder', 'Hacer un gol', 'Falta', 'Tarjeta roja'], correct: 1 },
  { age: 'ado', cat: 'Cultura pop', q: '¿Quién es el villano morado de Marvel que chasquea los dedos?', options: ['Loki', 'Thanos', 'Ultron', 'Venom'], correct: 1 },
  { age: 'ado', cat: 'Música', q: 'El panameño "Boza" se hizo viral con la canción…', options: ['Hecha Pa\' Mí', 'Despacito', 'Gasolina', 'Tusa'], correct: 0 },
  { age: 'ado', cat: 'Redes', q: 'Un "influencer" es alguien que…', options: ['Cocina solo', 'Tiene muchos seguidores', 'Trabaja en banco', 'Maneja buses'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: 'Roblox es famoso porque puedes…', options: ['Solo ver pelis', 'Jugar muchos juegos creados por usuarios', 'Llamar por teléfono', 'Editar Word'], correct: 1 },
  { age: 'ado', cat: 'Cultura pop', q: 'El anime de un ninja con un zorro de nueve colas es…', options: ['Dragon Ball', 'Naruto', 'Pokémon', 'One Piece'], correct: 1 },
  { age: 'ado', cat: 'Música', q: 'El panameño Sech es de la provincia de…', options: ['Chiriquí', 'Colón', 'Panamá (capital)', 'Darién'], correct: 2 },
  { age: 'ado', cat: 'Gaming', q: 'En Pokémon, el primer eléctrico amarillo famoso es…', options: ['Charmander', 'Pikachu', 'Bulbasaur', 'Squirtle'], correct: 1 },
  { age: 'ado', cat: 'Cultura pop', q: 'Una "skin" en videojuegos es…', options: ['Una vida extra', 'Un aspecto/disfraz del personaje', 'Un arma', 'Un nivel'], correct: 1 },

  /* =================== ADULTOS (27 / 50 años) ===================
     Canal, geografía, historia, Rubén Blades, música nacional */
  { age: 'adulto', cat: 'Canal', q: '¿En qué año Panamá tomó control total del Canal?', options: ['1989', '1999', '2009', '1979'], correct: 1 },
  { age: 'adulto', cat: 'Canal', q: 'Las esclusas en el Pacífico más visitadas son las de…', options: ['Gatún', 'Miraflores', 'Pedro Miguel', 'Agua Clara'], correct: 1 },
  { age: 'adulto', cat: 'Música', q: 'Rubén Blades es famoso por la canción de salsa…', options: ['Pedro Navaja', 'La Bamba', 'Oye Como Va', 'El Cantante'], correct: 0 },
  { age: 'adulto', cat: 'Historia', q: 'Panamá se separó de Colombia en el año…', options: ['1821', '1903', '1925', '1941'], correct: 1 },
  { age: 'adulto', cat: 'Geografía', q: '¿Cuántas provincias tiene Panamá?', options: ['7', '9', '10', '12'], correct: 2 },
  { age: 'adulto', cat: 'Geografía', q: 'La capital de la provincia de Chiriquí es…', options: ['Penonomé', 'David', 'Chitré', 'Santiago'], correct: 1 },
  { age: 'adulto', cat: 'Música', q: 'Los hermanos Sandoval son íconos de la música…', options: ['Típica/folclórica', 'Rock', 'Ópera', 'Electrónica'], correct: 0 },
  { age: 'adulto', cat: 'Geografía', q: 'El punto más alto de Panamá es el…', options: ['Cerro Ancón', 'Volcán Barú', 'Cerro Punta', 'Cerro Tute'], correct: 1 },
  { age: 'adulto', cat: 'Canal', q: 'El Canal de Panamá conecta el Atlántico con el…', options: ['Índico', 'Pacífico', 'Ártico', 'Mediterráneo'], correct: 1 },
  { age: 'adulto', cat: 'Historia', q: 'El boxeador "Manos de Piedra" es…', options: ['Eusebio Pedroza', 'Roberto Durán', 'Celestino Caballero', 'Panamá Al Brown'], correct: 1 },
  { age: 'adulto', cat: 'Geografía', q: '¿Qué comarca es famosa por las islas de San Blas?', options: ['Ngäbe-Buglé', 'Emberá', 'Guna Yala', 'Naso'], correct: 2 },
  { age: 'adulto', cat: 'Música', q: 'Rubén Blades también fue candidato a la… de Panamá', options: ['Alcaldía', 'Presidencia', 'Embajada', 'Diputación'], correct: 1 },
  { age: 'adulto', cat: 'Historia', q: 'La moneda de Panamá, además del dólar, se llama…', options: ['Peso', 'Balboa', 'Quetzal', 'Colón'], correct: 1 },
  { age: 'adulto', cat: 'Geografía', q: 'La provincia más al este, frontera con Colombia, es…', options: ['Darién', 'Colón', 'Veraguas', 'Herrera'], correct: 0 },
  { age: 'adulto', cat: 'Canal', q: 'La ampliación del Canal con esclusas nuevas se inauguró en…', options: ['2006', '2016', '2020', '1999'], correct: 1 },
  { age: 'adulto', cat: 'Historia', q: '¿Quién dirigió la invasión que derrocó a Noriega en 1989?', options: ['España', 'Estados Unidos', 'Colombia', 'México'], correct: 1 },
  { age: 'adulto', cat: 'Geografía', q: 'El "lago artificial" clave para el Canal es el lago…', options: ['Gatún', 'Alajuela', 'Bayano', 'Fortuna'], correct: 0 },
  { age: 'adulto', cat: 'Música', q: 'Osvaldo Ayala es un reconocido acordeonista de música…', options: ['Salsa', 'Típica', 'Jazz', 'Bolero'], correct: 1 },
  { age: 'adulto', cat: 'Geografía', q: 'La península de Azuero abarca Los Santos y…', options: ['Herrera', 'Coclé', 'Colón', 'Bocas del Toro'], correct: 0 },
  { age: 'adulto', cat: 'Historia', q: 'El explorador que avistó el Mar del Sur (Pacífico) fue…', options: ['Colón', 'Balboa', 'Pizarro', 'Cortés'], correct: 1 },
  { age: 'adulto', cat: 'Cultura', q: 'El plato de Navidad infaltable es el arroz con…', options: ['Guandú', 'Coco', 'Pollo', 'Camarón'], correct: 0 },
  { age: 'adulto', cat: 'Música', q: '"Patria" es una canción muy querida de…', options: ['Rubén Blades', 'Erika Ender', 'Flex', 'Danilo Pérez'], correct: 0 },
  { age: 'adulto', cat: 'Geografía', q: 'El archipiélago turístico del Caribe panameño es…', options: ['Las Perlas', 'Bocas del Toro', 'Taboga', 'Coiba'], correct: 1 },
  { age: 'adulto', cat: 'Historia', q: 'El primer panameño en ganar oro olímpico fue…', options: ['Irving Saladino', 'Lloyd La Beach', 'Alonso Edward', 'Eileen Coparropa'], correct: 0 },
];

export const TRIVIA_CONFIG = {
  id: 'trivia',
  name: 'Trivia del Patio',
  emoji: '🧠',
  color: 'violet',
  short: 'Opción múltiple por edades. ¡20 segundos por pregunta!',
};

export const AGE_LABELS = {
  nina:   { label: 'Niña (8)',        emoji: '🧒', tip: 'Pelis, animales y escuela' },
  ado:    { label: 'Adolescente (14)', emoji: '🧑', tip: 'Gaming, música urbana, pop' },
  adulto: { label: 'Adultos (27/50)',  emoji: '🧔', tip: 'Canal, historia, música nacional' },
};
