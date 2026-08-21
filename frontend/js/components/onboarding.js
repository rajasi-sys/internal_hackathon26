// ===============================
// ONBOARDING
// ===============================

const onboardingForm = document.getElementById("onboardingForm");

onboardingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get values from onboarding form
    const city = document.getElementById("city").value;
    const age = document.getElementById("age").value;
    const transport = document.getElementById("transport").value;
    const diet = document.getElementById("diet").value;
    const electricity = document.getElementById("electricity").value;

    // Get currently logged-in user
    const currentUser = localStorage.getItem("currentUser");

    // Create profile
    const profile = {
        name: currentUser,
        city: city,
        age: age,
        transport: transport,
        diet: diet,
        electricity: electricity
    };

    // Save profile in browser
    localStorage.setItem(
        "ecoquestProfile",
        JSON.stringify(profile)
    );

    // Display user's name on dashboard
    document.getElementById("userName").textContent = currentUser;

    // Hide onboarding
    document.getElementById("onboarding-section").style.display = "none";

    // Show dashboard
    document.getElementById("dashboard-section").style.display = "block";

    // Show logout button
    document.getElementById("logoutBtn").style.display = "block";

    alert("Profile created successfully! 🌱");

});