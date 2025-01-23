import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../FCglobal/ContextUser';
import '../CSS/MyAccountSidebar.css';
import UserIcon from '../Icons/User-icon.png';
import { Link } from 'react-router-dom';
import isTokenValid from '../FCglobal/isTokenValid';
import { useLoading } from '../FCglobal/ContextLoading';

export default function MyAccountSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user,isAdmin } = useContext(UserContext);
   const { showLoading, hideLoading } = useLoading();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
    const createReport=async()=>{
      try {
        showLoading();
        const idToken = localStorage.getItem("idToken"); 

        // Fetch data from the API
        const response = await fetch("https://esg7w0u40m.execute-api.us-east-1.amazonaws.com/Dev/Admin/Report", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":idToken

          },
        });
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to fetch ads: ${response.status} ${response.statusText}`);
        }
    
       
    
     
      } catch (err) {
        // Handle errors
        console.error("Error fetching:", err.message);
      } finally {
        // Ensure loading is false after the operation
        hideLoading(false);
      }

    }
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
          {isAdmin && <li className="admin-button"><Link to="/AdminPage">דף ניהול</Link></li>}
          {isAdmin && <li   onClick={createReport} className="admin-button">צור דוח</li>}

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
          {isAdmin && <li className="admin-button"><Link to="/AdminPage">דף ניהול</Link></li>}
          {isAdmin && <li   onClick={createReport} className="admin-button">צור דוח</li>}

        </ul>
      </div>
      </nav>

    </>
  );
}
