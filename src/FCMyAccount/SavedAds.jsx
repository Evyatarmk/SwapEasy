import React from 'react';
import '../CSS/SavedAds.css';

export default function SavedAds() {
  // כאן אפשר להכניס את המודעות ששמרת, לדוגמה:
  const savedAds = [
    { id: 1, title: 'מודעה 1', category: 'רכב', price: '₪50,000', image: "" },
    { id: 2, title: 'מודעה 2', category: 'דירות', price: '₪1,200,000', image:  ''},
    { id: 3, title: 'מודעה 3', category: 'טכנולוגיה', price: '₪3,000', image: "" },
  ];

  return (
    <div className="saved-ads-container">
      <h2>המודעות השמורות שלי</h2>
      <div className="saved-ads-list">
        {savedAds.map((ad) => (
          <div className="saved-ad" key={ad.id}>
              <button className="delete-button">✖</button>
            <div className="ad-info">
              <h3>{ad.title}</h3>
              <p className="category">{ad.category}</p>
              <p className="price">{ad.price}</p>
            </div>
            <img src={ad.image} alt="מודעה" className="ad-thumbnail" />
          </div>
        ))}
      </div>
    </div>
  );
}
