// Ejercicios extra de gramatica, unidades 10 a 18 (formato en grammar_extra_1.js)
window.GRAMMAR_EXTRA = window.GRAMMAR_EXTRA || {};

// 10: comparativos y superlativos
GRAMMAR_EXTRA[10] = [
 ["m", "Santiago is ___ than Valparaiso.", "big|bigger|biggest", 1], ["m", "This is the ___ day of the year.", "hot|hotter|hottest", 2], ["m", "Her car is ___ than mine.", "more expensive|expensiver|most expensive", 0],
 ["m", "He is the ___ student in the class.", "better|best|good", 1], ["m", "Today is ___ than yesterday.", "bad|worse|worst", 1], ["m", "The south is ___ than the north.", "rainier|more rainy|rainyer", 0],
 ["m", "This is the ___ beautiful beach.", "more|most|much", 1], ["m", "My sister is ___ than me.", "tall|taller|tallest", 1], ["m", "It is the ___ restaurant in town.", "cheaper|cheapest|most cheap", 1], ["m", "Is Lima ___ than Santiago?", "humider|more humid|most humid", 1],
 ["f", "The Atacama is the ___ (dry) desert in the world.", "driest"], ["f", "This book is ___ (interesting) than the movie.", "more interesting"], ["f", "July is ___ (cold) than January in Chile.", "colder"],
 ["f", "He is the ___ (funny) person I know.", "funniest"], ["f", "My new phone is ___ (good) than the old one.", "better"], ["f", "That was the ___ (bad) trip of my life.", "worst"],
 ["f", "The mountains are ___ (quiet) than the city.", "quieter|more quiet"], ["f", "Ojos del Salado is the ___ (high) volcano.", "highest"],
 ["o", "The south is colder than the north"], ["o", "This is the best photo"], ["o", "Her house is bigger than mine"], ["o", "It is the most famous park in Chile"], ["o", "Today is hotter than yesterday"],
 ["t", "Mi hermano es mas alto que yo.", "My brother is taller than me|My brother is taller than I am"], ["t", "Es el lugar mas bonito.", "It is the most beautiful place"], ["t", "Este hotel es mas barato.", "This hotel is cheaper"],
 ["t", "El invierno es peor que el verano.", "Winter is worse than summer"], ["t", "Ella es la mejor fotografa.", "She is the best photographer"], ["t", "Lima es mas grande que Cusco.", "Lima is bigger than Cusco"], ["t", "Es el dia mas frio del ano.", "It is the coldest day of the year"]
];

// 11: futuro con going to, will y presente continuo
GRAMMAR_EXTRA[11] = [
 ["m", "Look at the clouds! It ___ rain.", "will|is going to|is", 1], ["m", "I think she ___ like the gift.", "will|is going|going to", 0], ["m", "We ___ to Peru next month. It is booked.", "will travel|are traveling|travel", 1],
 ["m", "The phone is ringing. I ___ answer it.", "will|am going to|going", 0], ["m", "___ you going to study tonight?", "Will|Are|Do", 1], ["m", "I promise I ___ call you.", "will|am going|going to", 0],
 ["m", "She ___ start a new job on Monday.", "is going to|will to|going", 0], ["m", "Maybe it ___ be sunny tomorrow.", "is going|will|goes", 1], ["m", "Wait! I ___ open the door for you.", "will|am going|going to", 0], ["m", "I ___ meeting the client at ten.", "will|am|going", 1],
 ["f", "I ___ (going to / buy) a new camera.", "am going to buy|'m going to buy"], ["f", "Don't worry, I ___ (will / help) you.", "will help|'ll help"], ["f", "They ___ (not / going to) come.", "are not going to|aren't going to"],
 ["f", "We ___ (have) dinner with my parents on Friday. (plan fijo)", "are having|'re having"], ["f", "I think it ___ (be) a great year.", "will be|'ll be"], ["f", "___ she going to move?", "Is"],
 ["f", "He ___ (not / will) tell anyone.", "won't|will not"], ["f", "What time ___ the meeting start tomorrow?", "does|will"],
 ["o", "I am going to travel next summer"], ["o", "Will you help me"], ["o", "We are meeting at eight"], ["o", "It is going to rain"], ["o", "I think she will win"],
 ["t", "Voy a estudiar esta noche.", "I am going to study tonight|I'm going to study tonight"], ["t", "Te ayudare.", "I will help you|I'll help you"], ["t", "Que vas a hacer manana?", "What are you going to do tomorrow"],
 ["t", "Creo que llovera.", "I think it will rain|I think it's going to rain"], ["t", "Ellos no van a venir.", "They are not going to come|They aren't going to come"], ["t", "Me reuno con Ana el lunes.", "I am meeting Ana on Monday|I'm meeting Ana on Monday"], ["t", "Sera un buen dia.", "It will be a good day"]
];

