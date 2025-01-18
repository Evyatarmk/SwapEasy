export const deleteAd = async (apiUrl, adId) => {
    try {
        const response = await fetch(`${apiUrl}/${adId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete ad: ${response.statusText}`);
        }

        const result = await response.json();
        return result; // Return the server response if successful
    } catch (error) {
        console.error("Error deleting ad:", error);
        return null; // Return null if the request fails
    }
};
