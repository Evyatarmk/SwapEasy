import React, { createContext, useState, useEffect } from 'react';
import { getAllAds } from '../apicalls/GetAllAds';

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

      const response = await getAllAds('https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/Ads'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`Error fetching ads: ${response.statusText}`);
      }

      const data = await response.json();
      setAllAds(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ads when the component mounts
  useEffect(() => {
    fetchAllAds();
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
    return allAds.find((ad) => ad.id === id);
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
    <AllAdsContext.Provider value={{ allAds, getAd, addNewAd, removeAd, updateAd, loading, error }}>
      {children}
    </AllAdsContext.Provider>
  );
};
