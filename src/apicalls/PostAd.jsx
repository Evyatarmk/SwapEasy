export const postAd = async (apiUrl, adData) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adData),
        });

        if (!response.ok) {
            throw new Error(`Failed to post ad: ${response.statusText}`);
        }

        const result = await response.json();
        return result; // Return the response from the server
    } catch (error) {
        console.error("Error posting ad:", error);
        return null; // Return null if the request fails
    }
};
