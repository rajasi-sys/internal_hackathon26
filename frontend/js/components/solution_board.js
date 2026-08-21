// solutions_board.js — shows "what you can do" recommendation cards.
// Renders into <div id="solutions"></div> inside the dashboard section.

async function renderSolutions() {
  const container = document.getElementById("solutions");
  if (!container) return;

  container.innerHTML = `<div class="card"><p>Loading suggestions...</p></div>`;

  const solutions = await getSolutions(); // from api.js

  // Rank by money saved per kg CO2 saved (this is your "smart" ranking logic)
  const ranked = [...solutions].sort(
    (a, b) => b.moneySaved / b.co2Saved - a.moneySaved / a.co2Saved
  );

  const cardsHtml = ranked
    .map(
      (s) => `
      <div class="card">
        <h3>${s.action}</h3>
        <p>Saves ~${s.co2Saved} kg CO₂/month</p>
        <p>Saves ~₹${s.moneySaved}/month</p>
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