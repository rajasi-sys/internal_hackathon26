// ===============================
// API UTILITIES
// ===============================

async function apiGet(endpoint) {
    try {
        const response = await fetch(API_BASE_URL + endpoint);
        if (!response.ok) throw new Error("API request failed");
        return await response.json();
    } catch (error) {
        console.error("GET API Error:", error);
        return null;
    }
}

async function apiPost(endpoint, data) {
    try {
        const response = await fetch(API_BASE_URL + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("API request failed");
        return await response.json();
    } catch (error) {
        console.error("POST API Error:", error);
        return null;
    }
}

// ---- Real functions wired to the FastAPI backend ----

async function registerUser(name, email, password) {
    return await apiPost("/api/v1/auth/register", { name, email, password });
}

async function loginUser(email, password) {
    return await apiPost("/api/v1/auth/login", { email, password });
}

async function submitDailyEmission(data) {
    // data must look like:
    // { user_id, date_str: "YYYY-MM-DD", city, electricity_kwh, petrol_car_km, zero_emission_day }
    return await apiPost("/api/v1/emissions/lock-daily", data);
}

async function getSolutions(city) {
    return await apiGet(`/api/v1/solutions/recommendations/${city}`);
}

async function getForestStatus(userId) {
    return await apiGet(`/api/v1/gamification/tree-status/${userId}`);
}

async function getLeaderboard(city = null) {
    const query = city ? `?city=${encodeURIComponent(city)}` : "";
    return await apiGet(`/api/v1/gamification/leaderboard${query}`);
}

// Note: there is no dedicated "user stats" endpoint on the backend yet
// (see Step 6 from before). Keeping this as a placeholder until it exists.
async function getUserStats() {
  return {
    today: 0,
    weekly: 0,
    cityAverage: 0,
    nationalAverage: 0,
  };
}