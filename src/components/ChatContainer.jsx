import { useState, useEffect, useRef, useCallback } from 'react';
import { DECISION_TREE }         from '../data/decisionTree';
import { useChatState }          from '../hooks/useChatState';
import ResourcesCard             from './ResourcesCard';
import BreathingExercise         from './techniques/BreathingExercise';
import FiveSensesExercise        from './techniques/FiveSensesExercise';
import ThoughtChallengeExercise  from './techniques/ThoughtChallenge';
import FiveMinuteTimer           from './techniques/FiveMinuteTimer';
import BrainDumpWidget           from './techniques/BrainDumpWidget';

/* ── Micro-componentes ─────────────────────────────────── */
const Avatar = () => (
  <div style={{
    width: 28, height: 28, borderRadius: '50%',
    background: 'linear-gradient(135deg,#1A8E68,#1A56A0)',
    flexShrink: 0, display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 13, marginTop: 2,
  }}>🤝</div>
);

const BotBubble = ({ text }) => (
  <div style={{
    background: 'var(--bg2)', borderRadius: '4px 12px 12px 12px',
    padding: '9px 13px', display: 'inline-block', maxWidth: '100%',
    fontSize: 14, lineHeight: 1.55,
  }}>
    {text}
  </div>
);

const CrisisBanner = () => (
  <div style={{
    background: '#FCEBEB', border: '1px solid #F09595',
    borderRadius: 8, padding: '8px 10px', marginBottom: 6,
  }}>
    <p style={{ fontSize: 12, color: '#A32020', margin: 0, fontWeight: 500 }}>
      ⚠️ Esto no es un servicio de emergencias.
      En peligro inmediato: <strong>107</strong> o <strong>911</strong>.
    </p>
  </div>
);

