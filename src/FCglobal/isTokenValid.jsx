
  export default function isTokenValid (token) {
    try {
      const [, payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      const now = Math.floor(Date.now() / 1000);
      if(decoded.exp > now)return true ; // בדיקה אם הטוקן עדיין בתוקף
      else{
        localStorage.clear();
        return false
        
      }
    } catch (error) {
      return false;
    }
  }