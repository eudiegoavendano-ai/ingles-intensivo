// Unidades de gramatica 1-13
// Tipos de ejercicio: mc (opcion multiple), fill (completar), order (ordenar palabras), tr (traducir)
window.GRAMMAR = window.GRAMMAR || {};

GRAMMAR[1] = {
  titulo: "Verbo TO BE (am / is / are) y pronombres",
  explicacion: `
<p>En ingles <b>to be</b> significa a la vez <b>ser</b> y <b>estar</b>. Solo tiene tres formas en presente:</p>
<table><tr><th>Pronombre</th><th>Forma</th><th>Contraccion</th></tr>
<tr><td>I</td><td>am</td><td>I'm</td></tr>
<tr><td>you / we / they</td><td>are</td><td>you're / we're / they're</td></tr>
<tr><td>he / she / it</td><td>is</td><td>he's / she's / it's</td></tr></table>
<p><b>Negativo:</b> agrega <b>not</b> -> I'm not, she isn't, they aren't.</p>
<p><b>Pregunta:</b> invierte el orden -> <b>Are you</b> tired? <b>Is she</b> from Peru?</p>
<p><b>Clave para hispanohablantes:</b> en ingles el sujeto es OBLIGATORIO. "Es grande" = <b>It is</b> big (nunca "Is big").</p>
<p>La edad se dice con <b>be</b>: I <b>am</b> 30 (years old). Nunca "I have 30 years".</p>`,
  ejemplos: [["I'm Diego. I'm from Chile.", "Soy Diego. Soy de Chile."], ["She isn't at home.", "Ella no esta en casa."], ["Are they your friends?", "Son ellos tus amigos?"], ["It's cold today.", "Hace frio hoy."]],
  errores: ["X I have 25 years -> OK I am 25", "X Is very big -> OK It is very big", "X She are -> OK She is"],
  ejercicios: [
    {t:"mc", q:"She ___ a teacher.", o:["am","is","are"], a:1},
    {t:"mc", q:"I ___ from Chile.", o:["am","is","are"], a:0},
    {t:"mc", q:"They ___ my friends.", o:["is","am","are"], a:2},
    {t:"fill", q:"We ___ (be) very happy.", a:["are","'re"]},
    {t:"fill", q:"He ___ (be / negativo) tired. (usa contraccion)", a:["isn't","is not"]},
    {t:"fill", q:"___ you from Peru? (be)", a:["are"]},
    {t:"mc", q:"Como se dice 'Tengo 30 anos'?", o:["I have 30 years","I am 30 years old","I'm have 30"], a:1},
    {t:"mc", q:"Como se dice 'Es grande'?", o:["Is big","It is big","Big is"], a:1},
    {t:"order", a:"Where are you from"},
    {t:"order", a:"My name is Diego"},
    {t:"order", a:"She is not my sister"},
    {t:"tr", q:"Ella es de Brasil.", a:["She is from Brazil","She's from Brazil"]},
    {t:"tr", q:"Estas cansado?", a:["Are you tired"]},
    {t:"tr", q:"Nosotros somos amigos.", a:["We are friends","We're friends"]}
  ]
};

GRAMMAR[2] = {
  titulo: "Posesivos, this/that, a/an y plurales",
  explicacion: `
<p><b>Adjetivos posesivos</b> (van antes del sustantivo y NO cambian en plural):</p>
<table><tr><th>Pronombre</th><th>Posesivo</th></tr>
<tr><td>I</td><td>my (mi/mis)</td></tr><tr><td>you</td><td>your</td></tr><tr><td>he</td><td>his</td></tr><tr><td>she</td><td>her</td></tr><tr><td>it</td><td>its</td></tr><tr><td>we</td><td>our</td></tr><tr><td>they</td><td>their</td></tr></table>
<p><b>this / these</b> = cerca (este/estos). <b>that / those</b> = lejos (ese/esos).</p>
<p><b>a</b> antes de sonido consonante (a car), <b>an</b> antes de sonido vocal (an engineer, an hour).</p>
<p>Las profesiones llevan articulo: She is <b>a</b> doctor (no "She is doctor").</p>
<p><b>Plurales:</b> +s (cars), +es tras s/sh/ch/x (buses, watches), irregulares: man->men, woman->women, child->children, person->people.</p>
<p><b>Los adjetivos van ANTES del sustantivo</b> y no tienen plural: a <b>big</b> house, two <b>big</b> houses.</p>
<p><b>Posesion con 's:</b> Diego<b>'s</b> car = el auto de Diego.</p>`,
  ejemplos: [["This is my sister. Her name is Ana.", "Esta es mi hermana. Su nombre es Ana."], ["Those are their children.", "Esos son sus hijos."], ["He is an engineer.", "El es ingeniero."], ["My father's car is red.", "El auto de mi papa es rojo."]],
  errores: ["X She is doctor -> OK She is a doctor", "X a house big -> OK a big house", "X blues cars -> OK blue cars", "X the car of Diego -> OK Diego's car"],
  ejercicios: [
    {t:"mc", q:"___ name is Tom. He is my friend.", o:["Her","His","Their"], a:1},
    {t:"mc", q:"She is ___ engineer.", o:["a","an","the"], a:1},
    {t:"mc", q:"___ are my parents (estan lejos).", o:["These","This","Those"], a:2},
    {t:"fill", q:"They have two ___ (child).", a:["children"]},
    {t:"fill", q:"We love ___ house. (nuestra)", a:["our"]},
    {t:"fill", q:"This is ___ umbrella. (un)", a:["an"]},
    {t:"mc", q:"Cual es correcta?", o:["a car red","a red car","a reds car"], a:1},
    {t:"mc", q:"'El perro de Ana' se dice:", o:["the dog of Ana","Ana's dog","Ana dog's"], a:1},
    {t:"fill", q:"There are three ___ (woman) in my family.", a:["women"]},
    {t:"order", a:"This is my brother"},
    {t:"order", a:"Their house is very big"},
    {t:"tr", q:"Mi hermana es enfermera.", a:["My sister is a nurse"]},
    {t:"tr", q:"Estos son mis amigos.", a:["These are my friends"]},
    {t:"tr", q:"El auto de Diego es nuevo.", a:["Diego's car is new"]}
  ]
};

