// Unidades de gramatica 14-26
window.GRAMMAR = window.GRAMMAR || {};

GRAMMAR[14] = {
  titulo: "Presente perfecto vs pasado simple; for / since",
  explicacion: `
<p><b>Pasado simple</b> = accion terminada en un momento <b>concreto</b>: I <b>bought</b> this laptop <b>in 2022</b>.</p>
<p><b>Presente perfecto</b> = sin momento concreto, o periodo que sigue abierto: I've <b>had</b> this laptop <b>for</b> two years (y aun lo tengo).</p>
<p><b>for</b> + periodo (for three years, for a week). <b>since</b> + punto de inicio (since 2020, since Monday, since I was a child).</p>
<p><b>How long have you...?</b> = Hace cuanto que...? -> How long <b>have you had</b> your camera?</p>
<p>! Los hispanohablantes dicen "I live here since 2019" X. Correcto: I<b>'ve lived</b> here <b>since</b> 2019.</p>
<p>Si hay <b>yesterday, last year, ago, in 2015, when...</b> -> pasado simple siempre.</p>`,
  ejemplos: [["I've used this app for two years.", "Uso esta app hace dos anos."], ["I downloaded it last week.", "La descargue la semana pasada."], ["How long have you been a creator?", "Hace cuanto eres creador?"], ["She's worked here since March.", "Ella trabaja aqui desde marzo."]],
  errores: ["X I live here since 2019 -> OK I've lived here since 2019", "X I have seen it yesterday -> OK I saw it yesterday", "X since two years -> OK for two years"],
  ejercicios: [
    {t:"mc", q:"I ___ this phone in 2023.", o:["have bought","bought","buy"], a:1},
    {t:"mc", q:"I ___ this phone for two years.", o:["have had","had","have"], a:0},
    {t:"mc", q:"She has lived here ___ 2020.", o:["for","since","from"], a:1},
    {t:"mc", q:"We've known each other ___ ten years.", o:["for","since","during"], a:0},
    {t:"fill", q:"How long ___ you had your camera?", a:["have"]},
    {t:"fill", q:"I ___ (see) that video yesterday.", a:["saw"]},
    {t:"fill", q:"I ___ (work) as an editor since 2021. (presente perfecto, contraccion)", a:["'ve worked","have worked"]},
    {t:"mc", q:"'Vivo aqui hace 5 anos' =", o:["I live here for 5 years","I've lived here for 5 years","I lived here since 5 years"], a:1},
    {t:"order", a:"How long have you had this laptop"},
    {t:"order", a:"I have been a photographer since 2020"},
    {t:"tr", q:"Uso Instagram desde 2015.", a:["I've used Instagram since 2015","I have used Instagram since 2015","I've been using Instagram since 2015"]},
    {t:"tr", q:"Subi el video anoche.", a:["I uploaded the video last night"]},
    {t:"tr", q:"Has descargado la app?", a:["Have you downloaded the app"]}
  ]
};

GRAMMAR[15] = {
  titulo: "Pasado continuo, pasado simple y pasado perfecto (narrar)",
  explicacion: `
<p><b>Pasado continuo</b> (was/were + -ing) = accion en desarrollo en el pasado (el "fondo" de la historia): I <b>was walking</b> home...</p>
<p><b>Pasado simple</b> = accion que interrumpe o acciones en secuencia: ...when it <b>started</b> to rain.</p>
<p><b>while</b> + continuo, <b>when</b> + simple (normalmente): <b>While</b> I was sleeping, the phone <b>rang</b>.</p>
<p><b>Pasado perfecto</b> (had + participio) = algo anterior a otro pasado: When I arrived, the bus <b>had</b> already <b>left</b>.</p>
<p><b>used to</b> + base = habitos pasados que ya no existen: I <b>used to</b> play football (antes jugaba).</p>
<p>Conectores para contar historias: at first, then, suddenly, after that, luckily, in the end.</p>`,
  ejemplos: [["I was driving when I saw the accident.", "Iba manejando cuando vi el accidente."], ["While we were climbing, it got dark.", "Mientras subiamos, oscurecio."], ["I had never seen snow before that trip.", "Nunca habia visto nieve antes de ese viaje."], ["I used to live in a small town.", "Antes vivia en un pueblo pequeno."]],
  errores: ["X When I was arriving, he left -> OK When I arrived, he left", "X I use to play -> OK I used to play", "X I was knowing -> OK I knew"],
  ejercicios: [
    {t:"mc", q:"I ___ TV when you called.", o:["watched","was watching","have watched"], a:1},
    {t:"mc", q:"While she was cooking, she ___ her finger.", o:["cut","was cutting","cuts"], a:0},
    {t:"fill", q:"They ___ (play) football when it started to rain.", a:["were playing"]},
    {t:"fill", q:"When I got to the station, the train ___ already ___ (leave). (escribe: had left)", a:["had left"]},
    {t:"fill", q:"I ___ (use) to live in Valparaiso.", a:["used"]},
    {t:"mc", q:"Suddenly, someone ___ my name.", o:["shouted","was shouting","had shout"], a:0},
    {t:"fill", q:"What ___ you doing at 10 p.m. last night?", a:["were"]},
    {t:"mc", q:"I ___ never been on a plane before 2019.", o:["have","had","was"], a:1},
    {t:"order", a:"I was sleeping when the phone rang"},
    {t:"order", a:"She had already left when I arrived"},
    {t:"tr", q:"Mientras caminaba, empezo a llover.", a:["While I was walking, it started to rain","While I was walking it started to rain","While I was walking, it started raining","While I was walking it began to rain","While I was walking, it began to rain"]},
    {t:"tr", q:"Antes jugaba futbol todos los dias.", a:["I used to play football every day","I used to play soccer every day"]},
    {t:"tr", q:"Me cai de la bicicleta.", a:["I fell off my bike","I fell off the bike","I fell off my bicycle"]}
  ]
};

