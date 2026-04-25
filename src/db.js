// db.js — IndexedDB via Dexie.js
// Los datos NUNCA salen del dispositivo del estudiante.
// Límite práctico: cientos de MB (vs ~5 MB de localStorage).
import Dexie from 'dexie';

export const db = new Dexie('CompaneroUNCo');

db.version(1).stores({
  mood_entries: '++id, date',   // historial de ánimo — índice por fecha
  chat_state:   '++id, updatedAt', // 1 sola fila, siempre reemplazada
});
