import React, { useContext, useState } from 'react';
import '../CSS/SavedAds.css';
import AdHomeDisplay from '../FCglobal/AdDisplay';
import MyAccountSidebar from './MyAccountSidebar';
import { UserContext } from '../FCglobal/ContextUser';
import { AllAdsContext } from '../FCglobal/ContextAllAds';

export default function SavedAds() {
  
 const { allAds } = useContext(AllAdsContext);
  const { user } = useContext(UserContext);

 const [savedAds, setSavedAds] = useState(
  allAds.filter((ad) => user.savedAd.includes(ad.id))
 );
  return (
    <>
      <MyAccountSidebar />
      <div className="saved-ads-container">
        <h2>המודעות השמורות שלי</h2>
        <div className="saved-ads-list">
          {savedAds.map((ad) => (
            <AdHomeDisplay ad={ad} key={ad.id}/>
          ))}
        </div>
      </div>
    </>

  );
}