GRAMMAR[16] = {
  titulo: "Cuantificadores: much / many / a lot of / few / little / too / enough",
  explicacion: `
<table><tr><th></th><th>Contables (plural)</th><th>Incontables</th></tr>
<tr><td>Mucho</td><td>many (neg/preg)</td><td>much (neg/preg)</td></tr>
<tr><td>Mucho (afirmativo)</td><td colspan="2">a lot of / lots of / plenty of</td></tr>
<tr><td>Algunos / un poco</td><td>a few</td><td>a little</td></tr>
<tr><td>Pocos (casi nada)</td><td>few</td><td>little</td></tr></table>
<p><b>a few / a little</b> = suficiente, positivo. <b>few / little</b> = casi nada, negativo.</p>
<p><b>too + adjetivo</b> = demasiado: It's <b>too</b> spicy. <b>too much / too many</b> + sustantivo: <b>too many</b> people, <b>too much</b> salt.</p>
<p><b>enough</b>: despues del adjetivo (big <b>enough</b>), antes del sustantivo (<b>enough</b> money).</p>
<p><b>all / both / each / every</b>: every + singular (every day), all + plural (all the dishes), both = ambos.</p>`,
  ejemplos: [["There are too many tourists here.", "Hay demasiados turistas aqui."], ["I don't have much time.", "No tengo mucho tiempo."], ["Just a little sugar, please.", "Solo un poco de azucar, por favor."], ["The soup isn't hot enough.", "La sopa no esta lo suficientemente caliente."]],
  errores: ["X too much people -> OK too many people", "X enough big -> OK big enough", "X every days -> OK every day"],
  ejercicios: [
    {t:"mc", q:"There are ___ people in the restaurant.", o:["too much","too many","too"], a:1},
    {t:"mc", q:"I don't have ___ money.", o:["many","much","few"], a:1},
    {t:"mc", q:"The coffee is ___ hot. I can't drink it.", o:["too","enough","much"], a:0},
    {t:"mc", q:"Is the room big ___ ?", o:["too","enough","many"], a:1},
    {t:"fill", q:"Can I have a ___ milk in my coffee?", a:["little"]},
    {t:"fill", q:"I have a ___ friends in Lima.", a:["few"]},
    {t:"fill", q:"How ___ dishes did you order?", a:["many"]},
    {t:"mc", q:"___ day I drink coffee.", o:["All","Every","Both"], a:1},
    {t:"mc", q:"I ate ___ much. I feel sick.", o:["too","so","enough"], a:0},
    {t:"order", a:"There isn't enough food for everyone"},
    {t:"order", a:"This dish is too spicy for me"},
    {t:"tr", q:"Hay demasiada sal en la sopa.", a:["There is too much salt in the soup","There's too much salt in the soup"]},
    {t:"tr", q:"Que me recomienda?", a:["What do you recommend"]},
    {t:"tr", q:"Pocas personas conocen este lugar.", a:["Few people know this place","Not many people know this place"]}
  ]
};

