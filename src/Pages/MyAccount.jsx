import { Route, Routes } from 'react-router-dom';
import '../CSS/MyAccount.css'
import MyAccountSidebar from '../FCMyAccount/MyAccountSidebar';
import MyAds from '../FCMyAccount/MyAds';
import SavedAds from '../FCMyAccount/SavedAds';
import UpdatePersonalDetails from '../FCMyAccount/UpdatePersonalDetails';

export default function MyAccount() {
  return (
    <div>
      <MyAccountSidebar />
      <MyAds />
    </div>
  )
}
