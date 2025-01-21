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
    window.location.href ="https://us-east-1ecoh9tvdf.auth.us-east-1.amazoncognito.com/login?client_id=hv93sgcsom9m5jqtkl2e7id67&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fswap-easy.s3.us-east-1.amazonaws.com%2Findex.html";
    return null; // החזר null כדי למנוע רינדור הקומפוננטה
  }

  return children;
};

export default ProtectedRoute;
