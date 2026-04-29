import React, { useState, useEffect, useRef } from 'react';
// Importación de componentes de técnicas y widgets (Rutas verificadas)
import BreathingExercise from '@/components/techniques/BreathingExercise.jsx';
import FiveSensesExercise from '@/components/techniques/FiveSensesExercise.jsx';
import ThoughtChallenge from '@/components/techniques/ThoughtChallenge.jsx';
import FiveMinuteTimer from '@/components/techniques/FiveMinuteTimer.jsx';
import BrainDumpWidget from '@/components/techniques/BrainDumpWidget.jsx';
import ResourcesCard from '@/components/ResourcesCard.jsx';

/**
 * ChatContainer - Motor de diálogo de Compañero UNCo.
 * @param {Object} tree - El objeto con el árbol de decisiones.
 * @param {string} startNodeId - El ID del nodo donde debe arrancar la conversación.
 */
const ChatContainer = ({ tree, startNodeId = 'start' }) => {
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  /**
   * ESCUCHA DE NAVEGACIÓN:
   * Cada vez que 'startNodeId' cambia (desde la Home o la Nav), 
   * reseteamos el chat y procesamos el nuevo nodo inicial.
   */
  useEffect(() => {
    if (tree && startNodeId) {
      // Limpiamos el buffer de mensajes para iniciar una sesión nueva
      setMessages([]); 
      
      const nodeToProcess = tree[startNodeId];
      if (nodeToProcess) {
        processNode(nodeToProcess);
      } else {
        console.error(`IQ Error: El nodo '${startNodeId}' no existe en el árbol.`);
        processNode(tree.start); // Fallback de seguridad
      }
    }
  }, [startNodeId, tree]);

  // Gestión de scroll automático
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /**
   * Procesa un nodo del árbol, manejando mensajes múltiples con delays
   * y activando las banderas de UI correspondientes.
   */
  const processNode = async (node) => {
    if (!node) return;
    setCurrentNode(node);
    
    const botMessages = Array.isArray(node.botMessage) ? node.botMessage : [node.botMessage];
    
    for (let i = 0; i < botMessages.length; i++) {
      setIsTyping(true);
      
      // Delay dinámico basado en longitud de texto
      const delay = Math.min(Math.max(botMessages[i].length * 15, 600), 1500);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      setIsTyping(false);
      
      // Solo el último mensaje de la secuencia adjunta el nodo para disparar widgets
      const isLastMessage = i === botMessages.length - 1;
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: botMessages[i], 
        node: isLastMessage ? node : null 
      }]);
    }
  };

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);
    const nextNode = tree[option.next];
    if (nextNode) {
      processNode(nextNode);
    } else {
      console.warn(`Node '${option.next}' not found in decision tree.`);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg1)' }}>
      
      {/* Área de Visualización de Mensajes */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '20px 16px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px' 
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ width: '100%' }}>
            <div style={{
              display: 'flex',
              justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                fontSize: '14.5px',
                lineHeight: '1.5',
                background: msg.type === 'user' ? '#1A56A0' : 'var(--bg2)',
                color: msg.type === 'user' ? 'white' : 'var(--t1)',
                border: msg.type === 'bot' ? '1px solid var(--b3)' : 'none',
                boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
              }}>
                {msg.text}
              </div>
            </div>

            {/* ACTUADORES DE BANDERAS 2.0 */}
            {msg.type === 'bot' && msg.node && (
              <div style={{ marginTop: '12px', width: '100%' }}>
                
                {/* 1. Recursos y Crisis */}
                {(msg.node.isResources || msg.node.isCrisis) && (
                  <ResourcesCard isUrgent={msg.node.isCrisis} />
                )}

                {/* 2. Técnicas TCC */}
                {msg.node.isTechnique && (
                  <div style={{ padding: '4px 0' }}>
                    {msg.node.techniqueType === 'breathing' && (
                      <BreathingExercise onComplete={() => handleOptionClick({ label: 'Terminé', next: 'technique_breathing_end' })} />
                    )}
                    {msg.node.techniqueType === 'senses' && (
                      <FiveSensesExercise onComplete={() => handleOptionClick({ label: 'Terminé', next: 'technique_5senses_end' })} />
                    )}
                    {msg.node.techniqueType === 'thoughts' && (
                      <ThoughtChallenge onComplete={() => handleOptionClick({ label: 'Hecho', next: 'technique_thoughts_end' })} />
                    )}
                  </div>
                )}

                {/* 3. Timer */}
                {msg.node.isTimer && (
                  <FiveMinuteTimer onComplete={() => processNode(tree.stress_procrastination_after)} />
                )}

                {/* 4. Brain Dump */}
                {msg.node.isBrainDump && (
                  <BrainDumpWidget onComplete={() => handleOptionClick({ label: 'Ya lo anoté', next: 'stress_brain_dump_go' })} />
                )}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div style={{ fontSize: '12px', color: 'var(--t2)', marginLeft: '8px', fontStyle: 'italic' }}>
            Compañero está escribiendo...
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Panel de Opciones */}
      {!isTyping && currentNode?.options && currentNode.options.length > 0 && (
        <div style={{
          padding: '16px',
          background: 'var(--bg1)',
          borderTop: '1px solid var(--b3)',
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
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid var(--b3)',
                background: 'var(--bg1)',
                color: 'var(--t1)',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.1s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg1)'}
            >
              {opt.label}
              <span style={{ opacity: 0.3, fontSize: '10px' }}>→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