GRAMMAR[17] = {
  titulo: "Condicional 0 y 1 + clausulas de tiempo (if, unless, when)",
  explicacion: `
<p><b>Condicional cero</b> (verdades generales): If + presente, presente -> If you heat ice, it <b>melts</b>.</p>
<p><b>Primer condicional</b> (situaciones reales/probables del futuro): <b>If + presente, will + base</b>.</p>
<p>If it <b>rains</b>, we<b>'ll stay</b> home. I<b>'ll call</b> you if I <b>need</b> help.</p>
<p>! NUNCA "will" despues de if: X If it will rain -> OK If it rains.</p>
<p><b>unless</b> = if not: I won't go <b>unless</b> you come (= if you don't come).</p>
<p>Lo mismo con <b>when, as soon as, before, after, until</b>: I'll tell you <b>when</b> I <b>know</b>.</p>
<p><b>in case</b> = por si acaso: Take a jacket <b>in case</b> it gets cold.</p>`,
  ejemplos: [["If you practice every day, you'll improve fast.", "Si practicas todos los dias, mejoraras rapido."], ["I won't go unless you come with me.", "No ire a menos que vengas conmigo."], ["I'll call you as soon as I arrive.", "Te llamo apenas llegue."], ["If I'm nervous, I talk too fast.", "Si estoy nervioso, hablo muy rapido."]],
  errores: ["X If you will come -> OK If you come", "X unless you don't come -> OK unless you come", "X when I will arrive -> OK when I arrive"],
  ejercicios: [
    {t:"mc", q:"If it ___, we'll stay at home.", o:["will rain","rains","rained"], a:1},
    {t:"mc", q:"If you study, you ___ the exam.", o:["pass","will pass","passed"], a:1},
    {t:"fill", q:"I'll be angry if you ___ (lie) to me.", a:["lie"]},
    {t:"fill", q:"She ___ (not / come) unless you invite her.", a:["won't come","will not come"]},
    {t:"mc", q:"I'll call you as soon as I ___ home.", o:["get","will get","got"], a:0},
    {t:"mc", q:"___ you don't hurry, you'll miss the bus.", o:["Unless","If","When"], a:1},
    {t:"mc", q:"Take an umbrella ___ it rains.", o:["in case","unless","until"], a:0},
    {t:"fill", q:"If you heat water to 100 degrees, it ___ (boil).", a:["boils"]},
    {t:"order", a:"If you need help I will call you"},
    {t:"order", a:"I won't go unless you come"},
    {t:"tr", q:"Si me llamas, te ayudare.", a:["If you call me, I'll help you","If you call me I'll help you","If you call me, I will help you","If you call me I will help you"]},
    {t:"tr", q:"Me llevo bien con mi hermano.", a:["I get along with my brother","I get on well with my brother","I get along well with my brother"]},
    {t:"tr", q:"Te extrano.", a:["I miss you"]}
  ]
};

GRAMMAR[18] = {
  titulo: "Gerundio (-ing) vs infinitivo (to + verbo)",
  explicacion: `
<p>Algunos verbos van seguidos de <b>-ing</b> y otros de <b>to + verbo</b>. Hay que aprenderlos en bloque.</p>
<p><b>+ -ing:</b> enjoy, finish, mind, avoid, suggest, keep, stop, consider, imagine, practice, can't stand -> I enjoy <b>watching</b> series.</p>
<p><b>+ to:</b> want, need, decide, plan, hope, learn, agree, refuse, manage, afford, seem, pretend, promise -> I decided <b>to start</b> a podcast.</p>
<p><b>Despues de preposicion siempre -ing:</b> I'm good at <b>editing</b>. I'm interested in <b>learning</b>. Thanks for <b>helping</b>. I'm looking forward to <b>seeing</b> you.</p>
<p><b>-ing como sujeto:</b> <b>Watching</b> series in English helps a lot.</p>
<p><b>Cambia el significado:</b> stop <b>smoking</b> (dejar de fumar) vs stop <b>to smoke</b> (parar para fumar). remember <b>to call</b> (acordarse de hacer) vs remember <b>calling</b> (recordar haberlo hecho).</p>`,
  ejemplos: [["I enjoy watching documentaries.", "Disfruto ver documentales."], ["I can't afford to buy a new camera.", "No me alcanza para comprar una camara nueva."], ["I'm interested in learning English.", "Me interesa aprender ingles."], ["Learning a language takes time.", "Aprender un idioma toma tiempo."]],
  errores: ["X I enjoy to watch -> OK I enjoy watching", "X I'm interested in learn -> OK interested in learning", "X I look forward to see you -> OK to seeing you", "X I want watching -> OK I want to watch"],
  ejercicios: [
    {t:"mc", q:"I enjoy ___ movies in English.", o:["to watch","watching","watch"], a:1},
    {t:"mc", q:"She decided ___ a new job.", o:["to find","finding","find"], a:0},
    {t:"fill", q:"I'm good at ___ (edit) videos.", a:["editing"]},
    {t:"fill", q:"We can't afford ___ (travel) this year. (to + verbo)", a:["to travel"]},
    {t:"fill", q:"Do you mind ___ (wait) a moment?", a:["waiting"]},
    {t:"fill", q:"I'm looking forward to ___ (see) you.", a:["seeing"]},
    {t:"mc", q:"He refused ___ the series.", o:["watching","to watch","watch"], a:1},
    {t:"mc", q:"___ English every day is the key.", o:["Practice","Practicing","To practicing"], a:1},
    {t:"mc", q:"'Deje de fumar' =", o:["I stopped to smoke","I stopped smoking","I stopped smoke"], a:1},
    {t:"order", a:"I am interested in learning English"},
    {t:"order", a:"She managed to finish the project"},
    {t:"tr", q:"Evito ver las noticias.", a:["I avoid watching the news"]},
    {t:"tr", q:"Quiero aprender a editar.", a:["I want to learn to edit","I want to learn how to edit"]},
    {t:"tr", q:"Vale la pena verla.", a:["It's worth watching","It is worth watching","It's worth seeing"]}
  ]
};

