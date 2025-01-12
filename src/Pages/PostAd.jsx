import React, { useState } from "react";
import "../CSS/PostAd.css";

export default function PostAd() {
  const [images, setImages] = useState([]);
  const [productCondition, setProductCondition] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Ad, setAd] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    pickupLocation: {
      city: "",
      street: "",
      houseNumber: "",
    },
  });

  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city" || name === "street" || name === "houseNumber") {
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
    const filteredFiles = files.filter((file) => !images.some((img) => img.name === file.name));
    const newImages = [...images, ...filteredFiles];
    setImages(newImages);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleConditionClick = (condition) => {
    setProductCondition(condition);
    setErrorMessage(""); // Reset error message when a condition is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productCondition) {
      setErrorMessage("יש לבחור מצב למוצר לפני פרסום המודעה.");
      return;
    }

    // Combine all ad details into a single object
    const fullAd = {
      ...Ad,
      productCondition,
      images,
    };


  };

  return (
    <div className="post-ad-container">
      <h2>פרסום מודעה</h2>
      <form className="post-ad-form" onSubmit={handleSubmit}>
        {/* קטגוריה */}
        <label>
          קטגוריה:
          <select name="category" required onChange={handleChange}>
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
              placeholder="מספר הבית"
              required
              onChange={handleChange}
            />
          </label>
        </div>

        {/* העלאת תמונות */}
        <label className="image-upload">
          העלאת תמונות:
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        </label>

        <div className="image-preview">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={URL.createObjectURL(image)} alt={`uploaded-${index}`} />
              <button type="button" onClick={() => removeImage(index)}>
                ✖
              </button>
            </div>
          ))}
        </div>

        {/* כפתור פרסום */}
        <button type="submit" className="submit-button">
          פרסם מודעה
        </button>
      </form>
    </div>
  );
}
