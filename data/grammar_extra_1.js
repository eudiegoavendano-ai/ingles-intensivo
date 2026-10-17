// Ejercicios extra de gramatica para los dias de practica (2 a 6). Formato compacto:
// ["m", pregunta, "op1|op2|op3", indiceCorrecto]  opcion multiple
// ["f", frase con ___, "respuesta|variante"]      completar
// ["o", "frase correcta sin puntuacion final"]     ordenar palabras
// ["t", frase en espanol, "traduccion|variante"]   traducir
window.GRAMMAR_EXTRA = window.GRAMMAR_EXTRA || {};

// 1: verbo to be y pronombres
GRAMMAR_EXTRA[1] = [
 ["m", "My parents ___ at home.", "is|am|are", 2], ["m", "___ you a student?", "Is|Are|Am", 1], ["m", "Tom ___ not from England.", "are|is|am", 1],
 ["m", "This is Ana. ___ is my friend.", "He|She|It", 1], ["m", "Diego and I ___ photographers.", "am|is|are", 2], ["m", "The coffee ___ hot.", "is|are|am", 0],
 ["m", "Where ___ your keys?", "is|are|am", 1], ["m", "I ___ not tired.", "is|are|am", 2], ["m", "___ it cold today?", "Are|Is|Am", 1], ["m", "Look at my dog. ___ name is Max.", "It|Its|His", 1],
 ["f", "We ___ (be) in Santiago.", "are|'re"], ["f", "She ___ (not be) married.", "is not|isn't"], ["f", "I ___ (be) thirty years old.", "am|'m"],
 ["f", "___ (be) they from Peru?", "Are"], ["f", "It ___ (be) a beautiful day.", "is|'s"], ["f", "You ___ (not be) late.", "are not|aren't"],
 ["f", "Hello, my name ___ (be) Carla.", "is|'s"], ["f", "My brother and sister ___ (be) students.", "are"],
 ["o", "My sister is a nurse"], ["o", "Are you from Chile"], ["o", "We are not at home"], ["o", "Is your teacher nice"], ["o", "They are my best friends"],
 ["t", "Yo soy de Chile.", "I am from Chile"], ["t", "Ella no es doctora.", "She is not a doctor"], ["t", "Ellos son mis padres.", "They are my parents"],
 ["t", "Estas cansado?", "Are you tired"], ["t", "Nosotros somos amigos.", "We are friends"], ["t", "Es un buen libro.", "It is a good book"], ["t", "El tiene veinte anos.", "He is twenty years old|He is twenty"]
];

// 2: posesivos, this/that, a/an, plurales
GRAMMAR_EXTRA[2] = [
 ["m", "This is ___ umbrella.", "a|an|the two", 1], ["m", "Those ___ my shoes.", "is|are|am", 1], ["m", "Maria and ___ husband live in Lima.", "his|her|their", 1],
 ["m", "We love ___ new house.", "our|us|we", 0], ["m", "I have two ___.", "child|childs|children", 2], ["m", "Is ___ your bag over there?", "this|that|these", 1],
 ["m", "He is ___ engineer.", "a|an|-", 1], ["m", "The ___ are in the kitchen.", "knifes|knives|knife", 1], ["m", "Do you like ___ photos here?", "this|these|that", 1], ["m", "This is Tom. ___ car is red.", "Her|His|Its", 1],
 ["f", "My friends love ___ (su, de ellos) dog.", "their"], ["f", "I have three ___ (box).", "boxes"], ["f", "She is ___ (un) actress.", "an"],
 ["f", "Is this ___ (tu) phone?", "your"], ["f", "There are many ___ (person) here.", "people"], ["f", "___ (ese) man is my uncle.", "That"],
 ["f", "My grandparents have two ___ (dog).", "dogs"], ["f", "This is ___ (un) university.", "a"],
 ["o", "These are my parents"], ["o", "Her brother is an architect"], ["o", "That is our new car"], ["o", "Is this your sister"], ["o", "Their children are very funny"],
 ["t", "Esta es mi madre.", "This is my mother"], ["t", "Esos son sus libros (de el).", "Those are his books"], ["t", "Ella es una enfermera.", "She is a nurse"],
 ["t", "Nuestra casa es pequena.", "Our house is small"], ["t", "Mis hermanos son altos.", "My brothers are tall|My siblings are tall"], ["t", "Es un huevo.", "It is an egg"], ["t", "Este es su perro (de ella).", "This is her dog"]
];

