// daily_logger.js — tabbed form for logging today's activity across
// transport, food, electricity, water, and miscellaneous categories.
// Renders into <div id="daily-logger"></div> inside the dashboard section.

function initDailyLogger() {
  const container = document.getElementById("daily-logger");
  if (!container) return;

  container.innerHTML = `
    <div class="card">
      <h2>Log Today's Activity</h2>

      <label style="margin-top:0;">
        <input type="checkbox" id="log-zero" style="width:auto;" />
        I had a fully zero-emission day (skip all categories below)
      </label>

      <div class="log-tabs">
        <button type="button" class="log-tab-btn active" data-tab="transport">🚗 Transport</button>
        <button type="button" class="log-tab-btn" data-tab="food">🍽️ Food</button>
        <button type="button" class="log-tab-btn" data-tab="electricity">💡 Electricity</button>
        <button type="button" class="log-tab-btn" data-tab="water">💧 Water</button>
        <button type="button" class="log-tab-btn" data-tab="misc">🛍️ Misc</button>
      </div>

      <!-- TRANSPORT -->
      <div class="log-tab-content active" id="tab-transport">
        <label>Commute distance (km)</label>
        <input type="number" id="log-km" placeholder="e.g. 12" />

        <label>Commute mode</label>
        <select id="log-mode">
          <option value="car">Car</option>
          <option value="two_wheeler">Two-wheeler</option>
          <option value="bus">Bus</option>
          <option value="train">Train/Metro</option>
          <option value="bike">Bike/Walk</option>
        </select>

        <label>Flights this month (if any)</label>
        <input type="number" id="log-flights" placeholder="e.g. 0" min="0" />
      </div>

      <!-- FOOD -->
      <div class="log-tab-content" id="tab-food">
        <label>Today's diet</label>
        <select id="log-diet">
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="eggs">Vegetarian + Eggs</option>
          <option value="mixed">Mixed (meat 1-2x)</option>
          <option value="heavy_meat">Meat-heavy (most meals)</option>
        </select>

        <label>Food delivery / takeout orders today</label>
        <input type="number" id="log-food-delivery" placeholder="e.g. 1" min="0" />

        <label>Food wasted today (approx grams)</label>
        <input type="number" id="log-food-waste" placeholder="e.g. 100" min="0" />
      </div>

      <!-- ELECTRICITY -->
      <div class="log-tab-content" id="tab-electricity">
        <label>AC / cooling usage today (hours)</label>
        <input type="number" id="log-ac-hours" placeholder="e.g. 4" min="0" />

        <label>Estimated electricity used today (kWh)</label>
        <input type="number" id="log-electricity-units" placeholder="e.g. 6" min="0" />

        <label>Using renewable/solar source?</label>
        <select id="log-renewable">
          <option value="no">No</option>
          <option value="partial">Partially</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <!-- WATER -->
      <div class="log-tab-content" id="tab-water">
        <label>Approx. water usage today (litres)</label>
        <input type="number" id="log-water" placeholder="e.g. 150" min="0" />

        <label>Laundry loads today</label>
        <input type="number" id="log-laundry" placeholder="e.g. 1" min="0" />
      </div>

      <!-- MISC -->
      <div class="log-tab-content" id="tab-misc">
        <label>Online shopping orders today</label>
        <input type="number" id="log-shopping" placeholder="e.g. 0" min="0" />

        <label>Waste generated today (approx kg)</label>
        <input type="number" id="log-waste" placeholder="e.g. 1" min="0" />

        <label>Did you recycle/segregate waste today?</label>
        <select id="log-recycle">
          <option value="no">No</option>
          <option value="partial">Partially</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <button id="log-submit-btn">Submit Today's Log</button>
      <p id="log-status"></p>
    </div>
  `;

  // Tab switching
  const tabButtons = container.querySelectorAll(".log-tab-btn");
  const tabContents = container.querySelectorAll(".log-tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
  });

  // Submit
  document.getElementById("log-submit-btn").addEventListener("click", async () => {
    const isZero = document.getElementById("log-zero").checked;
    const statusEl = document.getElementById("log-status");
    const today = new Date().toISOString().split("T")[0];

    let data;

    if (isZero) {
      data = { date: today, zeroEmission: true };
    } else {
      data = {
        date: today,
        transport: {
          km: Number(document.getElementById("log-km").value) || 0,
          mode: document.getElementById("log-mode").value,
          flights: Number(document.getElementById("log-flights").value) || 0,
        },
        food: {
          diet: document.getElementById("log-diet").value,
          deliveryOrders: Number(document.getElementById("log-food-delivery").value) || 0,
          wasteGrams: Number(document.getElementById("log-food-waste").value) || 0,
        },
        electricity: {
          acHours: Number(document.getElementById("log-ac-hours").value) || 0,
          units: Number(document.getElementById("log-electricity-units").value) || 0,
          renewable: document.getElementById("log-renewable").value,
        },
        water: {
          litres: Number(document.getElementById("log-water").value) || 0,
          laundryLoads: Number(document.getElementById("log-laundry").value) || 0,
        },
        misc: {
          shoppingOrders: Number(document.getElementById("log-shopping").value) || 0,
          wasteKg: Number(document.getElementById("log-waste").value) || 0,
          recycled: document.getElementById("log-recycle").value,
        },
      };
    }

    const result = await submitDailyEmission(data);
    if (result.success) {
      statusEl.textContent = "Logged! Refreshing your stats...";
      statusEl.style.color = "green";
      if (typeof renderStats === "function") renderStats();
    } else {
      statusEl.textContent = "Something went wrong. Try again.";
      statusEl.style.color = "red";
    }
  });
}