import { useState } from 'react';
import { S } from '../../utils/styles';

const STEPS = [
  { sense: 'Vista',  emoji: '👁', count: 5, hint: 'Nombrá 5 cosas que podés VER ahora mismo.',                        color: '#1A56A0' },
  { sense: 'Tacto',  emoji: '✋', count: 4, hint: 'Nombrá 4 cosas que podés SENTIR físicamente (ropa, silla, piso).', color: '#1A8E68' },
  { sense: 'Oído',   emoji: '👂', count: 3, hint: 'Nombrá 3 sonidos que podés ESCUCHAR ahora.',                      color: '#B07010' },
  { sense: 'Olfato', emoji: '👃', count: 2, hint: 'Nombrá 2 cosas que podés OLER, aunque sea sutil.',                color: '#8A2560' },
  { sense: 'Gusto',  emoji: '👅', count: 1, hint: 'Nombrá 1 sabor que sentís o el último que recordás.',             color: '#4A30A8' },
];

export default function FiveSensesExercise({ onComplete }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (done) return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <div style={{ fontSize: 30, marginBottom: 8 }}>🌿</div>
      <p style={{ fontWeight: 600, margin: '0 0 4px' }}>Estás en el presente</p>
      <p style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 14 }}>Interrumpiste el loop de ansiedad.</p>
      <button onClick={onComplete} style={S.btn('#1A8E68')}>Continuar</button>
    </div>
  );

  const cur = STEPS[step];
  return (
    <div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2,
            background: i <= step ? cur.color : 'var(--b3)', transition: 'background .3s' }} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 30 }}>{cur.emoji}</span>
        <p style={{ fontWeight: 500, fontSize: 15, margin: '6px 0 4px', color: cur.color }}>{cur.count} — {cur.sense}</p>
        <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.5 }}>{cur.hint}</p>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} style={S.btnOutline()}>← Anterior</button>
        )}
        <button
          onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : setDone(true)}
          style={S.btn(cur.color)}
        >
          {step < STEPS.length - 1 ? 'Listo →' : 'Terminé'}
        </button>
      </div>
    </div>
  );
}
