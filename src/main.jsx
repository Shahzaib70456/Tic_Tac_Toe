import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './css/main.css'
import StartPage from './startPage.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <StartPage />
  </StrictMode>,
)
