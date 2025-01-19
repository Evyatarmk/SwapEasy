export default function convertImagesToBase64(files) {
  return new Promise((resolve, reject) => {
    const base64Images = [];
    let processedImages = 0;

    if (!files || files.length === 0) {
      resolve([]); // If no files, resolve with an empty array
      return;
    }

    files.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = () => {
        base64Images[index] = reader.result; // Store Base64 string in the correct index
        processedImages++;

        // Check if all images are processed
        if (processedImages === files.length) {
          resolve(base64Images); // Return the array of Base64 strings
        }
      };

      reader.onerror = (error) => {
        reject(`Error converting file at index ${index}: ${error}`);
      };

      reader.readAsDataURL(file);
    });
  });
}
// Example usage with callback:
export function GetImageUpload(files, onComplete) {
  convertImagesToBase64(files)
    .then((base64Images) => {
      console.log("Converted Base64 Images:", base64Images);
      if (onComplete) onComplete(base64Images); // Notify completion
    })
    .catch((error) => {
      console.error("Error during image conversion:", error);
    });
}