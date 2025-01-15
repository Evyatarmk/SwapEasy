import React, { createContext, useState } from 'react';

export const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [popup, setPopup] = useState({ message: '', isVisible: false, onResult: null });

  const showPopup = (message, onResult) => {
    setPopup({ message, isVisible: true, onResult });
  };

  const hidePopup = (result) => {
    if (popup.onResult) {
      popup.onResult(result);  // Return the result (Yes or No) to the caller
    }
    setPopup({ message: '', isVisible: false, onResult: null });
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {popup.isVisible && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <p style={styles.message}>{popup.message}</p>
            <div style={styles.buttonContainer}>
              <button style={styles.yesButton} onClick={() => hidePopup(true)}>
                כן
              </button>
              <button style={styles.noButton} onClick={() => hidePopup(false)}>
                לא
              </button>
            </div>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
}



// Inline styles
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '300px',
    maxWidth: '90%',
  },
  message: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  yesButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  noButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