// 12: should, must, have to
GRAMMAR_EXTRA[12] = [
 ["m", "You look tired. You ___ rest.", "should|must not|don't have to", 0], ["m", "You ___ smoke in the hospital.", "mustn't|don't have to|should", 0], ["m", "I ___ work tomorrow. It's Sunday!", "don't have to|mustn't|have to", 0],
 ["m", "She ___ wear a uniform at work.", "has to|have to|must to", 0], ["m", "___ I take this medicine every day?", "Must|Do|Have", 0], ["m", "You ___ eat more vegetables.", "should|shouldn't|mustn't", 0],
 ["m", "We ___ hurry. We have time.", "don't have to|mustn't|have to", 0], ["m", "___ he have to pay?", "Do|Does|Has", 1], ["m", "You ___ drive after drinking.", "mustn't|don't have to|should", 0], ["m", "What should I ___?", "do|to do|doing", 0],
 ["f", "You ___ (deberias) see a doctor.", "should"], ["f", "I ___ (tengo que) get up early.", "have to|must"], ["f", "You ___ (no debes) touch that.", "mustn't|must not"],
 ["f", "He ___ (no tiene que) cook tonight.", "doesn't have to|does not have to"], ["f", "___ we buy tickets online?", "Should|Do"], ["f", "She ___ (tiene que) take the bus.", "has to"],
 ["f", "You ___ (no deberias) drink so much coffee.", "shouldn't|should not"], ["f", "Do I ___ bring my passport?", "have to|need to"],
 ["o", "You should drink more water"], ["o", "I have to work on Saturday"], ["o", "You must not use your phone"], ["o", "Do we have to pay now"], ["o", "She should go to bed early"],
 ["t", "Deberias descansar.", "You should rest"], ["t", "Tengo que ir al medico.", "I have to go to the doctor"], ["t", "No tienes que venir.", "You don't have to come"],
 ["t", "No debes fumar aqui.", "You mustn't smoke here|You must not smoke here"], ["t", "Que deberia hacer?", "What should I do"], ["t", "Ella tiene que trabajar.", "She has to work"], ["t", "Deberiamos salir temprano.", "We should leave early"]
];

// 13: presente perfecto con ever, never, just, already, yet
GRAMMAR_EXTRA[13] = [
 ["m", "Have you ever ___ sushi?", "eat|ate|eaten", 2], ["m", "I have ___ been to Brazil.", "never|ever|yet", 0], ["m", "She has ___ finished the report.", "yet|already|ever", 1],
 ["m", "Have they arrived ___?", "already|yet|just", 1], ["m", "He ___ just left.", "have|has|is", 1], ["m", "We haven't seen that movie ___.", "yet|already|just", 0],
 ["m", "I have ___ my keys. I can't find them.", "lose|lost|losed", 1], ["m", "___ you ever met a famous person?", "Did|Have|Has", 1], ["m", "She has ___ to Japan twice.", "gone|been|went", 1], ["m", "They have ___ the tickets.", "already bought|bought already yet|yet bought", 0],
 ["f", "I ___ (just / finish) my homework.", "have just finished|'ve just finished"], ["f", "Have you ___ (ever) climbed a volcano?", "ever"], ["f", "She ___ (not / call) me yet.", "hasn't called|has not called"],
 ["f", "We ___ (already / see) that.", "have already seen|'ve already seen"], ["f", "He has ___ (write) three books.", "written"], ["f", "I have ___ (nunca) driven a truck.", "never"],
 ["f", "Has the client paid ___?", "yet"], ["f", "They ___ (be) to Easter Island.", "have been|'ve been"],
 ["o", "I have never been to Europe"], ["o", "Have you finished yet"], ["o", "She has just arrived"], ["o", "We have already eaten"], ["o", "Has he ever worked abroad"],
 ["t", "Nunca he estado en Mexico.", "I have never been to Mexico|I've never been to Mexico"], ["t", "Acabo de terminar.", "I have just finished|I've just finished"], ["t", "Ya has comido?", "Have you eaten yet|Have you already eaten"],
 ["t", "Ella todavia no ha llegado.", "She hasn't arrived yet|She has not arrived yet"], ["t", "Has visto esta pelicula alguna vez?", "Have you ever seen this movie|Have you ever seen this film"], ["t", "Ya compramos los pasajes.", "We have already bought the tickets|We've already bought the tickets"], ["t", "El ha trabajado con muchos clientes.", "He has worked with many clients"]
];

