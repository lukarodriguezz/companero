import { useState } from "react";
// Componentes
import HomePage from "@/components/HomePage.jsx";
import ChatContainer from "@/components/ChatContainer.jsx";
import MoodTracker from "@/components/MoodTracker.jsx";
import ResourcesPage from "@/components/ResourcesPage.jsx";
import PanicModal from "@/components/PanicModal.jsx";

// Datos y Lógica
import { DECISION_TREE } from "@/data/decisionTree.js";
import { db } from "@/db.js"; // Ojo: lo tenés en la raíz de src según el find

const NAV = [
  { id: 'home',      icon: '🏠', label: 'Inicio'   },
  { id: 'chat',      icon: '💬', label: 'Chat'     },
  { id: 'mood',      icon: '📊', label: 'Ánimo'    },
  { id: 'resources', icon: '📋', label: 'Recursos' },
];

const TITLES = {
  home:      'Inicio',
  chat:      'Compañero',
  mood:      'Mi Ánimo',
  resources: 'Recursos',
};

export default function App() {
  const [page,      setPage]      = useState('home');
  const [showPanic, setShowPanic] = useState(false);

  return (
    <div style={{
      maxWidth: 430, margin: '0 auto', height: '100dvh',
      display: 'flex', flexDirection: 'column',
      background: 'var(--bg1)', fontFamily: 'var(--font)',
      position: 'relative',
    }}>

      {/* ── Header ── */}
      <div style={{
        padding: '12px 16px 10px',
        borderBottom: '1px solid var(--b3)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg,#1A8E68,#1A56A0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
          }}>
            🤝
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>Compañero UNCo</p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--t2)' }}>{TITLES[page]}</p>
          </div>
        </div>

        <button
          onClick={() => setShowPanic(true)}
          style={{
            background: '#A32020', color: '#fff', border: 'none',
            borderRadius: 8, padding: '7px 13px',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          🆘 Ayuda
        </button>
      </div>

      {/* ── Contenido ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {page === 'home'      && <div style={{ flex: 1, overflowY: 'auto' }}><HomePage onNavigate={setPage} /></div>}
        {page === 'chat'      && <ChatContainer />}
        {page === 'mood'      && <div style={{ flex: 1, overflowY: 'auto' }}><MoodTracker /></div>}
        {page === 'resources' && <div style={{ flex: 1, overflowY: 'auto' }}><ResourcesPage /></div>}
      </div>

      {/* ── Navegación inferior ── */}
      <div style={{
        borderTop: '1px solid var(--b3)',
        display: 'flex', flexShrink: 0,
        background: 'var(--bg1)',
      }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3,
            padding: '10px 4px 12px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit',
            borderTop: `2px solid ${page === n.id ? '#1A56A0' : 'transparent'}`,
            transition: 'border-color .15s',
          }}>
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <span style={{
              fontSize: 10,
              fontWeight: page === n.id ? 700 : 400,
              color: page === n.id ? '#1A56A0' : 'var(--t2)',
            }}>
              {n.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Modal de pánico ── */}
      {showPanic && <PanicModal onClose={() => setShowPanic(false)} />}

    </div>
  );
}
