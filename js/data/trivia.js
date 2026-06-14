/* ===========================================================
   data/trivia.js — Preguntas para "Trivia del Patio"
   { age, cat, q, options:[A,B,C,D], correct (0-3) }
   age: 'nina' (8) | 'ado' (14+) | 'adulto' (27/50)
   Banco ampliado: Disney (todas las edades), matemáticas (14+),
   pelis famosas, hogar/cocina/escuela, Panamá, etc.
   correct = índice (0-3) de la respuesta correcta.
   =========================================================== */

export const TRIVIA = [
  /* ===================== NIÑA (8 años) ===================== */
  // Animales / naturaleza
  { age: 'nina', cat: 'Animales', q: '¿Cuál es el ave nacional de Panamá?', options: ['El tucán', 'El águila harpía', 'El loro', 'El colibrí'], correct: 1 },
  { age: 'nina', cat: 'Animales', q: 'La rana dorada de Panamá es de color…', options: ['Azul', 'Verde', 'Amarilla/dorada', 'Roja'], correct: 2 },
  { age: 'nina', cat: 'Animales', q: '¿Qué animal vive en los árboles y se mueve muy lento?', options: ['El mono', 'El perezoso', 'El venado', 'El conejo'], correct: 1 },
  { age: 'nina', cat: 'Animales', q: '¿Cuál de estos animales vive en el mar?', options: ['El tucán', 'El delfín', 'El mono', 'La iguana'], correct: 1 },
  { age: 'nina', cat: 'Animales', q: '¿Qué come principalmente el perezoso?', options: ['Carne', 'Hojas', 'Pescado', 'Insectos'], correct: 1 },
  { age: 'nina', cat: 'Animales', q: 'El tucán se reconoce por su gran…', options: ['Cola', 'Pico', 'Orejas', 'Cuerno'], correct: 1 },
  { age: 'nina', cat: 'Animales', q: '¿Cuántas patas tiene una araña?', options: ['6', '8', '10', '4'], correct: 1 },
  { age: 'nina', cat: 'Animales', q: '¿Qué animal dice "muu"?', options: ['El perro', 'La vaca', 'El gato', 'El pato'], correct: 1 },
  // Disney / pelis para niños
  { age: 'nina', cat: 'Disney', q: 'En "Frozen", ¿cómo se llama el muñeco de nieve?', options: ['Olaf', 'Sven', 'Kristoff', 'Hans'], correct: 0 },
  { age: 'nina', cat: 'Disney', q: 'En "Encanto", la familia Madrigal vive en…', options: ['México', 'Colombia', 'Brasil', 'España'], correct: 1 },
  { age: 'nina', cat: 'Disney', q: '¿Qué princesa tiene una iguana mascota llamada Pascal?', options: ['Moana', 'Rapunzel', 'Elsa', 'Ariel'], correct: 1 },
  { age: 'nina', cat: 'Disney', q: 'En "El Rey León", ¿cómo se llama el león pequeño?', options: ['Mufasa', 'Simba', 'Scar', 'Timón'], correct: 1 },
  { age: 'nina', cat: 'Disney', q: 'En "Moana", su amigo gallito se llama…', options: ['Heihei', 'Pua', 'Maui', 'Tala'], correct: 0 },
  { age: 'nina', cat: 'Disney', q: 'El pez payaso de "Buscando a Nemo" se llama…', options: ['Dory', 'Nemo', 'Marlin', 'Bruce'], correct: 1 },
  { age: 'nina', cat: 'Disney', q: 'En "Toy Story", el vaquero se llama…', options: ['Buzz', 'Woody', 'Rex', 'Jessie'], correct: 1 },
  { age: 'nina', cat: 'Disney', q: '¿De qué color es el vestido de Cenicienta en el baile?', options: ['Rojo', 'Azul', 'Verde', 'Rosado'], correct: 1 },
  { age: 'nina', cat: 'Disney', q: 'En "La Sirenita", Ariel es una…', options: ['Bruja', 'Sirena', 'Princesa humana', 'Hada'], correct: 1 },
  { age: 'nina', cat: 'Disney', q: 'En "Encanto", ¿qué hermana es muy fuerte?', options: ['Isabela', 'Luisa', 'Mirabel', 'Dolores'], correct: 1 },
  { age: 'nina', cat: 'Disney', q: 'El amigo burro aparece en la película…', options: ['Shrek', 'Cars', 'Bambi', 'Dumbo'], correct: 0 },
  { age: 'nina', cat: 'Disney', q: '¿Quién es el ratón más famoso de Disney?', options: ['Jerry', 'Mickey Mouse', 'Stuart', 'Remy'], correct: 1 },
  // Escuela / básicas
  { age: 'nina', cat: 'Escuela', q: 'Si tienes 3 lápices y te regalan 2 más, ¿cuántos tienes?', options: ['4', '5', '6', '3'], correct: 1 },
  { age: 'nina', cat: 'Escuela', q: '¿Cuántos días tiene una semana?', options: ['5', '6', '7', '8'], correct: 2 },
  { age: 'nina', cat: 'Escuela', q: '¿Qué planeta es donde vivimos?', options: ['Marte', 'La Tierra', 'Júpiter', 'La Luna'], correct: 1 },
  { age: 'nina', cat: 'Colores', q: 'Si mezclas azul y amarillo, ¿qué color sale?', options: ['Verde', 'Morado', 'Naranja', 'Rosado'], correct: 0 },
  { age: 'nina', cat: 'Escuela', q: '¿Cuántos colores tiene el arcoíris?', options: ['5', '7', '9', '3'], correct: 1 },
  { age: 'nina', cat: 'Escuela', q: '¿Cuál es la figura que tiene 3 lados?', options: ['Cuadrado', 'Triángulo', 'Círculo', 'Rombo'], correct: 1 },
  { age: 'nina', cat: 'Escuela', q: '¿Qué número va después del 9?', options: ['8', '10', '11', '0'], correct: 1 },
  { age: 'nina', cat: 'Escuela', q: '¿Cuántas estaciones para jugar tiene la mañana? (¿Cuántas horas tiene un día?)', options: ['12', '24', '10', '60'], correct: 1 },
  // Panamá fácil / tradiciones
  { age: 'nina', cat: 'Panamá', q: 'La bandera de Panamá tiene estrellas de color…', options: ['Roja y azul', 'Verde y amarilla', 'Negra y blanca', 'Rosada y morada'], correct: 0 },
  { age: 'nina', cat: 'Panamá', q: '¿Con qué se hacen las hojaldras?', options: ['Con masa de harina', 'Con arroz', 'Con frijoles', 'Con papa'], correct: 0 },
  { age: 'nina', cat: 'Panamá', q: '¿Qué se usa para bailar el tamborito?', options: ['Traje de baño', 'La pollera', 'Disfraz de superhéroe', 'Pijama'], correct: 1 },
  { age: 'nina', cat: 'Comida', q: '¿Cuál de estas es una fruta?', options: ['La zanahoria', 'El mango', 'La papa', 'La cebolla'], correct: 1 },
  { age: 'nina', cat: 'Comida', q: '¿Qué bebida sale de las vacas?', options: ['El jugo', 'La leche', 'El agua', 'La soda'], correct: 1 },
  { age: 'nina', cat: 'Cuerpo', q: '¿Con qué parte del cuerpo olemos?', options: ['Las orejas', 'La nariz', 'Los ojos', 'Las manos'], correct: 1 },
  { age: 'nina', cat: 'Cuerpo', q: '¿Cuántos dedos tienes en una mano?', options: ['4', '5', '6', '10'], correct: 1 },
  { age: 'nina', cat: 'Naturaleza', q: '¿Qué cae del cielo cuando llueve?', options: ['Arena', 'Agua', 'Hojas', 'Piedras'], correct: 1 },
  { age: 'nina', cat: 'Naturaleza', q: '¿De qué color es el cielo en un día soleado?', options: ['Verde', 'Azul', 'Rojo', 'Café'], correct: 1 },
  { age: 'nina', cat: 'Pelis', q: 'En "Minions", los minions son de color…', options: ['Verde', 'Amarillo', 'Azul', 'Rojo'], correct: 1 },
  { age: 'nina', cat: 'Pelis', q: 'En "Madagascar", ¿qué animal es Alex?', options: ['Una jirafa', 'Un león', 'Un hipopótamo', 'Una cebra'], correct: 1 },

  /* ===================== JOVEN (14+) ===================== */
  // Matemáticas (simples)
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuánto es 7 × 8?', options: ['54', '56', '58', '63'], correct: 1 },
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuánto es 12 × 12?', options: ['122', '124', '144', '142'], correct: 2 },
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuánto es el 50% de 80?', options: ['30', '40', '50', '60'], correct: 1 },
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuánto es 9 × 6?', options: ['54', '56', '45', '63'], correct: 0 },
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuánto es 100 ÷ 4?', options: ['20', '25', '40', '15'], correct: 1 },
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuánto es 3/4 en decimal?', options: ['0.25', '0.5', '0.75', '0.34'], correct: 2 },
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuál es el siguiente número primo después del 7?', options: ['8', '9', '11', '10'], correct: 2 },
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuánto es 15 + 27?', options: ['42', '32', '52', '40'], correct: 0 },
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuánto es 2 al cuadrado más 3 al cuadrado? (2²+3²)', options: ['10', '13', '12', '25'], correct: 1 },
  { age: 'ado', cat: 'Matemáticas', q: '¿Cuántos lados tiene un hexágono?', options: ['5', '6', '7', '8'], correct: 1 },
  // Gaming
  { age: 'ado', cat: 'Gaming', q: 'En Minecraft, ¿qué criatura explota si te acercas?', options: ['Zombie', 'Creeper', 'Esqueleto', 'Enderman'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: '¿En qué juego caes de un autobús volador?', options: ['Roblox', 'Fortnite', 'Among Us', 'FIFA'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: 'En Among Us, al impostor hay que…', options: ['Curarlo', 'Votarlo (echarlo)', 'Seguirlo', 'Ignorarlo'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: '¿Qué empresa creó la consola PlayStation?', options: ['Nintendo', 'Sony', 'Microsoft', 'Sega'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: 'En Pokémon, el eléctrico amarillo famoso es…', options: ['Charmander', 'Pikachu', 'Bulbasaur', 'Squirtle'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: 'Una "skin" en videojuegos es…', options: ['Una vida extra', 'Un aspecto/disfraz', 'Un arma', 'Un nivel'], correct: 1 },
  { age: 'ado', cat: 'Gaming', q: 'El fontanero más famoso de los videojuegos es…', options: ['Sonic', 'Mario', 'Link', 'Kirby'], correct: 1 },
  // Música urbana / pop
  { age: 'ado', cat: 'Música', q: 'El artista urbano panameño de "Otro Trago" es…', options: ['Sech', 'Boza', 'Ozuna', 'Anuel'], correct: 0 },
  { age: 'ado', cat: 'Música', q: '"Hecha Pa\' Mí" es un éxito del panameño…', options: ['Boza', 'Sech', 'Maluma', 'Feid'], correct: 0 },
  { age: 'ado', cat: 'Música', q: 'El género urbano nacido en Panamá fue base del…', options: ['Reggaetón', 'Jazz', 'Rock clásico', 'Ópera'], correct: 0 },
  { age: 'ado', cat: 'Música', q: 'El panameño Sech es de la provincia de…', options: ['Chiriquí', 'Colón', 'Panamá (capital)', 'Darién'], correct: 2 },
  { age: 'ado', cat: 'Redes', q: '¿Qué app es famosa por videos cortos y bailes?', options: ['LinkedIn', 'TikTok', 'Excel', 'Zoom'], correct: 1 },
  { age: 'ado', cat: 'Redes', q: '¿En qué plataforma se transmite jugando en vivo?', options: ['Twitch', 'Pinterest', 'Outlook', 'Spotify'], correct: 0 },
  // Pelis famosas / cultura pop
  { age: 'ado', cat: 'Cine', q: 'El traje rojo y telarañas es de…', options: ['Batman', 'Spider-Man', 'Iron Man', 'Thor'], correct: 1 },
  { age: 'ado', cat: 'Cine', q: '¿Quién es el villano morado que chasquea los dedos en Avengers?', options: ['Loki', 'Thanos', 'Ultron', 'Venom'], correct: 1 },
  { age: 'ado', cat: 'Cine', q: 'En "Harry Potter", la escuela de magia se llama…', options: ['Narnia', 'Hogwarts', 'Asgard', 'Gotham'], correct: 1 },
  { age: 'ado', cat: 'Cine', q: 'El anime de un ninja con un zorro de nueve colas es…', options: ['Dragon Ball', 'Naruto', 'Pokémon', 'One Piece'], correct: 1 },
  { age: 'ado', cat: 'Cine', q: 'En "Star Wars", la espada de los Jedi se llama…', options: ['Espada láser/sable de luz', 'Varita', 'Katana', 'Lanza'], correct: 0 },
  { age: 'ado', cat: 'Disney', q: 'En "Coco", el niño protagonista se llama…', options: ['Miguel', 'Héctor', 'Ernesto', 'Diego'], correct: 0 },
  { age: 'ado', cat: 'Disney', q: '¿Qué empresa compró Marvel y Star Wars?', options: ['Sony', 'Disney', 'Warner', 'Netflix'], correct: 1 },
  { age: 'ado', cat: 'Disney', q: 'En "Zootopia", la protagonista coneja es policía y se llama…', options: ['Judy', 'Nick', 'Flash', 'Gazelle'], correct: 0 },
  // Geografía / general
  { age: 'ado', cat: 'Geografía', q: '¿Cuál es el océano más grande del mundo?', options: ['Atlántico', 'Pacífico', 'Índico', 'Ártico'], correct: 1 },
  { age: 'ado', cat: 'Geografía', q: '¿En qué continente está Panamá?', options: ['Sudamérica', 'Norteamérica/Centroamérica', 'Europa', 'Asia'], correct: 1 },
  { age: 'ado', cat: 'Ciencia', q: '¿Cuál es el planeta más cercano al Sol?', options: ['Venus', 'Mercurio', 'Marte', 'Tierra'], correct: 1 },
  { age: 'ado', cat: 'Ciencia', q: 'El agua se congela a los…', options: ['0 °C', '10 °C', '100 °C', '-10 °C'], correct: 0 },
  { age: 'ado', cat: 'Deportes', q: '¿Cada cuántos años son los Juegos Olímpicos de verano?', options: ['2', '3', '4', '5'], correct: 2 },
  { age: 'ado', cat: 'Deportes', q: 'En fútbol, ¿cuántos jugadores tiene un equipo en cancha?', options: ['9', '10', '11', '12'], correct: 2 },
  { age: 'ado', cat: 'Música', q: 'El panameño "Boza" se hizo viral con la canción…', options: ['Hecha Pa\' Mí', 'Despacito', 'Gasolina', 'Tusa'], correct: 0 },

  /* ===================== ADULTOS (27/50) ===================== */
  // Canal e historia
  { age: 'adulto', cat: 'Canal', q: '¿En qué año Panamá tomó control total del Canal?', options: ['1989', '1999', '2009', '1979'], correct: 1 },
  { age: 'adulto', cat: 'Canal', q: 'Las esclusas del Pacífico más visitadas son las de…', options: ['Gatún', 'Miraflores', 'Pedro Miguel', 'Agua Clara'], correct: 1 },
  { age: 'adulto', cat: 'Canal', q: 'El Canal conecta el Atlántico con el…', options: ['Índico', 'Pacífico', 'Ártico', 'Mediterráneo'], correct: 1 },
  { age: 'adulto', cat: 'Canal', q: 'La ampliación con esclusas nuevas se inauguró en…', options: ['2006', '2016', '2020', '1999'], correct: 1 },
  { age: 'adulto', cat: 'Canal', q: 'El lago artificial clave para el Canal es el lago…', options: ['Gatún', 'Alajuela', 'Bayano', 'Fortuna'], correct: 0 },
  { age: 'adulto', cat: 'Historia', q: 'Panamá se separó de Colombia en el año…', options: ['1821', '1903', '1925', '1941'], correct: 1 },
  { age: 'adulto', cat: 'Historia', q: 'La moneda de Panamá, además del dólar, se llama…', options: ['Peso', 'Balboa', 'Quetzal', 'Colón'], correct: 1 },
  { age: 'adulto', cat: 'Historia', q: 'El explorador que avistó el Mar del Sur (Pacífico) fue…', options: ['Colón', 'Balboa', 'Pizarro', 'Cortés'], correct: 1 },
  { age: 'adulto', cat: 'Historia', q: 'El boxeador "Manos de Piedra" es…', options: ['Eusebio Pedroza', 'Roberto Durán', 'Celestino Caballero', 'Panamá Al Brown'], correct: 1 },
  { age: 'adulto', cat: 'Historia', q: 'El primer panameño en ganar oro olímpico fue…', options: ['Irving Saladino', 'Lloyd La Beach', 'Alonso Edward', 'Eileen Coparropa'], correct: 0 },
  // Geografía nacional
  { age: 'adulto', cat: 'Geografía', q: '¿Cuántas provincias tiene Panamá?', options: ['7', '9', '10', '12'], correct: 2 },
  { age: 'adulto', cat: 'Geografía', q: 'La capital de Chiriquí es…', options: ['Penonomé', 'David', 'Chitré', 'Santiago'], correct: 1 },
  { age: 'adulto', cat: 'Geografía', q: 'El punto más alto de Panamá es el…', options: ['Cerro Ancón', 'Volcán Barú', 'Cerro Punta', 'Cerro Tute'], correct: 1 },
  { age: 'adulto', cat: 'Geografía', q: '¿Qué comarca es famosa por las islas de San Blas?', options: ['Ngäbe-Buglé', 'Emberá', 'Guna Yala', 'Naso'], correct: 2 },
  { age: 'adulto', cat: 'Geografía', q: 'La provincia más al este, frontera con Colombia, es…', options: ['Darién', 'Colón', 'Veraguas', 'Herrera'], correct: 0 },
  { age: 'adulto', cat: 'Geografía', q: 'La península de Azuero abarca Los Santos y…', options: ['Herrera', 'Coclé', 'Colón', 'Bocas del Toro'], correct: 0 },
  // Música nacional
  { age: 'adulto', cat: 'Música', q: 'Rubén Blades es famoso por la canción de salsa…', options: ['Pedro Navaja', 'La Bamba', 'Oye Como Va', 'El Cantante'], correct: 0 },
  { age: 'adulto', cat: 'Música', q: 'Rubén Blades fue candidato a la… de Panamá', options: ['Alcaldía', 'Presidencia', 'Embajada', 'Diputación'], correct: 1 },
  { age: 'adulto', cat: 'Música', q: 'Los hermanos Sandoval son íconos de la música…', options: ['Típica/folclórica', 'Rock', 'Ópera', 'Electrónica'], correct: 0 },
  { age: 'adulto', cat: 'Música', q: 'Osvaldo Ayala es un reconocido… de música típica', options: ['Cantante de ópera', 'Acordeonista', 'Pianista de jazz', 'Guitarrista de rock'], correct: 1 },
  // Matemáticas (más reto)
  { age: 'adulto', cat: 'Matemáticas', q: '¿Cuánto es el 15% de 200?', options: ['20', '30', '15', '45'], correct: 1 },
  { age: 'adulto', cat: 'Matemáticas', q: '¿Cuánto es 144 ÷ 12?', options: ['11', '12', '14', '13'], correct: 1 },
  { age: 'adulto', cat: 'Matemáticas', q: 'Si un artículo cuesta $80 y tiene 25% de descuento, ¿cuál es el precio final?', options: ['$55', '$60', '$65', '$70'], correct: 1 },
  { age: 'adulto', cat: 'Matemáticas', q: '¿Cuánto es la raíz cuadrada de 169?', options: ['11', '12', '13', '14'], correct: 2 },
  { age: 'adulto', cat: 'Matemáticas', q: '¿Cuántos minutos hay en 2 horas y media?', options: ['120', '130', '150', '160'], correct: 2 },
  { age: 'adulto', cat: 'Matemáticas', q: '¿Cuánto es 7 × 13?', options: ['81', '91', '101', '84'], correct: 1 },
  // Hogar / cocina / general
  { age: 'adulto', cat: 'Cocina', q: 'El arroz con guandú no puede faltar en…', options: ['Carnaval', 'Navidad', 'Semana Santa', 'Halloween'], correct: 1 },
  { age: 'adulto', cat: 'Cocina', q: '¿Qué ingrediente hace que el pan crezca?', options: ['Sal', 'Levadura', 'Azúcar', 'Aceite'], correct: 1 },
  { age: 'adulto', cat: 'Cocina', q: 'El ceviche panameño se prepara curando el pescado en…', options: ['Vinagre', 'Limón', 'Aceite', 'Agua'], correct: 1 },
  { age: 'adulto', cat: 'Hogar', q: '¿Qué electrodoméstico se usa para conservar alimentos fríos?', options: ['El horno', 'La refrigeradora', 'La licuadora', 'La plancha'], correct: 1 },
  { age: 'adulto', cat: 'Hogar', q: 'El voltaje común de los enchufes en Panamá es…', options: ['110V', '220V', '12V', '380V'], correct: 0 },
  // Cultura general / cine adulto
  { age: 'adulto', cat: 'Ciencia', q: '¿Cuál es el planeta más grande del sistema solar?', options: ['Saturno', 'Júpiter', 'Neptuno', 'Tierra'], correct: 1 },
  { age: 'adulto', cat: 'Ciencia', q: '¿Qué gas respiran las plantas y nosotros exhalamos?', options: ['Oxígeno', 'Dióxido de carbono', 'Hidrógeno', 'Helio'], correct: 1 },
  { age: 'adulto', cat: 'Cine', q: 'La película "Titanic" fue dirigida por…', options: ['Steven Spielberg', 'James Cameron', 'Christopher Nolan', 'Quentin Tarantino'], correct: 1 },
  { age: 'adulto', cat: 'Cine', q: 'En "El Padrino", la familia mafiosa se apellida…', options: ['Soprano', 'Corleone', 'Montana', 'Gambino'], correct: 1 },
  { age: 'adulto', cat: 'Geografía', q: '¿Cuál es el archipiélago turístico del Caribe panameño?', options: ['Las Perlas', 'Bocas del Toro', 'Taboga', 'Coiba'], correct: 1 },
  { age: 'adulto', cat: 'Cultura', q: 'El traje típico femenino de Panamá es la…', options: ['Pollera', 'Mola', 'Montuna', 'Basquiña'], correct: 0 },
];

export const TRIVIA_CONFIG = {
  id: 'trivia',
  name: 'Trivia del Patio',
  emoji: '🧠',
  color: 'violet',
  short: 'Opción múltiple por edades (Disney, mates, Panamá y más).',
};
