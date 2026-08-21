// virtual_forest.js — shows the user's streak and tree growth stage.
// Renders into <div id="forest"></div> inside the dashboard section.

const TREE_EMOJIS = {
  1: "🌱", // seed/sprout
  2: "🌿", // sapling
  3: "🌳", // young tree
  4: "🌲", // full tree
};

async function renderForest() {
  const container = document.getElementById("forest");
  if (!container) return;

  container.innerHTML = `<div class="card"><p>Loading your forest...</p></div>`;

  const forest = await getForestStatus(); // from api.js
  const treeEmoji = TREE_EMOJIS[forest.treeStage] || "🌱";

  container.innerHTML = `
    <div class="card" style="text-align:center;">
      <h2>Your Virtual Forest</h2>
      <div style="font-size:64px;">${treeEmoji}</div>
      <p>🔥 ${forest.streak} day streak</p>
      <p style="font-size:14px; color:#555;">
        Keep logging daily to grow your tree to the next stage!
      </p>
    </div>
  `;
}

function initForest() {
  renderForest();
}