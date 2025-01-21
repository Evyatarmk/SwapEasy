import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Header.css';
import UserIcon from '../Icons/User-icon.png';
import SwapEasy from '../Icons/SwapEasy.png';

export default function Header({ isAdmin }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const loginHref="https://us-east-1ecoh9tvdf.auth.us-east-1.amazoncognito.com/login/continue?client_id=hv93sgcsom9m5jqtkl2e7id67&redirect_uri=https%3A%2F%2Fswap-easy.s3.us-east-1.amazonaws.com%2Findex.html&response_type=token&scope=email+openid+phone"
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleMouseEnter = () => setDropdownVisible(true);
  const handleMouseLeave = () => setDropdownVisible(false);
  return (
    <header className="fixed-header">
      {/* Logo */}

      <Link to="/index.html"><img className="logo" src={SwapEasy} /></Link>


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
                <li><a href={loginHref}>התחברות</a></li>
                <li><a onClick={() => {
                  toggleSidebar()
                  localStorage.clear();
                  navigate("/index.html")
                }}>התנתק</a></li>
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
          <li><a onClick={toggleSidebar} href="https://us-east-1ecoh9tvdf.auth.us-east-1.amazoncognito.com/login/continue?client_id=hv93sgcsom9m5jqtkl2e7id67&redirect_uri=https%3A%2F%2Fswap-easy.s3.us-east-1.amazonaws.com%2Findex.html&response_type=token&scope=email+openid+phone">התחברות</a></li>
          <li><a onClick={() => {
                  toggleSidebar()
                  localStorage.clear();
                  navigate("/index.html")
                }}>התנתק</a></li>
          {/* Admin Button */}
          {isAdmin && <li className="admin-button"><Link to="/AdminPage" onClick={toggleSidebar}>Admin Dashboard</Link></li>}
        </ul>
      </nav>
    </header>
  );
}
