// Ejercicios extra de gramatica, unidades 19 a 26 (formato en grammar_extra_1.js)
window.GRAMMAR_EXTRA = window.GRAMMAR_EXTRA || {};

// 19: voz pasiva (presente y pasado)
GRAMMAR_EXTRA[19] = [
 ["m", "English ___ in many countries.", "speaks|is spoken|is speaking", 1], ["m", "The bridge ___ in 1990.", "was built|is built|built", 0], ["m", "These cars ___ in Japan.", "are made|is made|make", 0],
 ["m", "The thief ___ by the police.", "caught|was caught|is catching", 1], ["m", "My phone ___ yesterday.", "was stolen|stole|is stolen", 0], ["m", "Plastic bags ___ in Chile in 2019.", "banned|were banned|are banning", 1],
 ["m", "The emails ___ every morning.", "are checked|checked|check", 0], ["m", "Was the film ___ in Chile?", "make|made|making", 1], ["m", "The park ___ by thousands of people every year.", "visits|is visited|visited", 1], ["m", "Rice ___ in this region.", "is grown|grows by|is growing by", 0],
 ["f", "The museum ___ (open) in 1959.", "was opened"], ["f", "Coffee ___ (produce) in Colombia.", "is produced"], ["f", "The trees ___ (destroy) by the fire.", "were destroyed"],
 ["f", "The letters ___ (deliver) every day.", "are delivered"], ["f", "This photo ___ (take) by my father.", "was taken"], ["f", "The windows ___ (not / clean) last week.", "were not cleaned|weren't cleaned"],
 ["f", "___ the tickets sold online?", "Are|Were"], ["f", "The song ___ (write) in 1985.", "was written"],
 ["o", "The house was built in 1920"], ["o", "Spanish is spoken here"], ["o", "The car was stolen last night"], ["o", "These shoes are made in Italy"], ["o", "Were the photos taken by you"],
 ["t", "El puente fue construido en 1990.", "The bridge was built in 1990"], ["t", "Aqui se habla ingles.", "English is spoken here"], ["t", "Mi bicicleta fue robada.", "My bike was stolen|My bicycle was stolen"],
 ["t", "El vino se produce en el valle.", "Wine is produced in the valley"], ["t", "La carta fue escrita por mi abuela.", "The letter was written by my grandmother"], ["t", "Los turistas fueron invitados.", "The tourists were invited"], ["t", "El parque es visitado por muchas personas.", "The park is visited by many people"]
];

// 20: segundo condicional y wish
GRAMMAR_EXTRA[20] = [
 ["m", "If I ___ rich, I would travel the world.", "am|were|will be", 1], ["m", "If she had time, she ___ help us.", "will|would|can", 1], ["m", "I wish I ___ a car.", "have|had|will have", 1],
 ["m", "What would you do if you ___ the lottery?", "win|won|would win", 1], ["m", "If I were you, I ___ accept.", "will|would|am", 1], ["m", "I wish I ___ speak French.", "can|could|would", 1],
 ["m", "If we lived near the sea, we ___ swim every day.", "will|would|did", 1], ["m", "She wishes she ___ taller.", "is|were|be", 1], ["m", "If he ___ harder, he would pass.", "studies|studied|would study", 1], ["m", "Would you move abroad if you ___ a good job?", "get|got|will get", 1],
 ["f", "If I ___ (have) more money, I'd buy a house.", "had"], ["f", "I wish I ___ (live) in the mountains.", "lived"], ["f", "If she ___ (know) the answer, she would tell you.", "knew"],
 ["f", "We ___ (would / go) if it weren't so expensive.", "would go|'d go"], ["f", "If I ___ (be) you, I would call her.", "were|was"], ["f", "I wish it ___ (not / be) so cold.", "weren't|were not|wasn't"],
 ["f", "What ___ you do if you lost your job?", "would"], ["f", "If he ___ (not / work) so much, he'd be happier.", "didn't work|did not work"],
 ["o", "If I were rich I would travel"], ["o", "I wish I had more time"], ["o", "What would you do if you won"], ["o", "If I were you I would accept"], ["o", "She wishes she could sing"],
 ["t", "Si fuera rico, compraria una casa.", "If I were rich I would buy a house|If I was rich, I'd buy a house"], ["t", "Ojala tuviera mas tiempo.", "I wish I had more time"], ["t", "Que harias si ganaras la loteria?", "What would you do if you won the lottery"],
 ["t", "Yo que tu, aceptaria.", "If I were you I would accept|If I were you, I'd accept"], ["t", "Ojala pudiera volar.", "I wish I could fly"], ["t", "Si viviera en Paris, aprenderia frances.", "If I lived in Paris I would learn French|If I lived in Paris, I'd learn French"], ["t", "Ojala no lloviera.", "I wish it wasn't raining|I wish it weren't raining|I wish it didn't rain"]
];

