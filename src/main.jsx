import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import './index.css'

const isDesignPreview = window.location.pathname.replace(/\/$/, '') === '/design'
const Root = isDesignPreview
  ? (await import('./design/DesignToolkit.jsx')).default
  : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
    <Analytics />
  </StrictMode>
)
