import './App.css'
import Header from './FCglobal/Header'
import LoginSignup from './FCglobal/LoginSignup'
import MyAccountSidebar from './FCMyAccount/MyAccountSidebar'
import MyAds from './FCMyAccount/MyAds'
import SavedAds from './FCMyAccount/SavedAds'
import UpdatePersonalDetails from './FCMyAccount/UpdatePersonalDetails'
import Home from './Pages/Home'
import ItemDetails from './Pages/ItemDetails'
import MyAccount from './Pages/MyAccount'
import PostAd from './Pages/PostAd'

function App() {
  const item = {
    images: [
      "https://via.placeholder.com/300", // תמונה ראשונה
      "https://via.placeholder.com/300", // תמונה שנייה
      "https://via.placeholder.com/300", // תמונה שנייה
    ],
    title: "מחשב נייד Dell XPS 15",
    description: "מחשב נייד במצב חדש, ללא שריטות, כולל מטען מקורי.",
    category: "מחשבים",
    condition: "כמו חדש",
    price: 4500,
    city: "תל אביב",
    street: "אלנבי",
    houseNumber: 45,
    sellerName: "אביתר מקבריט",
    sellerContact: "050-1234567",
  };
  
  return (
    <>
    <Home/>
     <Header/>
     <LoginSignup/>
     <PostAd/>
   <MyAds></MyAds>
   <UpdatePersonalDetails/>
   <SavedAds/>
   <ItemDetails item={item} />
    </>
  )
}

export default App
