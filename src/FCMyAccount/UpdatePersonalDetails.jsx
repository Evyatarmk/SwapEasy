import React, { useContext, useState } from 'react';
import { UserContext } from '../FCglobal/ContextUser';
import "../CSS/UpdatePersonalDetails.css";
import MyAccountSidebar from "./MyAccountSidebar";

export default function UpdatePersonalDetails() {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("הפרטים האישיים עודכנו בהצלחה!");
    console.log(formData)
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
      <form onSubmit={handleSubmit} className="update-details-form">
        {/* שם פרטי */}
        <div className="form-group">
          <label htmlFor="firstName">שם פרטי*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* שם משפחה */}
        <div className="form-group">
          <label htmlFor="lastName">שם משפחה*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* טלפון נייד */}
        <div className="form-group">
          <label htmlFor="phone">טלפון נייד*</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* מייל */}
        <div className="form-group">
          <label htmlFor="email">מייל*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
          <label htmlFor="city">יישוב / עיר*</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">רחוב*</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="houseNumber">מספר בית*</label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            required
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
