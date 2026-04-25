// hooks/useMoodHistory.js
// Abstrae toda la persistencia del historial de ánimo con IndexedDB.
import { useState, useEffect, useCallback } from 'react';
import { db } from '../db';

const todayStr = () => new Date().toISOString().split('T')[0];

export function useMoodHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const entries = await db.mood_entries
        .orderBy('date')
        .reverse()
        .limit(30)
        .toArray();
      setHistory(entries);
    } catch (err) {
      console.error('[useMoodHistory] load:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveEntry = useCallback(async (value, note = '') => {
    const today = todayStr();
    try {
      // Borra la entrada de hoy si ya existe, para no duplicar
      await db.mood_entries.where('date').equals(today).delete();
      await db.mood_entries.add({ date: today, value, note: note.trim(), ts: Date.now() });
      await load();
      return true;
    } catch (err) {
      console.error('[useMoodHistory] saveEntry:', err);
      return false;
    }
  }, [load]);

  const todayEntry = history.find(e => e.date === todayStr()) ?? null;

  return { history, loading, saveEntry, todayEntry };
}