GRAMMAR[19] = {
  titulo: "Voz pasiva (presente y pasado)",
  explicacion: `
<p>La pasiva pone el foco en <b>la accion o el objeto</b>, no en quien la hace. Muy usada en noticias, ciencia y medio ambiente.</p>
<p>Forma: <b>be + participio</b>. Presente: is/are + participio. Pasado: was/were + participio.</p>
<p>Activa: People <b>recycle</b> plastic. -> Pasiva: Plastic <b>is recycled</b>.</p>
<p>Activa: A storm <b>damaged</b> the coast. -> Pasiva: The coast <b>was damaged</b> (by a storm).</p>
<p>El agente se introduce con <b>by</b> solo si importa: It was painted <b>by</b> Picasso.</p>
<p>Otros tiempos: has been destroyed (presente perfecto), is being built (continuo), will be banned (futuro), must be reduced (modal).</p>
<p>Equivale al espanol "se": Se habla ingles -> English <b>is spoken</b>.</p>`,
  ejemplos: [["Plastic bags were banned in Chile.", "Las bolsas plasticas fueron prohibidas en Chile."], ["Coffee is grown in Colombia.", "El cafe se cultiva en Colombia."], ["The town was hit by an earthquake.", "El pueblo fue golpeado por un terremoto."], ["Emissions must be reduced.", "Las emisiones deben reducirse."]],
  errores: ["X The house was build -> OK was built", "X English speaks here -> OK English is spoken here", "X It made in China -> OK It's made in China"],
  ejercicios: [
    {t:"mc", q:"Plastic ___ here.", o:["recycles","is recycled","recycled"], a:1},
    {t:"mc", q:"The bridge ___ in 1990.", o:["was built","is built","built"], a:0},
    {t:"fill", q:"Coffee ___ (grow) in Brazil. (pasiva presente)", a:["is grown"]},
    {t:"fill", q:"The forest ___ (destroy) by a fire last year.", a:["was destroyed"]},
    {t:"fill", q:"These photos were taken ___ my brother.", a:["by"]},
    {t:"mc", q:"English ___ all over the world.", o:["speaks","is spoken","is speak"], a:1},
    {t:"fill", q:"Many species ___ (threaten) every year. (pasiva presente, plural)", a:["are threatened"]},
    {t:"mc", q:"New laws will ___ next year.", o:["pass","be passed","been passed"], a:1},
    {t:"order", a:"The town was hit by a flood"},
    {t:"order", a:"Paper is made from wood"},
    {t:"tr", q:"Se habla espanol aqui.", a:["Spanish is spoken here"]},
    {t:"tr", q:"El telefono fue inventado en 1876.", a:["The telephone was invented in 1876","The phone was invented in 1876"]},
    {t:"tr", q:"Las bolsas plasticas fueron prohibidas.", a:["Plastic bags were banned","Plastic bags have been banned"]}
  ]
};

GRAMMAR[20] = {
  titulo: "Segundo condicional y WISH",
  explicacion: `
<p><b>Segundo condicional</b> = situaciones imaginarias o poco probables (presente/futuro): <b>If + pasado, would + base</b>.</p>
<p>If I <b>won</b> the lottery, I <b>would travel</b> the world. (No he ganado.)</p>
<p>Con be se usa <b>were</b> para todos: If I <b>were</b> you, I'd accept. If she <b>were</b> rich...</p>
<p><b>could / might</b> tambien: If I had more time, I <b>could</b> learn faster.</p>
<p><b>1o vs 2o:</b> If I have time, I'll call you (es posible). If I had time, I'd call you (no tengo tiempo).</p>
<p><b>wish + pasado</b> = deseo sobre el presente: I <b>wish</b> I <b>had</b> more money (ojala tuviera). I wish I <b>were</b> taller. I wish I <b>could</b> speak English fluently.</p>`,
  ejemplos: [["If I had more money, I'd start a business.", "Si tuviera mas dinero, empezaria un negocio."], ["If I were you, I'd ask for a raise.", "Yo que tu, pediria un aumento."], ["I wish I could travel more.", "Ojala pudiera viajar mas."], ["What would you do if you won?", "Que harias si ganaras?"]],
  errores: ["X If I would have money -> OK If I had money", "X If I was you (formal) -> OK If I were you", "X I wish I have -> OK I wish I had"],
  ejercicios: [
    {t:"mc", q:"If I ___ rich, I'd buy a house.", o:["am","were","would be"], a:1},
    {t:"mc", q:"If she had time, she ___ help us.", o:["will","would","is"], a:1},
    {t:"fill", q:"If I ___ (win) the lottery, I'd quit my job.", a:["won"]},
    {t:"fill", q:"If I were you, I ___ (accept) the offer. (contraccion I'd -> escribe: would accept)", a:["would accept","'d accept"]},
    {t:"fill", q:"I wish I ___ (have) more free time.", a:["had"]},
    {t:"fill", q:"I wish I ___ (can) speak English fluently.", a:["could"]},
    {t:"mc", q:"What ___ you do if you lost your job?", o:["will","would","did"], a:1},
    {t:"mc", q:"Situacion real probable:", o:["If it rains, I'll stay home","If it rained, I'll stay home","If it will rain, I stay home"], a:0},
    {t:"order", a:"If I were you I would save money"},
    {t:"order", a:"I wish I had more time"},
    {t:"tr", q:"Si tuviera dinero, viajaria por el mundo.", a:["If I had money, I would travel the world","If I had money, I'd travel the world","If I had money I would travel the world","If I had money I'd travel the world","If I had money, I would travel around the world","If I had money, I'd travel around the world"]},
    {t:"tr", q:"No me alcanza para comprarlo.", a:["I can't afford it","I can't afford to buy it","I cannot afford it"]},
    {t:"tr", q:"Te debo un cafe.", a:["I owe you a coffee"]}
  ]
};