GRAMMAR[3] = {
  titulo: "Presente simple (afirmativo)",
  explicacion: `
<p>Se usa para <b>rutinas, habitos y verdades generales</b>: I work every day.</p>
<p>Forma: sujeto + verbo base. <b>Ojo con he / she / it: se agrega -s!</b></p>
<table><tr><th>Sujeto</th><th>Verbo</th></tr>
<tr><td>I / you / we / they</td><td>work, live, go</td></tr>
<tr><td>he / she / it</td><td>work<b>s</b>, live<b>s</b>, go<b>es</b></td></tr></table>
<p>Reglas de la -s: watch -> watch<b>es</b>, go -> go<b>es</b>, do -> do<b>es</b>, study -> stud<b>ies</b>, have -> <b>has</b>.</p>
<p><b>Horas:</b> at seven, at half past six. <b>Dias:</b> on Monday. <b>Partes del dia:</b> in the morning, at night.</p>
<p><b>Pronunciacion de la -s:</b> /s/ works, /z/ lives, /iz/ watches.</p>`,
  ejemplos: [["I get up at seven.", "Me levanto a las siete."], ["She works in a bank.", "Ella trabaja en un banco."], ["My brother studies at night.", "Mi hermano estudia de noche."], ["He has breakfast at eight.", "El toma desayuno a las ocho."]],
  errores: ["X She work -> OK She works", "X He haves -> OK He has", "X in Monday -> OK on Monday"],
  ejercicios: [
    {t:"mc", q:"She ___ in a hospital.", o:["work","works","working"], a:1},
    {t:"mc", q:"They ___ English every day.", o:["study","studies","studys"], a:0},
    {t:"fill", q:"My father ___ (have) breakfast at seven.", a:["has"]},
    {t:"fill", q:"He ___ (watch) TV at night.", a:["watches"]},
    {t:"fill", q:"Ana ___ (go) to the gym on Monday.", a:["goes"]},
    {t:"fill", q:"My sister ___ (study) design.", a:["studies"]},
    {t:"mc", q:"I start work ___ nine o'clock.", o:["in","on","at"], a:2},
    {t:"mc", q:"We play football ___ Sunday.", o:["in","on","at"], a:1},
    {t:"mc", q:"I read ___ the evening.", o:["in","on","at"], a:0},
    {t:"order", a:"I get up at seven every day"},
    {t:"order", a:"She takes a shower in the morning"},
    {t:"tr", q:"El vive en Santiago.", a:["He lives in Santiago"]},
    {t:"tr", q:"Yo trabajo de lunes a viernes.", a:["I work from Monday to Friday"]},
    {t:"tr", q:"Mi mama cocina la cena.", a:["My mom cooks dinner","My mother cooks dinner","My mom cooks the dinner"]}
  ]
};

