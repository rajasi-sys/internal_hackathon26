// display_stats.js — shows the user's footprint compared to city/national average.
// Renders into <div id="stats"></div> inside the dashboard section.

async function renderStats() {
  const container = document.getElementById("stats");
  if (!container) return;

  container.innerHTML = `<div class="card"><p>Loading your stats...</p></div>`;

  const stats = await getUserStats(); // from api.js

  const percentDiff = Math.round(
    ((stats.cityAverage - stats.today) / stats.cityAverage) * 100
  );
  const isBetter = percentDiff > 0;

  container.innerHTML = `
    <div class="card">
      <h2>Your Carbon Footprint</h2>
      <p>Today: <strong>${stats.today} kg CO₂</strong></p>
      <p>This week: <strong>${stats.weekly} kg CO₂</strong></p>

      <div style="margin-top:16px;">
        ${buildBar("You", stats.today, stats.cityAverage)}
        ${buildBar("City Average", stats.cityAverage, stats.cityAverage)}
        ${buildBar("National Average", stats.nationalAverage, stats.cityAverage)}
      </div>

      <p style="margin-top:12px; color:${isBetter ? 'green' : 'red'};">
        You are ${Math.abs(percentDiff)}% ${isBetter ? "below" : "above"} the city average
        ${isBetter ? "🌱" : "⚠️"}
      </p>
    </div>
  `;
}

// Helper to build a simple horizontal bar without any chart library
function buildBar(label, value, maxRef) {
  const widthPercent = Math.min((value / (maxRef * 1.5)) * 100, 100);
  return `
    <div style="margin-bottom:8px;">
      <div style="display:flex; justify-content:space-between; font-size:14px;">
        <span>${label}</span><span>${value} kg</span>
      </div>
      <div style="background:#e0e0e0; border-radius:6px; height:14px;">
        <div style="width:${widthPercent}%; background:#2e7d32; height:14px; border-radius:6px;"></div>
      </div>
    </div>
  `;
}

function initStats() {
  renderStats();
}