// ─────────────────────────────────────────────────────────
// data/decisionTree.js (Versión 2.0 - Arquitectura Final)
// ─────────────────────────────────────────────────────────

export const DECISION_TREE = {

  // ══════════════════════════════════════════════════════
  // INICIO - PUNTOS DE ENTRADA (APP & HOMEPAGE)
  // ══════════════════════════════════════════════════════
  start: {
    id: 'start',
    botMessage: '¡Hola! Soy el compañero de bienestar de la UNCo. ¿En qué te ayudo hoy?',
    options: [
      { label: '📚 Problemas con el estudio',          next: 'study_menu' },
      { label: '🫀 Me siento mal emocionalmente',      next: 'emotions_menu' },
      { label: '🧠 Quiero usar una técnica rápida',   next: 'techniques_menu' },
      { label: '🆘 Necesito ayuda urgente',            next: 'crisis_check' },
    ],
  },

  study_menu: {
    id: 'study_menu',
    botMessage: '¿Qué está pasando con el estudio?',
    options: [
      { label: '😔 Desaprobé / me fue mal',                    next: 'post_fail' },
      { label: '😰 Tengo un examen próximo',                   next: 'stress_exams_triage' },
      { label: '😩 Procrastino y no arranco',                   next: 'stress_procrastination_pact' },
      { label: 'Volver atrás',                                  next: 'start' },
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
  // POST-FRACASO — ESCUDO ANTI-ABANDONO
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
    botMessage: ['Escuchame. Las peores decisiones se toman en el pico de la bronca.', 'Hagamos un trato: dame 48 horas sin tomar decisiones sobre la carrera.', '¿Tenemos un trato?'],
    options: [
      { label: 'Trato — Espero 48 hs',                    next: 'post_fail_pact_accepted' },
      { label: 'No, ya lo decidí',                        next: 'post_fail_decided' },
    ],
  },
  post_fail_pact_accepted: {
    id: 'post_fail_pact_accepted',
    botMessage: ['Excelente. Hablamos en 48 horas con la cabeza fría.', '¿Qué necesitás para pasar el rato?'],
    options: [
      { label: 'Bajar la tensión (Respirar)',         next: 'technique_breathing' },
      { label: 'Hablar de otra cosa',                 next: 'start' },
    ],
  },
  post_fail_decided: {
    id: 'post_fail_decided',
    botMessage: ['Respeto tu decisión. Pero no la transites en soledad.', 'Bienestar UNCo está para orientarte.'],
    options: [
      { label: 'Ver datos de Bienestar UNCo',         next: 'resources_info' },
      { label: 'Volver al inicio',                    next: 'start' },
    ],
  },
  post_fail_failure_feeling: {
    id: 'post_fail_failure_feeling',
    botMessage: ['Fallar en un examen es un evento, no tu identidad.', '¿Desafiamos ese pensamiento?'],
    options: [
      { label: 'Sí, quiero desafiarlo',               next: 'technique_thoughts' },
      { label: 'Solo necesito calmarme',              next: 'technique_breathing' },
    ],
  },
  post_fail_next_step: {
    id: 'post_fail_next_step',
    botMessage: ['Paso 1: No decidas nada hoy.', 'Paso 2: Pedile devolución al docente.'],
    options: [
      { label: 'Voy a intentarlo',                    next: 'end_positive' },
      { label: 'Me da ansiedad el docente',           next: 'anxiety_social' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // TRIAGE DE EXAMEN
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
    botMessage: ['Enfocate en controlar tu entorno: ¿Tenés DNI y agua?'],
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
      { label: 'Estoy bien así',          next: 'end_positive' },
    ],
  },
  stress_exam_today_missing: {
    id: 'stress_exam_today_missing',
    botMessage: ['Resolvelo ya. Anotá qué te falta y pedilo.', 'Luego volvé y respiramos.'],
    options: [
      { label: 'Ya está, necesito calmarme', next: 'technique_breathing' },
    ],
  },
  stress_exam_week: {
    id: 'stress_exam_week',
    botMessage: ['Tenés margen. Identificá los 3 temas clave.'],
    options: [
      { label: 'Me cuesta arrancar',      next: 'stress_procrastination_pact' },
      { label: 'Estudio pero no retengo', next: 'stress_study_retention' },
      { label: 'Dale, voy a hacer eso',   next: 'end_positive' },
    ],
  },
  stress_study_retention: {
    id: 'stress_study_retention',
    botMessage: ["Probá la recuperación activa: leé un tema y escribilo sin mirar."],
    options: [
      { label: 'Voy a probarlo',       next: 'end_positive' },
      { label: 'Tengo mucha ansiedad', next: 'technique_breathing' },
    ],
  },
  stress_exam_later: {
    id: 'stress_exam_later',
    botMessage: ['Falta bastante. ¿Qué te preocupa más?'],
    options: [
      { label: 'El volumen de estudio',                next: 'stress_exam_week' },
      { label: 'Miedo a que me vaya mal',             next: 'post_fail_failure_feeling' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // BRAIN DUMP (AGOBIO) - FIX DE FLUIJE
  // ══════════════════════════════════════════════════════
  stress_brain_dump: {
    id: 'stress_brain_dump',
    isBrainDump: true,
    botMessage: ['Anotá TODO lo que tenés pendiente o te preocupa sin filtro.'],
    options: [], // El Widget llama automáticamente a 'stress_brain_dump_go' al terminar
  },
  stress_brain_dump_go: {
    id: 'stress_brain_dump_go',
    botMessage: ['De todo eso, elegí UNA sola cosa que te tome 5 minutos resolver.'],
    options: [
      { label: 'Ya elegí una', next: 'stress_brain_dump_commit' }
    ],
  },
  stress_brain_dump_commit: {
    id: 'stress_brain_dump_commit',
    botMessage: ['¿Hacemos esa única tarea ahora mismo?'],
    options: [
      { label: 'Sí, ahora mismo',                        next: 'end_positive' },
      { label: 'Necesito calmarme primero',              next: 'technique_breathing' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // PROCRASTINACIÓN
  // ══════════════════════════════════════════════════════
  stress_procrastination_pact: {
    id: 'stress_procrastination_pact',
    botMessage: ['Hagamos un trato: Estudiá solo 5 minutos. Yo te aviso.', '¿Aceptás?'],
    options: [
      { label: 'Acepto — 5 minutos', next: 'stress_procrastination_timer' },
      { label: 'No me convence',     next: 'stress_procrastination_resist' },
    ],
  },
  stress_procrastination_timer: {
    id: 'stress_procrastination_timer',
    isTimer: true,
    botMessage: ['Arrancá. El tiempo corre.'],
    options: [], // El temporizador llama a 'stress_procrastination_after' al terminar
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
    botMessage: ['¿Por qué creés que te cuesta tanto hoy?'],
    options: [
      { label: 'Miedo a no ser suficiente',      next: 'stress_imposter' },
      { label: 'Estoy sin energía',              next: 'low_tired' },
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
    botMessage: ['Síndrome del impostor. Es solo ruido mental, no una verdad.'],
    options: [
      { label: 'Quiero desafiarlo', next: 'technique_thoughts' },
      { label: 'Volver al inicio',  next: 'start' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // CRISIS — INTERVENCIÓN
  // ══════════════════════════════════════════════════════
  crisis_check: {
    id: 'crisis_check',
    botMessage: ['¿Estás teniendo pensamientos sobre hacerte daño?'],
    options: [
      { label: 'Sí, tengo esos pensamientos', next: 'crisis_physical' },
      { label: 'No, pero me siento mal',      next: 'crisis_medium' },
    ],
  },
  crisis_physical: {
    id: 'crisis_physical',
    botMessage: ['Lavate la cara con agua muy fría o buscá un hielo.', 'Avisame cuando lo hagas.'],
    options: [
      { label: 'Ya lo hice',                 next: 'crisis_physical_after' },
      { label: 'No puedo hacerlo',           next: 'crisis_high' },
    ],
  },
  crisis_physical_after: {
    id: 'crisis_physical_after',
    botMessage: ['¿Te sentís un poco más en tierra?'],
    options: [
      { label: 'Todavía me siento mal', next: 'crisis_high' },
      { label: 'Estoy un poco mejor',   next: 'crisis_medium' },
    ],
  },
  crisis_high: {
    id: 'crisis_high',
    isCrisis: true,
    botMessage: ['Merecés ayuda profesional ya. Te dejo los contactos de emergencia.'],
    options: [{ label: 'Ver recursos de emergencia', next: 'resources_emergency' }],
  },
  crisis_medium: {
    id: 'crisis_medium',
    botMessage: ['No necesitás estar al límite para pedir apoyo.'],
    options: [
      { label: 'Ver recursos de Bienestar',          next: 'resources_info' },
      { label: 'Probar una técnica',                 next: 'techniques_menu' },
    ],
  },

  // ══════════════════════════════════════════════════════
  // ANSIEDAD Y BAJÓN
  // ══════════════════════════════════════════════════════
  anxiety: {
    id: 'anxiety',
    botMessage: '¿Cómo la percibís?',
    options: [
      { label: 'Ataque de pánico / Aguda ahora', next: 'anxiety_now' },
      { label: 'Ansiedad constante',              next: 'anxiety_chronic' },
      { label: 'Ansiedad social',                 next: 'anxiety_social' },
    ],
  },
  anxiety_now: {
    id: 'anxiety_now',
    botMessage: ['Anclemos la mente al cuerpo.'],
    options: [
      { label: 'Usar los 5 sentidos',            next: 'technique_5senses' },
      { label: 'Respiración 4-7-8',               next: 'technique_breathing' },
    ],
  },
  anxiety_chronic: {
    id: 'anxiety_chronic',
    botMessage: ['Sostener esto desgasta mucho. Hablá con Bienestar.'],
    options: [
      { label: 'Ver recursos UNCo',               next: 'resources_info' },
      { label: 'Aprender técnicas',
