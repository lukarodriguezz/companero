import React from 'react';

/**
 * HomePage - Punto de entrada y panel de control del usuario.
 * @param {Function} onNavigate - Función de enrutamiento: (page, nodeId).
 * @param {Function} onOpenPanic - Disparador del modal de emergencia global.
 */
const HomePage = ({ onNavigate, onOpenPanic }) => {

  /**
   * Configuración de Acciones Principales
   * Centralizamos la data para mantener el renderizado limpio (DRY).
   */
  const MAIN_ACTIONS = [
    {
      id: 'chat_start',
      title: 'Hablar con mi compañero',
      desc: 'Inicia un diálogo guiado para desahogarte o buscar claridad.',
      icon: '💬',
      color: '#1A56A0',
      handler: () => onNavigate('chat', 'start')
    },
    {
      id: 'chat_techniques',
      title: 'Aprender técnicas',
      desc: 'Ejercicios rápidos para ansiedad, agobio o crisis.',
      icon: '🧠',
      color: '#1A8E68',
      handler: () => onNavigate('chat', 'techniques_menu')
    },
    {
      id: 'mood_tracker',
      title: 'Registrar cómo me siento',
      desc: 'Mapeá tu evolución emocional y detectá patrones.',
      icon: '📊',
      color: '#6366f1',
      handler: () => onNavigate('mood')
    },
    {
      id: 'sos_protocol',
      title: 'S.O.S',
      desc: 'Ayuda inmediata y contactos críticos de emergencia.',
      icon: '🆘',
      color: '#A32020',
      isCritical: true,
      handler: () => onOpenPanic()
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
      
      {/* ── SECCIÓN: BIENVENIDA ── */}
      <header>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          margin: '0 0 10px 0', 
          color: 'var(--t1)',
          letterSpacing: '-0.03em'
        }}>
          Hola, Luka 🤝
        </h1>
        <p style={{ 
          fontSize: '15px', 
          color: 'var(--t2)', 
          lineHeight: '1.6',
          margin: 0,
          maxWidth: '90%'
        }}>
          Este es tu espacio seguro de apoyo emocional en la UNCo. ¿Por dónde querés empezar hoy?
        </p>
      </header>

      {/* ── SECCIÓN: GRID DE ACCIONES ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {MAIN_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={action.handler}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px',
              borderRadius: '18px',
              border: action.isCritical ? '2px solid #A32020' : '1px solid var(--b3)',
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
            {/* Indicador de Categoría Lateral */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '5px',
              background: action.color
            }} />

            <span style={{ 
              fontSize: '32px',
              filter: action.isCritical ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))'
            }}>
              {action.icon}
            </span>

            <div style={{ flex: 1 }}>
              <p style={{ 
                margin: '0 0 4px 0', 
                fontWeight: 700, 
                fontSize: '16px',
                color: action.isCritical ? '#A32020' : 'var(--t1)',
                letterSpacing: '-0.01em'
              }}>
                {action.title}
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '12.5px', 
                color: 'var(--t2)',
                lineHeight: '1.4',
                opacity: 0.9
              }}>
                {action.desc}
              </p>
            </div>

            <span style={{ 
              opacity: 0.2, 
              fontSize: '18px',
              fontWeight: 300 
            }}>
              →
            </span>
          </button>
        ))}
      </div>

      {/* ── SECCIÓN: FOOTER INSTITUCIONAL ── */}
      <footer style={{ 
        marginTop: 'auto', 
        padding: '24px 0',
        textAlign: 'center',
        borderTop: '1px solid var(--b3)',
        opacity: 0.5
      }}>
        <p style={{ 
          fontSize: '11px', 
          color: 'var(--t2)', 
          margin: 0,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Bienestar Estudiantil — Universidad Nacional del Comahue
        </p>
      </footer>

    </div>
  );
};

export default HomePage;
