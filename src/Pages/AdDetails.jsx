import React, { useContext, useState } from "react";
import "../CSS/AdDetails.css";
import { useParams } from "react-router-dom";
import { AllAdsContext } from "../FCglobal/ContextAllAds";
import haertIcon from '../Icons/heart.png';
import heartEmptyIcon from '../Icons/heartEmpty.png';
import { UserContext } from "../FCglobal/ContextUser";

export default function adDetails() {
  const [showAllImages, setShowAllImages] = useState(false);
  const { adId } = useParams();
  const { getAd } = useContext(AllAdsContext);
  const { user ,deleteOrAddToUserSavedAds,updateUser} = useContext(UserContext);
  const [ad, setAd] = useState(getAd(adId));
  const addOrDeleteSaveAd=async(e)=>{
    e.stopPropagation();
    deleteOrAddToUserSavedAds(ad.id)
    try {
      const response = await fetch("https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/User/SavedAds", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          adId: ad.id,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        return errorData;
      }
  
      const result = await response.json();
      console.log("Success:", result);
      updateUser(result.user)
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  
  }
  
if (!ad) {
  return <p>Ad not found</p>; // Handle case where ad is not found
}
  const handleShowAllImages = () => {
    setShowAllImages(true);
  };

  const handleBackToDetails = () => {
    setShowAllImages(false);
  };

  if (showAllImages) {
    // תצוגת כל התמונות בדף ייעודי
    return (
      <div className="all-images-container">
        <button className="back-button" onClick={handleBackToDetails}>
          חזרה לפרטי המוצר
        </button>
        <div className="all-images-grid">
          {ad.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`ad-${index}`}
              className="all-image"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ad-details-container">
      {/* תמונות */}
      <div className="ad-images">
        {ad.images.slice(0, 2).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`ad-${index}`}
            className="ad-image"
          />
        ))}
          <button className="show-all-button" onClick={handleShowAllImages}>
            צפייה בכל התמונות
          </button>
      </div>

      <img  onClick={addOrDeleteSaveAd} className="haert-button" src={user.savedAds.includes(ad.id)?haertIcon:heartEmptyIcon}/>
      {/* פרטי הפריט */}
      <div className="ad-details">
        <h2>{ad.title}</h2>
        <p className="ad-description">{ad.description}</p>
        <p className="ad-category">
          <strong>קטגוריה:</strong> {ad.category}
        </p>
        <p className="ad-condition">
          <strong>מצב:</strong> {ad.condition}
        </p>
        <p className="ad-price">
          <strong>מחיר:</strong> ₪{ad.price}
        </p>
        <p className="ad-location">
          <strong>מיקום:</strong> {ad.city}, {ad.street} {ad.houseNumber}
        </p>
        <p className="ad-seller">
          <strong>שם המוכר:</strong> {ad.sellerName}
        </p>
        <p className="ad-contact">
          <strong>פרטי התקשרות:</strong> {ad.sellerContact}
        </p>
      </div>

   
    </div>
  );
}
