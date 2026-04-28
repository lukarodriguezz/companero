import { RESOURCES } from "@/config/resources.js";

export default function ResourcesCard() {
  return (
    <div style={{ margin: '8px 0' }}>

      {/* ── Urgentes ── */}
      <p style={{
        fontSize: 11, fontWeight: 600, marginBottom: 8, color: 'var(--t2)',
        textTransform: 'uppercase', letterSpacing: '.06em',
      }}>
        Líneas urgentes — 24 hs
      </p>

      {RESOURCES.filter(r => r.urgent).map(r => (
        <div key={r.id} style={{
          background: 'var(--bg1)', border: '1px solid var(--b3)',
          borderRadius: 10, padding: '10px 12px', marginBottom: 6,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 500, fontSize: 13, margin: 0 }}>{r.name}</p>
            <p style={{ fontSize: 11, color: 'var(--t2)', margin: '2px 0 0' }}>{r.description}</p>
          </div>
          {r.phone && (
            <a href={`tel:${r.phone}`} style={{
              background: '#A32020', color: '#fff', textDecoration: 'none',
              borderRadius: 8, padding: '6px 10px', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap',
            }}>
              {r.phone}
            </a>
          )}
        </div>
      ))}

      {/* ── Bienestar UNCo ── */}
      <p style={{
        fontSize: 11, fontWeight: 600, margin: '12px 0 8px', color: 'var(--t2)',
        textTransform: 'uppercase', letterSpacing: '.06em',
      }}>
        Bienestar UNCo
      </p>

      {RESOURCES.filter(r => !r.urgent).map(r => (
        <div key={r.id} style={{
          background: r.featured ? 'rgba(26,142,104,.08)' : 'var(--bg1)',
          border: r.featured ? '1px solid rgba(26,142,104,.3)' : '1px solid var(--b3)',
          borderRadius: 10, padding: '10px 12px', marginBottom: 6,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ fontWeight: 600, fontSize: 13, margin: '0 0 2px' }}>{r.name}</p>
            {r.featured && (
              <span style={{ fontSize: 10, background: '#1A8E68', color: '#fff', borderRadius: 4, padding: '2px 6px', whiteSpace: 'nowrap' }}>
                UNCo
              </span>
            )}
          </div>
          <p style={{ fontSize: 11, color: 'var(--t2)', margin: '0 0 6px', lineHeight: 1.4 }}>{r.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {r.phone && <a href={`tel:${r.phone}`}      style={{ fontSize: 12, color: '#1A56A0', textDecoration: 'none', fontWeight: 500 }}>📞 {r.phone}</a>}
            {r.email && <a href={`mailto:${r.email}`}   style={{ fontSize: 12, color: '#1A56A0', textDecoration: 'none', fontWeight: 500 }}>✉ {r.email}</a>}
            {r.url   && <a href={r.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#1A56A0', textDecoration: 'none' }}>🌐 Web →</a>}
          </div>
        </div>
      ))}

    </div>
  );
}
