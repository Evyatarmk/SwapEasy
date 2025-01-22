import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { UserProvider } from './FCglobal/ContextUser.jsx'
import { AllAdsProvider } from './FCglobal/ContextAllAds.jsx'
import { PopupProvider } from './FCglobal/Popup.jsx'
import { CityProvider } from './FCglobal/CityProvider.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
  <CityProvider>
    <UserProvider>
      <AllAdsProvider>
      <PopupProvider>
        <StrictMode>
          <App />
        </StrictMode>
        </PopupProvider>
      </AllAdsProvider>
    </UserProvider>
    </CityProvider>
  </HashRouter>

)
