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

async function getSolutions() {
  return [
    { action: "Switch 3 commute days to bus", co2Saved: 20, moneySaved: 800 },
    { action: "Reduce AC usage by 2 hrs/day", co2Saved: 15, moneySaved: 500 },
    { action: "Go vegetarian 3 days/week", co2Saved: 10, moneySaved: 300 },
  ];
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