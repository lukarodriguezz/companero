import { useState } from 'react';
import { S } from '../../utils/styles';

const STEPS = [
  { label: 'El pensamiento',          key: 'thought',          q: '¿Cuál es el pensamiento negativo que tenés?',                               hint: 'Escribilo exactamente como aparece, sin editarlo.',          ph: "Ej: 'No voy a aprobar nunca'" },
  { label: 'Evidencia a favor',       key: 'evidence_for',     q: '¿Qué evidencias concretas tenés A FAVOR de ese pensamiento?',               hint: 'Solo hechos concretos, no interpretaciones.',                ph: "Ej: 'Saqué mal en el último parcial'" },
  { label: 'Evidencia en contra',     key: 'evidence_against', q: '¿Qué evidencias tenés EN CONTRA de ese pensamiento?',                      hint: 'Este paso cuesta, pero es el más importante.',               ph: "Ej: 'Aprobé 6 materias este año'" },
  { label: 'Pensamiento alternativo', key: 'alternative',      q: '¿Cuál sería un pensamiento más equilibrado y realista?',                   hint: 'No tiene que ser positivo forzado — solo honesto.',         ph: "Ej: 'Tuve dificultades pero tengo recursos'" },
];

export default function ThoughtChallengeExercise({ onComplete }) {
  const [idx,     setIdx]     = useState(0);
  const [answers, setAnswers] = useState({});
  const [input,   setInput]   = useState('');

  const cur    = STEPS[idx];
  const isLast = idx === STEPS.length - 1;

  const next = () => {
    if (!input.trim()) return;
    const na = { ...answers, [cur.key]: input.trim() };
    setAnswers(na);
    setInput('');
    isLast ? setIdx(STEPS.length) : setIdx(i => i + 1);
  };

  if (idx >= STEPS.length) return (
    <div>
      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Tu registro:</p>
      {STEPS.map(s => (
        <div key={s.key} style={{ marginBottom: 8, padding: '8px 10px', background: 'var(--bg1)',
          borderRadius: 8, border: '1px solid var(--b3)' }}>
          <p style={{ fontSize: 11, color: 'var(--t2)', margin: '0 0 2px',
            textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</p>
          <p style={{ fontSize: 13, margin: 0 }}>{answers[s.key]}</p>
        </div>
      ))}
      <button onClick={onComplete} style={{ ...S.btn('#1A8E68'), width: '100%', marginTop: 8 }}>
        Continuar
      </button>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2,
            background: i < idx ? '#1A8E68' : i === idx ? '#1A56A0' : 'var(--b3)' }} />
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--t2)', textTransform: 'uppercase',
        letterSpacing: '.05em', margin: '0 0 4px' }}>Paso {idx + 1} — {cur.label}</p>
      <p style={{ fontWeight: 500, fontSize: 14, margin: '0 0 3px' }}>{cur.q}</p>
      <p style={{ fontSize: 12, color: 'var(--t2)', margin: '0 0 8px' }}>{cur.hint}</p>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={cur.ph}
        rows={3}
        style={{ width: '100%', fontFamily: 'inherit', fontSize: 13, padding: '8px 10px',
          borderRadius: 8, border: '1px solid var(--b2)', background: 'var(--bg1)',
          color: 'var(--t1)', resize: 'vertical', boxSizing: 'border-box' }}
      />
      <button
        onMouseDown={e => e.preventDefault()} /* evita que el textarea pierda focus y bloquee el click */
        onClick={next}
        disabled={!input.trim()}
        style={{ ...S.btn(input.trim() ? '#1A56A0' : null), width: '100%', marginTop: 8 }}
      >
        {isLast ? 'Ver mi registro' : 'Siguiente →'}
      </button>
    </div>
  );
}
