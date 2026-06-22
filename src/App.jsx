import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      
      {/* Premium Toast Alerts configurations */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: '600',
            background: 'var(--color-brown-deep)',
            color: 'var(--color-cream)',
            border: '1px solid var(--color-gold)',
            boxShadow: 'var(--shadow-hover)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-gold)',
              secondary: 'var(--color-brown-deep)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-danger)',
              secondary: 'var(--color-cream)',
            },
          }
        }}
      />
    </AuthProvider>
  );
}

export default App;
