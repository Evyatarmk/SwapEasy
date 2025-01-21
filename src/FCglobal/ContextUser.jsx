import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
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
    savedAd: []
  });

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    if (idToken) {
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
    let newMyAd = user.myAds.filter(adId => adId = !id)
    let newUser = { ...user, myAds: newMyAd }
    setUser(newUser);
    console.log(newUser)
  };
   // Function to update a user
   const AddAdToUserMyAds = (id) => {
    let newMyAd = [...user.myAds,id]
    let newUser = { ...user, myAds: newMyAd }
    setUser(newUser);
  };



  return (
    <UserContext.Provider value={{ user, updateUserMyAds, removeUser, updateUser ,AddAdToUserMyAds}}>
      {props.children}
    </UserContext.Provider>
  );
}