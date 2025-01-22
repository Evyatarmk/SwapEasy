import './App.css';
import Header from './FCglobal/Header';
import MyAds from './FCMyAccount/MyAds';
import SavedAds from './FCMyAccount/SavedAds';
import UpdatePersonalDetails from './FCMyAccount/UpdatePersonalDetails';
import Home from './Pages/Home';
import AdDetails from './Pages/AdDetails';
import MyAccount from './Pages/MyAccount';
import PostAd from './Pages/PostAd';
import { Routes, Route } from 'react-router-dom';
import UpdateAd from './FCMyAccount/UpdateAd';
import { useEffect, useState } from 'react';
import AdminPage from './Pages/AdminPage';
import ProtectedRoute from './FCglobal/ProtectedRoute'; // ייבוא קומפוננטת הגנה
import isTokenValid from './FCglobal/isTokenValid';
import UpdateAdAdmin from './FCAdmin/UpdateAdAdmin';

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/index.html" element={<Home />} />
        <Route path="/ad-details/:adId" element={<AdDetails />} />

        {/* נתיבים מוגנים */}
        <Route
          path="/post-ad"
          element={
            <ProtectedRoute>
              <PostAd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminPage"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UpdateAdAdmin"
          element={
            <ProtectedRoute>
              <UpdateAdAdmin/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/MyAccount"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MyAccount/my-ads"
          element={
            <ProtectedRoute>
              <MyAds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MyAccount/saved-ads"
          element={
            <ProtectedRoute>
              <SavedAds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MyAccount/update-personal-details"
          element={
            <ProtectedRoute>
              <UpdatePersonalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MyAccount/update-Ad"
          element={
            <ProtectedRoute>
              <UpdateAd />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