// 14: presente perfecto vs pasado simple; for / since
GRAMMAR_EXTRA[14] = [
 ["m", "I have lived here ___ 2019.", "for|since|ago", 1], ["m", "She has worked there ___ five years.", "for|since|ago", 0], ["m", "We ___ to Peru last year.", "have gone|went|have been", 1],
 ["m", "I ___ my phone three times this year.", "changed|have changed|change", 1], ["m", "How long ___ you known him?", "did|have|are", 1], ["m", "He ___ the job in 2020.", "has started|started|starts", 1],
 ["m", "They have been married ___ ten years.", "since|for|during", 1], ["m", "When ___ you buy that laptop?", "have|did|do", 1], ["m", "I haven't seen her ___ Monday.", "for|since|ago", 1], ["m", "She ___ in London when she was young.", "has lived|lived|lives", 1],
 ["f", "I ___ (have) this camera since 2018.", "have had|'ve had"], ["f", "He ___ (move) to Chile three years ago.", "moved"], ["f", "We have known each other ___ we were kids.", "since"],
 ["f", "How long ___ she lived here?", "has"], ["f", "I ___ (not / see) him since last summer.", "haven't seen|have not seen"], ["f", "They ___ (open) the shop in 2015.", "opened"],
 ["f", "She has studied English ___ six months.", "for"], ["f", "___ you ever lost your passport?", "Have"],
 ["o", "I have worked here for eight years"], ["o", "She moved to Santiago in 2020"], ["o", "How long have you had this car"], ["o", "We have not met since March"], ["o", "When did you start"],
 ["t", "Vivo aqui desde 2020.", "I have lived here since 2020|I've lived here since 2020"], ["t", "Lo conozco hace diez anos.", "I have known him for ten years|I've known him for ten years"], ["t", "Compre el telefono el ano pasado.", "I bought the phone last year"],
 ["t", "Cuanto tiempo has trabajado aqui?", "How long have you worked here"], ["t", "No la he visto desde el lunes.", "I haven't seen her since Monday"], ["t", "Ella empezo en 2018.", "She started in 2018"], ["t", "Hemos estado casados por cinco anos.", "We have been married for five years|We've been married for five years"]
];

