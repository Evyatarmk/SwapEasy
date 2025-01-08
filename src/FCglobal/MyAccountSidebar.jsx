import React, { useState } from 'react';
import '../CSS/MyAccountSidebar.css';
import UserIcon from '../Icons/User-icon.png';

export default function MyAccountSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* כפתור פתיחה - יופיע רק במסכים קטנים */}
      <button className="menu-toggle-MyAccountSidebar" onClick={toggleSidebar}>
      
      </button>

      {/* Sidebar */}
      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleSidebar}>
          ✖
        </button>
        <div className="user-info">
          <img src={UserIcon} alt="User Icon" className="user-icon" />
          <h3>אביתר מקבריט</h3>
          <p>mt@gmail.com</p>
        </div>
        <ul className="menu-list">
          <li><a href="#my-ads">המודעות שלי</a></li>
          <li><a href="#update-info">עדכון פרטים</a></li>
          <li><a href="#saved-ads">מודעות שמורות</a></li>
          <li><a href="#recent-searches">חיפושים אחרונים</a></li>
          <li><a href="#tips">טיפים ומידע</a></li>
        </ul>
      </div>
      <nav className="desktop-nav">
     {/* Sidebar */}
     <div className={`sidebar-container-dev`}>
        <div className="user-info">
          <img src={UserIcon} alt="User Icon" className="user-icon" />
          <h3>אביתר מקבריט</h3>
          <p>mt@gmail.com</p>
        </div>
        <ul className="menu-list">
          <li><a href="#my-ads">המודעות שלי</a></li>
          <li><a href="#update-info">עדכון פרטים</a></li>
          <li><a href="#saved-ads">מודעות שמורות</a></li>
          <li><a href="#recent-searches">חיפושים אחרונים</a></li>
          <li><a href="#tips">טיפים ומידע</a></li>
        </ul>
      </div>
      </nav>

    </>
  );
}
