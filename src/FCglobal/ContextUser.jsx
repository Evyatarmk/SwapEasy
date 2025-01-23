import React, { createContext, useContext, useEffect, useState } from 'react';
import isTokenValid from "./isTokenValid";
import { useNavigate } from 'react-router-dom';
import { AllAdsContext } from './ContextAllAds';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const navigate = useNavigate();
  const { removeAd,allAds } = useContext(AllAdsContext);

  // State to hold the array of users
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    birthDate: "",
    city: "",
    street: "",
    houseNumber: "",
    myAds: [],
    savedAds: []
  });
  
  useEffect(() => {
    const url = window.location.href;
  if (url.includes("id_token") && url.includes("access_token")) {
          // Parse the hash fragment to extract tokens
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const idToken1 = hashParams.get("id_token");
          const accessToken = hashParams.get("access_token");
    
          if (idToken1 && accessToken) {
            // Save tokens in localStorage
            console.log("ff")
            localStorage.setItem("idToken", idToken1);
            localStorage.setItem("accessToken", accessToken);
            window.location.hash = "/";

          }
  }
    const idToken = localStorage.getItem("idToken");
    if (idToken && isTokenValid(idToken)) {
      const [userId, email] = DecodeIDToken(idToken)
      console.log(JSON.stringify({ id: userId, email }))
        // Send userId to the server
        fetch("https://esg7w0u40m.execute-api.us-east-1.amazonaws.com/Dev/User", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId, email }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.user)
            setUser(data.user)
          })
          .catch((error) => {
            console.error("Error sending userId to the server:", error);
          });
    }
    else {
      // Parse the hash fragment to extract tokens
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const idToken = hashParams.get("id_token");
      const accessToken = hashParams.get("access_token");

      if (idToken && accessToken) {
        // Save tokens in localStorage
        
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        const [userId, email] = DecodeIDToken(idToken)
      
        // Send userId to the server
         fetch("https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/User", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId, email }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.user)
            setUser(data.user)
          })
          .catch((error) => {
            console.error("Error sending userId to the server:", error);
          });
      } else {
        console.error("Tokens not found in the URL hash.");
      }
    }

  }, []);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log("Checking admin status...");
      const idToken = localStorage.getItem("idToken");
  
      if (idToken && isTokenValid(idToken)) {
        const [userId, email] = DecodeIDToken(idToken);
  
        try {
          // שליחת userId לשרת
          const response = await fetch("https://esg7w0u40m.execute-api.us-east-1.amazonaws.com/Dev/Admin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: idToken,
            },
            body: JSON.stringify({ Username: userId }),
          });
  
          if (!response.ok) {
            throw new Error(`Failed to fetch admin status. Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log("Admin status:", data.isAdmin);
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error("Error sending userId to the server:", error);
        }
      }
    };
  
    checkAdminStatus();
  }, []);
  
  
  const DecodeIDToken = (idToken) => {
    // Decode the ID token to get user info
    const decodedToken = JSON.parse(atob(idToken.split(".")[1]));
    const userId = decodedToken.sub;
    const email = decodedToken.email; // Extract the email
    return [userId, email]
  }

  // Function to remove a user by ID
  const removeUser = (user) => {
    setUser(null);
  };

  // Function to update a user
  const updateUser = (user) => {
    setUser(user);
  };
  // Function to update a user
  const updateUserMyAds = (id) => {
    let newMyAd = user.myAds.filter(adId => adId !=id)
    console.log(newMyAd)
    
    let newUser = { ...user, myAds: newMyAd }
    removeAd(id)
    setUser(newUser);
  };
  
// Function to update a user's saved ads
const deleteOrAddToUserSavedAds = (id) => {
  let updatedSavedAds;
  if (user.savedAds.includes(id)) {
    updatedSavedAds = user.savedAds.filter(adId => adId !== id);
  } else {
    updatedSavedAds = [...user.savedAds, id];
  }
  const updatedUser = { ...user, savedAds: updatedSavedAds };
  setUser(updatedUser)
};
   // Function to update a user
   const AddAdToUserMyAds = (id) => {
    let newMyAd = [...user.myAds,id]
    let newUser = { ...user, myAds: newMyAd }
    setUser(newUser);
  };



  return (
    <UserContext.Provider value={{ isAdmin,user, updateUserMyAds, removeUser, updateUser ,AddAdToUserMyAds,deleteOrAddToUserSavedAds}}>
      {props.children}
    </UserContext.Provider>
  );
}