// 15: pasado continuo, pasado simple, pasado perfecto
GRAMMAR_EXTRA[15] = [
 ["m", "I ___ dinner when you called.", "had|was having|have had", 1], ["m", "While she was walking, she ___ a friend.", "met|was meeting|had met", 0], ["m", "When I arrived, the bus ___ already left.", "has|had|was", 1],
 ["m", "They ___ TV when the lights went out.", "watched|were watching|had watched", 1], ["m", "He was tired because he ___ all day.", "worked|had worked|has worked", 1], ["m", "What ___ you doing at 8 pm yesterday?", "did|were|had", 1],
 ["m", "It ___ when we left the house.", "was raining|rained|had rain", 0], ["m", "I couldn't enter because I ___ my keys.", "lost|had lost|was losing", 1], ["m", "We ___ along the beach when it started to rain.", "walked|were walking|had walked", 1], ["m", "She ___ never seen snow before that trip.", "has|had|was", 1],
 ["f", "I ___ (sleep) when the phone rang.", "was sleeping"], ["f", "They ___ (already / eat) when we arrived.", "had already eaten"], ["f", "While we ___ (drive), we saw a fox.", "were driving"],
 ["f", "She ___ (fall) while she was running.", "fell"], ["f", "He ___ (not / finish) when the boss came.", "hadn't finished|had not finished"], ["f", "What ___ you doing when I called?", "were"],
 ["f", "The film ___ (start) when we got to the cinema.", "had started|had already started"], ["f", "I ___ (read) when I heard a noise.", "was reading"],
 ["o", "I was cooking when you called"], ["o", "The train had left when we arrived"], ["o", "What were you doing last night"], ["o", "She was sleeping when the storm started"], ["o", "We had never seen the sea before"],
 ["t", "Estaba durmiendo cuando sono el telefono.", "I was sleeping when the phone rang"], ["t", "Cuando llegue, ya se habian ido.", "When I arrived they had already left|When I arrived, they had already gone"], ["t", "Que estabas haciendo?", "What were you doing"],
 ["t", "Ella estaba leyendo.", "She was reading"], ["t", "Nunca habia visto un volcan.", "I had never seen a volcano"], ["t", "Mientras caminabamos, empezo a llover.", "While we were walking it started to rain|While we were walking, it began to rain"], ["t", "El habia perdido su pasaporte.", "He had lost his passport"]
];

// 16: cuantificadores
GRAMMAR_EXTRA[16] = [
 ["m", "How ___ money do you need?", "many|much|lot", 1], ["m", "How ___ people came?", "much|many|lot", 1], ["m", "There is ___ sugar in my coffee. Just a bit.", "a little|a few|many", 0],
 ["m", "I have ___ friends in London. About three.", "a little|a few|much", 1], ["m", "This soup is ___ salty. I can't eat it.", "too|enough|very much", 0], ["m", "He isn't old ___ to drive.", "too|enough|much", 1],
 ["m", "There are ___ tourists in summer.", "a lot of|much|a little", 0], ["m", "We don't have ___ time.", "many|much|few", 1], ["m", "There were ___ cars on the road, so it was fast.", "few|little|much", 0], ["m", "There isn't ___ bread for everybody.", "too|enough|many", 1],
 ["f", "I don't drink ___ (mucho) coffee.", "much"], ["f", "There are ___ (demasiados) people here.", "too many"], ["f", "She has ___ (un poco de) money.", "a little"],
 ["f", "We have ___ (suficientes) chairs.", "enough"], ["f", "There is ___ (demasiado) noise.", "too much"], ["f", "How ___ eggs do we need?", "many"],
 ["f", "I have ___ (unas pocas) questions.", "a few"], ["f", "He eats ___ (mucha) meat.", "a lot of|lots of"],
 ["o", "There are too many cars"], ["o", "How much does it cost"], ["o", "I have a few friends here"], ["o", "We do not have enough time"], ["o", "There is a little milk"],
 ["t", "Cuanto dinero tienes?", "How much money do you have"], ["t", "Hay demasiada gente.", "There are too many people"], ["t", "No tengo suficiente tiempo.", "I don't have enough time"],
 ["t", "Hay muchos restaurantes.", "There are a lot of restaurants|There are many restaurants"], ["t", "Necesito un poco de agua.", "I need a little water|I need some water"], ["t", "Esta demasiado caliente.", "It is too hot"], ["t", "Cuantas personas vienen?", "How many people are coming"]
];

