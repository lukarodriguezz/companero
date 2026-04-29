import React from 'react';
import { RESOURCES } from "@/config/resources.js";

/**
 * ResourcesCard - Componente de visualización de redes de apoyo.
 * @param {boolean} isUrgent - Si es true, prioriza y resalta contactos de emergencia.
 */
export default function ResourcesCard({ isUrgent = false }) {
  
  // Validación de seguridad para evitar errores si RESOURCES no está definido
  if (!RESOURCES || !Array.isArray(RESOURCES)) {
    console.error("ResourcesCard: No se pudo cargar la lista de recursos.");
    return null;
  }

  // Filtrado de datos según el contexto (Urgencia vs General)
  const urgentResources = RESOURCES.filter(r => r.urgent);
  const generalResources = RESOURCES.filter(r => !r.urgent);

  /**
   * Estilos constantes para mantener la estética industrial y limpia.
   */
  const styles = {
    container: {
      margin: '12px 0',
      width: '100%',
      animation: 'fadeIn 0.3s ease-out'
    },
    sectionLabel: {
      fontSize: '11px',
      fontWeight: 700,
      marginBottom: '8px',
      color: 'var(--t2)',
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    card: (isFeatured, isPanic) => ({
      background: isFeatured ? 'rgba(26,142,104,.05)' : 'var(--bg1)',
      border: `1px solid ${isPanic ? '#A32020' : (isFeatured ? 'rgba(26,142,104,.4)' : 'var(--b3)')}`,
      borderRadius: '12px',
      padding: '14px',
      marginBottom: '8px',
      boxShadow: isPanic ? '0 4px 12px rgba(163,32,32,0.1)' : '0 2px 4px rgba(0,0,0,0.02)',
      transition: 'transform 0.2s ease'
    }),
    badge: {
      fontSize: '10px',
      background: '#1A8E68',
      color: '#fff',
      borderRadius: '4px',
      padding: '2px 8px',
      fontWeight: 700
    },
    actionBtn: (isUrgentBtn) => ({
      background: isUrgentBtn ? '#A32020' : 'transparent',
      color: isUrgentBtn ? '#fff' : '#1A56A0',
      border: isUrgentBtn ? 'none' : '1px solid #1A56A0',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '13px',
      fontWeight: 700,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      transition: 'opacity 0.2s'
    })
  };

  return (
    <div style={styles.container}>
      
      {/* ── SECCIÓN: LÍNEAS DE EMERGENCIA ── */}
      {(isUrgent || urgentResources.length > 0) && (
        <>
          <p style={styles.sectionLabel}>
            <span style={{ color: '#A32020' }}>●</span> Líneas de Ayuda Urgente
          </p>
          {urgentResources.map(res => (
            <div key={res.id} style={styles.card(false, true)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: '14px', margin: 0, color: '#A32020' }}>{res.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--t2)', margin: '4px 0 0', lineHeight: 1.4 }}>{res.description}</p>
                </div>
              </div>
              {res.phone && (
                <a href={`tel:${res.phone}`} style={styles.actionBtn(true)}>
                  📞 Llamar al {res.phone}
                </a>
              )}
            </div>
          ))}
        </>
      )}

      {/* ── SECCIÓN: RECURSOS UNIVERSITARIOS (No se muestra si el contexto es de crisis extrema) ── */}
      {!isUrgent && (
        <>
          <p style={{ ...styles.sectionLabel, marginTop: '20px' }}>
            <span style={{ color: '#1A8E68' }}>●</span> Bienestar Universitario UNCo
          </p>
          {generalResources.map(res => (
            <div key={res.id} style={styles.card(res.featured, false)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <p style={{ fontWeight: 600, fontSize: '13.5px', margin: 0 }}>{res.name}</p>
                {res.featured && <span style={styles.badge}>OFICIAL</span>}
              </div>
              
              <p style={{ fontSize: '12px', color: 'var(--t2)', margin: '0 0 10px', lineHeight: 1.4 }}>
                {res.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {res.phone && (
                  <a href={`tel:${res.phone}`} style={styles.actionBtn(false)}>
                    📞 {res.phone}
                  </a>
                )}
                {res.email && (
                  <a href={`mailto:${res.email}`} style={styles.actionBtn(false)}>
                    ✉️ Email
                  </a>
                )}
                {res.url && (
                  <a href={res.url} target="_blank" rel="noreferrer" style={styles.actionBtn(false)}>
                    🌐 Web
                  </a>
                )}
              </div>
            </div>
          ))}
        </>
      )}

    </div>
  );
}
