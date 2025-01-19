import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the ads
export const AllAdsContext = createContext();

export const AllAdsProvider = ({ children }) => {

  const [allAds, setAllAds] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

 // Function to fetch ads from the API
const fetchAllAds = async () => {
  try {
    setLoading(true);
    setError(null);

    // Fetch data from the API
    const response = await fetch("https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/Ads", {
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
    setAllAds(ads.body);
  } catch (err) {
    // Handle errors
    console.error("Error fetching ads:", err.message);
    setError(err.message);
  } finally {
    // Ensure loading is false after the operation
    setLoading(false);
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
    setAllAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
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