// 21: oraciones de relativo
GRAMMAR_EXTRA[21] = [
 ["m", "The woman ___ lives next door is a doctor.", "which|who|where", 1], ["m", "This is the camera ___ I bought in Japan.", "who|which|where", 1], ["m", "That's the restaurant ___ we met.", "which|where|who", 1],
 ["m", "He is the man ___ car was stolen.", "who|whose|which", 1], ["m", "The book ___ you lent me is great.", "that|who|where", 0], ["m", "I know a girl ___ speaks five languages.", "which|who|whose", 1],
 ["m", "The city ___ I was born is small.", "which|where|who", 1], ["m", "Is this the bus ___ goes to the airport?", "who|which|where", 1], ["m", "She's the artist ___ paintings are everywhere.", "who|whose|which", 1], ["m", "The people ___ work here are friendly.", "which|who|whose", 1],
 ["f", "The hotel ___ we stayed was cheap.", "where"], ["f", "I have a friend ___ is a pilot.", "who|that"], ["f", "This is the song ___ I love.", "that|which"],
 ["f", "That's the student ___ father is my boss.", "whose"], ["f", "The phone ___ I bought is broken.", "that|which"], ["f", "Valparaiso is a city ___ there is a lot of street art.", "where"],
 ["f", "The man ___ called you is my uncle.", "who|that"], ["f", "He's the photographer ___ work won the prize.", "whose"],
 ["o", "The man who called is my uncle"], ["o", "This is the house where I grew up"], ["o", "I lost the book that you gave me"], ["o", "She is the woman whose dog is lost"], ["o", "The bus which goes downtown is late"],
 ["t", "La mujer que vive aqui es profesora.", "The woman who lives here is a teacher"], ["t", "Este es el libro que compre.", "This is the book that I bought|This is the book I bought|This is the book which I bought"], ["t", "Es la ciudad donde naci.", "It is the city where I was born"],
 ["t", "Tengo un amigo que vive en Canada.", "I have a friend who lives in Canada"], ["t", "Es el chico cuyo padre es medico.", "He is the boy whose father is a doctor"], ["t", "El cafe donde nos conocimos cerro.", "The cafe where we met closed|The cafe where we met has closed"], ["t", "Las personas que trabajan aqui son amables.", "The people who work here are kind|The people who work here are friendly"]
];

