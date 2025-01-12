import React, { createContext, useState } from 'react';

// Create a Context for the users
export const AllAdsContext = createContext();

export const AllAdsProvider = ({ children }) => {
  // State to hold the array of users
  const [allAds, setAllAds] = useState([
    {
    id:1,  
    title: "Brand New Laptop for Sale",
    description: "Selling a brand-new laptop with 16GB RAM and 512GB SSD. Perfect for work or gaming.",
    category:"car",
    price: 800,
    condition: "New",
    pickUpPlace: {
      city: "New York",
      street: "Main Street",
      houseNumber: 123
    },
    photos: [
      "https://example.com/photos/laptop1.jpg",
      "https://example.com/photos/laptop2.jpg"
    ]
  },
  {
    id:2,  
    headline: "jfrjr",
    description: "Selling a brand-new laptop with 16GB RAM and 512GB SSD. Perfect for work or gaming.",
    category:"car",
    price: 333,
    condition: "New",
    pickUpPlace: {
      city: "New York",
      street: "Main Street",
      houseNumber: 33
    },
    photos: [
      "https://example.com/photos/laptop1.jpg",
      "https://example.com/photos/laptop2.jpg"
    ]
  },
  ]);

  // Function to add a user
  const addNewAd = (ad) => {
    setUsers((prevAds) => [...prevAds, ad]);
  };

  // Function to remove a user by ID
  const removeAd = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Function to update a ad
  const updateAd = (updatedAd) => {
    setUsers((prevAds) =>
      prevAds.map((ad) =>
        ad.id === updatedAd.id ? updatedAd : ad
      )
    );
  };

  return (
    <AllAdsContext.Provider value={{ allAds, addNewAd, removeAd, updateAd }}>
      {children}
    </AllAdsContext.Provider>
  );
};