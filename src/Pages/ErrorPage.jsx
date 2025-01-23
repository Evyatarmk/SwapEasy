import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage ({ errorCode = 404, message = "הדף שחיפשת לא נמצא" }) {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.errorCode}>{errorCode}</h1>
        <h2 style={styles.message}>{message}</h2>
        <p style={styles.description}>
          אנא בדוק את כתובת ה-URL שלך או חזור לעמוד הבית.
        </p>
        <button style={styles.button} onClick={() => navigate("/")}>
          חזור לעמוד הבית
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
  content: {
    maxWidth: "500px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  errorCode: {
    fontSize: "96px",
    fontWeight: "bold",
    color: "#e74c3c",
    margin: "0",
  },
  message: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: "16px 0",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "24px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

// Add hover effect to button
styles.button["&:hover"] = {
  backgroundColor: "#2980b9",
};

