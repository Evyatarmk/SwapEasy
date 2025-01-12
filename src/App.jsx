import './App.css';
import Header from './FCglobal/Header';
import LoginSignup from './FCglobal/LoginSignup';
import MyAds from './FCMyAccount/MyAds';
import SavedAds from './FCMyAccount/SavedAds';
import UpdatePersonalDetails from './FCMyAccount/UpdatePersonalDetails';
import Home from './Pages/Home';
import ItemDetails from './Pages/ItemDetails';
import MyAccount from './Pages/MyAccount';
import PostAd from './Pages/PostAd';
import { Routes, Route } from 'react-router-dom';

function App() {

  const item = {
    images: [
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/post-ad" element={<PostAd />} />
        <Route path="/item-details" element={<ItemDetails item={item} />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="/MyAccount/my-ads" element={<MyAds />} />
        <Route path="/MyAccount/saved-ads" element={<SavedAds />} />
        <Route path="/MyAccount/update-personal-details" element={<UpdatePersonalDetails />} /> 
      </Routes>
    </>
  );
}

export default App;
