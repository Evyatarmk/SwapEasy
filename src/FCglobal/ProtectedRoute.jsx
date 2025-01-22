import React from "react";

const isTokenValid = (token) => {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const idToken = localStorage.getItem("idToken");

  console.log("sss")
  if (!idToken || !isTokenValid(idToken)) {
    // הפנה את המשתמש לכתובת ההתחברות המלאה
    window.location.href ="https://us-east-1ox3ph0c5m.auth.us-east-1.amazoncognito.com/login?client_id=75gadpm7rmsms7r733kmr6ffi0&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F";
    return null; // החזר null כדי למנוע רינדור הקומפוננטה
  }

  return children;
};

export default ProtectedRoute;
