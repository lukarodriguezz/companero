import { RESOURCES } from "@/config/resources.js";

export default function PanicModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.65)',
      zIndex: 1000, display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{
        background: 'var(--bg1)', borderRadius: '20px 20px 0 0',
        padding: '1.5rem 1.25rem 2rem', width: '100%',
        maxHeight: '88vh', overflowY: 'auto',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 17, margin: 0, color: '#A32020' }}>Recursos de ayuda</p>
            <p style={{ fontSize: 12, color: 'var(--t2)', margin: '3px 0 0' }}>Todos gratuitos y disponibles ahora</p>
          </div>
          <button onClick={onClose} style={{
            background: 'var(--bg2)', border: 'none', borderRadius: '50%',
            width: 32, height: 32, cursor: 'pointer', fontSize: 18,
            color: 'var(--t2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Disclaimer */}
        <div style={{
          background: '#FCEBEB', border: '1px solid #F7C1C1',
          borderRadius: 10, padding: '12px 14px', marginBottom: 16,
        }}>
          <p style={{ fontSize: 12, color: '#791F1F', margin: 0, lineHeight: 1.6 }}>
            ⚠️ Este compañero virtual <strong>NO es un servicio de emergencias médicas</strong>.
            Si estás en peligro inmediato, llamá al <strong>107</strong> (SAME) o al <strong>911</strong>.
          </p>
        </div>

        {/* Urgentes */}
        <p style={{
          fontSize: 12, fontWeight: 600, marginBottom: 8, color: 'var(--t2)',
          textTransform: 'uppercase', letterSpacing: '.06em',
        }}>
          Líneas de crisis — 24 hs
        </p>
        {RESOURCES.filter(r => r.urgent).map(r => (
          <div key={r.id} style={{
            background: 'var(--bg2)', borderRadius: 10, padding: '12px 14px', marginBottom: 8,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 500, fontSize: 14, margin: 0 }}>{r.name}</p>
              <p style={{ fontSize: 12, color: 'var(--t2)', margin: '2px 0 0' }}>{r.description}</p>
            </div>
            {r.phone && (
              <a href={`tel:${r.phone}`} style={{
                background: '#A32020', color: '#fff', textDecoration: 'none',
                borderRadius: 8, padding: '8px 14px', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap',
              }}>
                📞 {r.phone}
              </a>
            )}
          </div>
        ))}

        {/* Bienestar UNCo */}
        <p style={{
          fontSize: 12, fontWeight: 600, margin: '14px 0 8px', color: 'var(--t2)',
          textTransform: 'uppercase', letterSpacing: '.06em',
        }}>
          Bienestar Estudiantil — UNCo
        </p>
        {RESOURCES.filter(r => !r.urgent).map(r => (
          <div key={r.id} style={{
            background: r.featured ? 'rgba(26,142,104,.08)' : 'var(--bg2)',
            border: r.featured ? '1px solid rgba(26,142,104,.3)' : '1px solid transparent',
            borderRadius: 10, padding: '12px 14px', marginBottom: 8,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p style={{ fontWeight: 600, fontSize: 14, margin: '0 0 3px' }}>{r.name}</p>
              {r.featured && (
                <span style={{ fontSize: 10, background: '#1A8E68', color: '#fff', borderRadius: 4, padding: '2px 7px', whiteSpace: 'nowrap' }}>
                  Principal
                </span>
              )}
            </div>
            <p style={{ fontSize: 12, color: 'var(--t2)', margin: '0 0 8px', lineHeight: 1.5 }}>{r.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {r.phone && <a href={`tel:${r.phone}`}      style={{ fontSize: 13, color: '#1A56A0', textDecoration: 'none', fontWeight: 500 }}>📞 {r.phone}</a>}
              {r.email && <a href={`mailto:${r.email}`}   style={{ fontSize: 13, color: '#1A56A0', textDecoration: 'none', fontWeight: 500 }}>✉ {r.email}</a>}
              {r.url   && <a href={r.url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#1A56A0', textDecoration: 'none', fontWeight: 500 }}>🌐 Sitio →</a>}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
