import { useState } from 'react';
import { useMoodHistory } from '../hooks/useMoodHistory';
import { S } from '../utils/styles';

const MOOD_OPTIONS = [
  { value: 1, emoji: '😔', label: 'Muy mal',  color: '#C94040' },
  { value: 2, emoji: '😟', label: 'Mal',      color: '#D4832A' },
  { value: 3, emoji: '😐', label: 'Regular',  color: '#7A7A74' },
  { value: 4, emoji: '🙂', label: 'Bien',     color: '#5A8F1A' },
  { value: 5, emoji: '😊', label: 'Muy bien', color: '#1A8E68' },
];

const fmtDate = d =>
  new Date(d + 'T12:00:00').toLocaleDateString('es-AR', {
    weekday: 'short', day: 'numeric', month: 'short',
  });

export default function MoodTracker() {
  const { history, loading, saveEntry, todayEntry } = useMoodHistory();
  const [sel,   setSel]   = useState(null);
  const [note,  setNote]  = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!sel) return;
    const ok = await saveEntry(sel, note);
    if (ok) {
      setSaved(true);
      setNote('');
      setSel(null);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div style={{ padding: 16 }}>

      {/* ── Check-in de hoy ── */}
      <div style={S.card()}>
        <p style={{ fontWeight: 600, fontSize: 15, margin: '0 0 3px' }}>¿Cómo estás hoy?</p>
        {todayEntry && (
          <p style={{ fontSize: 12, color: '#1A8E68', margin: '0 0 10px' }}>
            ✓ Ya registraste hoy — podés actualizar si querés.
          </p>
        )}

        {/* Emojis */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          {MOOD_OPTIONS.map(m => (
            <button
              key={m.value}
              onMouseDown={e => e.preventDefault()} /* evita que el textarea robe el foco */
              onClick={() => setSel(m.value)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                background: sel === m.value ? m.color + '22' : 'transparent',
                border: `2px solid ${sel === m.value ? m.color : 'transparent'}`,
                borderRadius: 10, padding: '8px 2px', cursor: 'pointer', minWidth: 52,
                transition: 'all .15s',
              }}
            >
              <span style={{ fontSize: 26 }}>{m.emoji}</span>
              <span style={{
                fontSize: 10,
                color: sel === m.value ? m.color : 'var(--t2)',
                fontWeight: sel === m.value ? 600 : 400,
              }}>
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {/* Nota opcional — el textarea NO bloquea el botón */}
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="¿Querés agregar una nota? (opcional)"
          rows={2}
          style={{
            width: '100%', fontFamily: 'inherit', fontSize: 13,
            padding: '8px 10px', borderRadius: 8,
            border: '1px solid var(--b2)', background: 'var(--bg1)',
            color: 'var(--t1)', resize: 'none', boxSizing: 'border-box', marginBottom: 10,
          }}
        />

        {/*
          FIX clave: onMouseDown + preventDefault evita que al hacer click en
          el botón el textarea dispare un blur que desmonte el foco y bloquee
          el onClick nativo del botón. Solución estándar para este patrón.
        */}
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={handleSave}
          disabled={!sel}
          style={{
            ...S.btn(sel ? '#1A8E68' : null),
            width: '100%', borderRadius: 10, padding: '12px',
            transition: 'all .15s',
          }}
        >
          {saved ? '✓ Guardado' : 'Guardar registro'}
        </button>
      </div>

      {/* ── Historial ── */}
      <p style={{ fontWeight: 600, fontSize: 15, margin: '4px 0 10px' }}>Últimos registros</p>

      {loading && (
        <p style={{ fontSize: 13, color: 'var(--t2)', textAlign: 'center', padding: '20px 0' }}>
          Cargando...
        </p>
      )}

      {!loading && history.length === 0 && (
        <p style={{ fontSize: 13, color: 'var(--t2)', textAlign: 'center', padding: '20px 0' }}>
          Todavía no hay registros. ¡Empezá hoy!
        </p>
      )}

      {!loading && history.length > 0 && (
        <>
          {/* Mini barchart — últimos 14 días */}
          <div style={S.card({ marginBottom: 12 })}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 48 }}>
              {[...history].reverse().slice(0, 14).map((e, i) => {
                const m = MOOD_OPTIONS.find(o => o.value === e.value);
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{
                      width: '100%', background: m?.color ?? '#888',
                      borderRadius: 3, height: `${(e.value / 5) * 38}px`, minHeight: 4,
                    }} />
                    <span style={{ fontSize: 9, color: 'var(--t2)' }}>
                      {new Date(e.date + 'T12:00:00').getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lista */}
          {history.slice(0, 10).map(e => {
            const m = MOOD_OPTIONS.find(o => o.value === e.value);
            return (
              <div key={e.date} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', background: 'var(--bg2)',
                borderRadius: 10, marginBottom: 6,
              }}>
                <span style={{ fontSize: 22 }}>{m?.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: 13, color: m?.color }}>{m?.label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--t2)' }}>{fmtDate(e.date)}</p>
                  {e.note && (
                    <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--t2)' }}>{e.note}</p>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
