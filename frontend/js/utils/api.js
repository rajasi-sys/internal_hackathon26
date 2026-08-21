// ===============================
// API UTILITIES
// ===============================

async function apiGet(endpoint) {

    try {

        const response = await fetch(
            API_BASE_URL + endpoint
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        return await response.json();

    } catch (error) {

        console.error("GET API Error:", error);
        return null;

    }
}


async function apiPost(endpoint, data) {

    try {

        const response = await fetch(
            API_BASE_URL + endpoint,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        return await response.json();

    } catch (error) {

        console.error("POST API Error:", error);
        return null;

    }
}