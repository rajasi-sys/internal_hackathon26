// leaderboard.js — shows the community ranking table.
// Renders into <div id="leaderboard"></div> inside the dashboard section.

async function renderLeaderboard() {
  const container = document.getElementById("leaderboard");
  if (!container) return;

  container.innerHTML = `<div class="card"><p>Loading leaderboard...</p></div>`;

  const entries = await getLeaderboard(); // from api.js

  const rowsHtml = entries
    .map(
      (e) => `
      <tr style="${e.name === 'You' ? 'font-weight:bold; color:#2e7d32;' : ''}">
        <td>#${e.rank}</td>
        <td>${e.name}</td>
        <td>${e.points} pts</td>
      </tr>
    `
    )
    .join("");

  container.innerHTML = `
    <div class="card">
      <h2>Community Leaderboard</h2>
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="text-align:left; border-bottom:1px solid #ccc;">
            <th>Rank</th><th>Name</th><th>Points</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;
}

function initLeaderboard() {
  renderLeaderboard();
}