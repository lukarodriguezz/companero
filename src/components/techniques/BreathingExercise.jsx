import { useState, useEffect, useRef } from 'react';
import { S } from '../../utils/styles';

const PHASES = [
  { name: 'inhale', label: 'Inhalá',  dur: 4, color: '#1A8E68', hint: 'Respirá profundo por la nariz' },
  { name: 'hold',   label: 'Retené',  dur: 7, color: '#1A56A0', hint: 'Retené el aire' },
  { name: 'exhale', label: 'Exhalá',  dur: 8, color: '#B07010', hint: 'Soltá despacio por la boca' },
];
const TOTAL = 3;

export default function BreathingExercise({ onComplete }) {
  const [phase, setPhase]       = useState('ready');
  const [count, setCount]       = useState(0);
  const [cycle, setCycle]       = useState(0);
  const [progress, setProgress] = useState(0);
  const tRef = useRef(null);

  useEffect(() => {
    if (phase === 'ready' || phase === 'done') return;
    const pd = PHASES.find(p => p.name === phase);
    if (!pd) return;
    setProgress((pd.dur - count) / pd.dur);
    if (count <= 0) {
      const idx  = PHASES.findIndex(p => p.name === phase);
      const next = PHASES[idx + 1];
      if (next) { setPhase(next.name); setCount(next.dur); }
      else {
        const nc = cycle + 1;
        if (nc >= TOTAL) { setPhase('done'); }
        else { setCycle(nc); setPhase('inhale'); setCount(4); }
      }
      return;
    }
    tRef.current = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(tRef.current);
  }, [phase, count, cycle]);

  const pd = PHASES.find(p => p.name === phase);
  const C  = 2 * Math.PI * 54;

  if (phase === 'done') return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <div style={{ fontSize: 38, marginBottom: 8 }}>✓</div>
      <p style={{ fontWeight: 600, margin: '0 0 4px' }}>¡Tres ciclos completos!</p>
      <p style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 14 }}>Tu sistema nervioso debería estar más tranquilo.</p>
      <button onClick={onComplete} style={S.btn('#1A8E68')}>Continuar</button>
    </div>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      {phase === 'ready' ? (
        <>
          <p style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 10 }}>Encontrá una posición cómoda. Tres ciclos.</p>
          <div style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 14 }}>🌬 4s &nbsp;·&nbsp; ⏸ 7s &nbsp;·&nbsp; 💨 8s</div>
          <button onClick={() => { setPhase('inhale'); setCount(4); }} style={S.btn('#1A8E68')}>Empezar</button>
        </>
      ) : (
        <>
          <p style={{ fontSize: 11, color: 'var(--t2)', marginBottom: 4 }}>Ciclo {cycle + 1} de {TOTAL}</p>
          <svg width="120" height="120" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r="54" fill="none" stroke="var(--b3)" strokeWidth="6" />
            <circle cx="65" cy="65" r="54" fill="none" stroke={pd?.color} strokeWidth="6"
              strokeDasharray={C} strokeDashoffset={C * (1 - progress)} strokeLinecap="round"
              transform="rotate(-90 65 65)"
              style={{ transition: 'stroke-dashoffset .9s linear, stroke .3s' }} />
            <text x="65" y="58" textAnchor="middle" fontSize="26" fontWeight="600" fill={pd?.color}>{count}</text>
            <text x="65" y="77" textAnchor="middle" fontSize="13" fill="var(--t2)">{pd?.label}</text>
          </svg>
          <p style={{ fontSize: 13, color: 'var(--t2)', marginTop: 8 }}>{pd?.hint}</p>
        </>
      )}
    </div>
  );
}
