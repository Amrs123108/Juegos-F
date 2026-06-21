/* ===========================================================
   data/agilidadmental.js — Banco para "Agilidad Mental"
   Tipos: calculo | acertijo | completar | similares | logica | lenguaje | memoria
   Edades: menor (5-8) | junior (9-12) | teen (13-17) | adulto (18+)

   Formato texto:   { tipo, edad, q, r, alt? }
   Formato MC:      { tipo, edad, q, opciones: [CORRECTA, wrong, wrong, wrong] }
   Formato similar: { tipo, edad, q, r: [...válidas], min }
   Formato memoria: { tipo, edad, secuencia: [...], q, r }
   =========================================================== */

export const AGILIDAD = [

  // ═══════════════════════════════════════════════════════
  //  CÁLCULO RÁPIDO
  // ═══════════════════════════════════════════════════════
  // menor
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 3 + 5?', r:'8' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 10 − 4?', r:'6' },
  { tipo:'calculo', edad:'menor', q:'¿Cuántas patas tiene un perro?', r:'4' },
  { tipo:'calculo', edad:'menor', q:'Si tienes 5 dulces y te comes 2, ¿cuántos quedan?', r:'3' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 4 + 4?', r:'8' },
  { tipo:'calculo', edad:'menor', q:'¿Cuántos días tiene una semana?', r:'7' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 2 × 5?', r:'10' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 9 + 3?', r:'12' },
  { tipo:'calculo', edad:'menor', q:'¿Cuántos meses tiene un año?', r:'12' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 8 − 5?', r:'3' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 6 + 7?', r:'13' },
  { tipo:'calculo', edad:'menor', q:'¿Cuántos lados tiene un cuadrado?', r:'4' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 3 × 3?', r:'9' },
  { tipo:'calculo', edad:'menor', q:'¿Cuántas horas tiene un día?', r:'24' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 15 − 8?', r:'7' },

  // junior
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 7 × 8?', r:'56' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 48 ÷ 6?', r:'8' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 12 × 12?', r:'144' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 100 − 37?', r:'63' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 9 × 9?', r:'81' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 72 ÷ 8?', r:'9' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 25 + 38?', r:'63' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 50% de 80?', r:'40' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es ½ de 150?', r:'75' },
  { tipo:'calculo', edad:'junior', q:'¿Cuántos segundos tiene un minuto?', r:'60' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 3²?', r:'9' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 144 ÷ 12?', r:'12' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 15 × 4?', r:'60' },
  { tipo:'calculo', edad:'junior', q:'Si un libro cuesta $8 y compras 5, ¿cuánto pagas?', r:'40' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 13 × 7?', r:'91' },

  // teen
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es √144?', r:'12' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 15% de 200?', r:'30' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 2⁸?', r:'256' },
  { tipo:'calculo', edad:'teen', q:'Si algo vale $80 con 25% descuento, ¿cuánto pagas?', r:'60' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es −5 + (−3)?', r:'-8' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es ³√27?', r:'3' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 0.5 × 0.5?', r:'0.25' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 30% de 300?', r:'90' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es √225?', r:'15' },
  { tipo:'calculo', edad:'teen', q:'Si x² = 49, ¿cuánto es x? (positivo)', r:'7' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 4³?', r:'64' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 18 × 15?', r:'270' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es log₁₀(100)?', r:'2' },
  { tipo:'calculo', edad:'teen', q:'¿Cuántos grados tiene un triángulo equilátero?', r:'60' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 1/4 + 3/8?', r:'5/8' },

  // adulto
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es log₁₀(1000)?', r:'3' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es 17 × 23?', r:'391' },
  { tipo:'calculo', edad:'adulto', q:'$1000 al 5% anual simple → ¿cuánto tienes en 3 años?', r:'1150' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es 40% de 2500?', r:'1000' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es la raíz cúbica de 125?', r:'5' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es 111 × 111?', r:'12321' },
  { tipo:'calculo', edad:'adulto', q:'7% de IVA en una compra de $200, ¿cuánto es el impuesto?', r:'14' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es √(16 × 25)?', r:'20' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuántos ceros tiene un millón?', r:'6' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es 2⁰ + 3⁰ + 4⁰?', r:'3' },
  { tipo:'calculo', edad:'adulto', q:'Suma de ángulos internos de un pentágono, ¿cuántos grados?', r:'540' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es 1/3 de 360?', r:'120' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es C(6,2)? (combinaciones de 6 en 2)', r:'15' },
  { tipo:'calculo', edad:'adulto', q:'Precio sube 50%, luego baja 50%. ¿Ganaste, perdiste o quedas igual?', r:'perdiste', alt:['perdiste dinero','queda menos','pierde'] },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es 25% de 25% de 400?', r:'25' },

  // ═══════════════════════════════════════════════════════
  //  ACERTIJOS
  // ═══════════════════════════════════════════════════════
  // menor
  { tipo:'acertijo', edad:'menor', q:'Tengo agujas pero no coso, tengo números pero no hablo. ¿Qué soy?', r:'reloj', alt:['un reloj'] },
  { tipo:'acertijo', edad:'menor', q:'Soy redondo, reboto y los niños me patan. ¿Qué soy?', r:'pelota', alt:['balon','balón','una pelota','un balón'] },
  { tipo:'acertijo', edad:'menor', q:'Tengo hojas pero no soy planta, guardo palabras sin hablar. ¿Qué soy?', r:'libro', alt:['un libro'] },
  { tipo:'acertijo', edad:'menor', q:'Vuelo sin alas, lloro sin ojos. ¿Qué soy?', r:'nube', alt:['la nube','una nube'] },
  { tipo:'acertijo', edad:'menor', q:'Cuanto más me secas, más mojado quedo. ¿Qué soy?', r:'toalla', alt:['una toalla'] },
  { tipo:'acertijo', edad:'menor', q:'Tengo dientes pero no muerdo. ¿Qué soy?', r:'peine', alt:['un peine'] },
  { tipo:'acertijo', edad:'menor', q:'Soy alto de joven y bajo de viejo. ¿Qué soy?', r:'vela', alt:['una vela'] },
  { tipo:'acertijo', edad:'menor', q:'Tengo cola pero no soy animal, me lanzan al aire y subo. ¿Qué soy?', r:'cometa', alt:['una cometa'] },

  // junior
  { tipo:'acertijo', edad:'junior', q:'Entre más me sacas, más grande soy. ¿Qué soy?', r:'hoyo', alt:['un hoyo','hueco','un hueco'] },
  { tipo:'acertijo', edad:'junior', q:'Tengo ciudades sin casas, bosques sin árboles, ríos sin agua. ¿Qué soy?', r:'mapa', alt:['un mapa'] },
  { tipo:'acertijo', edad:'junior', q:'Puedo viajar por todo el mundo sin moverme de tu carta. ¿Qué soy?', r:'sello', alt:['un sello','estampilla','una estampilla'] },
  { tipo:'acertijo', edad:'junior', q:'Todo el mundo la tiene, nadie puede perderla, aunque te la roben la sigues teniendo. ¿Qué es?', r:'nombre', alt:['tu nombre','el nombre','mi nombre'] },
  { tipo:'acertijo', edad:'junior', q:'Corro siempre pero no tengo piernas; siempre hablo pero no tengo lengua. ¿Qué soy?', r:'rio', alt:['un río','el río','río'] },
  { tipo:'acertijo', edad:'junior', q:'¿Cuántas veces puedes restar 10 de 100?', r:'una', alt:['1','una vez','solo una'] },
  { tipo:'acertijo', edad:'junior', q:'¿Qué cosa tiene muchos agujeros pero retiene el agua?', r:'esponja', alt:['una esponja'] },
  { tipo:'acertijo', edad:'junior', q:'¿Qué es más útil cuando está roto?', r:'huevo', alt:['el huevo','un huevo'] },

  // teen
  { tipo:'acertijo', edad:'teen', q:'Puedo ser roto sin tocarlo, dado sin tenerlo, cumplido sin hacerlo. ¿Qué soy?', r:'promesa', alt:['una promesa'] },
  { tipo:'acertijo', edad:'teen', q:'Soy el principio de todo, el fin del tiempo, la mitad del universo. ¿Qué soy?', r:'la letra e', alt:['e','letra e'] },
  { tipo:'acertijo', edad:'teen', q:'Si me nombras, me destruyes. ¿Qué soy?', r:'silencio', alt:['el silencio'] },
  { tipo:'acertijo', edad:'teen', q:'Tiene un cuello pero no cabeza, tiene un cuerpo pero no pies. ¿Qué es?', r:'botella', alt:['una botella'] },
  { tipo:'acertijo', edad:'teen', q:'Siempre estoy delante de ti, pero nunca puedes verme. ¿Qué soy?', r:'futuro', alt:['el futuro'] },
  { tipo:'acertijo', edad:'teen', q:'¿Qué viene una vez al minuto, dos veces en un momento, pero nunca en cien años?', r:'la letra m', alt:['m','letra m'] },
  { tipo:'acertijo', edad:'teen', q:'No puedo ser tocado, visto ni oído, pero sin mí no puedes sentir nada. ¿Qué soy?', r:'tiempo', alt:['el tiempo'] },
  { tipo:'acertijo', edad:'teen', q:'¿Qué hace más ruido cuanto menos tiene?', r:'barril vacio', alt:['barril vacío','un barril vacío','balde vacío'] },

  // adulto
  { tipo:'acertijo', edad:'adulto', q:'Un hombre construyó una casa con 4 lados, todos mirando al sur. ¿De qué color es el oso que pasó frente a ella?', r:'blanco', alt:['blanco oso polar','polar'] },
  { tipo:'acertijo', edad:'adulto', q:'¿Qué es lo que no existe pero tiene nombre?', r:'nada', alt:['la nada'] },
  { tipo:'acertijo', edad:'adulto', q:'¿Qué empieza con "e", termina con "e" y solo tiene una letra?', r:'sobre', alt:['un sobre'] },
  { tipo:'acertijo', edad:'adulto', q:'Soy ligero como pluma pero ni el hombre más fuerte puede cargarme más de 2 minutos. ¿Qué soy?', r:'aliento', alt:['el aliento','el aire','respiracion','respiración'] },
  { tipo:'acertijo', edad:'adulto', q:'¿Qué es tuyo, pero otros lo usan más que tú?', r:'tu nombre', alt:['nombre','mi nombre','el nombre'] },
  { tipo:'acertijo', edad:'adulto', q:'Cuantas más personas piensen en mí, más difícil soy de recordar. ¿Qué soy?', r:'sueno', alt:['sueño','un sueño','los sueños'] },
  { tipo:'acertijo', edad:'adulto', q:'Puedes atraparme pero no puedes lanzarme. ¿Qué soy?', r:'resfriado', alt:['un resfriado','catarro','un catarro','gripe'] },
  { tipo:'acertijo', edad:'adulto', q:'La paradoja del mentiroso: "Esta afirmación es falsa." ¿Es verdadera o falsa?', r:'paradoja', alt:['es una paradoja','ninguna','no se puede determinar','ambas'] },

  // ═══════════════════════════════════════════════════════
  //  COMPLETAR PALABRA CON PISTAS
  // ═══════════════════════════════════════════════════════
  // menor
  { tipo:'completar', edad:'menor', q:'🐾 Animal doméstico · hace "miau" · tiene bigotes', r:'gato', alt:['un gato'] },
  { tipo:'completar', edad:'menor', q:'🦋 Insecto · tiene alas de colores · viene de una oruga', r:'mariposa' },
  { tipo:'completar', edad:'menor', q:'❄️ Cae del cielo · es fría · es blanca', r:'nieve' },
  { tipo:'completar', edad:'menor', q:'🐘 Animal gris · tiene trompa · es el más grande de tierra', r:'elefante' },
  { tipo:'completar', edad:'menor', q:'🌈 Aparece tras la lluvia · tiene 7 colores · está en el cielo', r:'arcoiris', alt:['arco iris','arco-iris'] },
  { tipo:'completar', edad:'menor', q:'🍎 Fruta · roja o verde · tiene semillas adentro · la doctora la recomienda', r:'manzana' },
  { tipo:'completar', edad:'menor', q:'☀️ Estrella · brilla de día · da calor y luz', r:'sol', alt:['el sol'] },
  { tipo:'completar', edad:'menor', q:'🐢 Animal verde · tiene caparazón · camina muy lento', r:'tortuga' },

  // junior
  { tipo:'completar', edad:'junior', q:'🎸 Instrumento musical · tiene 6 cuerdas · la tocan en rock y flamenco', r:'guitarra' },
  { tipo:'completar', edad:'junior', q:'🌋 Montaña · lanza lava · hace erupción', r:'volcan', alt:['volcán'] },
  { tipo:'completar', edad:'junior', q:'📖 Libro especial · tiene palabras y definiciones · en orden alfabético', r:'diccionario' },
  { tipo:'completar', edad:'junior', q:'🪐 Planeta gigante · el más grande del sistema solar · tiene la Gran Mancha Roja', r:'jupiter', alt:['júpiter'] },
  { tipo:'completar', edad:'junior', q:'🔭 Instrumento científico · mide temperatura · tiene un líquido rojo o plateado', r:'termometro', alt:['termómetro'] },
  { tipo:'completar', edad:'junior', q:'📐 Figura geométrica · 4 caras triangulares · la hay en Egipto y México', r:'piramide', alt:['pirámide'] },
  { tipo:'completar', edad:'junior', q:'🦕 Animal extinto · vivió hace millones de años · algunos eran gigantes', r:'dinosaurio' },
  { tipo:'completar', edad:'junior', q:'🌍 Proceso de las plantas · usa luz solar · produce oxígeno', r:'fotosintesis', alt:['fotosíntesis'] },

  // teen
  { tipo:'completar', edad:'teen', q:'🧬 Partícula química · más pequeña que una célula · formada por átomos', r:'molecula', alt:['molécula'] },
  { tipo:'completar', edad:'teen', q:'💻 Secuencia de pasos · base de la programación · resuelve un problema paso a paso', r:'algoritmo' },
  { tipo:'completar', edad:'teen', q:'🗳️ Sistema político · se decide por votaciones · representación del pueblo', r:'democracia' },
  { tipo:'completar', edad:'teen', q:'🌊 Ola gigante · causada por terremotos submarinos · puede arrasar costas', r:'tsunami' },
  { tipo:'completar', edad:'teen', q:'⚡ Orgánulo de la célula · produce energía · llamado la "central eléctrica"', r:'mitocondria' },
  { tipo:'completar', edad:'teen', q:'🌐 Red de seres vivos · incluye fauna y flora · interacción con el ambiente', r:'ecosistema' },
  { tipo:'completar', edad:'teen', q:'💊 Rama de la medicina · estudia las enfermedades · hace diagnósticos', r:'medicina' },
  { tipo:'completar', edad:'teen', q:'📡 Tipo de energía · no contaminante · viene del sol directamente', r:'solar', alt:['energia solar','energía solar'] },

  // adulto
  { tipo:'completar', edad:'adulto', q:'📜 Documento legal · leyes fundamentales de un país · "carta magna"', r:'constitucion', alt:['constitución'] },
  { tipo:'completar', edad:'adulto', q:'🏦 Préstamo bancario · se usa para comprar casa · se paga mensualmente por años', r:'hipoteca' },
  { tipo:'completar', edad:'adulto', q:'📈 Fenómeno económico · precios suben · el dinero pierde poder adquisitivo', r:'inflacion', alt:['inflación'] },
  { tipo:'completar', edad:'adulto', q:'⚖️ Juez de alto rango · pertenece a un tribunal supremo · interpreta la constitución', r:'magistrado' },
  { tipo:'completar', edad:'adulto', q:'💰 Apoyo económico del gobierno · reduce el costo de un bien o servicio · a veces se da a agricultores', r:'subsidio' },
  { tipo:'completar', edad:'adulto', q:'🔬 Ciencia del comportamiento humano · estudia la mente · Freud la desarrolló', r:'psicologia', alt:['psicología'] },
  { tipo:'completar', edad:'adulto', q:'🏛️ Exceso de trámites y papeles · asociado al gobierno · hace los procesos lentos', r:'burocracia' },
  { tipo:'completar', edad:'adulto', q:'💡 Relación entre trabajo y valor · concepto de Marx · plusvalía viene de aquí', r:'capitalismo', alt:['plusvalia','plusvalía','valor trabajo'] },

  // ═══════════════════════════════════════════════════════
  //  SIMILARES — nombra N cosas válidas
  // ═══════════════════════════════════════════════════════
  // menor
  { tipo:'similares', edad:'menor', q:'¡Nombra 3 colores! (cualquiera)', r:['rojo','azul','verde','amarillo','morado','naranja','rosa','blanco','negro','gris','café','rosado'], min:3 },
  { tipo:'similares', edad:'menor', q:'¡Nombra 3 animales que viven en el agua!', r:['pez','tiburon','delfin','ballena','pulpo','cangrejo','tortuga marina','foca','nutria','salmon','trucha','raya','medusa','calamar','langosta','camaron'], min:3 },
  { tipo:'similares', edad:'menor', q:'¡Nombra 3 frutas!', r:['manzana','banano','pera','uva','mango','fresa','naranja','sandia','limon','pina','piña','papaya','melon','durazno','cereza','guayaba','kiwi','coco'], min:3 },
  { tipo:'similares', edad:'menor', q:'¡Nombra 3 medios de transporte!', r:['carro','auto','bus','tren','avion','barco','bicicleta','moto','helicoptero','metro','camion','taxi','bote','lancha'], min:3 },
  { tipo:'similares', edad:'menor', q:'¡Nombra 3 cosas que puedes encontrar en una cocina!', r:['olla','sarten','cuchillo','tenedor','cuchara','plato','vaso','nevera','estufa','microondas','licuadora','taza','colador'], min:3 },

  // junior
  { tipo:'similares', edad:'junior', q:'¡Nombra 3 países de América del Sur!', r:['colombia','venezuela','brasil','peru','chile','argentina','ecuador','bolivia','uruguay','paraguay','guyana','surinam'], min:3 },
  { tipo:'similares', edad:'junior', q:'¡Nombra 3 planetas del sistema solar!', r:['mercurio','venus','tierra','marte','jupiter','saturno','urano','neptuno'], min:3 },
  { tipo:'similares', edad:'junior', q:'¡Nombra 3 instrumentos musicales de viento!', r:['flauta','trompeta','saxofon','clarinete','trombon','tuba','oboe','corno','cuerno'], min:3 },
  { tipo:'similares', edad:'junior', q:'¡Nombra 3 tipos de triángulos!', r:['equilatero','isosceles','escaleno','rectangulo','acutangulo','obtusangulo','equilátero','isósceles'], min:2 },
  { tipo:'similares', edad:'junior', q:'¡Nombra 3 inventos del siglo XX!', r:['avion','television','internet','computadora','penicilina','radio','telefono','celular','plastico','microondas','antibiotico'], min:3 },

  // teen
  { tipo:'similares', edad:'teen', q:'¡Nombra 3 tipos de energía renovable!', r:['solar','eolica','hidraulica','geotermal','maremotriz','biomasica','biomasa','hidrotérmica','eólica'], min:3 },
  { tipo:'similares', edad:'teen', q:'¡Nombra 3 filósofos griegos clásicos!', r:['socrates','platon','aristoteles','heraclito','pitagoras','tales','anaxagoras','democrito','epicuro','zenon'], min:3 },
  { tipo:'similares', edad:'teen', q:'¡Nombra 3 obras de Shakespeare!', r:['hamlet','otelo','romeo y julieta','macbeth','el rey lear','el mercader de venecia','la tempestad','el sueño de una noche de verano','julio cesar'], min:3 },
  { tipo:'similares', edad:'teen', q:'¡Nombra 3 tipos de gobierno!', r:['democracia','monarquia','republica','oligarquia','teocracia','dictadura','aristocracia','anarquismo','autocracia','federalismo'], min:3 },
  { tipo:'similares', edad:'teen', q:'¡Nombra 3 elementos químicos nobles (gases inertes)!', r:['helio','neon','argon','kripton','xenon','radon'], min:2 },

  // adulto
  { tipo:'similares', edad:'adulto', q:'¡Nombra 3 presidentes de Panamá!', r:['manuel amador guerrero','belisario porras','arnulfo arias','ernesto perez balladares','mireya moscoso','martin torrijos','ricardo martinelli','juan carlos varela','laurentino cortizo','nito cortizo'], min:2 },
  { tipo:'similares', edad:'adulto', q:'¡Nombra 3 síntomas de un infarto!', r:['dolor pecho','dolor en el pecho','presion en el pecho','dificultad para respirar','sudoracion','nauseas','mareos','dolor en el brazo izquierdo','fatiga extrema','palpitaciones'], min:2 },
  { tipo:'similares', edad:'adulto', q:'¡Nombra 3 organismos internacionales!', r:['onu','unesco','oms','fmi','banco mundial','otan','oea','bid','unicef','pnud','gatt','omc'], min:3 },
  { tipo:'similares', edad:'adulto', q:'¡Nombra 3 figuras retóricas o literarias!', r:['metafora','simil','hiperbole','onomatopeya','personificacion','antitesis','eufemismo','aliteracion','anafora','oxímoron','oxímoron','paradoja'], min:3 },
  { tipo:'similares', edad:'adulto', q:'¡Nombra 3 vacunas del calendario básico!', r:['bcg','hepatitis b','dpt','polio','mmr','sarampion','rubeola','paperas','varicela','influenza','tetano','covid'], min:3 },

  // ═══════════════════════════════════════════════════════
  //  LÓGICA — MC (opciones[0] = CORRECTA)
  // ═══════════════════════════════════════════════════════
  // menor
  { tipo:'logica', edad:'menor', q:'¿Cuál es más pesado: 1 kg de paja o 1 kg de hierro?', opciones:['Son iguales (ambos 1 kg)','El hierro','La paja','Depende del tamaño'] },
  { tipo:'logica', edad:'menor', q:'Hay 3 pájaros en un árbol. Se van 2. ¿Cuántos quedan?', opciones:['1','0','2','Ninguno'] },
  { tipo:'logica', edad:'menor', q:'¿Qué tiene más: 1 docena o 10 unidades?', opciones:['1 docena (12 piezas)','10 unidades','Son iguales','Depende de qué sea'] },
  { tipo:'logica', edad:'menor', q:'Si tienes 3 manzanas y alguien te da el doble, ¿cuántas tienes?', opciones:['9','6','3','12'] },
  { tipo:'logica', edad:'menor', q:'Un gallo pone un huevo en la punta de un techo. ¿Hacia dónde cae?', opciones:['Los gallos no ponen huevos','A la izquierda','A la derecha','Hacia abajo'] },

  // junior
  { tipo:'logica', edad:'junior', q:'Si todos los mamíferos son animales y el perro es mamífero, ¿el perro es un animal?', opciones:['Sí, por silogismo','No necesariamente','Solo si es doméstico','No tenemos certeza'] },
  { tipo:'logica', edad:'junior', q:'¿Qué es más largo: 1 metro o 100 centímetros?', opciones:['Son exactamente lo mismo','1 metro','100 centímetros','Depende de la escala'] },
  { tipo:'logica', edad:'junior', q:'Si hoy es miércoles, ¿qué día será dentro de 10 días?', opciones:['Sábado','Viernes','Domingo','Lunes'] },
  { tipo:'logica', edad:'junior', q:'¿Cuántos meses del año tienen 28 días?', opciones:['12 (todos los meses)','1 (febrero)','2','4'] },
  { tipo:'logica', edad:'junior', q:'Un médico tiene un hermano pero ese hermano no tiene médico como hermano. ¿Cómo es posible?', opciones:['El médico es mujer','Son medios hermanos','Es mentira','El hermano es adoptado'] },

  // teen
  { tipo:'logica', edad:'teen', q:'Si A→B y B→C, entonces A→C ¿verdadero o falso?', opciones:['Verdadero (silogismo hipotético)','Falso','Solo en lógica formal','Depende del contexto'] },
  { tipo:'logica', edad:'teen', q:'¿Puedes concluir que TODOS los cisnes son blancos porque viste 10,000 cisnes blancos?', opciones:['No, es falacia de inducción','Sí, la muestra es grande','Sí, es estadísticamente válido','Solo si son de Europa'] },
  { tipo:'logica', edad:'teen', q:'La paradoja del barbero: Un barbero afeita a todos los que no se afeitan a sí mismos. ¿El barbero se afeita?', opciones:['Es paradoja, no tiene solución','Se afeita a sí mismo','No se afeita','Depende del día'] },
  { tipo:'logica', edad:'teen', q:'Si llueve, la acera se moja. La acera está mojada. ¿Necesariamente llovió?', opciones:['No, puede haber otra causa','Sí, siempre','Solo si es de día','Sí, si no había nubes'] },
  { tipo:'logica', edad:'teen', q:'¿Es posible que un conjunto sea subconjunto de sí mismo?', opciones:['Sí, todo conjunto lo es','No, un conjunto no puede contenerse','Solo los conjuntos vacíos','Solo en lógica proposicional'] },

  // adulto
  { tipo:'logica', edad:'adulto', q:'Precio sube 50%, luego baja 50%. ¿El precio es igual al original?', opciones:['No, es 25% menor','Sí, vuelve al original','Es 25% mayor','Depende del precio inicial'] },
  { tipo:'logica', edad:'adulto', q:'¿Es posible probar la inexistencia de algo?', opciones:['Generalmente no (problema lógico)','Sí, siempre','Solo con evidencia directa','Solo con matemáticas'] },
  { tipo:'logica', edad:'adulto', q:'"Esta oración es falsa." ¿Es verdadera o falsa?', opciones:['Es paradoja sin solución','Es falsa','Es verdadera','Depende del idioma'] },
  { tipo:'logica', edad:'adulto', q:'¿En qué falla el argumento: "Siempre ha sido así, entonces debe seguir siendo así"?', opciones:['Apelación a la tradición (falacia)','En nada, es válido','En la premisa temporal','En la conclusión'] },
  { tipo:'logica', edad:'adulto', q:'Si en promedio 2 personas tienen 1 auto, ¿cuántos autos tiene la familia de 5?', opciones:['No se puede determinar con exactitud','2.5','5','3'] },

  // ═══════════════════════════════════════════════════════
  //  LENGUAJE — MC (opciones[0] = CORRECTA)
  // ═══════════════════════════════════════════════════════
  // menor
  { tipo:'lenguaje', edad:'menor', q:'¿Cuál de estas palabras rima con "GATO"?', opciones:['Pato','Perro','Mesa','Luna'] },
  { tipo:'lenguaje', edad:'menor', q:'¿Cuál es el plural de "lápiz"?', opciones:['Lápices','Lápizs','Lápicess','Lápizes'] },
  { tipo:'lenguaje', edad:'menor', q:'¿Qué tipo de palabra es "correr"?', opciones:['Verbo','Sustantivo','Adjetivo','Pronombre'] },
  { tipo:'lenguaje', edad:'menor', q:'¿Cuál de estas es una vocal?', opciones:['U','B','C','D'] },
  { tipo:'lenguaje', edad:'menor', q:'¿Cuántas letras tiene el alfabeto en español?', opciones:['27','26','28','30'] },

  // junior
  { tipo:'lenguaje', edad:'junior', q:'¿Cuál es el antónimo de "cobarde"?', opciones:['Valiente','Miedoso','Tímido','Torpe'] },
  { tipo:'lenguaje', edad:'junior', q:'¿Qué significa "anfibio"?', opciones:['Que vive en agua y tierra','Solo en el agua','Solo en tierra','Que vuela y nada'] },
  { tipo:'lenguaje', edad:'junior', q:'¿Cuál es el gerundio de "hacer"?', opciones:['Haciendo','Hacido','Haciente','Hecho'] },
  { tipo:'lenguaje', edad:'junior', q:'¿Qué es una metáfora?', opciones:['Comparación directa sin "como"','Comparación con "como"','Exageración literaria','Repetición de sonidos'] },
  { tipo:'lenguaje', edad:'junior', q:'¿Cuál es el sinónimo de "veloz"?', opciones:['Rápido','Lento','Suave','Fuerte'] },

  // teen
  { tipo:'lenguaje', edad:'teen', q:'¿Qué idioma tiene más hablantes nativos en el mundo?', opciones:['Chino mandarín','Inglés','Español','Hindú'] },
  { tipo:'lenguaje', edad:'teen', q:'¿Qué es un oxímoron?', opciones:['Términos contradictorios juntos (silencio ensordecedor)','Repetición de sonidos consonantes','Comparación con "como"','Personificación de objetos'] },
  { tipo:'lenguaje', edad:'teen', q:'¿Cuál es el condicional perfecto de "ir"?', opciones:['Habría ido','Iría','Haya ido','Hubiera ido'] },
  { tipo:'lenguaje', edad:'teen', q:'¿Qué figura retórica es "El tiempo es oro"?', opciones:['Metáfora','Símil','Hipérbole','Antítesis'] },
  { tipo:'lenguaje', edad:'teen', q:'¿En cuántas familias lingüísticas se clasifica el español?', opciones:['Indoeuropea · romance','Semítica · romance','Austronesia','Sino-tibetana'] },

  // adulto
  { tipo:'lenguaje', edad:'adulto', q:'¿Qué es un "malapropismo"?', opciones:['Uso incorrecto de una palabra por otra similar','Repetición innecesaria de palabras','Uso de palabras extranjeras','Omisión de letras en una palabra'] },
  { tipo:'lenguaje', edad:'adulto', q:'¿Cuál es la diferencia entre "haber" y "a ver"?', opciones:['"Haber" es verbo auxiliar; "a ver" es interjección','No hay diferencia, son sinónimos','Solo difieren en escritura formal','Solo en América Latina'] },
  { tipo:'lenguaje', edad:'adulto', q:'¿Qué es un "pleonasmo"?', opciones:['Redundancia expresiva (subir arriba)','Figura sin sentido literal','Contradicción gramatical','Cambio de significado histórico'] },
  { tipo:'lenguaje', edad:'adulto', q:'¿Cuál es el subjuntivo imperfecto de "poder" en tercera persona?', opciones:['Pudiera/pudiese','Puede','Podría','Pudo'] },
  { tipo:'lenguaje', edad:'adulto', q:'¿Qué es la "diéresis" en español?', opciones:['Los dos puntos sobre la ü para pronunciar la u','Un acento grave','Una pausa en el verso','Una repetición de vocal'] },

  // ═══════════════════════════════════════════════════════
  //  MEMORIA — muestra secuencia, luego pregunta
  // ═══════════════════════════════════════════════════════
  // menor
  { tipo:'memoria', edad:'menor', secuencia:['🔴','🔵','🟡'], q:'¿Cuál fue el color del MEDIO?', r:'azul', alt:['🔵','el azul'] },
  { tipo:'memoria', edad:'menor', secuencia:['🐱','🐶','🐭'], q:'¿Cuál fue el ÚLTIMO animal?', r:'raton', alt:['ratón','el ratón','🐭','mouse'] },
  { tipo:'memoria', edad:'menor', secuencia:['1','3','5','7'], q:'¿Cuál fue el TERCER número?', r:'5' },
  { tipo:'memoria', edad:'menor', secuencia:['🍎','🍌','🍇','🍊'], q:'¿Cuál fue la SEGUNDA fruta?', r:'banano', alt:['banana','plátano','platano','🍌'] },
  { tipo:'memoria', edad:'menor', secuencia:['Sol','Luna','Estrella'], q:'¿Cuál fue el PRIMERO?', r:'sol', alt:['el sol'] },
  { tipo:'memoria', edad:'menor', secuencia:['🟥','🟩','🟦','🟨'], q:'¿Cuántos colores viste en total?', r:'4', alt:['cuatro'] },

  // junior
  { tipo:'memoria', edad:'junior', secuencia:['7','14','21','28','35'], q:'¿Cuál fue el CUARTO número?', r:'28' },
  { tipo:'memoria', edad:'junior', secuencia:['A','E','I','O','U'], q:'¿Cuál fue la TERCERA letra?', r:'i', alt:['I'] },
  { tipo:'memoria', edad:'junior', secuencia:['Perro','Gato','Pez','Loro','Hamster'], q:'¿Cuántos animales viste?', r:'5', alt:['cinco'] },
  { tipo:'memoria', edad:'junior', secuencia:['Azul','Rojo','Verde','Azul','Amarillo'], q:'¿Qué color se REPITIÓ?', r:'azul', alt:['el azul'] },
  { tipo:'memoria', edad:'junior', secuencia:['🏠','🚗','🌳','🌙','⭐'], q:'¿Cuál fue el cuarto elemento?', r:'luna', alt:['la luna','🌙'] },
  { tipo:'memoria', edad:'junior', secuencia:['12','8','4','16','2'], q:'¿Cuál fue el MENOR número?', r:'2', alt:['el 2','dos'] },

  // teen
  { tipo:'memoria', edad:'teen', secuencia:['Mercurio','Venus','Tierra','Marte','Júpiter'], q:'¿Cuál fue el TERCERO?', r:'tierra', alt:['la tierra'] },
  { tipo:'memoria', edad:'teen', secuencia:['H','He','Li','Be','B','C'], q:'¿Cuántos elementos de la tabla periódica viste?', r:'6', alt:['seis'] },
  { tipo:'memoria', edad:'teen', secuencia:['3','1','4','1','5','9','2'], q:'¿Cuál fue el número en la QUINTA posición?', r:'5' },
  { tipo:'memoria', edad:'teen', secuencia:['Sócrates','Platón','Aristóteles','Epicuro'], q:'¿Cuál fue el SEGUNDO filósofo?', r:'platon', alt:['Platón','platón'] },
  { tipo:'memoria', edad:'teen', secuencia:['Rojo','Naranja','Amarillo','Verde','Azul','Índigo','Violeta'], q:'¿Cuántos colores del arco iris se mostraron?', r:'7', alt:['siete'] },
  { tipo:'memoria', edad:'teen', secuencia:['🎵','🎶','🎸','🥁','🎹','🎺'], q:'¿Cuál fue el CUARTO instrumento?', r:'bateria', alt:['🥁','la batería','batería','bombo'] },

  // adulto
  { tipo:'memoria', edad:'adulto', secuencia:['Lima','Bogotá','Buenos Aires','Santiago','Caracas'], q:'¿Cuál fue la ÚLTIMA capital?', r:'caracas', alt:['Caracas'] },
  { tipo:'memoria', edad:'adulto', secuencia:['Hidrógeno','Oxígeno','Carbono','Nitrógeno','Helio'], q:'¿Cuál fue el SEGUNDO elemento?', r:'oxigeno', alt:['oxígeno','el oxígeno'] },
  { tipo:'memoria', edad:'adulto', secuencia:['17','42','8','63','29','5'], q:'¿Cuántos números viste en total?', r:'6', alt:['seis'] },
  { tipo:'memoria', edad:'adulto', secuencia:['Bach','Mozart','Beethoven','Chopin','Debussy'], q:'¿Cuál fue el TERCER compositor?', r:'beethoven', alt:['Beethoven'] },
  { tipo:'memoria', edad:'adulto', secuencia:['Constitución','Ley','Decreto','Resolución','Circular'], q:'¿Cuál fue el PRIMERO?', r:'constitucion', alt:['constitución','la constitución'] },
  { tipo:'memoria', edad:'adulto', secuencia:['1903','1914','1968','1977','1989','1999'], q:'¿Cuántas fechas históricas viste?', r:'6', alt:['seis'] },

  // ═══════════════════════════════════════════════════════
  //  AMPLIACIÓN — CÁLCULO RÁPIDO
  // ═══════════════════════════════════════════════════════
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 1 + 9?', r:'10' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 7 − 3?', r:'4' },
  { tipo:'calculo', edad:'menor', q:'¿Cuántas ruedas tiene una bicicleta?', r:'2' },
  { tipo:'calculo', edad:'menor', q:'¿Cuánto es 5 + 5?', r:'10' },
  { tipo:'calculo', edad:'menor', q:'¿Cuántas alas tiene un pájaro?', r:'2' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 15 × 3?', r:'45' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 64 ÷ 8?', r:'8' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 11 × 11?', r:'121' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 100 − 37?', r:'63' },
  { tipo:'calculo', edad:'junior', q:'¿Cuánto es 9 × 7?', r:'63' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 17 × 17?', r:'289' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 3³?', r:'27' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es √169?', r:'13' },
  { tipo:'calculo', edad:'teen', q:'¿Cuánto es 150% de 80?', r:'120' },
  { tipo:'calculo', edad:'teen', q:'Si N/4 = 12, ¿cuánto es N?', r:'48' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es 23 × 17?', r:'391' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es 5⁴?', r:'625' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es log₁₀(1000)?', r:'3' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuánto es 18% de 250?', r:'45' },
  { tipo:'calculo', edad:'adulto', q:'¿Cuántos segundos tiene 1 hora?', r:'3600', alt:['3.600','tres mil seiscientos'] },

  // ═══════════════════════════════════════════════════════
  //  AMPLIACIÓN — ACERTIJOS
  // ═══════════════════════════════════════════════════════
  { tipo:'acertijo', edad:'menor', q:'Tengo agujas pero no coso, tengo números pero no soy una calculadora. ¿Qué soy?', r:'reloj', alt:['un reloj'] },
  { tipo:'acertijo', edad:'menor', q:'Soy colorido, vivo en el cielo después de la lluvia y tengo 7 colores. ¿Qué soy?', r:'arcoiris', alt:['arcoíris','un arcoíris'] },
  { tipo:'acertijo', edad:'menor', q:'Me usas para escribir, tengo punta y borro si me giras. ¿Qué soy?', r:'lapiz', alt:['lápiz','un lápiz'] },
  { tipo:'acertijo', edad:'junior', q:'Cuanto más me secas, más mojada me pongo. ¿Qué soy?', r:'toalla', alt:['una toalla'] },
  { tipo:'acertijo', edad:'junior', q:'Tengo ciudades pero no casas, ríos sin agua y montañas sin árboles. ¿Qué soy?', r:'mapa', alt:['un mapa'] },
  { tipo:'acertijo', edad:'junior', q:'Soy el hijo de mi padre, pero mi padre no tiene hijos varones. ¿Quién soy?', r:'una hija', alt:['hija','la hija'] },
  { tipo:'acertijo', edad:'teen', q:'Un hombre vive en el piso 10, baja en ascensor cada mañana pero sube a pie excepto cuando llueve. ¿Por qué?', r:'es muy bajo', alt:['es bajo','no alcanza los botones altos','por su altura'] },
  { tipo:'acertijo', edad:'teen', q:'Soy la hermana de mi madre pero no soy tu tía. ¿Qué soy?', r:'madre', alt:['tu madre','mamá'] },
  { tipo:'acertijo', edad:'adulto', q:'Un médico y su hijo tienen un accidente. El médico muere. El hijo llega al quirófano y el cirujano dice: "no puedo operar, es mi hijo". ¿Quién es el cirujano?', r:'la madre', alt:['su madre','mamá del niño','la mamá'] },
  { tipo:'acertijo', edad:'adulto', q:'Si 5 máquinas tardan 5 minutos en hacer 5 objetos, ¿cuánto tardan 100 máquinas en hacer 100 objetos?', r:'5 minutos', alt:['5','cinco minutos','cinco'] },

  // ═══════════════════════════════════════════════════════
  //  AMPLIACIÓN — COMPLETAR LA FRASE
  // ═══════════════════════════════════════════════════════
  { tipo:'completar', edad:'menor', q:'Caperucita ___', r:'roja', alt:['Roja'] },
  { tipo:'completar', edad:'menor', q:'Blancanieves y los siete ___', r:'enanitos', alt:['enanos','siete enanitos'] },
  { tipo:'completar', edad:'menor', q:'El pato ___', r:'donald', alt:['Donald'] },
  { tipo:'completar', edad:'junior', q:'Los Juegos del ___', r:'hambre', alt:['Hambre'] },
  { tipo:'completar', edad:'junior', q:'Batman y ___', r:'robin', alt:['Robin'] },
  { tipo:'completar', edad:'junior', q:'Malas noticias para el ___', r:'reino', alt:['Reino'] },
  { tipo:'completar', edad:'teen', q:'Vivir sin ti no es vivir, es solo ___', r:'existir', alt:['sobrevivir'] },
  { tipo:'completar', edad:'teen', q:'El que no llora, no ___', r:'mama', alt:['mama','mamá'] },
  { tipo:'completar', edad:'adulto', q:'Al mal tiempo, buena ___', r:'cara', alt:['Cara'] },
  { tipo:'completar', edad:'adulto', q:'El que con lobos anda, a aullar se ___', r:'enseña', alt:['enseña','aprende'] },
  { tipo:'completar', edad:'adulto', q:'En boca cerrada no entran ___', r:'moscas', alt:['Moscas'] },

  // ═══════════════════════════════════════════════════════
  //  AMPLIACIÓN — LÓGICA (opción múltiple)
  // ═══════════════════════════════════════════════════════
  { tipo:'logica', edad:'menor', q:'Si el lunes es el primer día de la semana, ¿cuál es el tercero?', opciones:['Miércoles','Martes','Jueves','Viernes'] },
  { tipo:'logica', edad:'menor', q:'¿Cuál no es un color primario?', opciones:['Verde','Rojo','Azul','Amarillo'] },
  { tipo:'logica', edad:'junior', q:'Si todas las rosas son flores y algunas flores se marchitan, ¿cuál es verdad?', opciones:['Algunas rosas pueden marchitarse','Todas las rosas se marchitan','Ninguna rosa se marchita','Las rosas no son flores'] },
  { tipo:'logica', edad:'junior', q:'¿Qué número sigue en la serie? 2, 4, 8, 16, ___', opciones:['32','24','20','28'] },
  { tipo:'logica', edad:'teen', q:'¿Cuál número NO pertenece a la serie: 3, 7, 11, 15, 18, 23?', opciones:['18','15','11','7'] },
  { tipo:'logica', edad:'teen', q:'Ana tiene más dinero que Beto. Carlos tiene menos que Ana. Beto tiene más que Carlos. ¿Quién tiene más?', opciones:['Ana','Beto','Carlos','Todos igual'] },
  { tipo:'logica', edad:'adulto', q:'Si A > B y B > C, entonces ¿cuál es la relación entre A y C?', opciones:['A > C','A < C','A = C','No se puede saber'] },
  { tipo:'logica', edad:'adulto', q:'Un tren sale a 60 km/h. Después de 90 minutos, ¿cuántos km recorrió?', opciones:['90 km','75 km','100 km','120 km'] },

  // ═══════════════════════════════════════════════════════
  //  AMPLIACIÓN — LENGUAJE
  // ═══════════════════════════════════════════════════════
  { tipo:'lenguaje', edad:'menor', q:'¿Cuál de estas palabras rima con "sol"?', opciones:['Flor','Col','Pan','Mes'] },
  { tipo:'lenguaje', edad:'menor', q:'¿Qué palabra es un animal?', opciones:['Tigre','Mesa','Silla','Libro'] },
  { tipo:'lenguaje', edad:'junior', q:'¿Cuál es el sinónimo de "veloz"?', opciones:['Rápido','Lento','Fuerte','Tranquilo'] },
  { tipo:'lenguaje', edad:'junior', q:'¿Cuál es el antónimo de "dulce"?', opciones:['Amargo','Salado','Picante','Ácido'] },
  { tipo:'lenguaje', edad:'teen', q:'¿Cuál es la figura retórica en "sus ojos son dos luceros"?', opciones:['Metáfora','Símil','Hipérbole','Personificación'] },
  { tipo:'lenguaje', edad:'teen', q:'¿Cuál de estas palabras tiene tilde?', opciones:['Café','Tarde','Libro','Peso'] },
  { tipo:'lenguaje', edad:'adulto', q:'¿Cuál es el gentilicio de los nacidos en Panamá?', opciones:['Panameño','Panamense','Panamero','Panamícola'] },
  { tipo:'lenguaje', edad:'adulto', q:'¿Qué tipo de oración es "¡Cierra la puerta!"?', opciones:['Imperativa','Interrogativa','Exclamativa','Declarativa'] },

  // ═══════════════════════════════════════════════════════
  //  AMPLIACIÓN — SIMILARES
  // ═══════════════════════════════════════════════════════
  { tipo:'similares', edad:'menor', q:'¡Nombra 3 frutas rojas!', r:['fresa','fresas','manzana','manzanas','cereza','cerezas','frambuesa','sandía','sandia','pitahaya'], min:3 },
  { tipo:'similares', edad:'menor', q:'¡Nombra 3 medios de transporte!', r:['bus','autobús','carro','auto','moto','tren','avión','avion','barco','bicicleta','taxi'], min:3 },
  { tipo:'similares', edad:'junior', q:'¡Nombra 4 capitales de América Central!', r:['ciudad de panama','panama','tegucigalda','tegucigalpa','san jose','san josé','managua','san salvador','guatemala','belmopan'], min:4 },
  { tipo:'similares', edad:'junior', q:'¡Nombra 4 instrumentos de viento!', r:['flauta','clarinete','saxofón','saxofon','trompeta','trombón','trombon','oboe','tuba','fagot','corno'], min:4 },
  { tipo:'similares', edad:'teen', q:'¡Nombra 5 países de Asia!', r:['china','japón','japon','india','corea','rusia','tailandia','vietnam','indonesia','iran','arabia','pakistan','bangladesh','filipinas'], min:5 },
  { tipo:'similares', edad:'teen', q:'¡Nombra 4 premios Nobel que existan!', r:['paz','medicina','fisica','fisíca','quimica','química','literatura','economía','economia'], min:4 },
  { tipo:'similares', edad:'adulto', q:'¡Nombra 5 elementos de la tabla periódica!', r:['hidrogeno','oxigeno','carbono','nitrogeno','helio','sodio','hierro','oro','plata','calcio','potasio','cobre','zinc','fosforo','azufre','cloro'], min:5 },
  { tipo:'similares', edad:'adulto', q:'¡Nombra 5 presidentes de Panamá!', r:['cortizo','laurentino','varela','juan carlos','martinelli','mireya','moscoso','ernesto pérez','balladares','torrijos','martin torrijos','endara','delvalle','ardito barletta','barletta'], min:5 },

  // ═══════════════════════════════════════════════════════
  //  AMPLIACIÓN — MEMORIA
  // ═══════════════════════════════════════════════════════
  { tipo:'memoria', edad:'menor', secuencia:['🐱','🐶','🐸','🦁'], q:'¿Cuántos animales viste?', r:'4', alt:['cuatro'] },
  { tipo:'memoria', edad:'menor', secuencia:['🔴','🔵','🟡','🟢'], q:'¿Cuál fue el ÚLTIMO color?', r:'verde', alt:['el verde','🟢'] },
  { tipo:'memoria', edad:'junior', secuencia:['Panamá','México','Cuba','Colombia','Argentina'], q:'¿Cuál fue el TERCER país?', r:'cuba', alt:['Cuba'] },
  { tipo:'memoria', edad:'junior', secuencia:['13','27','8','45','3'], q:'¿Cuál fue el SEGUNDO número?', r:'27', alt:['veintisiete'] },
  { tipo:'memoria', edad:'teen', secuencia:['Mercurio','Venus','Tierra','Marte','Júpiter'], q:'¿Cuál fue el CUARTO planeta?', r:'marte', alt:['Marte'] },
  { tipo:'memoria', edad:'teen', secuencia:['Azul','Rojo','Verde','Negro','Blanco','Amarillo'], q:'¿Cuántos colores viste en total?', r:'6', alt:['seis'] },
  { tipo:'memoria', edad:'adulto', secuencia:['Sócrates','Platón','Aristóteles','Descartes','Kant'], q:'¿Cuál fue el SEGUNDO filósofo?', r:'platon', alt:['Platón','platón'] },
  { tipo:'memoria', edad:'adulto', secuencia:['Pi','Sigma','Delta','Omega','Alpha','Gamma'], q:'¿Cuál fue la CUARTA letra griega?', r:'omega', alt:['Omega'] },
];

export const AGILIDAD_CONFIG = {
  id: 'agilidadmental',
  name: 'Agilidad Mental',
  emoji: '🧠',
  color: 'fuchsia',
  short: 'Cálculo, lógica, acertijos y memoria. ¡El más ágil gana!',
};

// Configuración por banda de edad
export const BANDAS = {
  menor: { label: '👶 5–8 años',   tiempo: 12, emoji: '👶' },
  junior:{ label: '🧒 9–12 años',  tiempo: 9,  emoji: '🧒' },
  teen:  { label: '🧑 13–17 años', tiempo: 7,  emoji: '🧑' },
  adulto:{ label: '🧑‍💼 18+ años',   tiempo: 5,  emoji: '🧑‍💼' },
};

// Puntos: +2 si responde en la primera mitad del tiempo, +1 si en la segunda
export const PTS = { rapido: 2, correcto: 1 };
