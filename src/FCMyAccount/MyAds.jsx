
import React, { useContext, useState } from "react";
import "../CSS/MyAds.css";
import MyAccountSidebar from "./MyAccountSidebar";
import { AllAdsContext } from "../FCglobal/ContextAllAds";
import { UserContext } from "../FCglobal/ContextUser";
import AdDisplayMyAccount from "./AdDisplayMyAccount";


export default function MyAds() {
 const { allAds } = useContext(AllAdsContext);
  const { user } = useContext(UserContext);

 const [myAds, setmyAds] = useState(
  allAds.filter((ad) => user.myAds.includes(ad.id))
 );
    

  const handleEditDetails = () => {
    alert("אפשרות עריכת פרטים תהיה זמינה בקרוב!");
  };

  return (
    <div>
      <MyAccountSidebar />

      {/* מודעות שלי */}
      <div className="ads-section">
            {myAds.map((ad) => (
              <AdDisplayMyAccount ad={ad} key={ad.id}/>
            ))}
            </div>
    </div>
  );
}
