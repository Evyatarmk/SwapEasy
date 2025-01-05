import React, { useState } from 'react';
import '../CSS/Header.css';
import UserIcon from '../Icons/User-icon.png';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="fixed-header">
      <div className="logo">MyWebsite</div>
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleSidebar}>✖</button>
        <ul className="nav-links">
          <li><a href="#about">המוצרים שלנו</a></li>
          <li>
            <a href="#contact">
              התחברות
              <img className="UserPhoto" src={UserIcon} alt="User Icon" />
            </a>
          </li>
          <li className="publish-ad-button"><a href="#services">+ פרסום מודעה</a></li>
        </ul>
      </nav>
      <nav className="desktop-nav">
        <ul className="nav-links">
          <li><a href="#about">המוצרים שלנו</a></li>
          <li>
            <a href="#contact">
              התחברות
              <img className="UserPhoto" src={UserIcon} alt="User Icon" />
            </a>
          </li>
          <li className="publish-ad-button"><a href="#services">+ פרסום מודעה</a></li>
        </ul>
      </nav>
    </header>
  );
}
