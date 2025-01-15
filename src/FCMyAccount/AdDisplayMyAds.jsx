import React, { useState } from 'react';
import '../CSS/AdDisplayMyAds.css';
import { useNavigate } from 'react-router-dom';
import editIcon from '../Icons/edit.png';
import deleteIcon from '../Icons/delete.png';

export default function AdDisplayMyAds({ ad }) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const goToAdDetails = () => {
    navigate(`/ad-details/${ad.id}`);
  };

  const handleMouseEnter = () => {
    setShowOptions(true); // פותח את התפריט כאשר העכבר עובר מעל כפתור האפשרויות
  };

  const handleMouseLeave = () => {
    setShowOptions(false); // סוגר את התפריט כאשר העכבר יוצא מכפתור האפשרויות
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    console.log(`Editing ad with ID: ${ad.id}`);
    // הוספת לוגיקה לעריכה
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log(`Deleting ad with ID: ${ad.id}`);
    // הוספת לוגיקה למחיקה
  };

  return (
    <div className="container-ad" onClick={goToAdDetails}>
      <div className="ad-info">
        <div
          className="ad-info-header"
        >
          <div>
             <img
            className="options-button"
            src={deleteIcon}
            onClick={handleDelete}
          />
            <img
            className="options-button"
            src={editIcon}
            onClick={handleEdit}
          />
          </div>
          <p className="price">₪ {ad.price}</p>
        </div>
        <h3 className="ad-title" onClick={goToAdDetails}>
          {ad.title}
        </h3>
        <p className="category">{ad.category}</p>
      </div>
      <img
        src={ad.image || 'placeholder.jpg'}
        className="ad-thumbnail"
        alt={ad.title || 'Ad thumbnail'}
        onClick={goToAdDetails}
      />
    </div>
  );
}
