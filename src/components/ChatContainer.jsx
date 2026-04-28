import React, { useState, useEffect, useRef } from 'react';
// Importamos los widgets que ya tenés en la carpeta components
import BreathingExercise from './BreathingExercise';
import FiveSensesExercise from './FiveSensesExercise';
import ThoughtChallenge from './ThoughtChallenge';
import FiveMinuteTimer from './FiveMinuteTimer';
import BrainDumpWidget from './BrainDumpWidget';

const ChatContainer = ({ tree }) => {
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Inicializar el chat
  useEffect(() => {
    if (tree && tree.start) {
      processNode(tree.start);
    }
  }, [tree]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const processNode = async (node) => {
    setCurrentNode(node);
    const botMessages = Array.isArray(node.botMessage) ? node.botMessage : [node.botMessage];
    
    for (const text of botMessages) {
      setIsTyping(true);
      // Simulamos latencia de respuesta para mayor naturalidad
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text, node }]);
    }
  };

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);
    const nextNode = tree[option.next];
    if (nextNode) {
      processNode(nextNode);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--color-background-primary)' }}>
      {/* Área de mensajes */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: '16px',
                fontSize: '14px',
                lineHeight: '1.4',
                background: msg.type === 'user' ? '#1A56A0' : 'var(--color-background-secondary)',
                color: msg.type === 'user' ? 'white' : 'var(--color-text-primary)',
                border: msg.type === 'bot' ? '1px solid var(--color-border-tertiary)' : 'none'
              }}>
                {msg.text}
              </div>
            </div>

            {/* Renderizado de Widgets según banderas del árbol v2.0 */}
            {msg.type === 'bot' && msg.node && (
              <div style={{ marginTop: '12px' }}>
                {msg.node.isTechnique && msg.node.techniqueType === 'breathing' && (
                  <BreathingExercise onComplete={() => handleOptionClick({ label: 'Terminé', next: 'technique_breathing_end' })} />
                )}
                
                {msg.node.isTechnique && msg.node.techniqueType === 'senses' && (
                  <FiveSensesExercise onComplete={() => handleOptionClick({ label: 'Terminé', next: 'technique_5senses_end' })} />
                )}

                {msg.node.isTechnique && msg.node.techniqueType === 'thoughts' && (
                  <ThoughtChallenge onComplete={() => handleOptionClick({ label: 'Hecho', next: 'technique_thoughts_end' })} />
                )}

                {msg.node.isTimer && (
                  <FiveMinuteTimer onComplete={() => processNode(tree.stress_procrastination_after)} />
                )}

                {msg.node.isBrainDump && (
                  <BrainDumpWidget onComplete={() => handleOptionClick({ label: 'Ya lo anoté', next: 'stress_brain_dump_go' })} />
                )}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginLeft: '8px', marginBottom: '16px' }}>
            Escribiendo...
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Selector de Opciones */}
      {!isTyping && currentNode?.options && currentNode.options.length > 0 && (
        <div style={{
          padding: '16px',
          background: 'var(--color-background-primary)',
          borderTop: '1px solid var(--color-border-tertiary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {currentNode.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid var(--color-border-secondary)',
                background: 'white',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-background-secondary)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'white'}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
