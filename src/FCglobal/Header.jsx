import React from 'react'
import '../CSS/Header.css'
import UserIcon from '../Icons/User-icon.png'; 

export default function Header() {
  return (
    <div>
    <header className="fixed-header">
      <div className="logo">MyWebsite</div>
      <nav>
        <ul className="nav-links">
          <li><a href="#about">המוצרים שלנו</a></li>
          <li><a href="#contact">התחברות<img className='UserPhoto' src={UserIcon}/></a></li>
          <li className="publish-ad-button" ><a href="#services"> + פרסום מודעה </a></li>
        </ul>
      </nav>
    </header>
  </div>
  )
}
