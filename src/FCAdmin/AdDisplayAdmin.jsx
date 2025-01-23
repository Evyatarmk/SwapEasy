import React, { useContext, useState } from 'react';
import '../CSS/AdDisplayMyAds.css';
import { useNavigate } from 'react-router-dom';
import editIcon from '../Icons/edit.png';
import deleteIcon from '../Icons/delete.png';
import { PopupContext } from '../FCglobal/Popup';
import { UserContext } from '../FCglobal/ContextUser';
import isTokenValid from '../FCglobal/isTokenValid';
import { AllAdsContext } from '../FCglobal/ContextAllAds';
import { useLoading } from '../FCglobal/ContextLoading';

export default function AdDisplayAdmin({ ad }) {
  const navigate = useNavigate();
  const { showPopup } = useContext(PopupContext);
  const { updateUserMyAds ,user} = useContext(UserContext);
  const { removeAd } = useContext(AllAdsContext);
  const { showLoading, hideLoading } = useLoading();

  const goToAdDetails = () => {
    navigate(`/ad-details/${ad.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate('/UpdateAdAdmin/',{state:{ad:ad}});
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    showPopup('?האם למחוק את המודעה',async (result) => {
      if (result) {
        showLoading()
        try {
         const idToken = localStorage.getItem("idToken"); 
                if (!idToken || !isTokenValid(idToken)) {
                  navigate("")
                return;
              }
              console.log("Authorization:"+idToken)
              console.log(JSON.stringify({id:ad.id}))
          const response = await fetch("https://esg7w0u40m.execute-api.us-east-1.amazonaws.com/Dev/Admin", {
            method: "DELETE", // Specify the HTTP method
            headers: {
              "Content-Type": "application/json", // Required for JSON payload
              "Authorization":idToken
            },
            body: JSON.stringify({Username:user.id,id:ad.id}), // Convert ad data to JSON string
          });

          // Check if the response is successful
          if (!response.ok) {
            hideLoading()
            throw new Error(`Failed to DELETE ad. Status: ${response.status}, Message: ${response.statusText}`);
          }

          const result = await response.json(); // Parse the response JSON
          console.log("Ad DELETE successfully:", result);
          removeAd(ad.id)
          hideLoading()
        } catch (error) {
          hideLoading()

          console.error("Error posting ad:", error.message);
          throw error; // Re-throw the error for the caller to handle
        }
      } else {
        hideLoading()

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
