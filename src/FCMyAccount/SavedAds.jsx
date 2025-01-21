import React, { useContext, useEffect, useState } from 'react';
import '../CSS/SavedAds.css';
import AdDisplay from '../FCglobal/AdDisplay';
import MyAccountSidebar from './MyAccountSidebar';
import { UserContext } from '../FCglobal/ContextUser';
import { AllAdsContext } from '../FCglobal/ContextAllAds';

export default function SavedAds() {
  
 const { allAds } = useContext(AllAdsContext);
  const { user } = useContext(UserContext);

 const [savedAds, setSavedAds] = useState([]);
 
   useEffect(() => {
     if (user?.savedAds && allAds?.length) {
      setSavedAds(allAds.filter((ad) => user.savedAds.includes(ad.id)));
     }
   }, [allAds, user]);
 
  return (
   <div className="my-ads-container">
         <MyAccountSidebar />
           <div className="ads-section">
             {savedAds.length > 0 ? (
               savedAds.map((ad) => <AdDisplay ad={ad} key={ad.id} send/>)
             ) : (
               <p className="no-ads-message">You don’t have any ads yet.</p>
             )}
           </div>
       </div>

  );
}
