import React, { useState } from 'react';
import '../CSS/LoginSignup.css';

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <h2>{isLogin ? 'התחברות' : 'הרשמה'}</h2>
        {isLogin ? (
          <form className="auth-form">
            <input type="email" placeholder="אימייל" required />
            <input type="password" placeholder="סיסמה" required />
            <button type="submit">התחבר</button>
            <p className="toggle-text">
              אין לך חשבון?{' '}
              <span onClick={toggleForm} className="toggle-link">
                הרשמה
              </span>
            </p>
          </form>
        ) : (
          <form className="auth-form">
            <input type="text" placeholder="שם מלא" required />
            <input type="email" placeholder="אימייל" required />
            <input type="password" placeholder="סיסמה" required />
            <input type="password" placeholder="אישור סיסמה" required />
            <button type="submit">הרשם</button>
            <p className="toggle-text">
              כבר יש לך חשבון?{' '}
              <span onClick={toggleForm} className="toggle-link">
                התחברות
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}