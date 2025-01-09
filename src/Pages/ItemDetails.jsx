import React, { useState } from "react";
import "../CSS/ItemDetails.css";

export default function ItemDetails({ item }) {
  const [showAllImages, setShowAllImages] = useState(false);

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
          {item.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`item-${index}`}
              className="all-image"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="item-details-container">
      {/* תמונות */}
      <div className="item-images">
        {item.images.slice(0, 2).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`item-${index}`}
            className="item-image"
          />
        ))}
        {item.images.length > 2 && (
          <button className="show-all-button" onClick={handleShowAllImages}>
            צפייה בכל התמונות
          </button>
        )}
      </div>

      {/* פרטי הפריט */}
      <div className="item-details">
        <h2>{item.title}</h2>
        <p className="item-description">{item.description}</p>
        <p className="item-category">
          <strong>קטגוריה:</strong> {item.category}
        </p>
        <p className="item-condition">
          <strong>מצב:</strong> {item.condition}
        </p>
        <p className="item-price">
          <strong>מחיר:</strong> ₪{item.price}
        </p>
        <p className="item-location">
          <strong>מיקום:</strong> {item.city}, {item.street} {item.houseNumber}
        </p>
        <p className="item-seller">
          <strong>שם המוכר:</strong> {item.sellerName}
        </p>
        <p className="item-contact">
          <strong>פרטי התקשרות:</strong> {item.sellerContact}
        </p>
      </div>

   
    </div>
  );
}