GRAMMAR[21] = {
  titulo: "Oraciones de relativo: who, which, that, where, whose",
  explicacion: `
<p>Sirven para unir ideas y dar informacion sobre un sustantivo (sin repetir).</p>
<p><b>who</b> = personas: The man <b>who</b> lives next door is a pilot.</p>
<p><b>which</b> = cosas: The city <b>which</b> I visited was beautiful.</p>
<p><b>that</b> = personas o cosas (informal, muy comun): The book <b>that</b> I read...</p>
<p><b>where</b> = lugares: The cafe <b>where</b> we met. <b>whose</b> = posesion (cuyo): The girl <b>whose</b> father is a doctor.</p>
<p><b>Se puede omitir</b> who/which/that cuando es objeto: The movie (<b>that</b>) I watched was great.</p>
<p><b>Explicativas</b> (con comas, info extra, NO se usa that): My sister, <b>who</b> lives in Lima, is a nurse.</p>
<p>! No repetir el pronombre: X The man who I saw <b>him</b> -> OK The man who I saw.</p>`,
  ejemplos: [["The neighborhood where I live is safe.", "El barrio donde vivo es seguro."], ["People who recycle help the planet.", "La gente que recicla ayuda al planeta."], ["Santiago, which is the capital, has six million people.", "Santiago, que es la capital, tiene seis millones de personas."], ["That's the guy whose video went viral.", "Ese es el tipo cuyo video se hizo viral."]],
  errores: ["X The man which -> OK The man who", "X My brother, that lives in Lima -> OK My brother, who lives in Lima", "X The house where I live in it -> OK The house where I live"],
  ejercicios: [
    {t:"mc", q:"The woman ___ works here is my aunt.", o:["which","who","where"], a:1},
    {t:"mc", q:"The phone ___ I bought is broken.", o:["who","which","whose"], a:1},
    {t:"mc", q:"That's the restaurant ___ we had dinner.", o:["which","where","who"], a:1},
    {t:"mc", q:"He's the man ___ car was stolen.", o:["who","whose","which"], a:1},
    {t:"fill", q:"People ___ live in the city are often stressed.", a:["who","that"]},
    {t:"fill", q:"The town ___ I grew up is very small.", a:["where"]},
    {t:"mc", q:"My father, ___ is 60, still works.", o:["that","who","which"], a:1},
    {t:"mc", q:"Cual es correcta?", o:["The movie I watched was great","The movie I watched it was great","The movie what I watched was great"], a:0},
    {t:"order", a:"The man who lives next door is a pilot"},
    {t:"order", a:"This is the cafe where we met"},
    {t:"tr", q:"El libro que lei era muy bueno.", a:["The book that I read was very good","The book I read was very good","The book which I read was very good"]},
    {t:"tr", q:"En mi opinion, es injusto.", a:["In my opinion, it's unfair","In my opinion, it is unfair","In my opinion it's unfair","In my opinion it is unfair"]},
    {t:"tr", q:"La gente que vive aqui es amable.", a:["The people who live here are kind","The people who live here are friendly","People who live here are friendly","The people that live here are friendly","The people that live here are kind"]}
  ]
};