GRAMMAR[4] = {
  titulo: "Presente simple: negativo y preguntas (do / does) + some / any",
  explicacion: `
<p>Para negar y preguntar usamos el auxiliar <b>do / does</b>. Cuando aparece <b>does</b>, el verbo vuelve a su forma base (sin -s).</p>
<table><tr><th></th><th>I / you / we / they</th><th>he / she / it</th></tr>
<tr><td>Negativo</td><td>I <b>don't</b> eat meat.</td><td>She <b>doesn't</b> eat meat.</td></tr>
<tr><td>Pregunta</td><td><b>Do</b> you like fish?</td><td><b>Does</b> he like fish?</td></tr>
<tr><td>Respuesta corta</td><td>Yes, I do. / No, I don't.</td><td>Yes, he does. / No, he doesn't.</td></tr></table>
<p><b>Preguntas con palabra interrogativa:</b> What <b>do</b> you eat? Where <b>does</b> she work?</p>
<p><b>Contables vs incontables:</b> contables (apple, egg) tienen plural; incontables (water, money, rice, bread) no.</p>
<p><b>some</b> en afirmativas, <b>any</b> en negativas y preguntas: I have <b>some</b> eggs. I don't have <b>any</b> milk. Do you have <b>any</b> bread?</p>
<p><b>how much</b> + incontable (How much water?), <b>how many</b> + contable (How many eggs?).</p>`,
  ejemplos: [["I don't drink coffee.", "No tomo cafe."], ["Does she like spicy food?", "A ella le gusta la comida picante?"], ["We don't have any milk.", "No tenemos leche."], ["How much does it cost?", "Cuanto cuesta?"]],
  errores: ["X She doesn't likes -> OK She doesn't like", "X You like coffee? -> OK Do you like coffee?", "X How many money -> OK How much money"],
  ejercicios: [
    {t:"mc", q:"He ___ eat meat.", o:["don't","doesn't","isn't"], a:1},
    {t:"mc", q:"___ you like fish?", o:["Do","Does","Are"], a:0},
    {t:"mc", q:"Does she ___ coffee?", o:["drinks","drink","drinking"], a:1},
    {t:"fill", q:"I ___ (no) like onions.", a:["don't","do not"]},
    {t:"fill", q:"Where ___ your sister work?", a:["does"]},
    {t:"mc", q:"We don't have ___ bread.", o:["some","any","a"], a:1},
    {t:"mc", q:"I want ___ water, please.", o:["some","any","a"], a:0},
    {t:"mc", q:"How ___ eggs do you need?", o:["much","many","lot"], a:1},
    {t:"mc", q:"How ___ money do you have?", o:["much","many","any"], a:0},
    {t:"order", a:"Do you have any milk"},
    {t:"order", a:"She doesn't eat meat"},
    {t:"tr", q:"Cuanto cuesta esto?", a:["How much does this cost","How much is this"]},
    {t:"tr", q:"Mi papa no toma cafe.", a:["My dad doesn't drink coffee","My father doesn't drink coffee"]},
    {t:"tr", q:"Te gusta la comida peruana?", a:["Do you like Peruvian food"]}
  ]
};

GRAMMAR[5] = {
  titulo: "There is / there are + preposiciones de lugar",
  explicacion: `
<p><b>Hay</b> en ingles depende del numero:</p>
<table><tr><th></th><th>Singular</th><th>Plural</th></tr>
<tr><td>+</td><td>There <b>is</b> a bank.</td><td>There <b>are</b> two banks.</td></tr>
<tr><td>-</td><td>There <b>isn't</b> a bank.</td><td>There <b>aren't</b> any banks.</td></tr>
<tr><td>?</td><td><b>Is there</b> a bank?</td><td><b>Are there</b> any banks?</td></tr></table>
<p><b>Preposiciones:</b> in (dentro), on (sobre), under (debajo), next to (al lado), between (entre), in front of (delante), behind (detras), near (cerca), opposite (enfrente).</p>
<p><b>Direcciones:</b> Go straight on. Turn left/right. Take the second street on the left. It's on the corner.</p>
<p>Ojo: "Hay" NUNCA es "Have": X Have a bank here -> OK There is a bank here.</p>`,
  ejemplos: [["There is a pharmacy next to the hotel.", "Hay una farmacia al lado del hotel."], ["Are there any good restaurants near here?", "Hay buenos restaurantes cerca?"], ["The keys are on the table.", "Las llaves estan sobre la mesa."], ["Turn left and go straight on.", "Dobla a la izquierda y sigue derecho."]],
  errores: ["X Have a park near my house -> OK There is a park near my house", "X There is two beds -> OK There are two beds", "X next of -> OK next to"],
  ejercicios: [
    {t:"mc", q:"There ___ two bedrooms in my apartment.", o:["is","are","have"], a:1},
    {t:"mc", q:"___ there a bank near here?", o:["Is","Are","Do"], a:0},
    {t:"fill", q:"There ___ (negativo) any shops in my street.", a:["aren't","are not"]},
    {t:"mc", q:"The cat is ___ the table (debajo).", o:["on","under","behind"], a:1},
    {t:"mc", q:"The bank is ___ the cafe and the shop.", o:["between","next","in front"], a:0},
    {t:"fill", q:"The pharmacy is next ___ the hotel.", a:["to"]},
    {t:"fill", q:"The bus stop is in front ___ the school.", a:["of"]},
    {t:"mc", q:"'Hay un parque cerca' =", o:["Have a park near","There is a park near","It is a park near"], a:1},
    {t:"order", a:"Is there a pharmacy near here"},
    {t:"order", a:"Turn left at the traffic light"},
    {t:"tr", q:"Hay muchos turistas en la playa.", a:["There are many tourists on the beach","There are a lot of tourists on the beach","There are many tourists at the beach","There are a lot of tourists at the beach"]},
    {t:"tr", q:"Las llaves estan sobre la mesa.", a:["The keys are on the table"]},
    {t:"tr", q:"Hay wifi en el hotel?", a:["Is there wifi in the hotel","Is there Wi-Fi in the hotel","Is there wifi at the hotel"]}
  ]
};

