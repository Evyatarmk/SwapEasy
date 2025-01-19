export default function convertImagesToBase64(files) {
  return new Promise((resolve, reject) => {
    const base64Images = [];
    let processedImages = 0;

    if (!files || files.length === 0) {
      resolve([]); // אם אין קבצים, מחזיר מערך ריק
      return;
    }

    files.forEach((file, index) => {
      if (typeof file === "string" && (file.startsWith("http://") || file.startsWith("https://"))) {
        // אם הקלט הוא URL, נוסיף אותו ישירות למערך
        base64Images[index] = file;
        processedImages++;

        // בדיקה אם כל הקבצים הושלמו
        if (processedImages === files.length) {
          resolve(base64Images);
        }
      } else {
        const reader = new FileReader();

        reader.onload = () => {
          base64Images[index] = reader.result; // שמירת הקידוד Base64 באינדקס המתאים
          processedImages++;

          // בדיקה אם כל הקבצים הושלמו
          if (processedImages === files.length) {
            resolve(base64Images);
          }
        };

        reader.onerror = (error) => {
          reject(`Error converting file at index ${index}: ${error}`);
        };

        reader.readAsDataURL(file);
      }
    });
  });
}

// שימוש לדוגמה עם קריאה חיצונית:
export function GetImageUpload(files, onComplete) {
  convertImagesToBase64(files)
    .then((base64Images) => {
      console.log("Converted Base64 Images:", base64Images);
      if (onComplete) onComplete(base64Images); // הודעה על סיום הפעולה
    })
    .catch((error) => {
      console.error("Error during image conversion:", error);
    });
}
