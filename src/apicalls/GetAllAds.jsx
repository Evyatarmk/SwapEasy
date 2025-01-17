export const getAllAds = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch ads: ${response.statusText}`);
      }
  
      const ads = await response.json();
      return ads;
    } catch (error) {
      console.error("Error fetching ads:", error);
      return [];
    }
  };
  