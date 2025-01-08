import React, { useState } from "react";
import "../CSS/UpdatePersonalDetails.css";

export default function UpdatePersonalDetails() {
  const [formData, setFormData] = useState({
    name: "אביתר מקבריט",
    email: "mt@gmail.com",
    phone: "050-1234567",
    address: "רחוב הדוגמה 10, תל אביב",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // שלח את המידע המעודכן לשרת או בצע פעולה כלשהי
    alert("הפרטים האישיים עודכנו בהצלחה!");
  };

  return (
    <div className="update-details-container">
      <h2>עדכון פרטים אישיים</h2>
      <form onSubmit={handleSubmit} className="update-details-form">
        <div className="form-group">
          <label htmlFor="name">שם מלא:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">אימייל:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">טלפון:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">כתובת:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="update-button">שמור שינויים</button>
      </form>
    </div>
  );
}
