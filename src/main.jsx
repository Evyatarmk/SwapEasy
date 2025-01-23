import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { UserProvider } from './FCglobal/ContextUser.jsx'
import { AllAdsProvider } from './FCglobal/ContextAllAds.jsx'
import { PopupProvider } from './FCglobal/Popup.jsx'
import { CityProvider } from './FCglobal/CityProvider.jsx'
import { LoadingProvider } from './FCglobal/ContextLoading.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
 <LoadingProvider>
  <CityProvider>
      <AllAdsProvider>
    <UserProvider>
      <PopupProvider>
        <StrictMode>
          <App />
        </StrictMode>
        </PopupProvider>
    </UserProvider>
      </AllAdsProvider>
    </CityProvider>
    </LoadingProvider>
  </HashRouter>

)
