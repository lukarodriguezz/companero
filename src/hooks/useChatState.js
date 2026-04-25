// hooks/useChatState.js
// Persiste y restaura el estado completo del chat en IndexedDB.
// Si el estudiante cierra el navegador a mitad de una sesión,
// al volver retoma exactamente donde estaba.
import { useState, useEffect, useCallback } from 'react';
import { db } from '../db';

export function useChatState() {
  const [initialState, setInitialState] = useState(null); // { nodeId, messages } | null
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const row = await db.chat_state.orderBy('updatedAt').last();
        if (row?.nodeId && Array.isArray(row?.messages) && row.messages.length > 0) {
          setInitialState({ nodeId: row.nodeId, messages: row.messages });
        }
      } catch (err) {
        console.error('[useChatState] load:', err);
      } finally {
        setReady(true);
      }
    }
    load();
  }, []);

  // Llama a esto en cada paso del flujo para persistir
  const persist = useCallback(async (nodeId, messages) => {
    try {
      await db.chat_state.clear();
      await db.chat_state.add({
        nodeId,
        messages: messages.map(m => ({
          id: m.id, type: m.type, text: m.text,
          options: m.options ?? null,
          isCrisis: m.isCrisis ?? false,
          isResources: m.isResources ?? false,
          nodeId: m.nodeId ?? null,
        })),
        updatedAt: Date.now(),
      });
    } catch (err) {
      console.error('[useChatState] persist:', err);
    }
  }, []);

  // Llama a esto al iniciar nueva conversación
  const clear = useCallback(async () => {
    try {
      await db.chat_state.clear();
      setInitialState(null);
    } catch (err) {
      console.error('[useChatState] clear:', err);
    }
  }, []);

  return { initialState, ready, persist, clear };
}
