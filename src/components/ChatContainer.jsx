import React, { useState, useEffect, useRef } from 'react';
// Imports con Alias @ y rutas exactas según tu find .
import BreathingExercise from '@/components/techniques/BreathingExercise.jsx';
import FiveSensesExercise from '@/components/techniques/FiveSensesExercise.jsx';
import ThoughtChallenge from '@/components/techniques/ThoughtChallenge.jsx';
import FiveMinuteTimer from '@/components/techniques/FiveMinuteTimer.jsx';
import BrainDumpWidget from '@/components/techniques/BrainDumpWidget.jsx';
import ResourcesCard from '@/components/ResourcesCard.jsx';

const ChatContainer = ({ tree }) => {
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!tree) {
      console.error("IQ Error: DECISION_TREE no inyectado en ChatContainer");
      return;
    }
    if (messages.length === 0) processNode(tree.start);
  }, [tree]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const processNode = async (node) => {
    if (!node) return;
    setCurrentNode(node);
    
    const botMessages = Array.isArray(node.botMessage) ? node.botMessage : [node.botMessage];
    
    for (const text of botMessages) {
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 700)); // Latencia humana calculada
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text, node }]);
    }
  };

  const handleOption = (option) => {
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);
    const nextNode = tree[option.next];
    if (nextNode) processNode(nextNode);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg1)' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '85%', padding: '12px 16px', borderRadius: '16px', fontSize: '14px',
                background: msg.type === 'user' ? '#1A56A0' : 'var(--bg2)',
                color: msg.type === 'user' ? 'white' : 'var(--t1)',
                border: msg.type === 'bot' ? '1px solid var(--b3)' : 'none'
              }}>
                {msg.text}
              </div>
            </div>

            {/* ACTUADORES DE BANDERAS 2.0 */}
            {msg.type === 'bot' && msg.node && (
              <div style={{ marginTop: '12px' }}>
                {/* 1. Técnicas TCC */}
                {msg.node.isTechnique && msg.node.techniqueType === 'breathing' && (
                  <BreathingExercise onComplete={() => handleOption({ label: 'Terminé', next: 'technique_breathing_end' })} />
                )}
                {msg.node.isTechnique && msg.node.techniqueType === 'senses' && (
                  <FiveSensesExercise onComplete={() => handleOption({ label: 'Terminé', next: 'technique_5senses_end' })} />
                )}
                {msg.node.isTechnique && msg.node.techniqueType === 'thoughts' && (
                  <ThoughtChallenge onComplete={() => handleOption({ label: 'Hecho', next: 'technique_thoughts_end' })} />
                )}

                {/* 2. Timer de Procrastinación */}
                {msg.node.isTimer && (
                  <FiveMinuteTimer onComplete={() => processNode(tree.stress_procrastination_after)} />
                )}

                {/* 3. Brain Dump (Agobio) */}
                {msg.node.isBrainDump && (
                  <BrainDumpWidget onComplete={() => handleOption({ label: 'Ya lo anoté', next: 'stress_brain_dump_go' })} />
                )}

                {/* 4. Recursos (El que faltaba) */}
                {(msg.node.isResources || msg.node.isCrisis) && (
                  <ResourcesCard isUrgent={msg.node.isCrisis} />
                )}
              </div>
            )}
          </div>
        ))}
        {isTyping && <div style={{ fontSize: '12px', color: 'var(--t2)', marginLeft: '8px' }}>Escribiendo...</div>}
        <div ref={scrollRef} />
      </div>

      {/* Selector de Opciones */}
      {!isTyping && currentNode?.options?.length > 0 && (
        <div style={{ padding: '16px', background: 'var(--bg1)', borderTop: '1px solid var(--b3)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {currentNode.options.map((opt, i) => (
            <button key={i} onClick={() => handleOption(opt)} style={{
              width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--b3)',
              background: 'var(--bg1)', textAlign: 'left', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
            }}>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
