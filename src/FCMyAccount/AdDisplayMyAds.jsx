import React, { useContext, useState } from 'react';
import '../CSS/AdDisplayMyAds.css';
import { useNavigate } from 'react-router-dom';
import editIcon from '../Icons/edit.png';
import deleteIcon from '../Icons/delete.png';
import { PopupContext } from '../FCglobal/Popup';

export default function AdDisplayMyAds({ ad }) {
  const navigate = useNavigate();
  const { showPopup } = useContext(PopupContext);

  const goToAdDetails = () => {
    navigate(`/ad-details/${ad.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate('/MyAccount/update-Ad',{state:{ad:ad}});
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    showPopup('?האם למחוק את המודעה', (result) => {
      if (result) {
        alert('User clicked Yes!');
      } else {
        alert('User clicked No!');
      }
    });
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
