import { OrcProvider } from "./utils/OrcContext";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <OrcProvider>
          <App />
      </OrcProvider>
  </StrictMode>,
)
