// ─────────────────────────────────────────────────────────
// data/decisionTree.js (Versión 2.0 - Optimizada)
// ─────────────────────────────────────────────────────────

export const DECISION_TREE = {

  // ══════════════════════════════════════════════════════
  // INICIO REESTRUCTURADO - REDUCCIÓN DE CARGA COGNITIVA
  // ══════════════════════════════════════════════════════
  start: {
    id: 'start',
    botMessage: '¡Hola! Soy el compañero de bienestar de la UNCo. ¿En qué te ayudo hoy?',
    options: [
      { label: '📚 Problemas con el estudio',         next: 'study_menu' },
      { label: '🫀 Me siento mal emocionalmente',     next: 'emotions_menu' },
      { label: '🧠 Quiero usar una técnica rápida',   next: 'techniques_menu' },
      { label: '🆘 Necesito ayuda urgente',           next: 'crisis_check' },
    ],
  },

  study_menu: {
    id: 'study_menu',
    botMessage: '¿Qué está pasando con el estudio?',
    options: [
      { label: '😔 Desaprobé / me fue mal',                      next: 'post_fail' },
      { label: '😰 Tengo un examen próximo',                     next: 'stress_exams_triage' },
      { label: '😩 Procrastino y no arranco',                    next: 'stress_procrastination_pact' },
      { label: 'Volver atrás',                                   next: 'start' },
    ],
  },

  emotions_menu: {
    id: 'emotions_menu',
    botMessage: 'Entiendo. ¿Cómo describirías lo que sentís ahora?',
    options: [
      { label: '🌀 Agobio (no sé por dónde empezar)', next: 'stress_brain_dump' },
      { label: '😖 Ansiedad o angustia',              next: 'anxiety' },
      { label: '💙 Tristeza o bajón',                 next: 'low_mood' },
      { label: 'Volver atrás',                        next: 'start' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // POST-FRACASO — ESCUDO ANTI-ABANDONO (CONDENSADO)
  // ══════════════════════════════════════════════════════
  post_fail: {
    id: 'post_fail',
    botMessage: ['Desaprobar duele. Es normal estar mal.', '¿Qué es lo que más te pesa de esto ahora mismo?'],
    options: [
      { label: 'Quiero dejar la carrera',             next: 'post_fail_abandon' },
      { label: 'Siento que soy un fracaso',           next: 'post_fail_failure_feeling' },
      { label: 'No sé qué paso / No sé qué hacer',    next: 'post_fail_next_step' },
    ],
  },
  post_fail_abandon: {
    id: 'post_fail_abandon',
    botMessage: ['Escuchame. Las peores decisiones se toman en el pico de la bronca.', 'Hagamos un trato: dame 48 horas sin tomar decisiones sobre la carrera. Después, hacés lo que quieras.', '¿Tenemos un trato?'],
    options: [
      { label: 'Trato — Espero 48 hs',                    next: 'post_fail_pact_accepted' },
      { label: 'No, ya lo decidí',                        next: 'post_fail_decided' },
    ],
  },
  post_fail_pact_accepted: {
    id: 'post_fail_pact_accepted',
    botMessage: ['Excelente. Hablamos en 48 horas con la cabeza fría.', 'Por hoy, cortemos acá. ¿Qué necesitás para pasar el rato?'],
    options: [
      { label: 'Bajar la tensión (Respirar)',         next: 'technique_breathing' },
      { label: 'Hablar de otra cosa',                 next: 'start' },
    ],
  },
  post_fail_decided: {
    id: 'post_fail_decided',
    botMessage: ['Respeto tu decisión. Pero no la transites en soledad.', 'La Secretaría de Bienestar está para orientarte en estos cierres.'],
    options: [
      { label: 'Ver datos de Bienestar UNCo',         next: 'resources_info' },
      { label: 'Volver al inicio',                    next: 'start' },
    ],
  },
  post_fail_failure_feeling: {
    id: 'post_fail_failure_feeling',
    botMessage: ['Fallar en un examen es un evento, no tu identidad.', 'Es una nota, no tu valor como persona. ¿Desafiamos ese pensamiento?'],
    options: [
      { label: 'Sí, quiero desafiarlo',               next: 'technique_thoughts' },
      { label: 'Solo necesito calmarme',              next: 'technique_breathing' },
    ],
  },
  post_fail_next_step: {
    id: 'post_fail_next_step',
    botMessage: ['Paso 1: No decidas nada hoy.', 'Paso 2: Pedile devolución al docente. Aunque incomode, necesitas esa info para ajustar el método.'],
    options: [
      { label: 'Voy a intentarlo',                    next: 'end_positive' },
      { label: 'Me da ansiedad el docente',           next: 'anxiety_social' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // TRIAGE DE EXAMEN (TEXTOS ÁGILES)
  // ══════════════════════════════════════════════════════
  stress_exams_triage: {
    id: 'stress_exams_triage',
    botMessage: '¿Cuándo rendís?',
    options: [
      { label: 'Hoy o mañana 😰',           next: 'stress_exam_today' },
      { label: 'En pocos días',             next: 'stress_exam_week' },
      { label: 'La semana que viene o más', next: 'stress_exam_later' },
    ],
  },
  stress_exam_today: {
    id: 'stress_exam_today',
    botMessage: ['Estudiar de cero ya no sirve.', 'Enfocate en controlar tu entorno: ¿Tenés DNI, agua y lo necesario para entrar?'],
    options: [
      { label: 'Sí, todo listo',                  next: 'stress_exam_today_ready' },
      { label: 'No, me falta algo',               next: 'stress_exam_today_missing' },
    ],
  },
  stress_exam_today_ready: {
    id: 'stress_exam_today_ready',
    botMessage: ['Perfecto. Antes de entrar, bajemos las pulsaciones.'],
    options: [
      { label: 'Hacer respiración 4-7-8', next: 'technique_breathing' },
      { label: 'Estoy bien así, gracias', next: 'end_positive' },
    ],
  },
  stress_exam_today_missing: {
    id: 'stress_exam_today_missing',
    botMessage: ['Resolvelo ya. Anotá qué te falta y a quién podés pedírselo (compañero/familiar).', 'Ocupate de eso, luego respiramos.'],
    options: [
      { label: 'Ya está, necesito calmarme', next: 'technique_breathing' },
    ],
  },
  stress_exam_week: {
    id: 'stress_exam_week',
    botMessage: ['Tenés margen, pero no intentes abarcar todo.', 'Identificá los 3 temas clave que más toman y dedicales el 70% de tu tiempo.'],
    options: [
      { label: 'Me cuesta arrancar',      next: 'stress_procrastination_pact' },
      { label: 'Estudio pero no retengo', next: 'stress_study_retention' },
      { label: 'Dale, voy a hacer eso',   next: 'end_positive' },
    ],
  },
  stress_study_retention: {
    id: 'stress_study_retention',
    botMessage: ["Dejá de 'leer y releer'.", 'Leé un tema, cerrá el texto y escribí lo que te acuerdes. La recuperación activa fija la memoria.'],
    options: [
      { label: 'Voy a probarlo',       next: 'end_positive' },
      { label: 'Tengo mucha ansiedad', next: 'technique_breathing' },
    ],
  },
  stress_exam_later: {
    id: 'stress_exam_later',
    botMessage: ['Falta bastante. Esta ansiedad suele ser miedo al fracaso, no falta de tiempo.', '¿Qué te preocupa más?'],
    options: [
      { label: 'El volumen de estudio',               next: 'stress_exam_week' },
      { label: 'Miedo a que me vaya mal de nuevo',    next: 'post_fail_failure_feeling' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // BRAIN DUMP (AGOBIO)
  // ══════════════════════════════════════════════════════
  stress_brain_dump: {
    id: 'stress_brain_dump',
    isBrainDump: true,
    botMessage: ['Volquemos la cabeza.', 'Anotá TODO lo que te tiene harto/a o pendiente. Sin filtro.'],
    options: [],
  },
  stress_brain_dump_go: {
    id: 'stress_brain_dump_go',
    isBrainDumpTask: true,
    botMessage: ['Bien. De todo eso, elegí UNA sola cosa que te tome 5 minutos o menos resolver.'],
    options: [],
  },
  stress_brain_dump_commit: {
    id: 'stress_brain_dump_commit',
    botMessage: ['Esa es tu única misión ahora.', '¿La hacemos ya?'],
    options: [
      { label: 'Sí, ahora mismo',                        next: 'end_positive' },
      { label: 'Necesito bajar la ansiedad primero',     next: 'technique_breathing' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // PROCRASTINACIÓN — PACTO DE 5 MINUTOS
  // ══════════════════════════════════════════════════════
  stress_procrastination_pact: {
    id: 'stress_procrastination_pact',
    botMessage: ['Hagamos un trato: Sentate a estudiar solo 5 minutos. Yo te aviso.', 'Si a los 5 minutos querés dejar, lo dejás. ¿Aceptás?'],
    options: [
      { label: 'Acepto — 5 minutos', next: 'stress_procrastination_timer', isTimerStart: true },
      { label: 'No me convence',     next: 'stress_procrastination_resist' },
    ],
  },
  stress_procrastination_timer: {
    id: 'stress_procrastination_timer',
    isTimer: true,
    botMessage: ['Arrancá. El tiempo corre.'],
    options: [],
  },
  stress_procrastination_after: {
    id: 'stress_procrastination_after',
    botMessage: ['¡Tiempo!', '¿Seguimos o frenamos acá?'],
    options: [
      { label: 'Sigo, ya enganché',             next: 'end_positive' },
      { label: 'Freno, no me concentro',        next: 'stress_procrastination_hard' },
    ],
  },
  stress_procrastination_hard: {
    id: 'stress_procrastination_hard',
    botMessage: ['A veces hay una barrera emocional invisible.', '¿Por qué creés que te cuesta tanto arrancar hoy?'],
    options: [
      { label: 'Miedo a no ser suficiente',      next: 'stress_imposter' },
      { label: 'Estoy al límite de energía',     next: 'low_tired' },
    ],
  },
  stress_procrastination_resist: {
    id: 'stress_procrastination_resist',
    botMessage: '¿Qué te está frenando realmente?',
    options: [
      { label: 'Siento que soy un fraude', next: 'stress_imposter' },
      { label: 'No tengo energía',         next: 'low_tired' },
    ],
  },
  stress_imposter: {
    id: 'stress_imposter',
    botMessage: ['Síndrome del impostor. Le pasa al 70% de los universitarios.', "Cuando el pensamiento aparezca, decite: 'Ahí está el ruido otra vez'. No es una verdad."],
    options: [
      { label: 'Quiero desafiar ese pensamiento', next: 'technique_thoughts' },
      { label: 'Volver al inicio',                next: 'start' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // CRISIS — INTERVENCIÓN DIRECTA
  // ══════════════════════════════════════════════════════
  crisis_check: {
    id: 'crisis_check',
    botMessage: ['Estoy acá.', '¿Estás teniendo pensamientos sobre hacerte daño o no querer vivir?'],
    options: [
      { label: 'Sí, tengo esos pensamientos', next: 'crisis_physical' },
      { label: 'No, pero me siento muy mal',  next: 'crisis_medium' },
    ],
  },
  crisis_physical: {
    id: 'crisis_physical',
    botMessage: ['Gracias por confiarme esto.', 'Necesito que hagas algo físico ahora mismo: buscá un hielo o lavate la cara con agua muy fría.', 'Avisame cuando lo hagas.'],
    options: [
      { label: 'Ya lo hice',                 next: 'crisis_physical_after' },
      { label: 'No puedo hacerlo',           next: 'crisis_high' },
    ],
  },
  crisis_physical_after: {
    id: 'crisis_physical_after',
    botMessage: ['Bien. El frío activa el nervio vago y frena el pico de alerta.', '¿Te sentís un poco más en tierra?'],
    options: [
      { label: 'Todavía me siento en peligro', next: 'crisis_high' },
      { label: 'Estoy un poco mejor',          next: 'crisis_medium' },
    ],
  },
  crisis_high: {
    id: 'crisis_high',
    isCrisis: true,
    botMessage: ['Lo que sentís es demasiado pesado para cargarlo a solas. Merecés ayuda profesional ya.', 'Te dejo los contactos de emergencia.'],
    options: [{ label: 'Ver recursos de emergencia', next: 'resources_emergency' }],
  },
  crisis_medium: {
    id: 'crisis_medium',
    botMessage: ["No necesitás estar 'en riesgo total' para pedir apoyo.", 'La UNCo tiene espacios para esto.'],
    options: [
      { label: 'Ver recursos de Bienestar',          next: 'resources_info' },
      { label: 'Quiero probar una técnica para calmarme', next: 'techniques_menu' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ANSIEDAD Y BAJÓN (CONSOLIDADOS)
  // ══════════════════════════════════════════════════════
  anxiety: {
    id: 'anxiety',
    botMessage: '¿Cómo la percibís?',
    options: [
      { label: 'Ansiedad aguda ahora mismo / Pánico', next: 'anxiety_now' },
      { label: 'Ansiedad constante / de fondo',       next: 'anxiety_chronic' },
      { label: 'Ansiedad social (Exposiciones)',      next: 'anxiety_social' },
    ],
  },
  anxiety_now: {
    id: 'anxiety_now',
    botMessage: ['Para la ansiedad activa, lo mejor es anclar la mente al cuerpo.', '¿Probamos los 5 sentidos?'],
    options: [
      { label: 'Sí, vamos',                   next: 'technique_5senses' },
      { label: 'Prefiero la respiración',     next: 'technique_breathing' },
    ],
  },
  anxiety_chronic: {
    id: 'anxiety_chronic',
    botMessage: ['Sostener eso desgasta muchísimo. Hablar con Bienestar Estudiantil puede darte herramientas de largo plazo.'],
    options: [
      { label: 'Ver recursos UNCo',               next: 'resources_info' },
      { label: 'Aprender técnicas de manejo',     next: 'techniques_menu' },
    ],
  },
  anxiety_social: {
    id: 'anxiety_social',
    botMessage: ["Cambiá el 'tengo que salir perfecto' por 'estoy compartiendo lo que sé'. Bajar el ego baja la presión."],
    options: [
      { label: 'Desafiar pensamientos', next: 'technique_thoughts' },
      { label: 'Volver al inicio',      next: 'start' },
    ],
  },
  low_mood: {
    id: 'low_mood',
    botMessage: '¿Es tristeza o un agotamiento total de energía?',
    options: [
      { label: 'Tristeza prolongada / Soledad', next: 'low_sadness' },
      { label: 'Agotamiento mental total',      next: 'low_tired' },
    ],
  },
  low_sadness: {
    id: 'low_sadness',
    botMessage: ['La soledad y la tristeza en la facu son muy comunes.', 'Obligate a salir 10 minutos al sol hoy. Y considerá hablar con alguien si llevas así varias semanas.'],
    options: [
      { label: 'Contactar a Bienestar', next: 'resources_info' },
      { label: 'Volver al inicio',      next: 'start' },
    ],
  },
  low_tired: {
    id: 'low_tired',
    botMessage: ['El sistema colapsa cuando todo es "deber" y nada es "placer".', '¿Hace cuánto no hacés algo solo porque te divierte?'],
    options: [
      { label: 'No lo recuerdo',        next: 'resources_info' },
      { label: 'Voy a buscar un rato libre', next: 'end_positive' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // TÉCNICAS
  // ══════════════════════════════════════════════════════
  techniques_menu: {
    id: 'techniques_menu',
    botMessage: 'Elegí una herramienta:',
    options: [
      { label: '🌬 Respiración 4-7-8 (Calma rápida)',      next: 'technique_breathing' },
      { label: '👁 5 Sentidos (Para ataques de ansiedad)', next: 'technique_5senses' },
      { label: '💭 Desafío Cognitivo (Para pensamientos)', next: 'technique_thoughts' },
    ],
  },
  technique_breathing: {
    id: 'technique_breathing',
    isTechnique: true,
    techniqueType: 'breathing',
    botMessage: ['Esta técnica apaga la alerta de tu sistema nervioso.'],
    options: [{ label: 'Iniciar respiración', next: 'technique_breathing_end', isTechniqueStart: true }],
  },
  technique_breathing_end: {
    id: 'technique_breathing_end',
    botMessage: ['¿Mejor?'],
    options: [
      { label: 'Sí, gracias',                 next: 'end_positive' },
      { label: 'Volver al menú',              next: 'start' },
    ],
  },
  technique_5senses: {
    id: 'technique_5senses',
    isTechnique: true,
    techniqueType: 'senses',
    botMessage: ['Ideal para frenar el loop mental y anclarte al presente.'],
    options: [{ label: 'Iniciar técnica', next: 'technique_5senses_end', isTechniqueStart: true }],
  },
  technique_5senses_end: {
    id: 'technique_5senses_end',
    botMessage: ['Bien hecho. Interrumpiste el piloto automático.'],
    options: [
      { label: 'Me sirvió',                   next: 'end_positive' },
      { label: 'Volver al inicio',            next: 'start' },
    ],
  },
  technique_thoughts: {
    id: 'technique_thoughts',
    isTechnique: true,
    techniqueType: 'thoughts',
    botMessage: ['Vamos a cuestionar la validez de esos pensamientos negativos.'],
    options: [{ label: 'Iniciar desafío', next: 'technique_thoughts_end', isTechniqueStart: true }],
  },
  technique_thoughts_end: {
    id: 'technique_thoughts_end',
    botMessage: ['Cuesta al principio, pero luego la mente lo automatiza.'],
    options: [{ label: 'Entendido', next: 'end_positive' }],
  },

  // ══════════════════════════════════════════════════════
  // RECURSOS Y CIERRE
  // ══════════════════════════════════════════════════════
  resources_info: {
    id: 'resources_info',
    isResources: true,
    botMessage: 'Acá tenés los recursos gratuitos de la UNCo:',
    options: [{ label: 'Volver al inicio', next: 'start' }],
  },
  resources_emergency: {
    id: 'resources_emergency',
    isResources: true,
    isCrisis: true,
    botMessage: 'Líneas de ayuda urgente y directa:',
    options: [{ label: 'Volver al inicio', next: 'start' }],
  },
  end_positive: {
    id: 'end_positive',
    botMessage: ['Me alegro de haberte acompañado.', 'Acordate que el botón de ayuda siempre está ahí.'],
    options: [
      { label: 'Empezar de nuevo', next: 'start' },
    ],
  },
};
