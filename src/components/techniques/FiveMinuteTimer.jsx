import { useState, useEffect } from 'react';
import { S } from '../../utils/styles';

export default function FiveMinuteTimer({ onComplete }) {
  const [secs,    setSecs]    = useState(300);
  const [started, setStarted] = useState(false);
  const [done,    setDone]    = useState(false);

  useEffect(() => {
    if (!started || done) return;
    if (secs <= 0) { setDone(true); return; }
    const t = setTimeout(() => setSecs(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, secs, done]);

  const mins = Math.floor(secs / 60);
  const sec  = secs % 60;
  const prog = (300 - secs) / 300;
  const C    = 2 * Math.PI * 54;

  if (done) return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <div style={{ fontSize: 34, marginBottom: 8 }}>⏱</div>
      <p style={{ fontWeight: 600, margin: '0 0 4px' }}>¡Cinco minutos cumplidos!</p>
      <p style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 14 }}>¿Cómo estás?</p>
      <button onClick={onComplete} style={S.btn('#1A8E68')}>Decirle al bot</button>
    </div>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      {!started ? (
        <>
          <p style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 12 }}>
            Cuando estés listo/a, arrancá el timer y empezá a estudiar.
          </p>
          <button onClick={() => setStarted(true)} style={S.btn('#1A56A0')}>
            Iniciar 5 minutos
          </button>
        </>
      ) : (
        <>
          <svg width="120" height="120" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r="54" fill="none" stroke="var(--b3)" strokeWidth="6" />
            <circle cx="65" cy="65" r="54" fill="none" stroke="#1A56A0" strokeWidth="6"
              strokeDasharray={C} strokeDashoffset={C * (1 - prog)} strokeLinecap="round"
              transform="rotate(-90 65 65)"
              style={{ transition: 'stroke-dashoffset 1s linear' }} />
            <text x="65" y="60" textAnchor="middle" fontSize="24" fontWeight="600" fill="var(--t1)">
              {mins}:{sec.toString().padStart(2, '0')}
            </text>
            <text x="65" y="78" textAnchor="middle" fontSize="12" fill="var(--t2)">estudiando</text>
          </svg>
          <p style={{ fontSize: 12, color: 'var(--t2)', marginTop: 8 }}>
            Enfocate. Yo aviso cuando termine.
          </p>
          <button onClick={onComplete} style={{ ...S.btnOutline(), marginTop: 10, fontSize: 12 }}>
            Terminé antes
          </button>
        </>
      )}
    </div>
  );
}
