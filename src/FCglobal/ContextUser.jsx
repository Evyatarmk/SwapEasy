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
    myAds:[1,2],
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

  return (
    <UserContext.Provider value={{ user, removeUser, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
}