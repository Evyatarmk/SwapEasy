import React, { useContext, useState } from 'react';
import '../CSS/AdDisplayMyAds.css';
import { useNavigate } from 'react-router-dom';
import editIcon from '../Icons/edit.png';
import deleteIcon from '../Icons/delete.png';
import { PopupContext } from '../FCglobal/Popup';
import { UserContext } from '../FCglobal/ContextUser';

export default function AdDisplayMyAds({ ad }) {
  const navigate = useNavigate();
  const { showPopup } = useContext(PopupContext);
  const { updateUserMyAds } = useContext(UserContext);

  const goToAdDetails = () => {
    navigate(`/ad-details/${ad.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate('/MyAccount/update-Ad',{state:{ad:ad}});
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    showPopup('?האם למחוק את המודעה',async (result) => {
      if (result) {
        try {
          console.log(ad.id)
          const response = await fetch("https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/Ad", {
            method: "DELETE", // Specify the HTTP method
            headers: {
              "Content-Type": "application/json", // Required for JSON payload
            },
            body: JSON.stringify({id:ad.id}), // Convert ad data to JSON string
          });

          // Check if the response is successful
          if (!response.ok) {
            throw new Error(`Failed to DELETE ad. Status: ${response.status}, Message: ${response.statusText}`);
          }

          const result = await response.json(); // Parse the response JSON
          console.log("Ad DELETE successfully:", result);
          updateUserMyAds(ad.id)
          navigate("/MyAccount")
        } catch (error) {
          console.error("Error posting ad:", error.message);
          throw error; // Re-throw the error for the caller to handle
        }
      } else {
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
