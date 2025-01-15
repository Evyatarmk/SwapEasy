import React, { useContext, useState } from "react";
import "../CSS/PostAd.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PopupContext } from "../FCglobal/Popup";

export default function UpdateAd() {
  const location = useLocation();
  const adToUpdate = location.state.ad;
  const [images, setImages] = useState(adToUpdate.images || []);
  const [productCondition, setProductCondition] = useState(adToUpdate.condition || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [Ad, setAd] = useState({ ...adToUpdate });
  const { showPopup } = useContext(PopupContext);
  const navigate = useNavigate();

  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["city", "street", "houseNumber"].includes(name)) {
      setAd((prevAd) => ({
        ...prevAd,
        pickupLocation: {
          ...prevAd.pickupLocation,
          [name]: value,
        },
      }));
    } else {
      setAd((prevAd) => ({
        ...prevAd,
        [name]: value,
      }));
    }
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.filter(
      (file) => !images.some((img) => img.name === file.name)
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Remove an image
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle product condition selection
  const handleConditionClick = (condition) => {
    setProductCondition(condition);
    setErrorMessage("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productCondition) {
      setErrorMessage("יש לבחור מצב למוצר לפני פרסום המודעה.");
      return;
    }

    // Combine all ad details into a single object
    const fullAd = {
      ...Ad,
      condition: productCondition,
      images,
    };
    showPopup('?לעדכן את המודעה ', (result) => {
      if (result) {
        navigate("/MyAccount/my-ads")
      } else {
        alert('User clicked No!');
      }
    });

  };

  return (
    <div className="post-ad-container">
      <h2>עדכון מודעה</h2>
      <form className="post-ad-form" onSubmit={handleSubmit}>
        {/* קטגוריה */}
        <label>
          קטגוריה:
          <select
            name="category"
            value={Ad.category}
            required
            onChange={handleChange}
          >
            <option value="">בחר קטגוריה</option>
            <option value="רכב">רכב</option>
            <option value="יד שניה">יד שניה</option>
            <option value="נדלן">נדלן</option>
            <option value="חיות מחמד">חיות מחמד</option>
          </select>
        </label>

        {/* כותרת */}
        <label>
          כותרת:
          <input
            type="text"
            name="title"
            value={Ad.title}
            placeholder="כתוב כותרת למודעה"
            required
            onChange={handleChange}
          />
        </label>

        {/* תיאור */}
        <label>
          תיאור:
          <textarea
            name="description"
            value={Ad.description}
            placeholder="כתוב תיאור מלא למודעה"
            rows="5"
            required
            onChange={handleChange}
          ></textarea>
        </label>

        {/* מחיר */}
        <label>
          מחיר:
          <input
            type="number"
            name="price"
            value={Ad.price}
            placeholder="₪"
            min="0"
            required
            onChange={handleChange}
          />
        </label>

        {/* מצב המוצר */}
        <div className="product-condition">
          <h3>מצב המוצר</h3>
          <p className="condition-description">
            השתדלו לדייק כדי לא לאכזב את הלקוחות שלכם
          </p>
          <div className="condition-buttons">
            {["חדש באריזה", "כמו חדש", "משומש", "נדרש תיקון", "לא רלוונטי"].map(
              (condition) => (
                <button
                  key={condition}
                  type="button"
                  className={`condition-button ${
                    productCondition === condition ? "active" : ""
                  }`}
                  onClick={() => handleConditionClick(condition)}
                >
                  {condition}
                </button>
              )
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        {/* כתובת האיסוף */}
        <div className="pickup-location">
          <h3>מאיפה אוספים את המוצר?</h3>
          <p className="pickup-description">
            אנחנו ממליצים שזו תהיה הכתובת בה נמצאים רוב היום (בית או מקום עבודה). אל
            דאגה, נפרסם רק את העיר ולא את הכתובת המלאה.
          </p>
          <label>
            יישוב:
            <input
              type="text"
              name="city"
              value={Ad.city}
              placeholder="שם היישוב"
              required
              onChange={handleChange}
            />
          </label>
          <label>
            רחוב:
            <input
              type="text"
              name="street"
              value={Ad.street}
              placeholder="שם הרחוב"
              required
              onChange={handleChange}
            />
          </label>
          <label>
            מס׳:
            <input
              type="text"
              name="houseNumber"
              value={Ad.houseNumber}
              placeholder="מספר הבית"
              required
              onChange={handleChange}
            />
          </label>
        </div>

        {/* העלאת תמונות */}
        <label className="image-upload">
          העלאת תמונות:
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </label>

        <div className="image-preview">
  {images.map((image, index) => (
    <div key={index} className="image-item">
      {/* Check if the image is already a URL or needs URL.createObjectURL */}
      <img
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        alt={`uploaded-${index}`}
      />
      <button type="button" onClick={() => removeImage(index)}>
        ✖
      </button>
    </div>
  ))}
</div>

        {/* כפתור פרסום */}
        <button type="submit" className="submit-button">
          עדכן מודעה
        </button>
      </form>
    </div>
  );
}
