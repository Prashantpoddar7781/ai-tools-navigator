import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './storecontext.jsx'   // ✅ import provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>   {/* ✅ wrap App inside StoreProvider */}
      <App />
    </StoreProvider>
  </StrictMode>,
)