// 3: presente simple afirmativo
GRAMMAR_EXTRA[3] = [
 ["m", "She ___ coffee every morning.", "drink|drinks|drinking", 1], ["m", "My parents ___ in the south.", "lives|live|living", 1], ["m", "He ___ TV at night.", "watchs|watches|watch", 1],
 ["m", "The bus ___ at eight.", "leave|leaves|leaving", 1], ["m", "I ___ to work by metro.", "go|goes|going", 0], ["m", "My sister ___ English.", "study|studys|studies", 2],
 ["m", "Diego ___ his cameras every day.", "check|checks|checkes", 1], ["m", "We ___ lunch at one.", "has|have|haves", 1], ["m", "The shop ___ at nine.", "open|opens|opening", 1], ["m", "Tom ___ his homework after dinner.", "do|dos|does", 2],
 ["f", "He ___ (get) up at seven.", "gets"], ["f", "My mother ___ (cook) very well.", "cooks"], ["f", "They ___ (play) football on Sundays.", "play"],
 ["f", "She ___ (finish) work at six.", "finishes"], ["f", "The baby ___ (cry) a lot.", "cries"], ["f", "I ___ (take) a shower in the morning.", "take"],
 ["f", "My cat ___ (sleep) all day.", "sleeps"], ["f", "Laura ___ (go) to the gym.", "goes"],
 ["o", "She works in a hospital"], ["o", "I get up at six"], ["o", "My father reads the newspaper"], ["o", "We walk to school"], ["o", "He watches movies at night"],
 ["t", "Ella trabaja en una oficina.", "She works in an office"], ["t", "Yo bebo te por la manana.", "I drink tea in the morning"], ["t", "El vive en Santiago.", "He lives in Santiago"],
 ["t", "Nosotros cenamos a las ocho.", "We have dinner at eight|We eat dinner at eight"], ["t", "Mi hermano estudia medicina.", "My brother studies medicine"], ["t", "El tren sale a las diez.", "The train leaves at ten"], ["t", "Ellos juegan tenis.", "They play tennis"]
];

// 4: presente simple negativo y preguntas, some/any
GRAMMAR_EXTRA[4] = [
 ["m", "She ___ like fish.", "don't|doesn't|isn't", 1], ["m", "___ you eat meat?", "Do|Does|Are", 0], ["m", "___ your brother work here?", "Do|Does|Is", 1],
 ["m", "We don't have ___ milk.", "some|any|a", 1], ["m", "I want ___ apples, please.", "any|some|a", 1], ["m", "Do you have ___ questions?", "some|any|an", 1],
 ["m", "He doesn't ___ coffee.", "drinks|drink|drinking", 1], ["m", "Where ___ they live?", "do|does|are", 0], ["m", "What time ___ the restaurant open?", "do|does|is", 1], ["m", "I ___ understand the menu.", "doesn't|don't|not", 1],
 ["f", "They ___ (not / speak) French.", "don't speak|do not speak"], ["f", "___ she like pizza?", "Does"], ["f", "He ___ (not / eat) sugar.", "doesn't eat|does not eat"],
 ["f", "Is there ___ bread? No, there isn't.", "any"], ["f", "Can I have ___ water, please?", "some"], ["f", "What ___ you want for dessert?", "do"],
 ["f", "My dad ___ (not / cook) on weekdays.", "doesn't cook|does not cook"], ["f", "___ they serve breakfast?", "Do"],
 ["o", "Does he like spicy food"], ["o", "We do not have any eggs"], ["o", "What do you want to drink"], ["o", "She does not eat meat"], ["o", "Do you have any vegetables"],
 ["t", "Yo no tomo leche.", "I don't drink milk"], ["t", "Ella come carne?", "Does she eat meat"], ["t", "No tenemos pan.", "We don't have any bread|We don't have bread"],
 ["t", "Quiero un poco de agua.", "I want some water"], ["t", "Donde trabajas?", "Where do you work"], ["t", "El no habla ingles.", "He doesn't speak English"], ["t", "Tienen pescado hoy?", "Do you have fish today|Do you have any fish today"]
];

