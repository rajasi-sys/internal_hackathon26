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

// ---- Functions used by Person 2's components (dummy data for now) ----

async function submitDailyEmission(data) {
  console.log("Dummy submit daily emission:", data);
  return { success: true };
}

async function getUserStats() {
  return {
    today: 4.2,
    weekly: 28.4,
    cityAverage: 6.8,
    nationalAverage: 7.5,
  };
}

async function getSolutions(city) {
  return {
    user_city: city,
    solutions: [
      { category: "Commute", current_action: "Driving solo", suggested_action: "Switch 3 commute days to bus", short_term_savings_usd: 800, long_term_carbon_reduction_kg: 20 },
      { category: "Energy", current_action: "Standard grid power", suggested_action: "Reduce AC usage by 2 hrs/day", short_term_savings_usd: 500, long_term_carbon_reduction_kg: 15 },
      { category: "Food", current_action: "Mixed diet", suggested_action: "Go vegetarian 3 days/week", short_term_savings_usd: 300, long_term_carbon_reduction_kg: 10 },
    ]
  };
}

async function getForestStatus() {
  return {
    streak: 7,
    treeStage: 3,
  };
}

async function getLeaderboard() {
  return [
    { rank: 1, name: "Aditi", points: 320 },
    { rank: 2, name: "Rohan", points: 290 },
    { rank: 3, name: "You", points: 260 },
    { rank: 4, name: "Sana", points: 210 },
  ];
}