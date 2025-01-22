import React, { useContext, useEffect, useState } from "react";
import "../CSS/PostAd.css";
import { postAd } from "../apicalls/PostAd";
import convertImagesToBase64, { GetImageUpload } from "../FCglobal/convertImagesToBase64";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../FCglobal/ContextUser";
import { AllAdsContext } from "../FCglobal/ContextAllAds";
import isTokenValid from "../FCglobal/isTokenValid";
import { useCityContext } from "../FCglobal/CityProvider";

export default function PostAd() {
  const navigate = useNavigate();
  const { user, AddAdToUserMyAds } = useContext(UserContext);
  const { addNewAd } = useContext(AllAdsContext);
  const { cities } = useCityContext(); // גישה לרשימת הערים דרך ה-Context

  const [images, setImages] = useState([]);
  const [productCondition, setProductCondition] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Ad, setAd] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    city: "",
    street: "",
    houseNumber: "",
    sellerContact: "",
    sellerName: ""
  });
useEffect(()=>{
  console.log(user.city)
setAd({
    category: "",
    title: "",
    description: "",
    price: "",
    city: user.city,
    street: user.street,
    houseNumber: user.houseNumber,
    sellerContact: user.phone,
    sellerName: user.firstName+" "+user.lastName
  });
},[user])
  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAd((prevAd) => ({
      ...prevAd,
      [name]: value,
    }));

  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const filteredFiles = files.filter((file) => !images.some((img) => img.name === file.name));
    const newImages = [...images, ...filteredFiles];
    setImages(newImages);
    console.log(newImages)
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleConditionClick = (condition) => {
    setProductCondition(condition);
    setErrorMessage(""); // Reset error message when a condition is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idToken = localStorage.getItem("idToken");
    if (!idToken || !isTokenValid(idToken)) {
      navigate("")
      return;
    }

    if (!productCondition) {
      setErrorMessage("יש לבחור מצב למוצר לפני פרסום המודעה.");
      return;
    }

    GetImageUpload(images, async (base64Images) => {
      // Combine all ad details into a single object
      const fullAd = {
        ...Ad,
        condition: productCondition,
        images: base64Images,
      };
      console.log(JSON.stringify({ ...fullAd, userId: user.id }))
      try {
        const response = await fetch("https://esg7w0u40m.execute-api.us-east-1.amazonaws.com/Dev/Ad", {
          method: "POST", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json", // Required for JSON payload
            "Authorization": idToken
          },
          body: JSON.stringify({ ...fullAd, userId: user.id }), // Convert ad data to JSON string
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to post ad. Status: ${response.status}, Message: ${response.statusText}`);
        }

        const result = await response.json(); // Parse the response JSON
        console.log("Ad posted successfully:", result);
        AddAdToUserMyAds(result.item.id)
        addNewAd(result.item)
        navigate("/MyAccount/my-ads")
      } catch (error) {
        console.error("Error posting ad:", error.message);
        throw error; // Re-throw the error for the caller to handle
      }
    });

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
            pattern="[א-תa-zA-Z\s]+" // Hebrew, English, and spaces
            title="יש להזין רק אותיות בעברית, באנגלית או רווחים"
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
            pattern="[א-תa-zA-Z\s]+" // Hebrew, English, and spaces
            title="יש להזין רק אותיות בעברית, באנגלית או רווחים"
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
                  className={`condition-button ${productCondition === condition ? "active" : ""
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
              value={Ad.city}
            />
          </label>
       
          <label>
            רחוב:
            <input
              type="text"
              name="street"
              placeholder="שם הרחוב"
              required
              pattern="[א-תa-zA-Z\s]+" // Hebrew, English, and spaces
              title="יש להזין רק אותיות בעברית, באנגלית או רווחים"
              onChange={handleChange}
              value={Ad.street}
            />
          </label>
          <label>
            מס׳:
            <input
              type="number"
              min="0"
              name="houseNumber"
              placeholder="מספר הבית"
              required
              onChange={handleChange}
              value={Ad.houseNumber}

            />
          </label>
          <label>
            שם:
            <input
              type="text"
              name="sellerName"
              placeholder="שם בעל המודעה"
              required
              pattern="[א-תa-zA-Z\s]+" // Hebrew, English, and spaces
              title="יש להזין רק אותיות בעברית, באנגלית או רווחים"
              onChange={handleChange}
              value={Ad.sellerName}
            />
          </label>
          <label>
            פרטי התקשרות:
            <input
              type="text"
              name="sellerContact"
              placeholder="מספר פאלפון או מייל"
              required
              onChange={handleChange}
              value={Ad.sellerContact}

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
