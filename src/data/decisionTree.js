// ─────────────────────────────────────────────────────────
// data/decisionTree.js
//
// Árbol de decisiones completo del chatbot.
// Editá este archivo para modificar cualquier flujo sin
// tocar la lógica de la aplicación.
//
// Estructura de nodo:
//   id           — string único
//   botMessage   — string | string[]  (array = burbujas separadas)
//   options      — [{ label, next, flags? }]
//   isCrisis     — bool: muestra banner de emergencia
//   isResources  — bool: renderiza ResourcesCard
//   isTechnique  — bool: activa widget de técnica
//   techniqueType— 'breathing' | 'senses' | 'thoughts'
//   isTimer      — bool: activa FiveMinuteTimer
//   isBrainDump  — bool: activa BrainDumpWidget
//
// Flags en options:
//   isTechniqueStart — lanza widget de técnica al elegir
//   isTimerStart     — lanza timer de 5 min al elegir
// ─────────────────────────────────────────────────────────

export const DECISION_TREE = {

  start: {
    id: 'start',
    botMessage: '¡Hola! Soy el compañero de bienestar de la UNCo. ¿Qué está pasando?',
    options: [
      { label: '😔 Desaprobé / me fue mal',                      next: 'post_fail' },
      { label: '😰 Tengo un examen próximo',                     next: 'stress_exams_triage' },
      { label: '🌀 Estoy agobiado/a y no sé por dónde empezar', next: 'stress_brain_dump' },
      { label: '😩 Estoy procrastinando y no arranco',           next: 'stress_procrastination_pact' },
      { label: '😖 Tengo ansiedad o angustia',                   next: 'anxiety' },
      { label: '💙 Me siento muy bajón/a',                       next: 'low_mood' },
      { label: '🧠 Quiero aprender una técnica',                 next: 'techniques_menu' },
      { label: '🆘 Estoy en una situación muy difícil',          next: 'crisis_check' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // POST-FRACASO — ESCUDO ANTI-ABANDONO
  // ══════════════════════════════════════════════════════
  post_fail: {
    id: 'post_fail',
    botMessage: ['Desaprobaste.', 'Qué bajón. En serio.', 'Está bien estar mal por esto.', '¿Qué es lo que más te está pegando ahora mismo?'],
    options: [
      { label: 'Estoy pensando en dejar la carrera',  next: 'post_fail_abandon' },
      { label: 'Estoy muy enojado/a conmigo',         next: 'post_fail_angry' },
      { label: 'No sé qué hacer ahora',               next: 'post_fail_next_step' },
      { label: 'Me siento un fracasado/a',            next: 'post_fail_failure_feeling' },
    ],
  },
  post_fail_abandon: {
    id: 'post_fail_abandon',
    botMessage: ['Escuchame.', 'No tomes esa decisión hoy. Ni mañana.', 'Prometeme una sola cosa: 48 horas sin decidir nada sobre la carrera.', 'Después de esas 48 horas hacés lo que quieras. Pero no ahora, con esto fresco.', '¿Trato?'],
    options: [
      { label: 'Trato — 48 horas',                        next: 'post_fail_pact_accepted' },
      { label: 'No sé si puedo prometerte eso',            next: 'post_fail_pact_soft' },
      { label: 'Ya tomé la decisión',                      next: 'post_fail_decided' },
    ],
  },
  post_fail_pact_accepted: {
    id: 'post_fail_pact_accepted',
    botMessage: ['Dale. Eso es todo lo que necesito.', 'En 48 horas tenés otra conversación con esto.', 'Por ahora, ¿qué necesitás para pasar el día?'],
    options: [
      { label: 'Calmarme un poco',                    next: 'technique_breathing' },
      { label: 'Hablar más sobre cómo me siento',     next: 'post_fail_feelings' },
      { label: 'Ver qué hago con la materia',         next: 'post_fail_next_step' },
    ],
  },
  post_fail_pact_soft: {
    id: 'post_fail_pact_soft',
    botMessage: ['Está bien, no te pido que lo jures.', 'Solo que antes de tomar una decisión tan grande, duermas al menos una noche.', 'Las decisiones tomadas en el pico de la bronca casi siempre se arrepienten.', '¿Podés hacer eso?'],
    options: [
      { label: 'Sí, puedo esperar una noche',         next: 'post_fail_pact_accepted' },
      { label: 'Quiero hablar con alguien de la UNCo', next: 'resources_info' },
    ],
  },
  post_fail_decided: {
    id: 'post_fail_decided',
    botMessage: ['Respeto eso.', 'Solo te pido que esa decisión la tomes acompañado/a.', 'La Secretaría de Bienestar de la UNCo existe exactamente para esto — no para convencerte de nada, sino para acompañarte.'],
    options: [
      { label: 'Ver datos de Bienestar UNCo', next: 'resources_info' },
      { label: 'Volver al inicio',             next: 'start' },
    ],
  },
  post_fail_angry: {
    id: 'post_fail_angry',
    botMessage: ['La bronca con uno mismo es de las más agotadoras.', '¿Le hablarías así a un compañero que desaprobó?', 'Probablemente no. Pero a vos sí.', 'Ese doble estándar tiene un costo muy alto.'],
    options: [
      { label: 'Tenés razón, soy muy duro/a conmigo', next: 'technique_thoughts' },
      { label: 'Igual siento que es mi culpa',         next: 'post_fail_self_blame' },
    ],
  },
  post_fail_self_blame: {
    id: 'post_fail_self_blame',
    botMessage: ['Puede ser que algo hayas podido hacer distinto. Eso no te hace un fracasado/a.', 'Un examen es un punto de datos, no una sentencia.', '¿Querés trabajar ese pensamiento?'],
    options: [
      { label: 'Sí, quiero desafiar esos pensamientos', next: 'technique_thoughts' },
      { label: 'Primero necesito calmarme',              next: 'technique_breathing' },
    ],
  },
  post_fail_next_step: {
    id: 'post_fail_next_step',
    botMessage: ['Primero: no tomés ninguna decisión grande hoy.', '¿Sabés qué pasó en el examen? ¿Fue una sorpresa o lo venías viendo venir?'],
    options: [
      { label: 'Fue una sorpresa, estudié bastante',  next: 'post_fail_surprise' },
      { label: 'La verdad no estudié lo suficiente',  next: 'post_fail_honest' },
      { label: 'Ni idea qué salió mal',               next: 'post_fail_unclear' },
    ],
  },
  post_fail_surprise: {
    id: 'post_fail_surprise',
    botMessage: ['Eso es particularmente duro — ponés el esfuerzo y no sale.', 'Puede ser el método, la ansiedad en el examen, o cómo tomó el docente.', 'Vale la pena pedirle devolución. ¿Podés hacer eso?'],
    options: [
      { label: 'Sí, voy a intentarlo',          next: 'end_positive' },
      { label: 'Me da miedo hablar con el doc', next: 'anxiety_social' },
    ],
  },
  post_fail_honest: {
    id: 'post_fail_honest',
    botMessage: ['Bien que lo reconocés. Eso ya es mucho.', '¿Por qué no pudiste estudiar?'],
    options: [
      { label: 'Me bloqueé, procrastiné',              next: 'stress_procrastination_pact' },
      { label: 'Tuve quilombos personales o laborales', next: 'stress_work_study' },
      { label: 'La materia no me copa nada',            next: 'post_fail_motivation' },
    ],
  },
  post_fail_unclear: {
    id: 'post_fail_unclear',
    botMessage: ['Esa incertidumbre es frustrante.', 'Acción concreta: pedile devolución al docente. Aunque duela, es información.', 'Sin esa info es difícil cambiar algo.'],
    options: [
      { label: 'Me da vergüenza pedirlo', next: 'post_fail_self_blame' },
      { label: 'Dale, voy a intentarlo',  next: 'end_positive' },
    ],
  },
  post_fail_motivation: {
    id: 'post_fail_motivation',
    botMessage: ['Estudiar algo que no te interesa consume el doble de energía.', '¿Es esta materia puntual o sentís que toda la carrera perdió sentido?'],
    options: [
      { label: 'Es esta materia puntual',                 next: 'end_positive' },
      { label: 'La carrera en general ya no me convence', next: 'post_fail_abandon' },
    ],
  },
  post_fail_feelings: {
    id: 'post_fail_feelings',
    botMessage: 'Contame — ¿qué es lo que más te pesa de todo esto?',
    options: [
      { label: 'La decepción con uno mismo',    next: 'post_fail_angry' },
      { label: 'Miedo a lo que van a pensar',   next: 'anxiety_social' },
      { label: 'El tiempo que siento que perdí', next: 'post_fail_time' },
    ],
  },
  post_fail_failure_feeling: {
    id: 'post_fail_failure_feeling',
    botMessage: ['Esa sensación es muy real y muy pesada.', "Pero hay una diferencia enorme entre 'fallé en este examen' y 'soy un fracasado'.", 'Uno es un evento. El otro es una identidad.', '¿Querés trabajar eso?'],
    options: [
      { label: 'Sí, quiero desafiar ese pensamiento', next: 'technique_thoughts' },
      { label: 'Necesito hablar con alguien primero',  next: 'resources_info' },
    ],
  },
  post_fail_time: {
    id: 'post_fail_time',
    botMessage: ['El tiempo en la facu nunca se pierde del todo.', 'Incluso una materia que repetís te enseña algo, aunque sea cómo no estudiarla.', 'Lo que sí podés cambiar es lo que viene.'],
    options: [
      { label: '¿Por dónde empiezo?', next: 'stress_procrastination_pact' },
      { label: 'Volver al inicio',    next: 'start' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // TRIAGE DE EXAMEN
  // ══════════════════════════════════════════════════════
  stress_exams_triage: {
    id: 'stress_exams_triage',
    botMessage: '¿Cuándo es el examen?',
    options: [
      { label: 'Hoy o mañana 😰',           next: 'stress_exam_today' },
      { label: 'Esta semana',               next: 'stress_exam_week' },
      { label: 'La semana que viene o más', next: 'stress_exam_later' },
    ],
  },
  stress_exam_today: {
    id: 'stress_exam_today',
    botMessage: ['Bueno. Estudiar todo de cero ya no aplica.', 'Lo que sí podés controlar ahora es el entorno.', 'Chequeo rápido: ¿tenés el DNI? ¿Todo lo que necesitás para entrar al aula?'],
    options: [
      { label: 'Sí, tengo todo listo',            next: 'stress_exam_today_ready' },
      { label: 'Me falta algo',                   next: 'stress_exam_today_missing' },
      { label: 'Necesito calmarme antes que nada', next: 'technique_breathing' },
    ],
  },
  stress_exam_today_ready: {
    id: 'stress_exam_today_ready',
    botMessage: ['Perfecto. Lo más importante ya está resuelto.', '¿Hacemos la respiración 4-7-8 antes de entrar?'],
    options: [
      { label: 'Sí, guiame',              next: 'technique_breathing' },
      { label: 'Prefiero los 5 sentidos', next: 'technique_5senses' },
      { label: 'Estoy bien, gracias',     next: 'end_positive' },
    ],
  },
  stress_exam_today_missing: {
    id: 'stress_exam_today_missing',
    botMessage: ['Eso sí es urgente.', 'Escribí ahora mismo lo que te falta — en papel, en el celu, donde sea.', 'Tener la lista fuera de la cabeza libera energía para actuar.'],
    options: [
      { label: 'Ya lo resolví, necesito calmarme', next: 'technique_breathing' },
      { label: 'No puedo conseguirlo a tiempo',    next: 'stress_exam_today_cant' },
    ],
  },
  stress_exam_today_cant: {
    id: 'stress_exam_today_cant',
    botMessage: ['Respirá.', '¿Hay alguien que te lo pueda prestar o acercar? ¿Un compañero, familiar?', 'No lo des por imposible hasta haber preguntado.'],
    options: [
      { label: 'Tengo a alguien',  next: 'stress_exam_today_ready' },
      { label: 'No tengo a nadie', next: 'technique_breathing' },
    ],
  },
  stress_exam_week: {
    id: 'stress_exam_week',
    botMessage: ['Tenés tiempo real.', 'La trampa es querer estudiar todo. No funciona.', '¿Cuántos días te quedan?'],
    options: [
      { label: '2 o 3 días', next: 'stress_exam_few_days' },
      { label: '4 a 6 días', next: 'stress_exam_several_days' },
    ],
  },
  stress_exam_few_days: {
    id: 'stress_exam_few_days',
    botMessage: ['Dos o tres días es suficiente si vas a lo concreto.', 'Estrategia: identificá los 3 temas que más se toman. Solo esos.', '70% del tiempo a esos 3 temas. ¿Podés hacer ese filtro ahora?'],
    options: [
      { label: 'Sí, voy a intentarlo', next: 'end_positive' },
      { label: 'Me cuesta arrancar',   next: 'stress_procrastination_pact' },
      { label: 'Tengo ansiedad igual', next: 'technique_5senses' },
    ],
  },
  stress_exam_several_days: {
    id: 'stress_exam_several_days',
    botMessage: ['Cinco o seis días bien usados son más que suficientes.', 'Tip: bloques de 45 minutos con 10 de pausa real. Sin el celu esos 45.', '¿Podés probar eso?'],
    options: [
      { label: 'Me cuesta concentrarme', next: 'technique_5senses' },
      { label: 'Estudio pero no retengo', next: 'stress_study_retention' },
      { label: 'Dale, voy a intentarlo', next: 'end_positive' },
    ],
  },
  stress_study_retention: {
    id: 'stress_study_retention',
    botMessage: ["Eso pasa cuando estudiás en modo 'leer y releer'.", 'Cambio concreto: después de leer cada tema, cerrá el libro.', 'Escribí de memoria todo lo que recordés. Aunque sea poco.', 'Eso activa la memoria de una forma que releer nunca hace.'],
    options: [
      { label: 'Lo voy a probar',      next: 'end_positive' },
      { label: 'Tengo ansiedad igual', next: 'technique_breathing' },
    ],
  },
  stress_exam_later: {
    id: 'stress_exam_later',
    botMessage: ['Tenés margen.', 'La angustia con tiempo de sobra suele ser más sobre control que sobre el examen.', '¿Qué es lo que más te genera ansiedad?'],
    options: [
      { label: 'No sé si voy a llegar con el programa', next: 'stress_exam_several_days' },
      { label: 'Miedo a que me vaya mal otra vez',       next: 'post_fail_failure_feeling' },
      { label: 'Tengo ansiedad de fondo siempre',        next: 'anxiety_chronic' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // BRAIN DUMP (AGOBIO)
  // ══════════════════════════════════════════════════════
  stress_brain_dump: {
    id: 'stress_brain_dump',
    isBrainDump: true,
    botMessage: ['Dale.', 'Escribí todo lo que te tiene harto/a ahora mismo.', 'Todo. Sin filtro. No tiene que tener sentido.'],
    options: [],
  },
  stress_brain_dump_go: {
    id: 'stress_brain_dump_go',
    isBrainDumpTask: true,
    botMessage: ['Bien. Ya lo sacaste afuera.', 'Ahora la parte difícil: de todo lo que escribiste, ¿cuál es la única cosa que tomás 5 minutos o menos?'],
    options: [],
  },
  stress_brain_dump_commit: {
    id: 'stress_brain_dump_commit',
    botMessage: ['Eso. Una sola cosa.', '¿La hacés ahora o en los próximos 20 minutos?'],
    options: [
      { label: 'Ahora mismo',                            next: 'end_positive' },
      { label: 'En 20 minutos, necesito calmarme antes', next: 'technique_breathing' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // PROCRASTINACIÓN — PACTO DE 5 MINUTOS
  // ══════════════════════════════════════════════════════
  stress_procrastination_pact: {
    id: 'stress_procrastination_pact',
    botMessage: ['Escuchame.', '¿Hacemos un trato?', 'Estudiá solo 5 minutos. Yo te aviso cuando pasen.', 'Si después querés dejar, tenés mi permiso.', '¿Aceptás?'],
    options: [
      { label: 'Acepto — 5 minutos', next: 'stress_procrastination_timer', isTimerStart: true },
      { label: 'No me convence',     next: 'stress_procrastination_resist' },
    ],
  },
  stress_procrastination_timer: {
    id: 'stress_procrastination_timer',
    isTimer: true,
    botMessage: ['Arrancá. Yo cuento el tiempo.'],
    options: [],
  },
  stress_procrastination_after: {
    id: 'stress_procrastination_after',
    botMessage: ['¡Cinco minutos!', '¿Cómo estás? ¿Seguís o paramos acá?'],
    options: [
      { label: 'Sigo — ya enganché',            next: 'end_positive' },
      { label: 'Paro, pero me siento mejor',    next: 'end_positive' },
      { label: 'No pude concentrarme igual',    next: 'stress_procrastination_hard' },
    ],
  },
  stress_procrastination_hard: {
    id: 'stress_procrastination_hard',
    botMessage: ['Está bien. A veces hay algo más adentro bloqueando.', '¿Qué pasa cuando intentás arrancar?'],
    options: [
      { label: 'Me da miedo no hacerlo bien',    next: 'stress_imposter' },
      { label: 'La materia no me interesa nada', next: 'post_fail_motivation' },
      { label: 'Estoy agotado/a, sin energía',   next: 'low_tired' },
    ],
  },
  stress_procrastination_resist: {
    id: 'stress_procrastination_resist',
    botMessage: '¿Qué es lo que más te genera resistencia para arrancar?',
    options: [
      { label: 'Miedo a hacerlo mal',      next: 'stress_imposter' },
      { label: 'No sé por dónde empezar', next: 'stress_brain_dump' },
      { label: 'Me falta energía',         next: 'low_tired' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ESTRÉS — COMPLEMENTARIOS
  // ══════════════════════════════════════════════════════
  stress_imposter: {
    id: 'stress_imposter',
    botMessage: ['Lo que describís tiene nombre: síndrome del impostor.', 'Lo experimenta el 70% de los estudiantes universitarios. Los más comprometidos más que nadie.', "Cuando aparezca ese pensamiento, decite: 'Ahí está el impostor de nuevo.' No como verdad — como ruido de fondo."],
    options: [
      { label: 'Quiero desafiar esos pensamientos', next: 'technique_thoughts' },
      { label: 'Igual siento que es verdad',         next: 'stress_imposter_deep' },
    ],
  },
  stress_imposter_deep: {
    id: 'stress_imposter_deep',
    botMessage: ['El hecho de que te lo cuestionés es señal de que te importa.', 'Los que realmente no sirven para algo no se preguntan si sirven.'],
    options: [
      { label: 'Quiero desafiar ese pensamiento',   next: 'technique_thoughts' },
      { label: 'No recuerdo nada bueno de la facu', next: 'low_sadness' },
    ],
  },
  stress_work_study: {
    id: 'stress_work_study',
    botMessage: ['Trabajar y estudiar a la vez es una de las combinaciones más exigentes.', 'Primero: reconocé que lo que hacés requiere mucha fortaleza.', '¿Hay aunque sea una hora por día que sea solo tuya?'],
    options: [
      { label: 'No, no tengo ese tiempo',         next: 'stress_work_no_time' },
      { label: 'Tengo tiempo pero lo uso mal',     next: 'stress_procrastination_pact' },
      { label: 'Estoy al límite emocionalmente',  next: 'crisis_check' },
    ],
  },
  stress_work_no_time: {
    id: 'stress_work_no_time',
    botMessage: ['Eso es agotador de sostener.', 'No hay técnica que reemplace el descanso.', '¿Está en tus posibilidades reducir algo, aunque sea un poco?'],
    options: [
      { label: 'No puedo cambiar nada',        next: 'resources_info' },
      { label: 'Quizás algo sí puedo ajustar', next: 'end_positive' },
      { label: 'Necesito hablar con alguien',  next: 'resources_info' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // CRISIS — INTERVENCIÓN FÍSICA PRIMERO
  // ══════════════════════════════════════════════════════
  crisis_check: {
    id: 'crisis_check',
    botMessage: ['Entiendo que estás pasando algo difícil.', '¿Estás teniendo pensamientos de hacerte daño o de que estarías mejor muerto/a?'],
    options: [
      { label: 'Sí, tengo esos pensamientos', next: 'crisis_physical' },
      { label: 'No, pero estoy muy mal',       next: 'crisis_medium' },
      { label: 'Solo necesito desahogarme',   next: 'crisis_vent' },
    ],
  },
  crisis_physical: {
    id: 'crisis_physical',
    botMessage: ['Gracias por decirme esto.', 'Antes de seguir, necesito que hagas una sola cosa:', 'Buscá un hielo o mojate la cara con agua muy fría ahora mismo.', 'Avisame cuando lo hayas hecho.'],
    options: [
      { label: 'Ya lo hice',                 next: 'crisis_physical_after' },
      { label: 'No puedo levantarme ahora', next: 'crisis_high' },
    ],
  },
  crisis_physical_after: {
    id: 'crisis_physical_after',
    botMessage: ['Bien.', 'Ese frío activa el nervio vago y corta el pico de adrenalina — no es un truco, es fisiología.', '¿Cómo estás ahora mismo?'],
    options: [
      { label: 'Todavía tengo esos pensamientos', next: 'crisis_high' },
      { label: 'Estoy un poco más calmado/a',     next: 'crisis_medium' },
    ],
  },
  crisis_high: {
    id: 'crisis_high',
    isCrisis: true,
    botMessage: ['Estoy muy contento/a de que me lo hayas dicho.', 'Lo que sentís merece atención profesional ahora.', 'Por favor, contactá a Bienestar Estudiantil de la UNCo o a una línea de crisis.', 'No tenés que pasar por esto solo/a.'],
    options: [{ label: 'Ver recursos de ayuda ahora', next: 'resources_emergency' }],
  },
  crisis_medium: {
    id: 'crisis_medium',
    botMessage: ['Estar muy mal emocionalmente es razón suficiente para buscar apoyo.', "No necesitás estar 'en crisis total' para merecer ayuda.", '¿Querés los datos de Bienestar UNCo?'],
    options: [
      { label: 'Sí, quiero los datos',               next: 'resources_info' },
      { label: 'Prefiero intentar una técnica antes', next: 'techniques_menu' },
    ],
  },
  crisis_vent: {
    id: 'crisis_vent',
    botMessage: 'Acá estoy. Contame lo que quieras.',
    options: [
      { label: 'Estoy agotado/a de todo',        next: 'low_tired' },
      { label: 'Me siento muy solo/a',           next: 'low_lonely' },
      { label: 'Algo me tiene muy angustiado/a', next: 'anxiety_chronic' },
      { label: 'Desaprobé y no sé qué hacer',    next: 'post_fail' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ANSIEDAD
  // ══════════════════════════════════════════════════════
  anxiety: {
    id: 'anxiety',
    botMessage: '¿Cómo la estás sintiendo?',
    options: [
      { label: 'Estoy ansioso/a ahora mismo',              next: 'anxiety_now' },
      { label: 'Es una angustia constante de fondo',       next: 'anxiety_chronic' },
      { label: 'Tuve un ataque de pánico',                 next: 'anxiety_panic' },
      { label: 'Miedo a exposiciones / hablar en público', next: 'anxiety_social' },
    ],
  },
  anxiety_now: {
    id: 'anxiety_now',
    botMessage: ['Bien que me lo decís.', 'Cuando la ansiedad está activa, lo mejor es anclarte al cuerpo.', '¿Probamos la técnica de los 5 sentidos ahora mismo?'],
    options: [
      { label: 'Sí, guiame',               next: 'technique_5senses' },
      { label: 'Prefiero respiración',      next: 'technique_breathing' },
      { label: 'Solo necesitaba contarlo', next: 'anxiety_just_talk' },
    ],
  },
  anxiety_just_talk: {
    id: 'anxiety_just_talk',
    botMessage: ['Está bien. A veces nombrarlo alcanza.', 'La ansiedad es una respuesta normal de tu cuerpo — no estás roto/a.', 'Va a pasar.'],
    options: [
      { label: 'Quiero explorar técnicas igual', next: 'techniques_menu' },
      { label: 'Volver al inicio',               next: 'start' },
    ],
  },
  anxiety_chronic: {
    id: 'anxiety_chronic',
    botMessage: ['Una angustia constante es agotadora.', 'Si está interfiriendo con tu vida diaria, hablar con un profesional puede cambiar mucho.', 'La Secretaría de Bienestar de la UNCo tiene atención psicológica gratuita para estudiantes.'],
    options: [
      { label: 'Quiero aprender técnicas',         next: 'techniques_menu' },
      { label: 'Quiero hablar con Bienestar UNCo', next: 'resources_info' },
      { label: 'Volver al inicio',                 next: 'start' },
    ],
  },
  anxiety_panic: {
    id: 'anxiety_panic',
    botMessage: ['Los ataques de pánico son aterradores, pero no son peligrosos físicamente.', 'Lo que ayuda: no resistirlo. Aceptar que está pasando lo acorta.', '¿Estás en uno ahora o fue antes?'],
    options: [
      { label: 'Estoy en uno ahora',                     next: 'crisis_physical' },
      { label: 'Fue antes, quiero aprender a manejarlo', next: 'technique_breathing' },
    ],
  },
  anxiety_social: {
    id: 'anxiety_social',
    botMessage: ["En lugar de 'tengo que salir bien', probá 'estoy compartiendo lo que sé'.", 'La presión baja cuando el foco sale de vos.'],
    options: [
      { label: 'Quiero técnica para los nervios previos', next: 'technique_breathing' },
      { label: 'Quiero trabajar los pensamientos',        next: 'technique_thoughts' },
      { label: 'Volver al inicio',                        next: 'start' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ESTADO DE ÁNIMO BAJO
  // ══════════════════════════════════════════════════════
  low_mood: {
    id: 'low_mood',
    botMessage: 'Gracias por contarme. ¿Cómo lo describirías?',
    options: [
      { label: 'Tristeza, no tengo ganas de nada',  next: 'low_sadness' },
      { label: 'Me siento solo/a o desconectado/a', next: 'low_lonely' },
      { label: 'Pensamientos de hacerme daño',      next: 'crisis_physical' },
      { label: 'Estoy agotado/a, sin energía',      next: 'low_tired' },
    ],
  },
  low_sadness: {
    id: 'low_sadness',
    botMessage: ['Estar triste y sin ganas no significa que algo esté mal en vos.', 'Es una señal de que algo necesita atención.', '¿Hace cuánto viene esto?'],
    options: [
      { label: 'Más de dos semanas', next: 'resources_info' },
      { label: 'Es algo reciente',   next: 'low_recent' },
    ],
  },
  low_recent: {
    id: 'low_recent',
    botMessage: ['Salir aunque sea 10 minutos al sol. Moverte un poco. Hablar con alguien.', 'Y permitirte estar mal — no tenés que estar bien todo el tiempo.'],
    options: [
      { label: 'Quiero técnicas para salir del bajón', next: 'techniques_menu' },
      { label: 'Necesito hablar con alguien',           next: 'resources_info' },
      { label: 'Volver al inicio',                      next: 'start' },
    ],
  },
  low_lonely: {
    id: 'low_lonely',
    botMessage: ['La soledad en la facu es más común de lo que parece.', 'No busques "hacer amigos" en abstracto.', 'Buscá una actividad que te cope y aparecés. La conexión viene sola.'],
    options: [
      { label: 'Me cuesta conectar con la gente', next: 'low_connect' },
      { label: 'Quiero recursos de apoyo',         next: 'resources_info' },
      { label: 'Volver al inicio',                 next: 'start' },
    ],
  },
  low_connect: {
    id: 'low_connect',
    botMessage: ["Hacele una pregunta genuina a alguien que ya conocés — '¿cómo te fue en el parcial?' puede ser el inicio.", 'La profundidad viene con el tiempo.'],
    options: [
      { label: 'Volver al inicio',                 next: 'start' },
      { label: 'Quiero hablar con un profesional', next: 'resources_info' },
    ],
  },
  low_tired: {
    id: 'low_tired',
    botMessage: ['El agotamiento mental es tan real como el físico.', "¿Cuándo fue la última vez que hiciste algo solo por placer, sin que fuera 'útil'?"],
    options: [
      { label: 'No recuerdo',                              next: 'low_tired_deep' },
      { label: 'Quiero técnica para descansar la mente', next: 'technique_breathing' },
    ],
  },
  low_tired_deep: {
    id: 'low_tired_deep',
    botMessage: ['Eso me preocupa un poco.', 'Cuando dejamos de hacer cosas por placer durante mucho tiempo, el sistema se vacía.', '¿Podés acordarte de algo que antes te gustaba hacer?'],
    options: [
      { label: 'Sí, se me ocurre algo',     next: 'end_positive' },
      { label: 'No, no me acuerdo de nada', next: 'resources_info' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // TÉCNICAS
  // ══════════════════════════════════════════════════════
  techniques_menu: {
    id: 'techniques_menu',
    botMessage: '¿Cuál querés explorar?',
    options: [
      { label: '🌬 Respiración 4-7-8',            next: 'technique_breathing' },
      { label: '👁 Técnica 5 sentidos',            next: 'technique_5senses' },
      { label: '💭 Desafío de pensamientos (TCC)', next: 'technique_thoughts' },
    ],
  },
  technique_breathing: {
    id: 'technique_breathing',
    isTechnique: true,
    techniqueType: 'breathing',
    botMessage: ['La respiración 4-7-8 activa el sistema nervioso parasimpático.', 'Básicamente le avisa a tu cuerpo que puede relajarse.', 'Presioná el botón para empezar.'],
    options: [{ label: 'Iniciar respiración guiada', next: 'technique_breathing_end', isTechniqueStart: true }],
  },
  technique_breathing_end: {
    id: 'technique_breathing_end',
    botMessage: ['Muy bien.', 'Con 2-3 veces por día, en una semana notás la diferencia.', '¿Cómo te sentís?'],
    options: [
      { label: 'Mejor, gracias',                         next: 'end_positive' },
      { label: 'Quiero probar otra técnica',              next: 'techniques_menu' },
      { label: 'Quiero hablar más sobre lo que me pasa', next: 'start' },
    ],
  },
  technique_5senses: {
    id: 'technique_5senses',
    isTechnique: true,
    techniqueType: 'senses',
    botMessage: ['La técnica 5-4-3-2-1 te ancla al presente.', 'Es muy efectiva cuando la ansiedad te lleva al futuro.', 'Empecemos.'],
    options: [{ label: 'Iniciar técnica de los 5 sentidos', next: 'technique_5senses_end', isTechniqueStart: true }],
  },
  technique_5senses_end: {
    id: 'technique_5senses_end',
    botMessage: ['Excelente.', 'Usaste los sentidos para interrumpir el loop de ansiedad.', '¿Cómo te quedaste?'],
    options: [
      { label: 'Me ayudó mucho',              next: 'end_positive' },
      { label: 'Quiero probar otra técnica',  next: 'techniques_menu' },
      { label: 'Necesito hablar con alguien', next: 'resources_info' },
    ],
  },
  technique_thoughts: {
    id: 'technique_thoughts',
    isTechnique: true,
    techniqueType: 'thoughts',
    botMessage: ['Esta técnica viene de la Terapia Cognitivo-Conductual.', 'Los pensamientos no son hechos. Los podemos cuestionar.', 'Vamos paso a paso.'],
    options: [{ label: 'Iniciar desafío de pensamientos', next: 'technique_thoughts_end', isTechniqueStart: true }],
  },
  technique_thoughts_end: {
    id: 'technique_thoughts_end',
    botMessage: ['Con práctica, tu mente aprende a hacer esto automáticamente.', 'Al principio cuesta. Después se vuelve natural.', '¿Querés seguir trabajando algo?'],
    options: [
      { label: 'Quiero practicar otra técnica', next: 'techniques_menu' },
      { label: 'Volver al inicio',              next: 'start' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // RECURSOS
  // ══════════════════════════════════════════════════════
  resources_info: {
    id: 'resources_info',
    isResources: true,
    botMessage: 'Acá tenés los recursos disponibles. Todos gratuitos y confidenciales:',
    options: [{ label: 'Volver al inicio', next: 'start' }],
  },
  resources_emergency: {
    id: 'resources_emergency',
    isResources: true,
    isCrisis: true,
    botMessage: 'Bien que buscaste ayuda. Estos son los recursos más importantes:',
    options: [{ label: 'Volver al inicio', next: 'start' }],
  },

  // ══════════════════════════════════════════════════════
  // CIERRE
  // ══════════════════════════════════════════════════════
  end_positive: {
    id: 'end_positive',
    botMessage: ['Me alegra haberte acompañado.', 'Cuidar tu salud mental es tan importante como estudiar.', '¿Hay algo más en lo que te pueda ayudar?'],
    options: [
      { label: 'Sí, quiero explorar más', next: 'start' },
      { label: 'No, por ahora está bien', next: 'end_final' },
    ],
  },
  end_final: {
    id: 'end_final',
    botMessage: ['Perfecto.', 'Podés volver cuando quieras. El botón de ayuda siempre está arriba.', '¡Cuidate!'],
    options: [{ label: 'Empezar de nuevo', next: 'start' }],
  },
};