GRAMMAR[22] = {
  titulo: "Estilo indirecto (reported speech)",
  explicacion: `
<p>Para contar lo que alguien dijo, los tiempos verbales <b>retroceden un paso</b> al pasado:</p>
<table><tr><th>Directo</th><th>Indirecto</th></tr>
<tr><td>"I <b>am</b> tired."</td><td>She said (that) she <b>was</b> tired.</td></tr>
<tr><td>"I <b>work</b> here."</td><td>He said he <b>worked</b> there.</td></tr>
<tr><td>"I <b>edited</b> it."</td><td>She said she <b>had edited</b> it.</td></tr>
<tr><td>"I<b>'ll</b> call you."</td><td>He said he <b>would</b> call me.</td></tr>
<tr><td>"I <b>can</b> help."</td><td>She said she <b>could</b> help.</td></tr></table>
<p><b>say</b> (sin persona) vs <b>tell</b> + persona: She <b>said</b> that... / She <b>told me</b> that... (X She said me).</p>
<p><b>Preguntas:</b> orden de afirmacion, sin do: "Where do you live?" -> She asked me where I <b>lived</b>. "Are you ready?" -> He asked <b>if/whether</b> I was ready.</p>
<p><b>Ordenes:</b> tell/ask + to: "Send it!" -> He told me <b>to send</b> it. "Don't go" -> She told me <b>not to</b> go.</p>
<p>Cambian referencias: today -> that day, tomorrow -> the following day, here -> there.</p>`,
  ejemplos: [["The client said he loved the video.", "El cliente dijo que le encantaba el video."], ["She told me she would send the brief.", "Me dijo que enviaria el brief."], ["He asked me where I had filmed it.", "Me pregunto donde lo habia grabado."], ["They told me not to use that song.", "Me dijeron que no usara esa cancion."]],
  errores: ["X She said me -> OK She told me / She said", "X He asked me where did I live -> OK He asked me where I lived", "X He told me don't go -> OK He told me not to go"],
  ejercicios: [
    {t:"mc", q:"\"I'm busy.\" -> She said she ___ busy.", o:["is","was","were"], a:1},
    {t:"mc", q:"\"I will help you.\" -> He said he ___ help me.", o:["will","would","can"], a:1},
    {t:"mc", q:"She ___ me that she was tired.", o:["said","told","asked"], a:1},
    {t:"fill", q:"\"I can come.\" -> He said he ___ come.", a:["could"]},
    {t:"fill", q:"\"I finished the edit.\" -> She said she ___ finished the edit.", a:["had"]},
    {t:"mc", q:"\"Where do you live?\" -> He asked me where ___ .", o:["did I live","I lived","do I live"], a:1},
    {t:"fill", q:"\"Are you ready?\" -> She asked ___ I was ready.", a:["if","whether"]},
    {t:"fill", q:"\"Don't touch it!\" -> He told me ___ to touch it.", a:["not"]},
    {t:"order", a:"She told me she was very happy"},
    {t:"order", a:"He asked me if I liked the video"},
    {t:"tr", q:"Me dijo que estaba cansado. (tell)", a:["He told me he was tired","He told me that he was tired","She told me she was tired","She told me that she was tired"]},
    {t:"tr", q:"Me pregunto donde vivia.", a:["He asked me where I lived","She asked me where I lived"]},
    {t:"tr", q:"Me pidio que enviara el video.", a:["He asked me to send the video","She asked me to send the video"]}
  ]
};

GRAMMAR[23] = {
  titulo: "Futuro continuo, futuro perfecto y modales de deduccion",
  explicacion: `
<p><b>Futuro continuo</b> (will be + -ing) = accion en curso en un momento futuro: This time next year, I<b>'ll be living</b> abroad.</p>
<p><b>Futuro perfecto</b> (will have + participio) = accion terminada antes de un momento futuro: By June, I<b>'ll have finished</b> the course. (by = para/antes de)</p>
<p><b>Deduccion en presente:</b></p>
<p><b>must</b> = seguro que si (He must be tired; trabajo 12 horas). <b>can't</b> = seguro que no (That can't be true). <b>might / could / may</b> = posible (It might rain).</p>
<p><b>Deduccion en pasado:</b> must have + participio (She must have forgotten). can't have (He can't have finished already). might have (They might have missed the bus).</p>`,
  ejemplos: [["By 2030, most cars will be electric.", "Para 2030, la mayoria de los autos seran electricos."], ["This time tomorrow, I'll be flying to Madrid.", "Manana a esta hora estare volando a Madrid."], ["He must be at home. The lights are on.", "Debe estar en casa. Las luces estan encendidas."], ["She can't have seen it. It was deleted.", "No puede haberlo visto. Fue borrado."]],
  errores: ["X He must to be -> OK He must be", "X By June I will finish (logro previo) -> OK By June I will have finished", "X It mustn't be true (deduccion) -> OK It can't be true"],
  ejercicios: [
    {t:"mc", q:"He worked 14 hours. He ___ be exhausted.", o:["must","can't","mustn't"], a:0},
    {t:"mc", q:"That ___ be Ana. She's in Japan.", o:["must","can't","might"], a:1},
    {t:"mc", q:"Take an umbrella. It ___ rain.", o:["might","must","can't"], a:0},
    {t:"fill", q:"By next June, I ___ (finish) the course. (futuro perfecto)", a:["will have finished","'ll have finished"]},
    {t:"fill", q:"This time next week, we ___ (lie) on the beach. (futuro continuo)", a:["will be lying","'ll be lying"]},
    {t:"fill", q:"She isn't answering. She must ___ (forget) her phone. (pasado)", a:["have forgotten"]},
    {t:"mc", q:"Robots ___ be doing many jobs by 2040.", o:["will","must","are"], a:0},
    {t:"mc", q:"They're late. They ___ missed the bus.", o:["might have","must","can't"], a:0},
    {t:"order", a:"By 2030 most cars will be electric"},
    {t:"order", a:"He must be very tired"},
    {t:"tr", q:"No puede ser verdad.", a:["It can't be true","That can't be true","It cannot be true"]},
    {t:"tr", q:"Para diciembre habre terminado el curso.", a:["By December I will have finished the course","By December, I will have finished the course","By December I'll have finished the course","By December, I'll have finished the course"]},
    {t:"tr", q:"Podria llover manana.", a:["It might rain tomorrow","It could rain tomorrow","It may rain tomorrow"]}
  ]
};

