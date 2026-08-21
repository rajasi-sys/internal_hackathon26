// solutions_board.js — shows "what you can do" recommendation cards.
// Renders into <div id="solutions"></div> inside the dashboard section.

async function renderSolutions() {
  const container = document.getElementById("solutions");
  if (!container) return;

  container.innerHTML = `<div class="card"><p>Loading suggestions...</p></div>`;

  // Grab the city from the user's saved profile
  const profileData = localStorage.getItem("ecoquestProfile");
  const userCity = profileData ? JSON.parse(profileData).city : "Default";
  
  const response = await getSolutions(userCity); 

  // Safely extract the array of solutions from the backend response
  const solutionsArray = response && response.solutions ? response.solutions : [];

  // Rank by money saved per kg CO2 saved
  const ranked = [...solutionsArray].sort(
    (a, b) => (b.short_term_savings_usd / b.long_term_carbon_reduction_kg) - 
              (a.short_term_savings_usd / a.long_term_carbon_reduction_kg)
  );

  const cardsHtml = ranked
    .map(
      (s) => `
      <div class="card">
        <h3>${s.suggested_action}</h3>
        <p>Saves ~${s.long_term_carbon_reduction_kg} kg CO₂/month</p>
        <p>Saves ~₹${s.short_term_savings_usd}/month</p>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <h2>Recommended For You</h2>
    ${cardsHtml}
  `;
}

function initSolutions() {
  renderSolutions();
}