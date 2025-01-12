import React, { useState } from 'react';
import '../CSS/MyAccountSidebar.css';
import UserIcon from '../Icons/User-icon.png';
import { Link } from 'react-router-dom';

export default function MyAccountSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* כפתור פתיחה - יופיע רק במסכים קטנים */}
      <button className="menu-toggle-MyAccountSidebar" onClick={toggleSidebar}></button>

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
        <li><Link to="/MyAccount/my-ads">המודעות שלי</Link></li>
          <li><Link to="/MyAccount/update-personal-details">עדכון פרטים</Link></li>
          <li><Link to="/MyAccount/saved-ads">מודעות שמורות</Link></li>
          <li><Link to="/MyAccount">חיפושים אחרונים</Link></li>
          <li><Link to="/MyAccount">טיפים ומידע</Link></li>
        </ul>
      </div>

     {/* Sidebar */}
      <nav className="desktop-nav">
     <div className={`sidebar-container-dev`}>
        <div className="user-info">
          <img src={UserIcon} alt="User Icon" className="user-icon" />
          <h3>אביתר מקבריט</h3>
          <p>mt@gmail.com</p>
        </div>
        <ul className="menu-list">
          <li><Link to="/MyAccount/my-ads">המודעות שלי</Link></li>
          <li><Link to="/MyAccount/update-personal-details">עדכון פרטים</Link></li>
          <li><Link to="/MyAccount/saved-ads">מודעות שמורות</Link></li>
          <li><Link to="/MyAccount">חיפושים אחרונים</Link></li>
          <li><Link to="/MyAccount">טיפים ומידע</Link></li>
        </ul>
      </div>
      </nav>

    </>
  );
}