GRAMMAR[6] = {
  titulo: "Gustos (like + -ing), adverbios de frecuencia y CAN",
  explicacion: `
<p><b>like / love / enjoy / hate + verbo-ing:</b> I like <b>swimming</b>. She enjoys <b>reading</b>.</p>
<p><b>Adverbios de frecuencia:</b> always (100%) - usually - often - sometimes - rarely - never (0%).</p>
<p>Posicion: <b>antes del verbo principal</b> (I <b>always</b> drink coffee), pero <b>despues de be</b> (She is <b>always</b> late).</p>
<p><b>How often...?</b> = Con que frecuencia? -> once a week, twice a month, three times a year.</p>
<p><b>CAN</b> = poder / saber hacer. Igual para todos los sujetos, sin "to" despues:</p>
<p>I <b>can</b> swim. She <b>can't</b> drive. <b>Can</b> you play the guitar? - Yes, I can.</p>
<p>Pronunciacion: can /ken/ (debil) vs can't /ka:nt/ (fuerte, larga).</p>`,
  ejemplos: [["I love taking photos.", "Me encanta sacar fotos."], ["She never eats fast food.", "Ella nunca come comida rapida."], ["He is usually tired on Monday.", "El suele estar cansado los lunes."], ["Can you swim? Yes, I can.", "Sabes nadar? Si."]],
  errores: ["X I like swim -> OK I like swimming", "X I drink always coffee -> OK I always drink coffee", "X She can to dance -> OK She can dance", "X He cans -> OK He can"],
  ejercicios: [
    {t:"mc", q:"I enjoy ___ in the park.", o:["run","running","to running"], a:1},
    {t:"mc", q:"Orden correcto?", o:["I go often to the gym","I often go to the gym","Often I go the gym"], a:1},
    {t:"mc", q:"Orden correcto?", o:["She always is late","She is always late","Always she is late"], a:1},
    {t:"mc", q:"He ___ play the guitar.", o:["can","cans","can to"], a:0},
    {t:"fill", q:"I hate ___ (wake) up early.", a:["waking"]},
    {t:"fill", q:"___ you speak English? - Yes, I can.", a:["can"]},
    {t:"fill", q:"She ___ (no puede) drive.", a:["can't","cannot","can not"]},
    {t:"fill", q:"How ___ do you go to the gym? - Twice a week.", a:["often"]},
    {t:"order", a:"I never eat fast food"},
    {t:"order", a:"Can you play the guitar"},
    {t:"tr", q:"Me encanta viajar.", a:["I love traveling","I love travelling","I love to travel"]},
    {t:"tr", q:"A veces voy a la playa.", a:["Sometimes I go to the beach","I sometimes go to the beach"]},
    {t:"tr", q:"No se nadar.", a:["I can't swim","I cannot swim"]}
  ]
};