// 22: estilo indirecto (reported speech)
GRAMMAR_EXTRA[22] = [
 ["m", "\"I am tired.\" She said she ___ tired.", "is|was|has been", 1], ["m", "\"We will call you.\" They said they ___ call me.", "will|would|can", 1], ["m", "\"I can't swim.\" He said he ___ swim.", "can't|couldn't|won't", 1],
 ["m", "\"Where do you live?\" She asked me where I ___.", "live|lived|do live", 1], ["m", "\"I have finished.\" He said he ___ finished.", "has|had|have", 1], ["m", "\"Call me later.\" She told me ___ her later.", "call|to call|calling", 1],
 ["m", "\"Do you like it?\" He asked ___ I liked it.", "that|if|what", 1], ["m", "\"I saw the movie.\" She said she ___ the movie.", "saw|had seen|has seen", 1], ["m", "He ___ me that he was busy.", "said|told|asked", 1], ["m", "\"Don't be late.\" The boss told us ___ late.", "not be|not to be|don't be", 1],
 ["f", "\"I love this song.\" She said she ___ that song.", "loved"], ["f", "\"We are leaving.\" They said they ___ leaving.", "were"], ["f", "\"I will help.\" He said he ___ help.", "would"],
 ["f", "\"Are you ready?\" She asked me ___ I was ready.", "if|whether"], ["f", "\"I lost my keys.\" He said he ___ his keys.", "had lost"], ["f", "\"Sit down.\" The teacher told us ___ down.", "to sit"],
 ["f", "\"I can drive.\" She said she ___ drive.", "could"], ["f", "\"What time is it?\" He asked what time it ___.", "was"],
 ["o", "She said that she was tired"], ["o", "He told me he would call"], ["o", "They asked if I was ready"], ["o", "She told me to wait"], ["o", "He said he had finished"],
 ["t", "Ella dijo que estaba cansada.", "She said she was tired|She said that she was tired"], ["t", "El me dijo que llamaria.", "He told me he would call|He told me that he would call"], ["t", "Me pregunto donde vivia.", "He asked me where I lived|She asked me where I lived"],
 ["t", "Dijeron que vendrian.", "They said they would come|They said that they would come"], ["t", "Me pidio que esperara.", "He asked me to wait|She asked me to wait|She told me to wait"], ["t", "El cliente dijo que el video era muy largo.", "The client said the video was too long|The client said that the video was very long"], ["t", "Me pregunto si me gustaba.", "He asked me if I liked it|She asked me if I liked it"]
];

// 23: futuro continuo, futuro perfecto y modales de deduccion
GRAMMAR_EXTRA[23] = [
 ["m", "This time tomorrow, I ___ on the beach.", "will lie|will be lying|will have lain", 1], ["m", "By 2030, I ___ my degree.", "will finish|will have finished|will be finishing", 1], ["m", "He isn't answering. He ___ be asleep.", "must|can't|should", 0],
 ["m", "She ___ be at home. I just saw her at the gym.", "must|can't|might", 1], ["m", "Take an umbrella. It ___ rain later.", "might|must|can't", 0], ["m", "By the time you arrive, we ___ dinner.", "will have eaten|will eat|are eating", 0],
 ["m", "At 9 pm I ___ my favorite show.", "will watch|will be watching|will have watched", 1], ["m", "The lights are off. They ___ have gone out.", "must|can't|should", 0], ["m", "He ___ have stolen it. He was with me all day.", "must|can't|might", 1], ["m", "By next year, she ___ here for ten years.", "will work|will have worked|works", 1],
 ["f", "This time next week, I ___ (travel) in Peru.", "will be traveling|will be travelling"], ["f", "By June, they ___ (finish) the project.", "will have finished"], ["f", "She looks happy. She ___ have passed the exam.", "must"],
 ["f", "That ___ be true. It's impossible.", "can't|cannot"], ["f", "I'm not sure, but he ___ be in the office.", "might|may|could"], ["f", "By 8 pm, I ___ (cook) dinner.", "will have cooked"],
 ["f", "Don't call at ten. I ___ (sleep).", "will be sleeping"], ["f", "They ___ have forgotten. They never forget.", "can't|couldn't"],
 ["o", "I will be working tomorrow at noon"], ["o", "She must be tired"], ["o", "By then we will have finished"], ["o", "It might rain tonight"], ["o", "He can't be serious"],
 ["t", "Manana a esta hora estare volando.", "This time tomorrow I will be flying|This time tomorrow I'll be flying"], ["t", "Para junio habre terminado.", "By June I will have finished|By June I'll have finished"], ["t", "Debe estar cansada.", "She must be tired"],
 ["t", "No puede ser verdad.", "It can't be true|It cannot be true"], ["t", "Puede que llegue tarde.", "I might be late|I may be late|I might arrive late"], ["t", "Deben haber salido.", "They must have left|They must have gone out"], ["t", "En 2050 los autos seran electricos.", "In 2050 cars will be electric"]
];

