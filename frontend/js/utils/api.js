// api.js — every backend call goes through here.
// Other files (daily_logger.js, display_stats.js, etc.) call these functions
// instead of writing fetch() themselves.

// A generic helper that adds the auth token automatically to every request
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${endpoint}`);
  }

  return await response.json();
}

// ---- Daily Logger ----
async function submitDailyEmission(data) {
  // Real version (uncomment once backend endpoint is ready):
  // return await apiRequest("/emissions/daily", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  // });

  console.log("Dummy submit daily emission:", data);
  return { success: true };
}

// ---- Stats / Dashboard ----
async function getUserStats() {
  // Real version:
  // return await apiRequest("/emissions/stats");

  return {
    today: 4.2,
    weekly: 28.4,
    cityAverage: 6.8,
    nationalAverage: 7.5,
  };
}

// ---- Solutions ----
async function getSolutions() {
  // Real version:
  // return await apiRequest("/solutions");

  return [
    { action: "Switch 3 commute days to bus", co2Saved: 20, moneySaved: 800 },
    { action: "Reduce AC usage by 2 hrs/day", co2Saved: 15, moneySaved: 500 },
    { action: "Go vegetarian 3 days/week", co2Saved: 10, moneySaved: 300 },
  ];
}

// ---- Gamification / Forest ----
async function getForestStatus() {
  // Real version:
  // return await apiRequest("/leaderboard/forest");

  return {
    streak: 7,
    treeStage: 3, // e.g. 1 = seed, 2 = sapling, 3 = young tree, 4 = full tree
  };
}

// ---- Leaderboard ----
async function getLeaderboard() {
  // Real version:
  // return await apiRequest("/leaderboard");

  return [
    { rank: 1, name: "Aditi", points: 320 },
    { rank: 2, name: "Rohan", points: 290 },
    { rank: 3, name: "You", points: 260 },
    { rank: 4, name: "Sana", points: 210 },
  ];
}