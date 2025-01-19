import React, { createContext, useState } from 'react';

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