// 24: tercer condicional, should have, conectores de opinion
GRAMMAR_EXTRA[24] = [
 ["m", "If I had studied, I ___ passed.", "would have|will have|would", 0], ["m", "If she ___ earlier, she wouldn't have missed the bus.", "left|had left|has left", 1], ["m", "I ___ have told you. I'm sorry.", "should|must|would", 0],
 ["m", "You ___ have eaten so much.", "shouldn't|mustn't|wouldn't", 0], ["m", "___ it was raining, we went out.", "Although|However|Despite", 0], ["m", "The hotel was nice. ___, it was expensive.", "Although|However|Despite", 1],
 ["m", "___ the rain, we enjoyed the trip.", "Although|Despite|However", 1], ["m", "If we had known, we ___ come.", "would have|wouldn't have|will have", 0], ["m", "___, I think remote work is better.", "In my opinion|Despite|Although", 0], ["m", "He would have won if he ___ harder.", "trained|had trained|would train", 1],
 ["f", "If I ___ (know), I would have helped.", "had known"], ["f", "She ___ (would / not / go) if she had known.", "wouldn't have gone|would not have gone"], ["f", "You ___ (deberias haber) called me.", "should have"],
 ["f", "___ (a pesar de) the traffic, we arrived on time.", "Despite|In spite of"], ["f", "If they had left earlier, they ___ (catch) the train.", "would have caught"], ["f", "I ___ (no deberia haber) said that.", "shouldn't have|should not have"],
 ["f", "___ (aunque) he was tired, he kept working.", "Although|Even though|Though"], ["f", "On the one hand it is cheap. On the other ___, it is slow.", "hand"],
 ["o", "If I had known I would have come"], ["o", "You should have told me"], ["o", "Although it was late we kept talking"], ["o", "Despite the cold we went hiking"], ["o", "I should not have bought it"],
 ["t", "Si hubiera estudiado, habria aprobado.", "If I had studied I would have passed|If I had studied, I'd have passed"], ["t", "Deberias haberme llamado.", "You should have called me"], ["t", "Aunque llovia, salimos.", "Although it was raining we went out|Although it was raining, we left"],
 ["t", "No deberia haber comido tanto.", "I shouldn't have eaten so much|I should not have eaten so much"], ["t", "A pesar del frio, nadamos.", "Despite the cold we swam|In spite of the cold, we swam"], ["t", "En mi opinion, es una buena idea.", "In my opinion it is a good idea|In my opinion, it's a good idea"], ["t", "Si hubieras venido, te habrias divertido.", "If you had come you would have had fun|If you had come, you would have enjoyed it"]
];