GRAMMAR[24] = {
  titulo: "Tercer condicional, should have y conectores de opinion",
  explicacion: `
<p><b>Tercer condicional</b> = pasado imaginario (no ocurrio): <b>If + had + participio, would have + participio</b>.</p>
<p>If I <b>had known</b>, I <b>would have come</b>. (No lo sabia, no vine.)</p>
<p><b>Mixto</b>: If I had studied English as a child, I <b>would be</b> fluent now.</p>
<p><b>Arrepentimiento:</b> I <b>should have</b> studied more. You <b>could have</b> told me. I <b>wish I had</b> traveled more.</p>
<p><b>Conectores para argumentar:</b></p>
<p>Contraste: however, although + oracion, despite + sustantivo/-ing, whereas, on the other hand.</p>
<p>Adicion: moreover, furthermore, in addition, besides. Causa/efecto: because of, due to, therefore, as a result.</p>
<p>! despite <b>the rain</b> / despite <b>being tired</b> - nunca "despite of". although <b>it was raining</b>.</p>`,
  ejemplos: [["If I had left earlier, I wouldn't have missed the flight.", "Si hubiera salido antes, no habria perdido el vuelo."], ["I should have practiced more.", "Deberia haber practicado mas."], ["Although it's expensive, it's worth it.", "Aunque es caro, vale la pena."], ["Despite the rain, we filmed all day.", "A pesar de la lluvia, grabamos todo el dia."]],
  errores: ["X If I would have known -> OK If I had known", "X despite of -> OK despite / in spite of", "X although the rain -> OK although it rained / despite the rain"],
  ejercicios: [
    {t:"mc", q:"If I ___ known, I would have helped.", o:["have","had","would"], a:1},
    {t:"mc", q:"If she had studied, she ___ the exam.", o:["would pass","would have passed","will pass"], a:1},
    {t:"fill", q:"I ___ (should) have told you. (escribe: should)", a:["should"]},
    {t:"fill", q:"If we had left earlier, we wouldn't have ___ (miss) the bus.", a:["missed"]},
    {t:"mc", q:"___ the rain, we went out.", o:["Although","Despite","However"], a:1},
    {t:"mc", q:"___ it was late, we kept working.", o:["Although","Despite","In spite of"], a:0},
    {t:"mc", q:"It's cheap. ___, the quality is bad.", o:["However","Although","Despite"], a:0},
    {t:"mc", q:"The flight was canceled ___ the storm.", o:["due to","therefore","although"], a:0},
    {t:"order", a:"If I had known I would have come"},
    {t:"order", a:"I should have studied more"},
    {t:"tr", q:"Si hubiera sabido, habria venido.", a:["If I had known, I would have come","If I had known I would have come","If I'd known, I would have come","If I'd known, I'd have come"]},
    {t:"tr", q:"A pesar de estar cansado, estudie.", a:["Despite being tired, I studied","Despite being tired I studied","In spite of being tired, I studied","Although I was tired, I studied"]},
    {t:"tr", q:"Por un lado es rapido; por otro lado es caro.", a:["On the one hand it's fast; on the other hand it's expensive","On the one hand, it's fast; on the other hand, it's expensive","On the one hand it is fast, on the other hand it is expensive","On the one hand, it's fast, on the other hand, it's expensive","On the one hand it's fast, on the other hand it's expensive"]}
  ]
};

GRAMMAR[25] = {
  titulo: "Phrasal verbs esenciales + used to / be used to / get used to",
  explicacion: `
<p><b>Phrasal verbs</b> = verbo + particula con significado nuevo. Son clave para entender a nativos.</p>
<p><b>Separables</b> (el objeto puede ir en medio; si es pronombre, DEBE ir en medio): turn <b>it</b> off, look <b>it</b> up, give <b>it</b> back, fill <b>it</b> in. X turn off it.</p>
<p><b>Inseparables:</b> look after, get over, deal with, come up with, run out of, put up with.</p>
<p><b>used to + base</b> = habito pasado: I <b>used to</b> smoke.</p>
<p><b>be used to + -ing/sustantivo</b> = estar acostumbrado: I'<b>m used to</b> wak<b>ing</b> up early.</p>
<p><b>get used to + -ing/sustantivo</b> = acostumbrarse (proceso): I'm <b>getting used to</b> speak<b>ing</b> English.</p>
<p><b>Ingles profesional:</b> I'm writing to apply for... / Please find attached... / I look forward to hearing from you.</p>`,
  ejemplos: [["I set up my own business in 2021.", "Monte mi propio negocio en 2021."], ["We ran out of time.", "Se nos acabo el tiempo."], ["I'm used to working under pressure.", "Estoy acostumbrado a trabajar bajo presion."], ["She came up with a brilliant idea.", "A ella se le ocurrio una idea brillante."]],
  errores: ["X turn off it -> OK turn it off", "X I'm used to work -> OK I'm used to working", "X I use to smoke (pasado) -> OK I used to smoke"],
  ejercicios: [
    {t:"mc", q:"Don't ___ ! You're almost there.", o:["give up","give back","give in to"], a:0},
    {t:"mc", q:"We ___ coffee. Can you buy some?", o:["ran out of","ran away","put off"], a:0},
    {t:"mc", q:"Cual es correcta?", o:["Turn off it","Turn it off","Turn of it"], a:1},
    {t:"fill", q:"I'm used to ___ (wake) up early.", a:["waking"]},
    {t:"fill", q:"I ___ to play football when I was a child.", a:["used"]},
    {t:"mc", q:"I can't ___ this noise anymore.", o:["put up with","put off","set up"], a:0},
    {t:"mc", q:"She ___ a great idea for the video.", o:["came up with","came over","looked after"], a:0},
    {t:"mc", q:"Who will ___ the dog while we travel?", o:["look for","look after","look up"], a:1},
    {t:"fill", q:"Don't ___ off your goals. (posponer)", a:["put"]},
    {t:"order", a:"I am getting used to speaking English"},
    {t:"order", a:"I look forward to hearing from you"},
    {t:"tr", q:"Averigue la verdad.", a:["I found out the truth"]},
    {t:"tr", q:"Le escribo para postular al puesto.", a:["I'm writing to apply for the position","I am writing to apply for the position","I'm writing to apply for the job","I am writing to apply for the job"]}
  ]
};

