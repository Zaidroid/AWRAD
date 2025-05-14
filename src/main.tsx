import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx'; // Assuming LanguageProvider is also needed globally

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider> {/* If LanguageProvider wraps AuthProvider or vice-versa, adjust as needed */}
        <App />
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);
