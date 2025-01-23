import React, { createContext, useState, useContext } from "react";
import LoadingGIF from '../Icons/loading.gif';

// יצירת הקונטקסט
const LoadingContext = createContext();

// ספק (Provider) לניהול מצב הטעינה
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // פונקציות לניהול מצב הטעינה
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      <>
        {children}
        {isLoading && (
          <div style={styles.overlay}>
            <img
              src={LoadingGIF}
              alt="Loading..."
              style={styles.gif}
            />
          </div>
        )}
      </>
    </LoadingContext.Provider>
  );
};

// הוק מותאם אישית לגישה לקונטקסט
export const useLoading = () => {
  return useContext(LoadingContext);
};

// סגנונות מובנים
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)", // רקע חצי שקוף
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  gif: {
    width: "100px",
    height: "100px",
  },
};
