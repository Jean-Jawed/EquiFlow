import { useSyncExternalStore } from 'react';

let deferredPrompt = null;
const listeners = new Set();

const notify = () => listeners.forEach((listener) => listener());

const isStandalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;

const isIOS = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent);

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  notify();
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  notify();
});

window.matchMedia?.('(display-mode: standalone)').addEventListener('change', notify);

export const getInstallState = () => {
  if (isStandalone()) return 'installed';
  if (deferredPrompt) return 'available';
  if (isIOS()) return 'ios';
  return 'unsupported';
};

export const promptInstall = async () => {
  if (!deferredPrompt) return;
  const prompt = deferredPrompt;
  deferredPrompt = null;
  await prompt.prompt();
  await prompt.userChoice;
  notify();
};

export const registerServiceWorker = () => {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('/service-worker.js').catch((err) => {
    console.error('Service worker registration failed:', err);
  });
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const usePwaInstall = () => useSyncExternalStore(subscribe, getInstallState);
