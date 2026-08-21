// daily_logger.js — form for logging today's activity.
// Renders into <div id="daily-logger"></div> inside the dashboard section.

function initDailyLogger() {
  const container = document.getElementById("daily-logger");
  if (!container) return; // safety check in case container isn't on the page yet

  container.innerHTML = `
    <div class="card">
      <h2>Log Today's Activity</h2>
      <label>Commute distance (km)</label>
      <input type="number" id="log-km" placeholder="e.g. 12" />

      <label>Commute mode</label>
      <select id="log-mode">
        <option value="car">Car</option>
        <option value="bus">Bus</option>
        <option value="bike">Bike/Walk</option>
        <option value="two_wheeler">Two-wheeler</option>
      </select>

      <label>
        <input type="checkbox" id="log-zero" style="width:auto;" />
        I had a zero-emission day (no commute)
      </label>

      <button id="log-submit-btn">Submit Today's Log</button>
      <p id="log-status"></p>
    </div>
  `;

  document.getElementById("log-submit-btn").addEventListener("click", async () => {
    const km = document.getElementById("log-km").value;
    const mode = document.getElementById("log-mode").value;
    const isZero = document.getElementById("log-zero").checked;
    const statusEl = document.getElementById("log-status");

    const data = isZero
      ? { date: new Date().toISOString().split("T")[0], zeroEmission: true }
      : { date: new Date().toISOString().split("T")[0], km: Number(km), mode };

    if (!isZero && !km) {
      statusEl.textContent = "Please enter your commute distance, or tick zero-emission day.";
      statusEl.style.color = "red";
      return;
    }

    const result = await submitDailyEmission(data);
    if (result.success) {
      statusEl.textContent = "Logged! Refreshing your stats...";
      statusEl.style.color = "green";
      // Refresh the stats display since new data was just added
      if (typeof renderStats === "function") renderStats();
    }
  });
}