// 25: phrasal verbs, used to / be used to / get used to
GRAMMAR_EXTRA[25] = [
 ["m", "I ___ live in the south, but now I live in Santiago.", "used to|am used to|get used to", 0], ["m", "She is used to ___ early.", "get up|getting up|got up", 1], ["m", "Can you ___ the music? It's too loud.", "turn down|turn up|turn on", 0],
 ["m", "Please ___ the form before you leave.", "fill in|fill on|fill at", 0], ["m", "I'm ___ my keys. Have you seen them?", "looking for|looking at|looking after", 0], ["m", "He ___ smoking last year.", "gave up|gave in|gave out", 0],
 ["m", "It took me months to ___ the noise.", "get used to|used to|be use to", 0], ["m", "Did you ___ play football as a child?", "used to|use to|using to", 1], ["m", "We need to ___ the meeting until Friday.", "put off|put on|put up", 0], ["m", "Can you ___ my cat while I'm away?", "look after|look for|look up", 0],
 ["f", "I ___ (solia) have long hair.", "used to"], ["f", "He isn't used to ___ (work) at night.", "working"], ["f", "Please ___ (apaga) the lights. (turn ___)", "turn off|switch off"],
 ["f", "She is getting used to ___ (live) alone.", "living"], ["f", "I'll ___ you up at the airport. (recoger)", "pick"], ["f", "If you don't know a word, look it ___ in the dictionary.", "up"],
 ["f", "Don't ___ up! You can do it. (rendirse)", "give"], ["f", "We ___ (not / used to) have a car.", "didn't use to|did not use to"],
 ["o", "I used to live in Valparaiso"], ["o", "She is used to working late"], ["o", "Please turn off your phone"], ["o", "I will pick you up at eight"], ["o", "He is getting used to the cold"],
 ["t", "Yo solia jugar tenis.", "I used to play tennis"], ["t", "Estoy acostumbrado a levantarme temprano.", "I am used to getting up early|I'm used to waking up early"], ["t", "Apaga la television, por favor.", "Turn off the TV please|Please turn off the TV"],
 ["t", "Me estoy acostumbrando al frio.", "I am getting used to the cold|I'm getting used to the cold"], ["t", "Estoy buscando mi pasaporte.", "I am looking for my passport|I'm looking for my passport"], ["t", "Dejo de fumar.", "He gave up smoking|She gave up smoking"], ["t", "Te paso a buscar a las ocho.", "I will pick you up at eight|I'll pick you up at eight"]
];

// 26: repaso final de tiempos narrativos y estructuras
GRAMMAR_EXTRA[26] = [
 ["m", "I ___ English for six months now.", "study|have been studying|studied", 1], ["m", "When I arrived, everybody ___.", "had left|has left|leaves", 0], ["m", "She ___ a shower when the phone rang.", "took|was taking|has taken", 1],
 ["m", "If I ___ you, I would practice every day.", "am|were|will be", 1], ["m", "By next year, I ___ my C1 exam.", "will have taken|will take|take", 0], ["m", "This bridge ___ in 1890.", "built|was built|has built", 1],
 ["m", "He said he ___ come tomorrow.", "will|would|can", 1], ["m", "I enjoy ___ podcasts.", "to listen|listening to|listen", 1], ["m", "The man ___ helped me was very kind.", "which|who|whose", 1], ["m", "If she had asked, I ___ her.", "would help|would have helped|will help", 1],
 ["f", "I ___ (live) here since 2015.", "have lived|'ve lived|have been living"], ["f", "While I ___ (walk) home, I met an old friend.", "was walking"], ["f", "If it ___ (rain) tomorrow, we will stay in.", "rains"],
 ["f", "I wish I ___ (start) earlier.", "had started"], ["f", "She told me ___ (not / worry).", "not to worry"], ["f", "The video ___ (watch) by a million people last year.", "was watched"],
 ["f", "We ___ (going to / visit) my parents next week.", "are going to visit|'re going to visit"], ["f", "He ___ (used to / work) in a bank.", "used to work"],
 ["o", "I have been studying English for six months"], ["o", "If I had known I would have told you"], ["o", "She said she would help me"], ["o", "The city where I was born is small"], ["o", "I am getting used to speaking English"],
 ["t", "He estudiado ingles por seis meses.", "I have studied English for six months|I have been studying English for six months"], ["t", "Si tuviera tiempo, viajaria mas.", "If I had time I would travel more|If I had time, I'd travel more"], ["t", "Cuando llegue, ya habian comido.", "When I arrived they had already eaten"],
 ["t", "Ella me dijo que estaba feliz.", "She told me she was happy|She told me that she was happy"], ["t", "Este video fue grabado en Patagonia.", "This video was filmed in Patagonia|This video was recorded in Patagonia"], ["t", "Ya no tengo miedo de hablar.", "I am not afraid of speaking anymore|I'm not afraid to speak anymore"], ["t", "Voy a seguir practicando todos los dias.", "I am going to keep practicing every day|I'm going to keep practising every day"]
];
