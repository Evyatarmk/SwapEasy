import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginSignup.css';

export default function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [User, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    given_name: '',
    family_name: '',
  });

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    
  };

  // Toggle between login and sign-up forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Handle login form submission
  const handleLogin = (event) => {
    event.preventDefault();
    let role;

    if (User.email === 'admin@example.com' && User.password === 'admin123') {
      role = 'admin';
      alert('Admin logged in!');
      navigate('/AdminPage');
    } else {
      role = 'user';
      alert('User logged in!');
    }

    // Notify parent about the logged-in user
    if (onLogin) {
      onLogin({ email: User.email, role });
    }
  };

  // Handle sign-up form submission
  const signUp = async (event) => {
    event.preventDefault();
    if (User.password !== User.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await fetch('https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/User', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',  // קביעת תוכן הבקשה כ-JSON
        },
        body: JSON.stringify({
          email:User.email,
          password: User.password,
          firstName: User.given_name,
          lastName:User.family_name,

        })  // המרת הנתונים לפורמט JSON
      });
  
      // אם הבקשה הצליחה
      if (response.ok) {
        const data = await response.json();
        console.log('User added successfully:', data);
      } else {
        // אם הייתה שגיאה בשרת
        const errorData = await response.json();
        console.error('Error adding user:', errorData);
      }
    } catch (error) {
      // טיפול בשגיאות בבקשה
      console.error('Error:', error);
    }
   
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <h2>{isLogin ? 'התחברות' : 'הרשמה'}</h2>
        {isLogin ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="אימייל"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="סיסמה"
              required
              onChange={handleChange}
            />
            <button type="submit">התחבר</button>
            <p className="toggle-text">
              אין לך חשבון?{' '}
              <span onClick={toggleForm} className="toggle-link">
                הרשמה
              </span>
            </p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={signUp}>
            <input
              type="text"
              name="given_name"
              placeholder="שם פרטי"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="family_name"
              placeholder="שם משפחה"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="אימייל"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="סיסמה"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="אישור סיסמה"
              required
              onChange={handleChange}
            />
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
