import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import { HeaderContextProivder } from './context/HeaderContext.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <HeaderContextProivder>
        <App />
        <Toaster />
      </HeaderContextProivder>
    </AuthProvider>
  </StrictMode>
);
