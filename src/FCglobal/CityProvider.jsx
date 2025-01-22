import React, { createContext, useContext, useState, useEffect } from "react";

// יצירת ה-Context
const CityContext = createContext();

// ספק ה-Context
export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);

  // הפונקציה שמביאה את רשימת הערים
  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }

      const data = await response.json();
      const cityNames = data.map((city) => city.name);
      setCities(cityNames); // לעדכן את רשימת הערים
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // טעינת רשימת הערים בעת טעינת הקומפוננטה
  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <CityContext.Provider value={{ cities }}>
      {children}
    </CityContext.Provider>
  );
};

// Hook מותאם אישית לגישה ל-Context
export const useCityContext = () => {
  return useContext(CityContext);
};
