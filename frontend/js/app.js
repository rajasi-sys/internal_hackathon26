// ===============================
// ECOQUEST APP INITIALIZER
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const authSection = document.getElementById("auth-section");
    const onboardingSection = document.getElementById("onboarding-section");
    const dashboardSection = document.getElementById("dashboard-section");

    const loggedIn = localStorage.getItem("loggedIn");
    const profile = localStorage.getItem("ecoquestProfile");

    // -------------------------------
    // USER NOT LOGGED IN
    // -------------------------------

    if (loggedIn !== "true") {

        authSection.style.display = "block";
        onboardingSection.style.display = "none";
        dashboardSection.style.display = "none";

        return;
    }


    // -------------------------------
    // USER LOGGED IN BUT NO PROFILE
    // -------------------------------

    if (!profile) {

        authSection.style.display = "none";
        onboardingSection.style.display = "block";
        dashboardSection.style.display = "none";

        return;
    }


    // -------------------------------
    // USER LOGGED IN + PROFILE EXISTS
    // -------------------------------

    authSection.style.display = "none";
    onboardingSection.style.display = "none";
    dashboardSection.style.display = "block";

    // Display username
    const currentUser = localStorage.getItem("currentUser");

    const userName = document.getElementById("userName");

    if (userName && currentUser) {
        userName.textContent = currentUser;
    }

});