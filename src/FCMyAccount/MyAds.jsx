
import React, { useState } from "react";
import "../CSS/MyAds.css";
import MyAccountSidebar from "./MyAccountSidebar";


export default function MyAds() {

  const [ads] = useState([
    {
      id: 1,
      title: "דירה להשכרה בתל אביב",
      status: "פעיל",
      createdAt: "2025-01-05",
      price: "5,000",
      image: "https://via.placeholder.com/80x50",
    },
    {
      id: 2,
      title: "רכב למכירה יד שניה",
      status: "מושהה",
      createdAt: "2025-01-03",
      price: "50,000",
      image: "https://via.placeholder.com/80x50",
    },
  ]);

  const handleEditDetails = () => {
    alert("אפשרות עריכת פרטים תהיה זמינה בקרוב!");
  };

  return (
    <div>
      <MyAccountSidebar />

      {/* מודעות שלי */}
      <div className="ads-section">
        <h3>המודעות שלי</h3>
        <table className="ads-table">
          <thead>
            <tr>
              <th>תמונה</th>
              <th>כותרת</th>
              <th>סטטוס</th>
              <th>תאריך יצירה</th>
              <th>מחיר</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td>
                  <img src={ad.image} alt={ad.title} className="ad-thumbnail" />
                </td>
                <td>{ad.title}</td>
                <td>{ad.status}</td>
                <td>{ad.createdAt}</td>
                <td>{ad.price} ₪</td>
                <td>
                  <button className="edit-button">ערוך</button>
                  <button className="delete-button">מחק</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
