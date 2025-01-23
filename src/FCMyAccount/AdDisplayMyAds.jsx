import React, { useContext, useState } from 'react';
import '../CSS/AdDisplayMyAds.css';
import { useNavigate } from 'react-router-dom';
import editIcon from '../Icons/edit.png';
import deleteIcon from '../Icons/delete.png';
import { PopupContext } from '../FCglobal/Popup';
import { UserContext } from '../FCglobal/ContextUser';
import isTokenValid from '../FCglobal/isTokenValid';
import { AllAdsContext } from '../FCglobal/ContextAllAds';

export default function AdDisplayMyAds({ ad }) {
  const navigate = useNavigate();
  const { showPopup } = useContext(PopupContext);
  const { user,updateUserMyAds } = useContext(UserContext);
  const { removeAd } = useContext(AllAdsContext);

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
         const idToken = localStorage.getItem("idToken"); 
                if (!idToken || !isTokenValid(idToken)) {
                  navigate("")
                return;
              }
              console.log( JSON.stringify({id:ad.id,userId:user.id}))
          const response = await fetch("https://esg7w0u40m.execute-api.us-east-1.amazonaws.com/Dev/Ad", {
            method: "DELETE", // Specify the HTTP method
            headers: {
              "Content-Type": "application/json", // Required for JSON payload
              "Authorization":idToken
            },
            body: JSON.stringify({id:ad.id,userId:user.id}), // Convert ad data to JSON string
          });

          // Check if the response is successful
          if (!response.ok) {
            throw new Error(`Failed to DELETE ad. Status: ${response.status}, Message: ${response.statusText}`);
          }

          const result = await response.json(); // Parse the response JSON
          console.log("Ad DELETE successfully:", result);
          updateUserMyAds(ad.id)
          removeAd(ad.id)
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
        src={ad.images[0] || 'placeholder.jpg'}
        className="ad-thumbnail"
        alt={ad.title || 'Ad thumbnail'}
        onClick={goToAdDetails}
      />
    </div>
  );
}