GRAMMAR[26] = {
  titulo: "Repaso final: tiempos narrativos, expresiones y fluidez",
  explicacion: `
<p>Semana de consolidacion. Mapa completo de tiempos que ya dominas:</p>
<table><tr><th>Tiempo</th><th>Ejemplo</th></tr>
<tr><td>Present simple</td><td>I edit videos.</td></tr>
<tr><td>Present continuous</td><td>I'm editing now.</td></tr>
<tr><td>Present perfect</td><td>I've edited 100 videos.</td></tr>
<tr><td>Present perfect continuous</td><td>I've been editing for 3 hours.</td></tr>
<tr><td>Past simple</td><td>I edited it yesterday.</td></tr>
<tr><td>Past continuous</td><td>I was editing when you called.</td></tr>
<tr><td>Past perfect</td><td>I had edited it before the meeting.</td></tr>
<tr><td>Past perfect continuous</td><td>I had been editing all night.</td></tr>
<tr><td>Future (will / going to)</td><td>I'll edit it / I'm going to edit it.</td></tr>
<tr><td>Future continuous / perfect</td><td>I'll be editing / I'll have edited it by 5.</td></tr></table>
<p><b>Presente perfecto continuo</b> (have been + -ing) = duracion hasta ahora: I<b>'ve been studying</b> English <b>for</b> six months.</p>
<p><b>Expresiones de fluidez:</b> I'd rather + base (preferiria), You'd better + base (mas vale que), It's about time + pasado.</p>
<p><b>Muletillas naturales</b> para ganar tiempo: Well..., Let me think..., I mean..., You know..., Kind of..., Actually...</p>`,
  ejemplos: [["I've been studying English for six months.", "Llevo seis meses estudiando ingles."], ["By the time I arrived, they had been waiting for an hour.", "Para cuando llegue, llevaban una hora esperando."], ["I'd rather watch it in English.", "Prefiero verla en ingles."], ["You'd better hurry up.", "Mas vale que te apures."]],
  errores: ["X I study English since six months -> OK I've been studying English for six months", "X I'd rather to stay -> OK I'd rather stay", "X You'd better to go -> OK You'd better go"],
  ejercicios: [
    {t:"mc", q:"I ___ English for six months.", o:["study","have been studying","am studying"], a:1},
    {t:"mc", q:"By the time we arrived, the movie ___ .", o:["started","had started","has started"], a:1},
    {t:"mc", q:"I'd rather ___ at home tonight.", o:["to stay","stay","staying"], a:1},
    {t:"mc", q:"You'd better ___ now or you'll be late.", o:["leave","to leave","leaving"], a:0},
    {t:"fill", q:"She ___ (work) here since 2019. (presente perfecto continuo, contraccion -> She's been working)", a:["'s been working","has been working"]},
    {t:"fill", q:"If I ___ (have) more time, I would read more. (2o condicional)", a:["had"]},
    {t:"fill", q:"The video ___ (watch) by a million people last month. (pasiva)", a:["was watched"]},
    {t:"mc", q:"He told me he ___ the job.", o:["has gotten","had gotten","gets"], a:1},
    {t:"mc", q:"I'm not used to ___ in public.", o:["speak","speaking","spoke"], a:1},
    {t:"order", a:"I have been learning English for six months"},
    {t:"order", a:"No matter what keep going"},
    {t:"tr", q:"Llevo una hora esperando.", a:["I've been waiting for an hour","I have been waiting for an hour"]},
    {t:"tr", q:"Por cierto, me encanto tu video.", a:["By the way, I loved your video","By the way I loved your video"]},
    {t:"tr", q:"Estoy orgulloso de mi mismo.", a:["I'm proud of myself","I am proud of myself"]}
  ]
};
