import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './FCglobal/ContextUser.jsx'
import { AllAdsProvider } from './FCglobal/ContextAllAds.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <AllAdsProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AllAdsProvider>
    </UserProvider>
  </BrowserRouter>

)
