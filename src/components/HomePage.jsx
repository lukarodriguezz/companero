import { useMoodHistory } from '../hooks/useMoodHistory';

const MOOD_OPTIONS = [
  { value: 1, emoji: '😔', label: 'Muy mal',  color: '#C94040' },
  { value: 2, emoji: '😟', label: 'Mal',      color: '#D4832A' },
  { value: 3, emoji: '😐', label: 'Regular',  color: '#7A7A74' },
  { value: 4, emoji: '🙂', label: 'Bien',     color: '#5A8F1A' },
  { value: 5, emoji: '😊', label: 'Muy bien', color: '#1A8E68' },
];

const QUICK_ACTIONS = [
  { icon: '😔', label: 'Me fue mal en un examen',       desc: 'Flujo anti-abandono',        page: 'chat' },
  { icon: '😰', label: 'Tengo un examen próximo',        desc: 'Triage + técnicas de calma', page: 'chat' },
  { icon: '💬', label: 'Hablar con mi compañero',        desc: 'Chat completo',              page: 'chat' },
  { icon: '🌬', label: 'Técnica rápida de respiración', desc: 'Respiración 4-7-8',          page: 'chat' },
  { icon: '📊', label: 'Registrar cómo me siento',      desc: 'Historial de ánimo',         page: 'mood' },
];

export default function HomePage({ onNavigate }) {
  const { history, todayEntry } = useMoodHistory();
  const mood = MOOD_OPTIONS.find(m => m.value === todayEntry?.value);

  const avg = history.length > 0
    ? (history.slice(0, 7).reduce((s, e) => s + e.value, 0) / Math.min(history.length, 7)).toFixed(1)
    : null;

  return (
    <div style={{ padding: 16 }}>

      {/* Saludo */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 22, fontWeight: 700, margin: '0 0 3px' }}>Hola 👋</p>
        <p style={{ fontSize: 14, color: 'var(--t2)', margin: 0 }}>
          Compañero de bienestar de la <strong>UNCo</strong>
        </p>
      </div>

      {/* Estado de hoy */}
      <div
        onClick={() => onNavigate('mood')}
        style={{
          background: 'var(--bg2)', borderRadius: 14, padding: '14px',
          marginBottom: 10, cursor: 'pointer',
        }}
      >
        <p style={{
          fontSize: 11, color: 'var(--t2)', textTransform: 'uppercase',
          letterSpacing: '.06em', margin: '0 0 8px', fontWeight: 500,
        }}>
          Estado de hoy
        </p>
        {todayEntry ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>{mood?.emoji}</span>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: mood?.color }}>
                {mood?.label}
              </p>
              {todayEntry.note && (
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--t2)' }}>{todayEntry.note}</p>
              )}
            </div>
          </div>
        ) : (
          <p style={{ fontSize: 14, color: 'var(--t2)', margin: 0 }}>
            Todavía no registraste → Tocar para registrar
          </p>
        )}
      </div>

      {/* Stats */}
      {avg && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {[
            { label: 'Promedio 7 días',  value: avg,           unit: ' / 5' },
            { label: 'Días registrados', value: history.length, unit: '' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--bg2)', borderRadius: 12, padding: '10px 12px' }}>
              <p style={{
                fontSize: 11, color: 'var(--t2)', margin: '0 0 3px',
                textTransform: 'uppercase', letterSpacing: '.05em',
              }}>
                {s.label}
              </p>
              <p style={{ fontWeight: 700, fontSize: 20, margin: 0 }}>
                {s.value}
                <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--t2)' }}>{s.unit}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Accesos rápidos */}
      <p style={{ fontWeight: 600, fontSize: 14, margin: '0 0 8px' }}>¿Qué necesitás ahora?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
        {QUICK_ACTIONS.map((q, i) => (
          <button key={i} onClick={() => onNavigate(q.page)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--bg2)', border: '1px solid var(--b3)',
            borderRadius: 12, padding: '12px 14px', cursor: 'pointer',
            fontFamily: 'inherit', textAlign: 'left', width: '100%',
          }}>
            <span style={{ fontSize: 20 }}>{q.icon}</span>
            <div>
              <p style={{ margin: 0, fontWeight: 500, fontSize: 14, color: 'var(--t1)' }}>{q.label}</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--t2)' }}>{q.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Dato del día */}
      <div style={{
        background: 'rgba(26,142,104,.08)', border: '1px solid rgba(26,142,104,.25)',
        borderRadius: 12, padding: '14px',
      }}>
        <p style={{ fontSize: 12, color: '#085041', fontWeight: 600, margin: '0 0 3px' }}>
          💡 Dato del día
        </p>
        <p style={{ fontSize: 13, color: '#085041', margin: 0, lineHeight: 1.6 }}>
          El 70% de los estudiantes universitarios experimenta el síndrome del impostor.
          No estás solo/a en esto.
        </p>
      </div>

    </div>
  );
}
