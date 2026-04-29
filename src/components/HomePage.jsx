import React, { useState, useEffect } from 'react';
// Importamos los tips desde el archivo de configuración
import { TIPS } from '@/config/tips.js';

/**
 * HomePage - Versión Final Blindada
 * Orquestador de entrada que mezcla widgets informativos y acciones de control.
 */
const HomePage = ({ onNavigate, onOpenPanic }) => {
  const [dailyTip, setDailyTip] = useState("");

  // Selección aleatoria del dato del día al montar el componente
  useEffect(() => {
    if (TIPS && TIPS.length > 0) {
      const randomIndex = Math.floor(Math.random() * TIPS.length);
      setDailyTip(TIPS[randomIndex]);
    }
  }, []);

  /**
   * Definición de Acciones Principales
   * Estructura de datos limpia para renderizado dinámico.
   */
  const ACTIONS = [
    {
      id: 'chat_start',
      title: 'Hablar con mi compañero',
      desc: 'Inicia un diálogo guiado para desahogarte o buscar apoyo.',
      icon: '💬',
      color: '#1A56A0', // Azul Institucional
      action: () => onNavigate('chat', 'start')
    },
    {
      id: 'chat_tech',
      title: 'Aprender técnicas',
      desc: 'Herramientas rápidas para ansiedad, agobio o crisis.',
      icon: '🧠',
      color: '#1A8E68', // Verde Bienestar
      action: () => onNavigate('chat', 'techniques_menu')
    },
    {
      id: 'mood_reg',
      title: 'Registrar cómo me siento',
      desc: 'Llevá un seguimiento de tu evolución emocional semanal.',
      icon: '📊',
      color: '#6366f1', // Indigo Visualización
      action: () => onNavigate('mood')
    },
    {
      id: 'sos_direct',
      title: 'S.O.S',
      desc: 'Líneas de emergencia y ayuda inmediata 24hs.',
      icon: '🆘',
      color: '#A32020', // Rojo Alerta
      isUrgent: true,
      action: () => onOpenPanic()
    }
  ];

  return (
    <div style={{
      padding: '28px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      
      {/* ── SECCIÓN 1: BIENVENIDA ── */}
      <header>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          margin: '0 0 8px 0', 
          color: 'var(--t1)',
          letterSpacing: '-0.02em'
        }}>
          Hola, Luka 🤝
        </h1>
        <p style={{ 
          fontSize: '15px', 
          color: 'var(--t2)', 
          lineHeight: '1.5',
          margin: 0,
          fontWeight: 500
        }}>
          Bienvenido a tu espacio de apoyo emocional en la UNCo.
        </p>
      </header>

      {/* ── SECCIÓN 2: WIDGET DINÁMICO (Dato del día) ── */}
      {dailyTip && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(26,142,104,0.08) 0%, rgba(26,86,160,0.08) 100%)',
          padding: '20px',
          borderRadius: '20px',
          border: '1px solid var(--b3)',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontSize: '26px' }}>💡</span>
          <div>
            <p style={{ 
              margin: '0 0 6px 0', 
              fontWeight: 800, 
              fontSize: '12px', 
              color: '#1A8E68',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              Dato del día
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              color: 'var(--t1)', 
              lineHeight: '1.5',
              fontWeight: 500
            }}>
              {dailyTip}
            </p>
          </div>
        </div>
      )}

      {/* ── SECCIÓN 3: ACCIONES TRONCALES ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <p style={{ 
          fontSize: '12px', 
          fontWeight: 700, 
          color: 'var(--t2)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.06em',
          marginLeft: '4px'
        }}>
          ¿Qué necesitás hoy?
        </p>
        
        {ACTIONS.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px',
              borderRadius: '18px',
              border: item.isUrgent ? '2px solid #A32020' : '1px solid var(--b3)',
              background: 'var(--bg1)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Indicador de Color Lateral Industrial */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '5px',
              background: item.color
            }} />

            <span style={{ 
              fontSize: '32px',
              filter: item.isUrgent ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}>
              {item.icon}
            </span>

            <div style={{ flex: 1 }}>
              <p style={{ 
                margin: '0 0 4px 0', 
                fontWeight: 700, 
                fontSize: '16px',
                color: item.isUrgent ? '#A32020' : 'var(--t1)'
              }}>
                {item.title}
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '12.5px', 
                color: 'var(--t2)',
                lineHeight: '1.4'
              }}>
                {item.desc}
              </p>
            </div>
            
            <span style={{ opacity: 0.2, fontSize: '20px' }}>→</span>
          </button>
        ))}
      </div>

      {/* ── SECCIÓN 4: FOOTER INSTITUCIONAL ── */}
      <footer style={{ 
        marginTop: 'auto', 
        padding: '24px 0',
        textAlign: 'center',
        borderTop: '1px solid var(--b3)',
        opacity: 0.6
      }}>
        <p style={{ 
          fontSize: '11px', 
          color: 'var(--t2)', 
          margin: 0,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Secretaría de Bienestar Estudiantil — UNCo
        </p>
      </footer>

    </div>
  );
};

export default HomePage;