GRAMMAR[7] = {
  titulo: "Presente continuo vs presente simple",
  explicacion: `
<p><b>Presente continuo</b> (am/is/are + verbo-ing) = accion <b>en este momento</b> o temporal.</p>
<p>I <b>am wearing</b> a jacket. She <b>is working</b> now. Are you <b>waiting</b> for the bus?</p>
<p><b>Presente simple</b> = habito, rutina, verdad general: I usually <b>wear</b> jeans.</p>
<p><b>Ortografia -ing:</b> make -> making (se va la e), run -> running, swim -> swimming (doble consonante), lie -> lying.</p>
<p><b>Palabras clave:</b> continuo -> now, right now, at the moment, today, Look!; simple -> usually, every day, always, often.</p>
<p><b>Verbos de estado</b> NO usan -ing: like, love, want, need, know, understand, believe -> X I am wanting -> OK I want.</p>`,
  ejemplos: [["I'm looking for a black jacket.", "Estoy buscando una chaqueta negra."], ["She usually wears dresses, but today she's wearing jeans.", "Ella normalmente usa vestidos, pero hoy lleva jeans."], ["What are you doing?", "Que estas haciendo?"], ["I need a bigger size.", "Necesito una talla mas grande."]],
  errores: ["X I wearing -> OK I am wearing", "X I am wanting a coffee -> OK I want a coffee", "X I am go to work every day -> OK I go to work every day"],
  ejercicios: [
    {t:"mc", q:"Look! It ___ .", o:["rains","is raining","rain"], a:1},
    {t:"mc", q:"I usually ___ sneakers.", o:["wear","am wearing","wearing"], a:0},
    {t:"mc", q:"I ___ a new phone.", o:["am needing","need","needing"], a:1},
    {t:"fill", q:"She ___ (work) right now.", a:["is working","'s working"]},
    {t:"fill", q:"What ___ you doing?", a:["are"]},
    {t:"fill", q:"They ___ (swim) in the sea at the moment.", a:["are swimming","'re swimming"]},
    {t:"fill", q:"He ___ (not / listen) to me now.", a:["isn't listening","is not listening"]},
    {t:"mc", q:"Ortografia correcta:", o:["runing","running","runnig"], a:1},
    {t:"order", a:"I am looking for a jacket"},
    {t:"order", a:"What are you wearing today"},
    {t:"tr", q:"Estoy esperando el bus.", a:["I am waiting for the bus","I'm waiting for the bus"]},
    {t:"tr", q:"Puedo probarme esta camisa?", a:["Can I try on this shirt","Can I try this shirt on"]},
    {t:"tr", q:"Ella esta hablando por telefono.", a:["She is talking on the phone","She's talking on the phone","She is speaking on the phone"]}
  ]
};

GRAMMAR[8] = {
  titulo: "Pasado simple: WAS/WERE y verbos regulares",
  explicacion: `
<p><b>Pasado de to be:</b> I/he/she/it <b>was</b> - you/we/they <b>were</b>. Negativo: wasn't / weren't. Pregunta: <b>Was</b> it good? <b>Were</b> you at home?</p>
<p><b>Verbos regulares:</b> se agrega <b>-ed</b>, igual para todos los sujetos: I work<b>ed</b>, she play<b>ed</b>.</p>
<p>Ortografia: like -> liked, study -> studied, stop -> stopped, play -> played.</p>
<p><b>Pronunciacion -ed:</b> /t/ worked, /d/ played, /id/ wanted, needed (solo tras t o d).</p>
<p><b>Negativo y pregunta con DID</b> (el verbo vuelve a la base): I <b>didn't</b> work. <b>Did</b> you watch it? - Yes, I did.</p>
<p><b>Expresiones:</b> yesterday, last night, last week, two days ago, in 2020.</p>`,
  ejemplos: [["It was a great weekend.", "Fue un fin de semana genial."], ["We watched a movie last night.", "Vimos una pelicula anoche."], ["Did you call your mom?", "Llamaste a tu mama?"], ["I didn't study yesterday.", "No estudie ayer."]],
  errores: ["X Did you watched? -> OK Did you watch?", "X I didn't worked -> OK I didn't work", "X We was -> OK We were", "X before two days -> OK two days ago"],
  ejercicios: [
    {t:"mc", q:"We ___ at the beach yesterday.", o:["was","were","are"], a:1},
    {t:"mc", q:"It ___ very cold last night.", o:["was","were","is"], a:0},
    {t:"fill", q:"I ___ (watch) a series last night.", a:["watched"]},
    {t:"fill", q:"She ___ (study) for three hours.", a:["studied"]},
    {t:"fill", q:"___ you call your mom yesterday?", a:["did"]},
    {t:"mc", q:"I didn't ___ on Sunday.", o:["worked","work","working"], a:1},
    {t:"fill", q:"They ___ (not / be) at the party.", a:["weren't","were not"]},
    {t:"mc", q:"'Hace dos dias' =", o:["before two days","two days ago","since two days"], a:1},
    {t:"mc", q:"Como suena la -ed en 'wanted'?", o:["/t/","/d/","/id/"], a:2},
    {t:"order", a:"Did you have a good weekend"},
    {t:"order", a:"I stayed at home last night"},
    {t:"tr", q:"Donde estabas ayer?", a:["Where were you yesterday"]},
    {t:"tr", q:"Visite a mis abuelos la semana pasada.", a:["I visited my grandparents last week"]},
    {t:"tr", q:"No me gusto la pelicula.", a:["I didn't like the movie","I didn't like the film","I did not like the movie"]}
  ]
};

