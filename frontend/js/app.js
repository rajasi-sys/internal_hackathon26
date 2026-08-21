// ===============================
// ECOQUEST APP INITIALIZER
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const authSection = document.getElementById("auth-section");
    const onboardingSection = document.getElementById("onboarding-section");
    const dashboardSection = document.getElementById("dashboard-section");

    const loggedIn = localStorage.getItem("loggedIn");
    const profile = localStorage.getItem("ecoquestProfile");

    if (loggedIn !== "true") {
        authSection.style.display = "block";
        onboardingSection.style.display = "none";
        dashboardSection.style.display = "none";
        return;
    }

    if (!profile) {
        authSection.style.display = "none";
        onboardingSection.style.display = "block";
        dashboardSection.style.display = "none";
        return;
    }

    authSection.style.display = "none";
    onboardingSection.style.display = "none";
    dashboardSection.style.display = "block";

    const currentUser = localStorage.getItem("currentUser");
    const userName = document.getElementById("userName");
    if (userName && currentUser) {
        userName.textContent = currentUser;
    }

    // Render Person 2's dashboard components
    initDailyLogger();
    initStats();
    initSolutions();
    initForest();
    initLeaderboard();

});