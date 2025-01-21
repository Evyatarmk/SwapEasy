import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  // State to hold the array of users
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    password:"111111",
    birthDate: "1990-05-15",
    city: "New York",
    street: "Main Street",
    houseNumber: 123,
    myAds:["9fafc249-1f44-425d-9605-38a2aa7fd9f1"],
    savedAd:[3]
  });

  useEffect(() => {
    // Parse the hash fragment to extract tokens
    const hashParams = new URLSearchParams(window.location.hash.substring(1));

    const idToken = hashParams.get("id_token");
    const accessToken = hashParams.get("access_token");

    if (idToken && accessToken) {
      // Save tokens in localStorage
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("accessToken", accessToken);

      // Decode the ID token to get user info
      const decodedToken = JSON.parse(atob(idToken.split(".")[1]));
      const userId = decodedToken.sub;
      const email = decodedToken.email; // Extract the email
      console.log(userId,email)
      // Send userId to the server
      fetch("https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:userId ,email}),
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
  }, []);


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
      let newMyAd=user.myAds.filter(adId=>adId=!id)
      let newUser={...user,myAds:newMyAd}
      setUser(newUser);
    };
  

  return (
    <UserContext.Provider value={{ user,updateUserMyAds, removeUser, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
}