GRAMMAR[9] = {
  titulo: "Pasado simple: verbos irregulares y preguntas",
  explicacion: `
<p>Los verbos mas usados son <b>irregulares</b> (hay que memorizarlos). Los mas importantes:</p>
<table><tr><th>Base</th><th>Pasado</th><th>Base</th><th>Pasado</th></tr>
<tr><td>go</td><td>went</td><td>see</td><td>saw</td></tr>
<tr><td>have</td><td>had</td><td>take</td><td>took</td></tr>
<tr><td>get</td><td>got</td><td>make</td><td>made</td></tr>
<tr><td>eat</td><td>ate</td><td>drink</td><td>drank</td></tr>
<tr><td>buy</td><td>bought</td><td>think</td><td>thought</td></tr>
<tr><td>come</td><td>came</td><td>leave</td><td>left</td></tr>
<tr><td>find</td><td>found</td><td>meet</td><td>met</td></tr>
<tr><td>say</td><td>said</td><td>tell</td><td>told</td></tr>
<tr><td>sleep</td><td>slept</td><td>spend</td><td>spent</td></tr></table>
<p>En negativo y pregunta se usa <b>did + base</b> (tambien con irregulares): Where <b>did</b> you <b>go</b>? I <b>didn't see</b> it.</p>
<p><b>Preguntas tipicas de viaje:</b> Where did you go? How long did you stay? What did you do? How was it?</p>`,
  ejemplos: [["I went to Cusco last year.", "Fui a Cusco el ano pasado."], ["We took a lot of photos.", "Sacamos muchas fotos."], ["Where did you stay?", "Donde te quedaste?"], ["I didn't buy anything.", "No compre nada."]],
  errores: ["X I goed -> OK I went", "X Where did you went? -> OK Where did you go?", "X I didn't saw -> OK I didn't see"],
  ejercicios: [
    {t:"fill", q:"We ___ (go) to Brazil last summer.", a:["went"]},
    {t:"fill", q:"I ___ (take) a lot of photos.", a:["took"]},
    {t:"fill", q:"She ___ (buy) a souvenir.", a:["bought"]},
    {t:"fill", q:"They ___ (eat) ceviche in Lima.", a:["ate"]},
    {t:"fill", q:"We ___ (see) the sunset from the hill.", a:["saw"]},
    {t:"fill", q:"I ___ (meet) a lot of people.", a:["met"]},
    {t:"mc", q:"Where did you ___ ?", o:["went","go","going"], a:1},
    {t:"mc", q:"I didn't ___ the museum.", o:["see","saw","seen"], a:0},
    {t:"fill", q:"How long ___ you stay in Mexico?", a:["did"]},
    {t:"order", a:"How was your trip to Peru"},
    {t:"order", a:"We left the hotel very early"},
    {t:"tr", q:"Dormi en el bus.", a:["I slept on the bus","I slept in the bus"]},
    {t:"tr", q:"Que hiciste el fin de semana?", a:["What did you do on the weekend","What did you do at the weekend","What did you do last weekend","What did you do this weekend"]},
    {t:"tr", q:"Perdi mi vuelo.", a:["I missed my flight"]}
  ]
};

GRAMMAR[10] = {
  titulo: "Comparativos y superlativos",
  explicacion: `
<p><b>Adjetivos cortos</b> (1 silaba): +er / the +est -> cold, colder, the coldest. big -> bigger -> the biggest.</p>
<p><b>Terminados en -y:</b> happy -> happier -> the happiest.</p>
<p><b>Adjetivos largos</b> (2+ silabas): more / the most -> beautiful -> more beautiful -> the most beautiful.</p>
<p><b>Irregulares:</b> good -> better -> the best | bad -> worse -> the worst | far -> farther/further -> the farthest.</p>
<p>Comparacion con <b>than</b>: Chile is longer <b>than</b> Peru. Igualdad: <b>as</b> cold <b>as</b>. Desigualdad: <b>not as</b> hot <b>as</b>.</p>
<p>Superlativo con <b>in</b> para lugares: the highest mountain <b>in</b> the world. Con present perfect: the best place I've <b>ever</b> seen.</p>`,
  ejemplos: [["Today is hotter than yesterday.", "Hoy hace mas calor que ayer."], ["It's the most beautiful beach in Chile.", "Es la playa mas hermosa de Chile."], ["The south is colder than the north.", "El sur es mas frio que el norte."], ["This hotel is not as expensive as that one.", "Este hotel no es tan caro como ese."]],
  errores: ["X more cold -> OK colder", "X more better -> OK better", "X bigger that -> OK bigger than", "X the best of the world -> OK the best in the world"],
  ejercicios: [
    {t:"fill", q:"Brazil is ___ (big) than Chile.", a:["bigger"]},
    {t:"fill", q:"Today is ___ (hot) than yesterday.", a:["hotter"]},
    {t:"fill", q:"This is the ___ (good) beach in the country.", a:["best"]},
    {t:"fill", q:"Patagonia is ___ (beautiful) than I expected.", a:["more beautiful"]},
    {t:"fill", q:"It was the ___ (bad) day of my trip.", a:["worst"]},
    {t:"fill", q:"She is ___ (happy) now.", a:["happier"]},
    {t:"mc", q:"The Atacama is the ___ desert in the world.", o:["dryer","driest","most dry"], a:1},
    {t:"mc", q:"My city is smaller ___ yours.", o:["that","than","as"], a:1},
    {t:"mc", q:"It's ___ cold ___ last winter.", o:["as / as","so / that","more / than"], a:0},
    {t:"order", a:"This is the highest mountain in Chile"},
    {t:"order", a:"Winter is colder than autumn"},
    {t:"tr", q:"Es el mejor lugar que he visto.", a:["It's the best place I've ever seen","It is the best place I have ever seen","It's the best place I have seen","It's the best place I've seen"]},
    {t:"tr", q:"El norte es mas seco que el sur.", a:["The north is drier than the south","The north is dryer than the south"]}
  ]
};

