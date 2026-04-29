import React from 'react';

/**
 * HomePage - Versión Final Consolidada
 * Integra widgets informativos con el menú de acciones principales.
 */
const HomePage = ({ onNavigate, onOpenPanic }) => {

  // Dato del día: Mantenemos la lógica de info útil para el estudiante
  const dailyTip = {
    title: "Dato del día",
    content: "Caminar 10 minutos entre bloques de estudio reduce el cortisol y mejora la retención de memoria a largo plazo.",
    icon: "💡"
  };

  const ACTIONS = [
    {
      id: 'chat_start',
      title: 'Hablar con mi compañero',
      desc: 'Inicia un diálogo guiado para desahogarte o buscar apoyo.',
      icon: '💬',
      color: '#1A56A0',
      action: () => onNavigate('chat', 'start')
    },
    {
      id: 'chat_tech',
      title: 'Aprender técnicas',
      desc: 'Herramientas rápidas para ansiedad, agobio o crisis.',
      icon: '🧠',
      color: '#1A8E68',
      action: () => onNavigate('chat', 'techniques_menu')
    },
    {
      id: 'mood_reg',
      title: 'Registrar cómo me siento',
      desc: 'Llevá un seguimiento de tu evolución emocional semanal.',
      icon: '📊',
      color: '#6366f1',
      action: () => onNavigate('mood')
    },
    {
      id: 'sos_direct',
      title: 'S.O.S',
      desc: 'Líneas de emergencia y ayuda inmediata 24hs.',
      icon: '🆘',
      color: '#A32020',
      isUrgent: true,
      action: () => onOpenPanic()
    }
  ];

  return (
    <div style={{
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      
      {/* ── SECCIÓN: ENCABEZADO ── */}
      <section>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          margin: '0 0 8px 0', 
          color: 'var(--t1)',
          letterSpacing: '-0.03em'
        }}>
          Hola, Luka 🤝
        </h1>
        <p style={{ 
          fontSize: '15px', 
          color: 'var(--t2)', 
          lineHeight: '1.5',
          margin: 0 
        }}>
          Bienvenido a tu espacio de bienestar UNCo.
        </p>
      </section>

      {/* ── SECCIÓN: WIDGET INFORMATIVO (Dato del día) ── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,142,104,0.1) 0%, rgba(26,86,160,0.1) 100%)',
        padding: '20px',
        borderRadius: '18px',
        border: '1px solid rgba(26,142,104,0.2)',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start'
      }}>
        <span style={{ fontSize: '24px' }}>{dailyTip.icon}</span>
        <div>
          <p style={{ 
            margin: '0 0 6px 0', 
            fontWeight: 700, 
            fontSize: '14px', 
            color: '#1A8E68',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {dailyTip.title}
          </p>
          <p style={{ 
            margin: 0, 
            fontSize: '13.5px', 
            color: 'var(--t1)', 
            lineHeight: '1.5',
            fontWeight: 500
          }}>
            {dailyTip.content}
          </p>
        </div>
      </div>

      {/* ── SECCIÓN: ACCIONES PRINCIPALES ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <p style={{ 
          fontSize: '12px', 
          fontWeight: 700, 
          color: 'var(--t2)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          marginLeft: '4px'
        }}>
          ¿Qué necesitás ahora?
        </p>
        
        {ACTIONS.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '18px',
              borderRadius: '16px',
              border: item.isUrgent ? '2px solid #A32020' : '1px solid var(--b3)',
              background: 'var(--bg1)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Indicador de Color Lateral */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '5px',
              background: item.color
            }} />

            <span style={{ fontSize: '30px' }}>{item.icon}</span>

            <div style={{ flex: 1 }}>
              <p style={{ 
                margin: '0 0 2px 0', 
                fontWeight: 700, 
                fontSize: '15px',
                color: item.isUrgent ? '#A32020' : 'var(--t1)'
              }}>
                {item.title}
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '12px', 
                color: 'var(--t2)',
                lineHeight: '1.4'
              }}>
                {item.desc}
              </p>
            </div>
            
            <span style={{ opacity: 0.2, fontSize: '18px' }}>→</span>
          </button>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ 
        marginTop: 'auto', 
        padding: '20px 0',
        textAlign: 'center',
        borderTop: '1px solid var(--b3)'
      }}>
        <p style={{ fontSize: '11px', color: 'var(--t2)', opacity: 0.6, fontWeight: 500 }}>
          Secretaría de Bienestar Estudiantil — UNCo
        </p>
      </footer>

    </div>
  );
};

export default HomePage;
