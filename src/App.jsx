import React, { useState } from "react";
// Importación de componentes con alias @ y extensiones explícitas
import HomePage from "@/components/HomePage.jsx";
import ChatContainer from "@/components/ChatContainer.jsx";
import MoodTracker from "@/components/MoodTracker.jsx";
import ResourcesPage from "@/components/ResourcesPage.jsx";
import PanicModal from "@/components/PanicModal.jsx";

// Importación de la lógica y datos centralizados
import { DECISION_TREE } from "@/data/decisionTree.js";
import { db } from "@/db.js"; 

/**
 * Constantes de Configuración de Interfaz
 */
const NAV_ITEMS = [
  { id: 'home',      icon: '🏠', label: 'Inicio'   },
  { id: 'chat',      icon: '💬', label: 'Chat'     },
  { id: 'mood',      icon: '📊', label: 'Ánimo'    },
  { id: 'resources', icon: '📋', label: 'Recursos' },
];

const PAGE_TITLES = {
  home:      'Bienvenida',
  chat:      'Asistente',
  mood:      'Seguimiento',
  resources: 'Red de Apoyo',
};

/**
 * App - Componente Principal (Root)
 * Orquestador de navegación y estados globales de la PWA.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPanicModalOpen, setIsPanicModalOpen] = useState(false);
  
  /**
   * Estado para controlar en qué nodo del árbol arranca el chat.
   * Esto permite que la Home dispare flujos específicos (ej. Técnicas).
   */
  const [chatInitialNode, setChatInitialNode] = useState('start');

  /**
   * Manejador de navegación inteligente.
   * @param {string} targetPage - El ID de la página (home, chat, mood, resources).
   * @param {string} nodeId - El ID del nodo del árbol (opcional, por defecto 'start').
   */
  const handleNavigation = (targetPage, nodeId = 'start') => {
    if (targetPage === 'chat') {
      setChatInitialNode(nodeId);
    }
    setCurrentPage(targetPage);
  };

  return (
    <div style={{
      maxWidth: '430px', 
      margin: '0 auto', 
      height: '100dvh', // Altura dinámica para evitar problemas en navegadores móviles
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--bg1)', 
      fontFamily: 'var(--font)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 40px rgba(0,0,0,0.1)'
    }}>

      {/* ── HEADER SUPERIOR ── */}
      <header style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--b3)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexShrink: 0,
        background: 'var(--bg1)',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, 
            height: 36, 
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1A8E68 0%, #1A56A0 100%)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: 18,
            boxShadow: '0 2px 8px rgba(26,86,160,0.2)'
          }}>
            🤝
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '14px', letterSpacing: '-0.02em' }}>
              Compañero UNCo
            </p>
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--t2)', fontWeight: 500 }}>
              {PAGE_TITLES[currentPage]}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPanicModalOpen(true)}
          style={{
            background: '#A32020', 
            color: '#fff', 
            border: 'none',
            borderRadius: '10px', 
            padding: '8px 14px',
            fontSize: '12px', 
            fontWeight: 700, 
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(163,32,32,0.2)'
          }}
        >
          🆘 SOS
        </button>
      </header>

      {/* ── ÁREA DE CONTENIDO (ROUTER) ── */}
      <main style={{ 
        flex: 1, 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative'
      }}>
        {currentPage === 'home' && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <HomePage 
              onNavigate={handleNavigation} 
              onOpenPanic={() => setIsPanicModalOpen(true)} 
            />
          </div>
        )}
        
        {currentPage === 'chat' && (
          <ChatContainer 
            tree={DECISION_TREE} 
            startNodeId={chatInitialNode} 
          />
        )}

        {currentPage === 'mood' && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <MoodTracker />
          </div>
        )}

        {currentPage === 'resources' && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <ResourcesPage />
          </div>
        )}
      </main>

      {/* ── NAVEGACIÓN INFERIOR ── */}
      <nav style={{
        borderTop: '1px solid var(--b3)',
        display: 'flex', 
        flexShrink: 0,
        background: 'var(--bg1)',
        paddingBottom: 'calc(8px + env(safe-area-inset-bottom))',
      }}>
        {NAV_ITEMS.map(item => (
          <button 
            key={item.id} 
            onClick={() => handleNavigation(item.id, 'start')} 
            style={{
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              gap: 4,
              padding: '12px 4px',
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              borderTop: `2px solid ${currentPage === item.id ? '#1A56A0' : 'transparent'}`,
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ 
              fontSize: 20, 
              opacity: currentPage === item.id ? 1 : 0.5 
            }}>
              {item.icon}
            </span>
            <span style={{
              fontSize: '10px',
              fontWeight: currentPage === item.id ? 700 : 500,
              color: currentPage === item.id ? '#1A56A0' : 'var(--t2)',
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* MODAL GLOBAL DE SOS */}
      {isPanicModalOpen && (
        <PanicModal onClose={() => setIsPanicModalOpen(false)} />
      )}

    </div>
  );
}
