import React, { createContext, useState, useEffect } from 'react';
import { getAllAds } from '../apicalls/GetAllAds';

// Create a Context for the ads
export const AllAdsContext = createContext();

export const AllAdsProvider = ({ children }) => {
<<<<<<< Updated upstream
  // State to hold the array of users
  const [allAds, setAllAds] = useState([
    {
      id: 1,
      title: "Brand New Laptop for Sale",
      description: "Selling a brand-new laptop with 16GB RAM and 512GB SSD. Perfect for work or gaming.",
      category: "רכב",
      price: 800,
      condition: "חדש באריזה",
   
        city: "New York",
        street: "Main Street",
        houseNumber: 123,
        sellerContact:'fff',
        sellerName:'hhhh',
      images: [
        "https://example.com/photos/laptop1.jpg",
        "https://example.com/photos/laptop2.jpg"
      ]
    },
    {
      id: 2,
      title: "jfrjr",
      description: "Selling a brand-new laptop with 16GB RAM and 512GB SSD. Perfect for work or gaming.",
      category: "נדלן",
      price: 333,
      condition: "חדש באריזה",

      city: "New York",
      street: "Main Street",
      houseNumber: 33,
      sellerContact:'fff',
      sellerName:'hhhh',
      images: [
        "https://www.razcomputers.co.il/wp-content/uploads/2020/03/%D7%9E%D7%97%D7%A9%D7%91-%D7%A0%D7%99%D7%99%D7%93-ASUS-412F-%D7%90%D7%A1%D7%95%D7%A1-scaled.jpg",
        "data:image/jpeg;base64,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"
      ]
    },
    {
      id: 3,
      title: "ארון",
      description: "Selling a brand-new laptop with 16GB RAM and 512GB SSD. Perfect for work or gaming.",
      category: "יד שנייה",
      price: 333,
      condition: "חדש באריזה",
=======
  const [allAds, setAllAds] = useState([]); 
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Function to fetch ads from the API
  const fetchAllAds = async () => {
    try {
      setLoading(true);
      setError(null);
>>>>>>> Stashed changes

      const response = await getAllAds('https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/Ads'); 
      
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
