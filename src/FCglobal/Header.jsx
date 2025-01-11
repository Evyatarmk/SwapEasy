import React, { useState } from 'react';
import '../CSS/Header.css';
import UserIcon from '../Icons/User-icon.png';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => setDropdownVisible(true);
  const handleMouseLeave = () => setDropdownVisible(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <header className="fixed-header">
      
      <div className="logo"><Link to="/Home">MyWebsite</Link></div>
      <nav className="desktop-nav">
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
        <ul className="nav-links">
          <li><Link to="/ItemDetails">המוצרים שלנו</Link></li>
          <li
            className="dropdown-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/personal-area" className="dropdown-link">
              <img className="UserPhoto" src={UserIcon} alt="User Icon" />
            </Link>
            {isDropdownVisible && (
              <ul className="dropdown-menu">
                <li><Link to="/profile">אזור אישי</Link></li>
                <li><Link to="/login-signup">התחברות</Link></li>
                <li><Link to="/logout">התנתק</Link></li>
              </ul>
            )}
          </li>
          <li className="publish-ad-button"><Link to="/post-ad">+ פרסום מודעה</Link></li>
        </ul>
      </nav>
    </header>
  );
}
