import './App.css';
import Header from './FCglobal/Header';
import LoginSignup from './FCglobal/LoginSignup';
import MyAds from './FCMyAccount/MyAds';
import SavedAds from './FCMyAccount/SavedAds';
import UpdatePersonalDetails from './FCMyAccount/UpdatePersonalDetails';
import Home from './Pages/Home';
import AdDetails from './Pages/AdDetails';
import MyAccount from './Pages/MyAccount';
import PostAd from './Pages/PostAd';
import { Routes, Route } from 'react-router-dom';
import UpdateAd from './FCMyAccount/UpdateAd';
import { useState } from 'react';
import AdminPage from './Pages/AdminPage';

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

  const [isAdmin, setIsAdmin] = useState(false);

  // Update admin state based on user login
  const handleLogin = (user) => {
    if (user.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  return (
    <>
      <Header isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login-signup" 
          element={<LoginSignup onLogin={handleLogin} />} 
        />
        <Route path="/post-ad" element={<PostAd />} />
        <Route path="/AdminPage" element ={<AdminPage/>}/>
        <Route path="/ad-details/:adId" element={<ItemDetails />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="/MyAccount/my-ads" element={<MyAds />} />
        <Route path="/MyAccount/saved-ads" element={<SavedAds />} />
        <Route path="/MyAccount/update-personal-details" element={<UpdatePersonalDetails />} />
        <Route path="/MyAccount/update-Ad" element={<UpdateAd />} />
      </Routes>
    </>
  );
}

export default App;