/* ── Componente principal ──────────────────────────────── */
export default function ChatContainer() {
  const { initialState, ready, persist, clear } = useChatState();

  const [messages,   setMessages]   = useState([]);
  const [node,       setNode]       = useState(null);
  const [typing,     setTyping]     = useState(false);
  const [activeTech, setActiveTech] = useState(null); // 'breathing'|'senses'|'thoughts'
  const [showTimer,  setShowTimer]  = useState(false);
  const [showDump,   setShowDump]   = useState(false);
  const [booted,     setBooted]     = useState(false);

  const endRef = useRef(null);
  const timers = useRef([]);

  const scroll = () =>
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);

  /* ── Multi-bubble sender ─────────────────────────────── */
  const sendNode = useCallback((n) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const texts = Array.isArray(n.botMessage) ? n.botMessage : [n.botMessage];
    let delay = 0;

    texts.forEach((text, i) => {
      const isLast = i === texts.length - 1;
      const dur    = Math.min(1400, 550 + text.length * 12);

      timers.current.push(setTimeout(() => setTyping(true), delay));
      delay += dur;

      timers.current.push(setTimeout(() => {
        setTyping(false);
        setMessages(prev => {
          const msg = {
            id:            Date.now() + i,
            type:          'bot',
            text,
            options:       isLast ? n.options      : null,
            isCrisis:      isLast ? !!n.isCrisis   : false,
            isResources:   isLast ? !!n.isResources: false,
            isTechnique:   isLast ? !!n.isTechnique: false,
            techniqueType: isLast ? n.techniqueType: null,
            isTimer:       isLast ? !!n.isTimer    : false,
            isBrainDump:   isLast ? !!n.isBrainDump: false,
            nodeId:        isLast ? n.id           : null,
          };
          const updated = [...prev, msg];
          if (isLast) persist(n.id, updated);
          return updated;
        });
        if (isLast) { setNode(n); scroll(); }
      }, delay));

      if (!isLast) delay += 220;
    });
    scroll();
  }, [persist]);

  /* ── Boot: restaurar estado guardado o arrancar de cero ─ */
  useEffect(() => {
    if (!ready || booted) return;
    setBooted(true);
    if (initialState) {
      setMessages(initialState.messages);
      setNode(DECISION_TREE[initialState.nodeId] ?? null);
    } else {
      sendNode(DECISION_TREE.start);
    }
  }, [ready, booted, initialState, sendNode]);

  /* ── Manejador de opciones ───────────────────────────── */
  const handleOption = useCallback((opt) => {
    const userMsg = { id: Date.now(), type: 'user', text: opt.label };

    if (opt.isTechniqueStart) {
      setMessages(prev => {
        const u = [...prev, userMsg];
        persist(node.id, u);
        return u;
      });
      setActiveTech(node.techniqueType);
      scroll();
      return;
    }

    if (opt.isTimerStart) {
      setMessages(prev => {
        const u = [...prev, userMsg];
        persist(node.id, u);
        return u;
      });
      setShowTimer(true);
      sendNode(DECISION_TREE.stress_procrastination_timer);
      return;
    }

    const next = DECISION_TREE[opt.next];
    if (!next) return;

    setMessages(prev => [...prev, userMsg]);

    if (next.isBrainDump) {
      sendNode(next);
      setTimeout(() => setShowDump(true), 1900);
    } else {
      sendNode(next);
    }
    scroll();
  }, [node, persist, sendNode]);

  /* ── Callbacks de widgets ────────────────────────────── */
  const onTechDone = () => {
    const key = `technique_${activeTech}_end`;
    setActiveTech(null);
    sendNode(DECISION_TREE[key] ?? DECISION_TREE.technique_breathing_end);
  };

  const onTimerDone = () => {
    setShowTimer(false);
    sendNode(DECISION_TREE.stress_procrastination_after);
  };

  const onDumpText = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text }]);
    scroll();
    // Mostrar nodo de tarea después del dump
    sendNode(DECISION_TREE.stress_brain_dump_go);
  };

  const onDumpTask = (text) => {
    setShowDump(false);
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text }]);
    sendNode(DECISION_TREE.stress_brain_dump_commit);
  };

  /* ── Reinicio de conversación ────────────────────────── */
  const restart = () => {
    timers.current.forEach(clearTimeout);
    setMessages([]);
    setNode(null);
    setActiveTech(null);
    setShowTimer(false);
    setShowDump(false);
    clear();
    setTimeout(() => sendNode(DECISION_TREE.start), 100);
  };

  /* ── Decisión de qué mostrar en el área de input ─────── */
  const lastBot  = [...messages].reverse().find(m => m.type === 'bot');
  const showOpts = !typing && lastBot?.options?.length > 0
                   && !activeTech && !showTimer && !showDump;

  if (!ready) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--t2)', fontSize: 14 }}>Cargando...</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Restart link */}
      {messages.length > 2 && (
        <div style={{ padding: '4px 14px 0', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={restart} style={{
            fontSize: 11, color: 'var(--t2)', background: 'transparent',
            border: 'none', cursor: 'pointer', padding: '4px 6px', fontFamily: 'inherit',
          }}>
            Nueva conversación
          </button>
        </div>
      )}

      {/* Mensajes */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px 0' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ marginBottom: 9 }}>
            {msg.type === 'bot' ? (
              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 5 }}>
                  <Avatar />
                  <div style={{ flex: 1 }}>
                    {msg.isCrisis    && <CrisisBanner />}
                    <BotBubble text={msg.text} />
                    {msg.isResources && <ResourcesCard />}
                  </div>
                </div>

                {/* Widgets de técnicas */}
                {msg.isTechnique && activeTech === msg.techniqueType && (
                  <div style={{
                    marginLeft: 36, background: 'var(--bg2)',
                    borderRadius: 12, padding: 12, marginBottom: 6,
                  }}>
                    {activeTech === 'breathing' && <BreathingExercise onComplete={onTechDone} />}
                    {activeTech === 'senses'    && <FiveSensesExercise onComplete={onTechDone} />}
                    {activeTech === 'thoughts'  && <ThoughtChallengeExercise onComplete={onTechDone} />}
                  </div>
                )}

                {/* Timer */}
                {msg.isTimer && showTimer && (
                  <div style={{
                    marginLeft: 36, background: 'var(--bg2)',
                    borderRadius: 12, padding: 12, marginBottom: 6,
                  }}>
                    <FiveMinuteTimer onComplete={onTimerDone} />
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: '#1A56A0', color: '#fff',
                  borderRadius: '12px 4px 12px 12px',
                  padding: '9px 13px', maxWidth: '82%',
                  fontSize: 14, lineHeight: 1.55,
                }}>
                  {msg.text}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <Avatar />
            <div style={{
              background: 'var(--bg2)', borderRadius: '4px 12px 12px 12px',
              padding: '10px 14px', display: 'flex', gap: 4,
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--t2)', display: 'inline-block',
                  animation: `bounce 1.2s ${i * .2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={endRef} style={{ height: 8 }} />
      </div>

      {/* Área de input */}
      {(showOpts || showDump) && (
        <div style={{
          padding: '10px 14px 14px',
          borderTop: '1px solid var(--b3)',
          background: 'var(--bg1)',
        }}>
          {showDump ? (
            <BrainDumpWidget onDumpDone={onDumpText} onTaskDone={onDumpTask} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {lastBot.options.map((opt, i) => (
                <button key={i} onClick={() => handleOption(opt)} style={{
                  textAlign: 'left', background: 'var(--bg2)',
                  border: '1px solid var(--b2)', borderRadius: 10,
                  padding: '10px 13px', fontSize: 14, cursor: 'pointer',
                  fontFamily: 'inherit', color: 'var(--t1)', lineHeight: 1.4,
                }}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%,60%,100% { transform: translateY(0); }
          30%          { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
