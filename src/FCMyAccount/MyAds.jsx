import React, { useContext, useState, useEffect } from "react";
import "../CSS/MyAds.css";
import MyAccountSidebar from "./MyAccountSidebar";
import { AllAdsContext } from "../FCglobal/ContextAllAds";
import { UserContext } from "../FCglobal/ContextUser";
import AdDisplayMyAds from "./AdDisplayMyAds";
import UpdateAd from "./UpdateAd";

export default function MyAds() {
  const { allAds } = useContext(AllAdsContext);
  const { user } = useContext(UserContext);

  const [myAds, setMyAds] = useState([]);

  useEffect(() => {
    if (user?.myAds && allAds?.length) {
      setMyAds(allAds.filter((ad) => user.myAds.includes(ad.id)));
    }
  }, [allAds, user]);



  return (
    <div className="my-ads-container">
      <MyAccountSidebar />
        <div className="ads-section">
          {myAds.length > 0 ? (
            myAds.map((ad) => <AdDisplayMyAds ad={ad} key={ad.id} send/>)
          ) : (
            <p className="no-ads-message">You don’t have any ads yet.</p>
          )}
        </div>
    </div>
  );
}
