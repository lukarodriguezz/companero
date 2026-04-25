import { useState } from 'react';
import { S } from '../../utils/styles';

export default function BrainDumpWidget({ onDumpDone, onTaskDone }) {
  const [phase, setPhase] = useState('dump');
  const [dump,  setDump]  = useState('');
  const [task,  setTask]  = useState('');

  if (phase === 'dump') return (
    <div>
      <textarea
        value={dump}
        onChange={e => setDump(e.target.value)}
        autoFocus
        placeholder="Todo lo que te tiene harto/a... escribí acá. Sin filtro."
        rows={5}
        style={{
          width: '100%', fontFamily: 'inherit', fontSize: 13,
          padding: '10px 12px', borderRadius: 10,
          border: '1px solid var(--b2)', background: 'var(--bg1)',
          color: 'var(--t1)', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6,
        }}
      />
      <button
        onMouseDown={e => e.preventDefault()} /* evita que el textarea robe el foco y bloquee onClick */
        onClick={() => { if (dump.trim()) { onDumpDone(dump.trim()); setPhase('task'); } }}
        disabled={!dump.trim()}
        style={{ ...S.btn(dump.trim() ? '#1A56A0' : null), width: '100%', marginTop: 8 }}
      >
        Listo, lo saqué afuera
      </button>
    </div>
  );

  return (
    <div>
      <p style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 8, lineHeight: 1.5 }}>
        De todo lo que escribiste, ¿cuál es la{' '}
        <strong style={{ color: 'var(--t1)' }}>única cosa</strong> que podés hacer en 5 minutos?
      </p>
      <textarea
        value={task}
        onChange={e => setTask(e.target.value)}
        autoFocus
        rows={2}
        placeholder="Ej: 'Abrir la guía de ejercicios'"
        style={{
          width: '100%', fontFamily: 'inherit', fontSize: 13,
          padding: '10px 12px', borderRadius: 10,
          border: '1px solid var(--b2)', background: 'var(--bg1)',
          color: 'var(--t1)', resize: 'none', boxSizing: 'border-box',
        }}
      />
      <button
        onMouseDown={e => e.preventDefault()}
        onClick={() => { if (task.trim()) onTaskDone(task.trim()); }}
        disabled={!task.trim()}
        style={{ ...S.btn(task.trim() ? '#1A8E68' : null), width: '100%', marginTop: 8 }}
      >
        Esa es
      </button>
    </div>
  );
}
