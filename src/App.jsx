import './App.css'
import Header from './FCglobal/Header'
import LoginSignup from './FCglobal/LoginSignup'
import MyAds from './FCMyAccount/MyAds'
import SavedAds from './FCMyAccount/SavedAds'
import UpdatePersonalDetails from './FCMyAccount/UpdatePersonalDetails'
import MyAccount from './Pages/MyAccount'
import PostAd from './Pages/PostAd'

function App() {

  return (
    <>
     <Header/>
     <LoginSignup/>
     <PostAd/>
   <MyAds></MyAds>
   <UpdatePersonalDetails/>
   <SavedAds/>
    </>
  )
}

export default App