// 5: there is / there are + preposiciones de lugar
GRAMMAR_EXTRA[5] = [
 ["m", "There ___ a bank near my house.", "is|are|be", 0], ["m", "There ___ two bedrooms in the flat.", "is|are|am", 1], ["m", "___ there a pharmacy here?", "Are|Is|Do", 1],
 ["m", "The cat is ___ the table. (debajo)", "on|under|in", 1], ["m", "The park is ___ the museum. (frente a)", "opposite|between|in", 0], ["m", "There aren't ___ chairs.", "some|any|a", 1],
 ["m", "The cafe is ___ the bank and the shop.", "next|between|behind", 1], ["m", "My keys are ___ my bag.", "in|at|on", 0], ["m", "___ there any hotels in the town?", "Is|Are|Do", 1], ["m", "The lamp is ___ the sofa. (al lado de)", "next to|under|in", 0],
 ["f", "There ___ (no hay) a cinema in my town.", "isn't|is not"], ["f", "There ___ many people in the square.", "are"], ["f", "___ there a bathroom upstairs?", "Is"],
 ["f", "The car is ___ the house. (detras de)", "behind"], ["f", "The picture is ___ the wall.", "on"], ["f", "There are ___ trees in the park.", "some"],
 ["f", "The supermarket is ___ (al lado de) the school.", "next to"], ["f", "Are there ___ restaurants near here?", "any"],
 ["o", "There is a small kitchen"], ["o", "Is there a bus stop near here"], ["o", "The bank is opposite the park"], ["o", "There are two beds in the room"], ["o", "The phone is under the sofa"],
 ["t", "Hay un parque cerca de mi casa.", "There is a park near my house"], ["t", "Hay muchos turistas.", "There are many tourists|There are a lot of tourists"], ["t", "No hay ascensor.", "There isn't an elevator|There is no elevator|There isn't a lift"],
 ["t", "Hay una farmacia por aqui?", "Is there a pharmacy near here|Is there a pharmacy around here"], ["t", "El gato esta en la cama.", "The cat is on the bed"], ["t", "El banco esta al lado del cafe.", "The bank is next to the cafe"], ["t", "Hay dos ventanas.", "There are two windows"]
];

// 6: like + -ing, adverbios de frecuencia, can
GRAMMAR_EXTRA[6] = [
 ["m", "I love ___ in the mountains.", "hike|hiking|hikes", 1], ["m", "She ___ swim very well.", "can|cans|can to", 0], ["m", "He is ___ late.", "never|always never|often never", 0],
 ["m", "I ___ go to the gym on Sundays.", "usually|am usually|usual", 0], ["m", "___ you play the piano?", "Do|Can|Are", 1], ["m", "We hate ___ up early.", "get|getting|gets", 1],
 ["m", "My grandmother can't ___ a computer.", "use|uses|using", 0], ["m", "They ___ eat fast food. (casi nunca)", "hardly ever|ever|always", 0], ["m", "Diego ___ takes photos.", "often|is often|often is", 0], ["m", "Can he ___ French?", "speaks|speak|speaking", 1],
 ["f", "I ___ (no puedo) sing.", "can't|cannot"], ["f", "She enjoys ___ (read) novels.", "reading"], ["f", "We ___ (siempre) have breakfast together.", "always"],
 ["f", "Do you like ___ (cook)?", "cooking"], ["f", "He is ___ (a veces) tired after work.", "sometimes"], ["f", "___ you ride a bike? Yes, I can.", "Can"],
 ["f", "They don't mind ___ (wait).", "waiting"], ["f", "I ___ (nunca) drink coffee at night.", "never"],
 ["o", "I usually go hiking on weekends"], ["o", "Can you speak English"], ["o", "She is always happy"], ["o", "He likes playing the guitar"], ["o", "We never watch TV"],
 ["t", "Me encanta viajar.", "I love traveling|I love travelling|I love to travel"], ["t", "Ella sabe nadar.", "She can swim"], ["t", "Yo nunca como carne.", "I never eat meat"],
 ["t", "Puedes ayudarme?", "Can you help me"], ["t", "El a menudo juega futbol.", "He often plays football|He often plays soccer"], ["t", "No puedo bailar.", "I can't dance|I cannot dance"], ["t", "Odio limpiar la casa.", "I hate cleaning the house"]
];

// 7: presente continuo vs presente simple
GRAMMAR_EXTRA[7] = [
 ["m", "Look! It ___.", "rains|is raining|rain", 1], ["m", "She usually ___ jeans.", "wears|is wearing|wear", 0], ["m", "What ___ you doing now?", "do|are|is", 1],
 ["m", "I ___ a book at the moment.", "read|am reading|reads", 1], ["m", "He ___ to work every day.", "drives|is driving|drive", 0], ["m", "Shh! The baby ___.", "sleeps|is sleeping|sleep", 1],
 ["m", "They ___ TV right now.", "watch|are watching|watches", 1], ["m", "We ___ fish on Fridays.", "eat|are eating|eats", 0], ["m", "Why ___ you wearing a coat?", "do|are|is", 1], ["m", "My brother ___ in London this year.", "works|is working|work", 1],
 ["f", "Listen! Someone ___ (sing).", "is singing"], ["f", "I ___ (not / work) today.", "am not working|'m not working"], ["f", "She ___ (study) every evening.", "studies"],
 ["f", "What ___ he doing?", "is"], ["f", "We ___ (have) dinner now.", "are having|'re having"], ["f", "He never ___ (wear) a tie.", "wears"],
 ["f", "Right now they ___ (walk) on the beach.", "are walking"], ["f", "___ you usually wear glasses?", "Do"],
 ["o", "She is wearing a red dress"], ["o", "What are you doing now"], ["o", "I usually wear jeans"], ["o", "They are not listening"], ["o", "He is talking on the phone"],
 ["t", "Estoy comiendo.", "I am eating"], ["t", "Ella lleva una chaqueta azul.", "She is wearing a blue jacket"], ["t", "Que estas haciendo?", "What are you doing"],
 ["t", "Normalmente camino al trabajo.", "I usually walk to work|Normally I walk to work"], ["t", "Esta lloviendo.", "It is raining"], ["t", "Ellos no estan trabajando hoy.", "They are not working today"], ["t", "El siempre usa zapatillas.", "He always wears sneakers|He always wears trainers"]
];

