import '../CSS/MyAccountSidebar.css';
import UserIcon from '../Icons/User-icon.png'; 

export default function MyAccountSidebar() {
  return (
    <div className="sidebar-container">
      <div className="user-info">
        <img src={UserIcon} alt="User Icon" className="user-icon" />
        <h3>אביתר מקבריט</h3>
        <p>.mt@gmail.com</p>
      </div>
      <ul className="menu-list">
        <li><a href="#my-ads">המודעות שלי</a></li>
        <li><a href="#update-info">עדכון פרטים</a></li>
        <li><a href="#saved-ads">מודעות שמורות</a></li>
        <li><a href="#recent-searches">חיפושים אחרונים</a></li>
        <li><a href="#tips">טיפים ומידע</a></li>
      </ul>
    </div>
  );
}
