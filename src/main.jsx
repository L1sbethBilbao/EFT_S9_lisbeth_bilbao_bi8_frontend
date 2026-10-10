/* ============================================
   Kivo — Punto de entrada de React (EFT Semana 9)
   Carga Bootstrap desde npm (no por CDN), luego
   los estilos propios de Kivo y monta el
   componente principal App dentro de #root.
   HashRouter maneja las rutas con # en la URL
   (ej. /#/contacto), así GitHub Pages no muestra
   un error 404 al recargar una ruta interna.
   ============================================ */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './styles/estilos.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
