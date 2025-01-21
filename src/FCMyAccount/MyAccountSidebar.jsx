import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../FCglobal/ContextUser';
import '../CSS/MyAccountSidebar.css';
import UserIcon from '../Icons/User-icon.png';
import { Link } from 'react-router-dom';
import isTokenValid from '../FCglobal/isTokenValid';

export default function MyAccountSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user,isAdmin } = useContext(UserContext);

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
          <h3> {user.firstName+" "+user.lastName}</h3>
          <p>{user.email}</p>
        </div>
        <ul className="menu-list">
        <li><Link to="/MyAccount/my-ads">המודעות שלי</Link></li>
          <li><Link to="/MyAccount/update-personal-details">עדכון פרטים</Link></li>
          <li><Link to="/MyAccount/saved-ads">מודעות שמורות</Link></li>
          {isAdmin && <li className="admin-button"><Link to="/AdminPage">Admin Dashboard</Link></li>}

        </ul>
      </div>

     {/* Sidebar */}
      <nav className="desktop-nav">
     <div className={`sidebar-container-dev`}>
        <div className="user-info">
          <img src={UserIcon} alt="User Icon" className="user-icon" />
          <h3> {user.firstName+" "+user.lastName} </h3>
          <p>{user.email}</p>
        </div>
        <ul className="menu-list">
          <li><Link to="/MyAccount/my-ads">המודעות שלי</Link></li>
          <li><Link to="/MyAccount/update-personal-details">עדכון פרטים</Link></li>
          <li><Link to="/MyAccount/saved-ads">מודעות שמורות</Link></li>
          {isAdmin && <li className="admin-button"><Link to="/AdminPage">Admin Dashboard</Link></li>}

        </ul>
      </div>
      </nav>

    </>
  );
}
