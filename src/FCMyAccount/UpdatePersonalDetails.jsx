import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../FCglobal/ContextUser';
import "../CSS/UpdatePersonalDetails.css";
import MyAccountSidebar from "./MyAccountSidebar";
import { PopupContext } from '../FCglobal/Popup';
import { useNavigate } from 'react-router-dom';
import isTokenValid from '../FCglobal/isTokenValid';

export default function UpdatePersonalDetails() {
  const { user,updateUser } = useContext(UserContext);
  const { showPopup } = useContext(PopupContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(user);
useEffect(() => {
  setFormData(user)
 },[user])

  const handleChange = (e) => {
    console.log(JSON.stringify(formData))

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showPopup('?לעדכן את הפרופיל ', async(result) => {
      if (result) {
           const idToken = localStorage.getItem("idToken"); 
                if (!idToken || !isTokenValid(idToken)) {
                  navigate("/")
                return;
            }
        console.log(JSON.stringify(formData))
        try {
          const response = await fetch("https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/User", {
            method: "PUT", // Specify the HTTP method
            headers: {
              "Content-Type": "application/json", // Required for JSON payload
              "Authorization":idToken
            },
            
            body: JSON.stringify(formData), // Convert ad data to JSON string
          });

          // Check if the response is successful
          if (!response.ok) {
            throw new Error(`Failed to PUT ad. Status: ${response.status}, Message: ${response.statusText}`);
          }

          const result = await response.json(); // Parse the response JSON
          console.log("Ad update successfully:", result);
          updateUser(result.updatedUser)
          navigate("/MyAccount/my-ads")
        } catch (error) {
          console.error("Error posting ad:", error.message);
          throw error; // Re-throw the error for the caller to handle
        }
      } else {
        alert('User clicked No!');
      }
    });

  };

  const handleCancel = () => {
    // פעולה לביטול (ניתן לאפס את השדות אם נדרש)
    alert("השינויים בוטלו.");
  };

  return (
    <>
    <MyAccountSidebar />
    <div className="update-details-container">
      <h2>עדכון פרטים</h2>
      <h2>{user.email}</h2>
      <form onSubmit={handleSubmit} className="update-details-form">
        {/* שם פרטי */}
        <div className="form-group">
          <label htmlFor="firstName">שם פרטי</label>
          <input
            type="text"
            id="firstName"
            pattern="[א-תa-zA-Z\s]+" // Hebrew, English, and spaces
              title="יש להזין רק אותיות בעברית, באנגלית או רווחים"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            
          />
        </div>

        {/* שם משפחה */}
        <div className="form-group">
          <label htmlFor="lastName">שם משפחה</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            pattern="[א-תa-zA-Z\s]+" // Hebrew, English, and spaces
              title="יש להזין רק אותיות בעברית, באנגלית או רווחים"
            value={formData.lastName}
            onChange={handleChange}
            
          />
        </div>

        {/* טלפון נייד */}
        <div className="form-group">
          <label htmlFor="phone">טלפון נייד</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            
          />
        </div>


        {/* תאריך לידה */}
        <div className="form-group">
          <label htmlFor="birthDate">תאריך לידה</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          <small>אולי נצליח להפתיע אותך עם ברכה ביום ההולדת!</small>
        </div>

        {/* כתובת */}
        <h3>כתובת</h3>
        <p>כדאי למלא את הכתובת, כדי שנוכל לחבר אותה אוטומטית בפעם הבאה שתפרסמו מודעה</p>
        <div className="form-group">
          <label htmlFor="city">יישוב / עיר</label>
          <input
            type="text"
            id="city"
            name="city"
            pattern="[א-תa-zA-Z\s]+" // Hebrew, English, and spaces
              title="יש להזין רק אותיות בעברית, באנגלית או רווחים"
            value={formData.city}
            onChange={handleChange}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">רחוב</label>
          <input
            type="text"
            id="street"
            name="street"
            pattern="[א-תa-zA-Z\s]+" // Hebrew, English, and spaces
              title="יש להזין רק אותיות בעברית, באנגלית או רווחים"
            value={formData.street}
            onChange={handleChange}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="houseNumber">מספר בית</label>
          <input
            type="number"
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            
          />
        </div>

        {/* כפתורי שמירה וביטול */}
        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            ביטול
          </button>
          <button type="submit" className="update-button">
            שמירה
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
