import React, { useContext, useState } from "react";
import "../CSS/AdDetails.css";
import { useParams } from "react-router-dom";
import { AllAdsContext } from "../FCglobal/ContextAllAds";

export default function adDetails() {
  const [showAllImages, setShowAllImages] = useState(false);
  const { adId } = useParams();
  const { getAd } = useContext(AllAdsContext);
  const ad=getAd(adId);
console.log(ad)
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