GRAMMAR[11] = {
  titulo: "Futuro: going to, will y presente continuo",
  explicacion: `
<p><b>going to</b> = planes e intenciones ya decididas: I'm <b>going to</b> visit Peru next year.</p>
<p>Tambien para predicciones con evidencia: Look at the clouds! It's <b>going to</b> rain.</p>
<p><b>will</b> = decisiones en el momento, promesas, ofertas y predicciones (opinion): I'll help you. I think it <b>will</b> be sunny. I <b>won't</b> forget.</p>
<p><b>Presente continuo</b> = citas y planes fijos con hora/fecha: I'm <b>meeting</b> Ana at 6. We're <b>flying</b> tomorrow.</p>
<p><b>Sugerencias:</b> Let's go! / Shall we...? / How about + -ing?</p>
<p>Despues de <b>when / as soon as / if</b> referido al futuro, se usa presente: I'll call you when I <b>arrive</b> (no "when I will arrive").</p>`,
  ejemplos: [["I'm going to start a YouTube channel.", "Voy a empezar un canal de YouTube."], ["I'll have the chicken, please.", "Voy a pedir el pollo, por favor."], ["We're flying to Lima on Friday.", "Volamos a Lima el viernes."], ["I'll text you when I get home.", "Te escribo cuando llegue a casa."]],
  errores: ["X I will to go -> OK I will go", "X I going to -> OK I'm going to", "X when I will arrive -> OK when I arrive"],
  ejercicios: [
    {t:"mc", q:"Look at those clouds! It ___ rain.", o:["will","is going to","rains"], a:1},
    {t:"mc", q:"The phone is ringing. - I ___ answer it.", o:["'ll","'m going to","am"], a:0},
    {t:"mc", q:"I ___ my dentist at 4 p.m. tomorrow (cita fija).", o:["see","am seeing","will seeing"], a:1},
    {t:"fill", q:"I promise I ___ (not) be late.", a:["won't","will not"]},
    {t:"fill", q:"We're ___ to travel to Europe next year.", a:["going"]},
    {t:"fill", q:"I'll call you when I ___ (arrive).", a:["arrive"]},
    {t:"mc", q:"I think Chile ___ win the match.", o:["will","is","going"], a:0},
    {t:"fill", q:"How ___ going to the cinema? (sugerencia)", a:["about"]},
    {t:"order", a:"What are you going to do tonight"},
    {t:"order", a:"I will help you with your bags"},
    {t:"tr", q:"Voy a aprender ingles este ano.", a:["I'm going to learn English this year","I am going to learn English this year"]},
    {t:"tr", q:"Creo que va a llover manana.", a:["I think it will rain tomorrow","I think it's going to rain tomorrow","I think it is going to rain tomorrow"]},
    {t:"tr", q:"Vamos a la playa (sugerencia).", a:["Let's go to the beach"]}
  ]
};

