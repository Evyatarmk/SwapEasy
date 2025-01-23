import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a Context for the ads
export const AllAdsContext = createContext();

export const AllAdsProvider = ({ children }) => {
  const navigate = useNavigate();

  const [allAds, setAllAds] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

 // Function to fetch ads from the API
const fetchAllAds = async () => {
  try {
    setLoading(true);
    setError(null);

    // Fetch data from the API
    const response = await fetch("https://esg7w0u40m.execute-api.us-east-1.amazonaws.com/Dev/Ad", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch ads: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON response
    const ads = await response.json();

    // Update the state with the fetched ads
    setAllAds(ads.ads);
  } catch (err) {
    // Handle errors
    console.error("Error fetching ads:", err.message);
    navigate("/ErrorPage")
  } 
};

  // Fetch ads when the component mounts
  useEffect(() => {
    fetchAllAds()
  }, []);

  // Function to add a new ad
  const addNewAd = (ad) => {
    setAllAds((prevAds) => [...prevAds, ad]);
  };

  // Function to remove an ad by ID
  const removeAd = (id) => {
    let newAllAds=allAds.filter((ad) => ad.id != id)
    setAllAds(newAllAds);
  };

  // Function to get an ad by ID
  const getAd = (id) => {
    return allAds.find((ad) => ad.id == id);
  };

  // Function to update an ad
  const updateAd = (updatedAd) => {
    setAllAds((prevAds) =>
      prevAds.map((ad) =>
        ad.id === updatedAd.id ? updatedAd : ad
      )
    );
  };

  return (
    <AllAdsContext.Provider value={{ allAds, getAd, addNewAd, removeAd, updateAd }}>
      {children}
    </AllAdsContext.Provider>
  );
};