// 8: pasado simple con was/were y verbos regulares
GRAMMAR_EXTRA[8] = [
 ["m", "I ___ at home yesterday.", "was|were|am", 0], ["m", "They ___ at the party.", "was|were|are", 1], ["m", "She ___ the movie last night.", "watch|watched|watches", 1],
 ["m", "___ you tired yesterday?", "Was|Were|Did", 1], ["m", "We ___ in Peru last year.", "was|were|are", 1], ["m", "He ___ to the radio.", "listen|listened|listens", 1],
 ["m", "It ___ very cold last winter.", "was|were|is", 0], ["m", "I ___ my room on Saturday.", "clean|cleaned|cleans", 1], ["m", "The concert ___ fantastic.", "were|was|be", 1], ["m", "They ___ football after school.", "play|played|plaied", 1],
 ["f", "She ___ (be) sick last week.", "was"], ["f", "We ___ (not be) at work on Monday.", "were not|weren't"], ["f", "I ___ (study) for three hours.", "studied"],
 ["f", "They ___ (stay) in a small hotel.", "stayed"], ["f", "He ___ (stop) the car.", "stopped"], ["f", "___ (be) the food good?", "Was"],
 ["f", "My parents ___ (travel) to Spain.", "traveled|travelled"], ["f", "I ___ (not be) hungry.", "was not|wasn't"],
 ["o", "I was very tired yesterday"], ["o", "We watched a movie last night"], ["o", "Were they at the beach"], ["o", "She cleaned the kitchen"], ["o", "It was a beautiful day"],
 ["t", "Ayer estaba en casa.", "I was at home yesterday|Yesterday I was at home"], ["t", "Ellos estaban felices.", "They were happy"], ["t", "Trabaje el sabado.", "I worked on Saturday"],
 ["t", "Estabas en la fiesta?", "Were you at the party"], ["t", "Ella llamo a su madre.", "She called her mother"], ["t", "No estabamos cansados.", "We were not tired|We weren't tired"], ["t", "Vimos una pelicula.", "We watched a movie|We watched a film"]
];

// 9: pasado simple irregular y preguntas
GRAMMAR_EXTRA[9] = [
 ["m", "We ___ to Mendoza by bus.", "goed|went|go", 1], ["m", "Did you ___ the museum?", "visit|visited|visits", 0], ["m", "She ___ a new camera.", "buyed|bought|buys", 1],
 ["m", "I ___ see him yesterday.", "didn't|don't|wasn't", 0], ["m", "Where ___ you stay?", "did|were|do", 0], ["m", "They ___ a lot of photos.", "took|taked|take", 0],
 ["m", "He ___ his passport.", "losed|lost|lose", 1], ["m", "What ___ you eat there?", "did|do|were", 0], ["m", "We ___ some travelers from Germany.", "meet|met|meeted", 1], ["m", "I ___ at six o'clock.", "woke up|waked up|wake up", 0],
 ["f", "She ___ (write) a long email.", "wrote"], ["f", "We ___ (not / take) a taxi.", "didn't take|did not take"], ["f", "___ you have a good time?", "Did"],
 ["f", "They ___ (fly) to Lima.", "flew"], ["f", "I ___ (find) a great restaurant.", "found"], ["f", "He ___ (come) back on Sunday.", "came"],
 ["f", "What time ___ the plane leave?", "did"], ["f", "We ___ (eat) a lot of meat.", "ate"],
 ["o", "Where did you go on holiday"], ["o", "We saw the sunset"], ["o", "I did not like the hotel"], ["o", "Did she buy the tickets"], ["o", "They left very early"],
 ["t", "Fui a Peru el ano pasado.", "I went to Peru last year"], ["t", "Que hiciste ayer?", "What did you do yesterday"], ["t", "No vimos el volcan.", "We didn't see the volcano"],
 ["t", "Ella perdio su maleta.", "She lost her suitcase|She lost her bag"], ["t", "Compraste los boletos?", "Did you buy the tickets"], ["t", "Tomamos muchas fotos.", "We took a lot of photos|We took many photos"], ["t", "El vino tarde.", "He came late"]
];
