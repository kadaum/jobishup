
/// <reference types="vite/client" />

// Google Analytics gtag.js type definitions
interface Window {
  dataLayer: any[];
  gtag: (
    command: 'event' | 'config' | 'js' | 'set' | 'consent',
    targetId: string,
    config?: Record<string, any> | Date
  ) => void;
}

