import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'equiflow_recent_groups';
const MAX_ENTRIES = 10;

const listeners = new Set();

// useSyncExternalStore exige un snapshot stable tant que rien n'a changé (sinon boucle de re-render).
let cachedSnapshot = null;

const invalidateCache = () => {
  cachedSnapshot = null;
};

const notify = () => {
  invalidateCache();
  listeners.forEach((listener) => listener());
};

const sortByLastVisited = (list) =>
  [...list].sort((a, b) => b.lastVisitedAt - a.lastVisitedAt);

const readAll = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAll = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // localStorage indisponible (navigation privée stricte, quota dépassé...) : on dégrade silencieusement.
  }
  notify();
};

export const getRecentGroups = () => {
  if (!cachedSnapshot) {
    cachedSnapshot = sortByLastVisited(readAll()).slice(0, MAX_ENTRIES);
  }
  return cachedSnapshot;
};

export const addOrUpdate = (id, name) => {
  const list = readAll().filter((group) => group.id !== id);
  list.push({ id, name, lastVisitedAt: Date.now() });
  writeAll(sortByLastVisited(list).slice(0, MAX_ENTRIES));
};

export const remove = (id) => {
  writeAll(readAll().filter((group) => group.id !== id));
};

const subscribe = (listener) => {
  const onStorageEvent = (e) => {
    if (e.key === STORAGE_KEY) {
      invalidateCache();
      listener();
    }
  };
  listeners.add(listener);
  window.addEventListener('storage', onStorageEvent);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorageEvent);
  };
};

export const useRecentGroups = () => useSyncExternalStore(subscribe, getRecentGroups);
