// ===============================
// ECOQUEST APP INITIALIZER
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const authSection = document.getElementById("auth-section");
    const onboardingSection = document.getElementById("onboarding-section");
    const dashboardSection = document.getElementById("dashboard-section");

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const logoutBtn = document.getElementById("logoutBtn");

    const loggedIn = localStorage.getItem("loggedIn");
    const profile = localStorage.getItem("ecoquestProfile");

    const allViews = [
        "home-section",
        "stats-section",
        "logger-section",
        "solutions-section",
        "forest-section",
        "leaderboard-section",
    ];

    // Tracks whether each section's component has already been rendered
    const rendered = {};

    // -------------------------------
    // VIEW SWITCHING (homepage-first)
    // -------------------------------

    function showView(viewId) {
        allViews.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (id === viewId) {
                el.classList.remove("hidden");
            } else {
                el.classList.add("hidden");
            }
        });

        // Lazily render each component only the first time its section is opened
        if (viewId === "stats-section" && !rendered.stats) {
            initStats();
            rendered.stats = true;
        }
        if (viewId === "logger-section" && !rendered.logger) {
            initDailyLogger();
            rendered.logger = true;
        }
        if (viewId === "solutions-section" && !rendered.solutions) {
            initSolutions();
            rendered.solutions = true;
        }
        if (viewId === "forest-section" && !rendered.forest) {
            initForest();
            rendered.forest = true;
        }
        if (viewId === "leaderboard-section" && !rendered.leaderboard) {
            initLeaderboard();
            rendered.leaderboard = true;
        }
    }

    // -------------------------------
    // SIDEBAR / HAMBURGER LOGIC
    // -------------------------------

    function openSidebar() {
        sidebar.classList.add("open");
        sidebar.classList.remove("hidden");
        sidebarOverlay.classList.remove("hidden");
        menuToggle.classList.add("open");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.add("hidden");
        menuToggle.classList.remove("open");
        setTimeout(() => sidebar.classList.add("hidden"), 300);
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            if (sidebar.classList.contains("open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }

    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("data-target");

            document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            showView(targetId);
            closeSidebar();
        });
    });

    // -------------------------------
    // LOGOUT
    // -------------------------------

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("ecoquestProfile");
            location.reload();
        });
    }

    // -------------------------------
    // USER NOT LOGGED IN
    // -------------------------------

    if (loggedIn !== "true") {
        authSection.style.display = "block";
        onboardingSection.style.display = "none";
        dashboardSection.style.display = "none";

        menuToggle.style.display = "none";
        logoutBtn.style.display = "none";
        return;
    }

    // -------------------------------
    // USER LOGGED IN BUT NO PROFILE
    // -------------------------------

    if (!profile) {
        authSection.style.display = "none";
        onboardingSection.style.display = "block";
        dashboardSection.style.display = "none";

        menuToggle.style.display = "none";
        logoutBtn.style.display = "block";
        return;
    }

    // -------------------------------
    // USER LOGGED IN + PROFILE EXISTS
    // -------------------------------

    authSection.style.display = "none";
    onboardingSection.style.display = "none";
    dashboardSection.style.display = "block";

    menuToggle.style.display = "flex";
    logoutBtn.style.display = "block";

    // Display username
    const currentUser = localStorage.getItem("currentUser");
    const userName = document.getElementById("userName");
    if (userName && currentUser) {
        userName.textContent = currentUser;
    }

    // Show homepage by default (nothing else renders until clicked in sidebar)
    showView("home-section");
    document.querySelector('.sidebar-link[data-target="home-section"]').classList.add("active");

});