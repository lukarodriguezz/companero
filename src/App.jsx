import React, { useState } from "react";
// Importación de componentes de vista
import HomePage from "@/components/HomePage.jsx";
import ChatContainer from "@/components/ChatContainer.jsx";
import MoodTracker from "@/components/MoodTracker.jsx";
import ResourcesPage from "@/components/ResourcesPage.jsx";
import PanicModal from "@/components/PanicModal.jsx";

// Importación de Assets y Configuración
import UncomaLogo from "@/assets/uncoma.svg?react"; // Requiere vite-plugin-svgr
import { DECISION_TREE } from "@/data/decisionTree.js";
import { db } from "@/db.js"; 

/**
 * Configuración de Navegación y Títulos
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
 * App - Orquestador Principal de Compañero UNCo
 * Gestiona el ruteo interno, estados de emergencia y puntos de entrada al chat.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPanicModalOpen, setIsPanicModalOpen] = useState(false);
  
  /**
   * Estado para inyectar el nodo inicial al ChatContainer.
   * Permite que la Home dispare flujos como 'techniques_menu' directamente.
   */
  const [chatInitialNode, setChatInitialNode] = useState('start');

  /**
   * handleNavigation - Manejador de cambio de vista con inyección de contexto.
   * @param {string} targetPage - ID de la página destino.
   * @param {string} nodeId - ID del nodo inicial si el destino es el chat.
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
      height: '100dvh', // Soporte para Viewport dinámico en móviles
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
          {/* Logo UNCo SVG */}
          <div style={{
            width: 38, 
            height: 38, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <UncomaLogo style={{ width: '100%', height: '100%' }} />
          </div>
          
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '14px', letterSpacing: '-0.02em', color: 'var(--t1)' }}>
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
            boxShadow: '0 2px 6px rgba(163,32,32,0.2)',
            transition: 'transform 0.1s active'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          🆘 SOS
        </button>
      </header>

      {/* ── ÁREA DE CONTENIDO (ROUTER DINÁMICO) ── */}
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

      {/* ── NAVEGACIÓN INFERIOR (TAB BAR) ── */}
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
              opacity: currentPage === item.id ? 1 : 0.4,
              transform: currentPage === item.id ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s ease'
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

      {/* MODAL GLOBAL DE EMERGENCIA */}
      {isPanicModalOpen && (
        <PanicModal onClose={() => setIsPanicModalOpen(false)} />
      )}

    </div>
  );
}
