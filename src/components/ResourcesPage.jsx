import { RESOURCES } from '../config/resources';
import { S } from '../utils/styles';

export default function ResourcesPage() {
  return (
    <div style={{ padding: 16 }}>

      {/* Disclaimer */}
      <div style={{
        background: '#FCEBEB', border: '1px solid #F7C1C1',
        borderRadius: 12, padding: '14px', marginBottom: 16,
      }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: '#791F1F', margin: '0 0 4px' }}>
          ⚠️ Aviso importante
        </p>
        <p style={{ fontSize: 13, color: '#791F1F', margin: 0, lineHeight: 1.6 }}>
          Este compañero virtual <strong>NO reemplaza la atención profesional</strong> ni es un
          servicio de emergencias. Si estás en peligro, usá los recursos de abajo.
        </p>
      </div>

      {/* Urgentes */}
      <p style={{ fontWeight: 600, fontSize: 15, margin: '0 0 10px' }}>
        🆘 Líneas de crisis — Gratuitas 24 hs
      </p>
      {RESOURCES.filter(r => r.urgent).map(r => (
        <div key={r.id} style={S.card()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <div>
              <p style={{ fontWeight: 500, fontSize: 14, margin: 0 }}>{r.name}</p>
              <p style={{ fontSize: 12, color: 'var(--t2)', margin: '3px 0 0' }}>{r.description}</p>
            </div>
            {r.phone && (
              <a href={`tel:${r.phone}`} style={{
                background: '#A32020', color: '#fff', textDecoration: 'none',
                borderRadius: 8, padding: '8px 16px', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap',
              }}>
                📞 {r.phone}
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Bienestar UNCo */}
      <p style={{ fontWeight: 600, fontSize: 15, margin: '16px 0 10px' }}>
        🎓 Bienestar Estudiantil — UNCo
      </p>
      {RESOURCES.filter(r => !r.urgent).map(r => (
        <div key={r.id} style={{
          ...S.card(),
          background: r.featured ? 'rgba(26,142,104,.08)' : 'var(--bg2)',
          border: r.featured ? '1px solid rgba(26,142,104,.3)' : '1px solid transparent',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ fontWeight: 600, fontSize: 14, margin: '0 0 4px' }}>{r.name}</p>
            {r.featured && (
              <span style={{ fontSize: 10, background: '#1A8E68', color: '#fff', borderRadius: 4, padding: '2px 7px', whiteSpace: 'nowrap' }}>
                Principal
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, color: 'var(--t2)', margin: '0 0 8px', lineHeight: 1.5 }}>{r.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {r.phone && <a href={`tel:${r.phone}`}      style={{ fontSize: 13, color: '#1A56A0', textDecoration: 'none', fontWeight: 500 }}>📞 {r.phone}</a>}
            {r.email && <a href={`mailto:${r.email}`}   style={{ fontSize: 13, color: '#1A56A0', textDecoration: 'none', fontWeight: 500 }}>✉ {r.email}</a>}
            {r.url   && <a href={r.url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#1A56A0', textDecoration: 'none', fontWeight: 500 }}>🌐 Sitio →</a>}
          </div>
        </div>
      ))}

      {/* Tip */}
      <div style={{
        background: 'rgba(26,142,104,.08)', border: '1px solid rgba(26,142,104,.25)',
        borderRadius: 12, padding: '14px', marginTop: 8,
      }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: '#085041', margin: '0 0 6px' }}>
          ¿Sabías esto?
        </p>
        <p style={{ fontSize: 13, color: '#085041', margin: 0, lineHeight: 1.6 }}>
          Pedir ayuda no es debilidad. Los servicios de la UNCo son confidenciales y gratuitos
          para todos los estudiantes. No necesitás estar "muy mal" para usarlos.
        </p>
      </div>

    </div>
  );
}
