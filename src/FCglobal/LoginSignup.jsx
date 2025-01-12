import React, { useState } from 'react';
import '../CSS/LoginSignup.css';

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [User, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    attributes: {
      given_name: '',
      family_name: '',
    },
});

  // Handle input change
  const handleChange = (event) => {
    
    const { name, value } = event.target;

    if (name === 'given_name' || name === 'family_name') {
      setUser((prevUser) => ({
        ...prevUser,
        attributes: {
          ...prevUser.attributes,
          [name]: value,
        },
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  // Toggle between login and sign-up forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Sign-up a new user
  const signUp = async (event) => {
    
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
            <input type="text" name="given_name" placeholder="שם פרטי" required onChange={handleChange} />
            <input type="text" name="family_name"  placeholder="שם משפחה" required onChange={handleChange} />
            <input type="email"  name="email" placeholder="אימייל" required onChange={handleChange}/>
            <input type="password"  name="password" placeholder="סיסמה" required onChange={handleChange}/>
            <input type="password" placeholder="אישור סיסמה" required onChange={handleChange}/>
            <button type="submit" onClick={signUp}>הרשם</button>
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