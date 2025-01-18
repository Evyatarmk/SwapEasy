import React, { useState, useEffect, useContext } from 'react';
import '../CSS/AdminPage.css';
import { deleteAd } from '../apicalls/DeleteAd';
import { AllAdsContext } from '../FCglobal/ContextAllAds'; // Assuming your context is here

export default function AdminPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const { allAds, setAllAds } = useContext(AllAdsContext); // Destructure both allAds and setAllAds from context

  // Handle ad deletion
  const handleDelete = async (adId) => {
    const result = await deleteAd("https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/Ads",adId); // Call the deleteAd function
    if (result) {
      const updatedAds = allAds.filter(ad => ad.id !== adId); // Filter out the deleted ad
      setAllAds(updatedAds); // Update the context with the new list of ads
      setErrorMessage('Ad deleted successfully.');
    } else {
      setErrorMessage('Failed to delete ad.');
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      {errorMessage && <p>{errorMessage}</p>}

      <div className="ads-list">
        {allAds.length === 0 ? (
          <p>No ads to display.</p>
        ) : (
          allAds.map((ad) => (  // Make sure to map over allAds, not ads
            <div key={ad.id} className="ad-item">
              <h3>{ad.title}</h3>
              <p>{ad.description}</p>
              <p><strong>Price:</strong> {ad.price}₪</p>

              {/* Edit and Delete buttons */}
              <button className='AdminButton' onClick={() => alert(`Edit functionality for Ad ID: ${ad.id}`)}>Edit</button>
              <button  className='AdminButton'onClick={() => handleDelete(ad.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
