// config/resources.js
// ─────────────────────────────────────────────────────────
// ÚNICO lugar donde se editan teléfonos, emails y links.
// Si cambia un número, editás este archivo — sin recompilar.
// ─────────────────────────────────────────────────────────

export const RESOURCES = [
  // ── Urgentes 24 hs ──────────────────────────────────────
  {
    id: 'cas',
    name: 'Centro de Asistencia al Suicida (CAS)',
    phone: '135',
    description: 'Línea nacional gratuita, 24 hs — llamada o WhatsApp',
    url: 'https://www.asistenciaalsuicida.org.ar',
    email: null,
    urgent: true,
    featured: false,
  },
  {
    id: 'same',
    name: 'SAME — Neuquén',
    phone: '107',
    description: 'Emergencias médicas y psiquiátricas',
    url: null,
    email: null,
    urgent: true,
    featured: false,
  },
  {
    id: 'salud_nqn',
    name: 'Ministerio de Salud Neuquén',
    phone: '0800-222-1002',
    description: 'Línea de salud mental provincial, gratuita',
    url: null,
    email: null,
    urgent: true,
    featured: false,
  },

  // ── Bienestar UNCo ───────────────────────────────────────
  {
    id: 'bienestar_unco',
    name: 'Secretaría de Bienestar Estudiantil — UNCo',
    phone: '+54 299 449-0300',
    description: 'Atención psicológica, social y orientación para estudiantes. Lun–Vie.',
    url: 'https://www.uncoma.edu.ar',
    email: 'secretaria.bienestar@central.uncoma.edu.ar',
    urgent: false,
    featured: true,
  },
  {
    id: 'salud_unco',
    name: 'Dirección de Salud Estudiantil — UNCo',
    phone: null,
    description: 'Atención médica y psicológica para la comunidad universitaria.',
    url: 'https://www.uncoma.edu.ar',
    email: null,
    urgent: false,
    featured: false,
  },
];
