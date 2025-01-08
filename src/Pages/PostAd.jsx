import React, { useState } from "react";
import "../CSS/PostAd.css";

export default function PostAd() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const filteredFiles = files.filter((file) => !images.some((img) => img.name === file.name));
    let newImages=[...images, ...filteredFiles]
    setImages(newImages);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("מודעה נשלחה בהצלחה!");
  };

  return (
    <div className="post-ad-container">
      <h2>פרסום מודעה</h2>
      <form className="post-ad-form" onSubmit={handleSubmit}>
        {/* קטגוריה */}
        <label>
          קטגוריה:
          <select required>
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
          <input type="text" placeholder="כתוב כותרת למודעה" required />
        </label>

        {/* תיאור */}
        <label>
          תיאור:
          <textarea placeholder="כתוב תיאור מלא למודעה" rows="5" required></textarea>
        </label>

        {/* מחיר */}
        <label>
          מחיר:
          <input type="number" placeholder="₪" min="0" required />
        </label>

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