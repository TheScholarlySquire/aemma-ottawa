import './i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const basename = import.meta.env.PROD ? '/aemma-ottawa/' : '/';
console.log('Running in:', import.meta.env.PROD ? 'production' : 'development');


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
  </StrictMode>,
)
