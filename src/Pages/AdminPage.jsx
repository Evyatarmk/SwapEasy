import React, { useContext, useState, useEffect } from "react";
import "../CSS/MyAds.css";
import { AllAdsContext } from "../FCglobal/ContextAllAds";
import { UserContext } from "../FCglobal/ContextUser";
import AdDisplayAdmin from "../FCAdmin/AdDisplayAdmin";
import MyAccountSidebar from "../FCMyAccount/MyAccountSidebar";

export default function MyAds() {
  const { allAds } = useContext(AllAdsContext);
  const { user } = useContext(UserContext);



  return (
    <div className="my-ads-container">
      <MyAccountSidebar/>
        <div className="ads-section">
         <h3>דף ניהול</h3>
          {allAds.length > 0 ? (
            allAds.map((ad) => <AdDisplayAdmin ad={ad} key={ad.id} />)
          ) : (
            <p className="no-ads-message">You don’t have any ads yet.</p>
          )}
        </div>
    </div>
  );
}