// 17: condicional 0 y 1, unless, when
GRAMMAR_EXTRA[17] = [
 ["m", "If it rains, we ___ at home.", "stay|will stay|stayed", 1], ["m", "If you heat ice, it ___.", "melts|will melted|melting", 0], ["m", "I won't go ___ you come with me.", "if|unless|when", 1],
 ["m", "If she ___ the bus, she will be late.", "misses|will miss|missed", 0], ["m", "___ I get home, I will call you.", "When|Unless|If not", 0], ["m", "If you don't study, you ___ pass.", "won't|don't|wouldn't", 0],
 ["m", "We will go to the beach if it ___ sunny.", "will be|is|was", 1], ["m", "If you mix red and blue, you ___ purple.", "get|will got|got", 0], ["m", "She will be angry ___ you tell her the truth.", "unless|when|if not", 0], ["m", "What ___ you do if you lose your job?", "do|will|are", 1],
 ["f", "If I ___ (have) time, I will help you.", "have"], ["f", "If you ___ (not / hurry), you'll miss the train.", "don't hurry|do not hurry"], ["f", "We ___ (go) out if the weather is good.", "will go|'ll go"],
 ["f", "If water reaches 100 degrees, it ___ (boil).", "boils"], ["f", "I won't call ___ there is a problem.", "unless"], ["f", "___ you see Tom, say hello.", "If|When"],
 ["f", "If he ___ (be) late again, the boss will be angry.", "is"], ["f", "She ___ (not / come) unless you invite her.", "won't come|will not come"],
 ["o", "If it rains we will stay home"], ["o", "I will call you when I arrive"], ["o", "Unless you hurry you will be late"], ["o", "If you heat water it boils"], ["o", "What will you do if you win"],
 ["t", "Si llueve, no iremos.", "If it rains we won't go|If it rains, we will not go"], ["t", "Te llamare cuando llegue.", "I will call you when I arrive|I'll call you when I arrive"], ["t", "Si estudias, aprobaras.", "If you study you will pass|If you study, you'll pass"],
 ["t", "No ire a menos que vengas.", "I won't go unless you come|I will not go unless you come"], ["t", "Si tienes hambre, come algo.", "If you are hungry eat something|If you're hungry, eat something"], ["t", "Si ella llama, dile que estoy ocupado.", "If she calls tell her I am busy|If she calls, tell her I'm busy"], ["t", "Que haras si pierdes el vuelo?", "What will you do if you miss the flight"]
];

// 18: gerundio vs infinitivo
GRAMMAR_EXTRA[18] = [
 ["m", "I enjoy ___ movies.", "to watch|watching|watch", 1], ["m", "She decided ___ the job.", "accepting|to accept|accept", 1], ["m", "He avoids ___ fast food.", "to eat|eating|eat", 1],
 ["m", "We hope ___ you soon.", "seeing|to see|see", 1], ["m", "I don't mind ___.", "to wait|waiting|wait", 1], ["m", "They promised ___ on time.", "arriving|to arrive|arrive", 1],
 ["m", "Would you like ___ something?", "drinking|to drink|drink", 1], ["m", "She is good at ___ photos.", "taking|to take|take", 0], ["m", "I want ___ English fluently.", "speaking|to speak|speak", 1], ["m", "He suggested ___ a taxi.", "to take|taking|take", 1],
 ["f", "I can't stand ___ (wait) in lines.", "waiting"], ["f", "She agreed ___ (help) us.", "to help"], ["f", "We finished ___ (edit) the video.", "editing"],
 ["f", "They refused ___ (pay).", "to pay"], ["f", "I'm thinking about ___ (move) abroad.", "moving"], ["f", "He managed ___ (finish) on time.", "to finish"],
 ["f", "Do you feel like ___ (go) out?", "going"], ["f", "I need ___ (buy) a new laptop.", "to buy"],
 ["o", "I enjoy watching series in English"], ["o", "She decided to learn French"], ["o", "We avoid driving at night"], ["o", "He wants to be a director"], ["o", "I stopped eating sugar"],
 ["t", "Disfruto viajar.", "I enjoy traveling|I enjoy travelling"], ["t", "Decidi estudiar ingles.", "I decided to study English"], ["t", "Ella evita hablar en publico.", "She avoids speaking in public"],
 ["t", "Quiero comprar una camara.", "I want to buy a camera"], ["t", "No me importa esperar.", "I don't mind waiting"], ["t", "Prometio llamarme.", "He promised to call me|She promised to call me"], ["t", "Deje de fumar.", "I stopped smoking|I quit smoking"]
];
