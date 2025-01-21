import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css';
import UserIcon from '../Icons/User-icon.png';

export default function Header({ isAdmin }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleMouseEnter = () => setDropdownVisible(true);
  const handleMouseLeave = () => setDropdownVisible(false);

  return (
    <header className="fixed-header">
      {/* Logo */}
      <div className="logo">
        <Link to="/index.html">MyWebsite</Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          <li><Link to="/index.html">המוצרים שלנו</Link></li>
          <li
            className="dropdown-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="dropdown-link">
              <img className="UserPhoto" src={UserIcon} alt="User Icon" />
            </span>
            {isDropdownVisible && (
              <ul className="dropdown-menu">
                <li><Link to="/MyAccount">אזור אישי</Link></li>
                <li><Link to="/login-signup">התחברות</Link></li>
                <li><Link to="/logout">התנתק</Link></li>
              </ul>
            )}
          </li>
          <li className="publish-ad-button"><Link to="/post-ad">+ פרסום מודעה</Link></li>
          {/* Admin Button */}
          {isAdmin && <li className="admin-button"><Link to="/AdminPage">Admin Dashboard</Link></li>}
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleSidebar}>✖</button>
        <ul className="nav-links">
          <li><Link to="/index.html" onClick={toggleSidebar}>המוצרים שלנו</Link></li>
          <li className="publish-ad-button"><Link to="/post-ad" onClick={toggleSidebar}>+ פרסום מודעה</Link></li>
          <li><Link to="/MyAccount" onClick={toggleSidebar}>אזור אישי</Link></li>
          <li><Link to="/login-signup" onClick={toggleSidebar}>התחברות</Link></li>
          <li><Link to="/logout" onClick={toggleSidebar}>התנתק</Link></li>
          {/* Admin Button */}
          {isAdmin && <li className="admin-button"><Link to="/AdminPage" onClick={toggleSidebar}>Admin Dashboard</Link></li>}
        </ul>
      </nav>
    </header>
  );
}