GRAMMAR[12] = {
  titulo: "Modales de consejo y obligacion: should, must, have to",
  explicacion: `
<p><b>should / shouldn't</b> = consejo: You <b>should</b> drink more water. You <b>shouldn't</b> smoke.</p>
<p><b>must</b> = obligacion fuerte o personal / reglas: You <b>must</b> wear a seatbelt.</p>
<p><b>mustn't</b> = PROHIBIDO: You <b>mustn't</b> park here.</p>
<p><b>have to</b> = obligacion externa (normas, trabajo): I <b>have to</b> work on Saturday. She <b>has to</b> take pills.</p>
<p><b>don't have to</b> = NO es necesario (pero puedes): You <b>don't have to</b> come. ! No es lo mismo que mustn't.</p>
<p>Pasado: <b>had to</b> (I had to go to the hospital).</p>
<p>Los modales (should, must, can) van seguidos del verbo base sin "to" y no llevan -s.</p>`,
  ejemplos: [["You should see a doctor.", "Deberias ver a un medico."], ["I have to take this medicine twice a day.", "Tengo que tomar este remedio dos veces al dia."], ["You mustn't drink alcohol with these pills.", "No debes tomar alcohol con estas pastillas."], ["You don't have to pay, it's free.", "No tienes que pagar, es gratis."]],
  errores: ["X You should to rest -> OK You should rest", "X She have to -> OK She has to", "X mustn't = no es necesario -> OK don't have to"],
  ejercicios: [
    {t:"mc", q:"You look tired. You ___ rest.", o:["should","mustn't","don't have to"], a:0},
    {t:"mc", q:"It's free. You ___ pay.", o:["mustn't","don't have to","should"], a:1},
    {t:"mc", q:"You ___ smoke in the hospital. It's prohibited.", o:["don't have to","mustn't","shouldn't to"], a:1},
    {t:"fill", q:"She ___ (have to) work on Sunday.", a:["has to"]},
    {t:"fill", q:"You ___ (should / negativo) eat so much sugar.", a:["shouldn't","should not"]},
    {t:"fill", q:"Yesterday I ___ (tener que) go to the dentist.", a:["had to"]},
    {t:"mc", q:"Cual es correcta?", o:["You should to sleep more","You should sleep more","You shoulds sleep more"], a:1},
    {t:"fill", q:"Do you ___ to wear a uniform at work?", a:["have"]},
    {t:"order", a:"You should drink more water"},
    {t:"order", a:"I have to see a doctor"},
    {t:"tr", q:"Me duele la cabeza.", a:["I have a headache","My head hurts"]},
    {t:"tr", q:"Deberias dormir mas.", a:["You should sleep more"]},
    {t:"tr", q:"No tienes que venir.", a:["You don't have to come","You do not have to come"]}
  ]
};

GRAMMAR[13] = {
  titulo: "Presente perfecto: ever, never, just, already, yet",
  explicacion: `
<p>Forma: <b>have / has + participio</b> (worked, been, seen, done, gone...).</p>
<p>Se usa para <b>experiencias de vida sin fecha</b> y para <b>resultados presentes</b>:</p>
<p><b>Have you ever</b> been to Mexico? - Yes, I have. / No, I've <b>never</b> been there.</p>
<p><b>just</b> = recien: I've <b>just</b> finished. <b>already</b> = ya (antes de lo esperado): She's <b>already</b> left.</p>
<p><b>yet</b> = en negativas "todavia" y en preguntas "ya", va al final: I haven't finished <b>yet</b>. Have you eaten <b>yet</b>?</p>
<p><b>been vs gone:</b> She has <b>been</b> to Paris (fue y volvio). She has <b>gone</b> to Paris (esta alla ahora).</p>
<p>Participios irregulares clave: be->been, do->done, see->seen, go->gone, take->taken, write->written, eat->eaten, give->given, know->known, speak->spoken.</p>`,
  ejemplos: [["Have you ever worked abroad?", "Alguna vez has trabajado en el extranjero?"], ["I've never seen snow.", "Nunca he visto nieve."], ["I've just sent the email.", "Acabo de enviar el correo."], ["Have you finished yet? - Not yet.", "Ya terminaste? - Todavia no."]],
  errores: ["X I have saw -> OK I have seen", "X Did you ever go...? (para experiencias) -> OK Have you ever been...?", "X I haven't yet finished -> OK I haven't finished yet"],
  ejercicios: [
    {t:"fill", q:"Have you ever ___ (be) to Europe?", a:["been"]},
    {t:"fill", q:"I've never ___ (see) a glacier.", a:["seen"]},
    {t:"fill", q:"She has just ___ (finish) her homework.", a:["finished"]},
    {t:"fill", q:"They ___ already left. (auxiliar)", a:["have","'ve"]},
    {t:"mc", q:"I haven't sent the report ___ .", o:["already","yet","just"], a:1},
    {t:"mc", q:"He ___ written ten emails today.", o:["have","has","is"], a:1},
    {t:"mc", q:"Ana isn't here. She has ___ to the bank.", o:["been","gone","went"], a:1},
    {t:"fill", q:"I have ___ (do) my homework.", a:["done"]},
    {t:"fill", q:"Have you ___ (take) the exam yet?", a:["taken"]},
    {t:"order", a:"Have you ever worked abroad"},
    {t:"order", a:"I have just finished the course"},
    {t:"tr", q:"Nunca he estado en Asia.", a:["I have never been to Asia","I've never been to Asia"]},
    {t:"tr", q:"Ya comiste? (yet)", a:["Have you eaten yet","Have you had lunch yet"]},
    {t:"tr", q:"Ya lo envie.", a:["I've already sent it","I have already sent it"]}
  ]
};
