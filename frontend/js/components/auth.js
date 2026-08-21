// ===============================
// AUTHENTICATION
// ===============================

// Get elements from index.html
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginSection = document.getElementById("login-form");
const registerSection = document.getElementById("register-form");

const authSection = document.getElementById("auth-section");
const onboardingSection = document.getElementById("onboarding-section");
const dashboardSection = document.getElementById("dashboard-section");

const showRegisterBtn = document.getElementById("showRegisterBtn");
const showLoginBtn = document.getElementById("showLoginBtn");


// ===============================
// SWITCH LOGIN → REGISTER
// ===============================

showRegisterBtn.addEventListener("click", function () {

    loginSection.style.display = "none";
    registerSection.style.display = "block";

});


// ===============================
// SWITCH REGISTER → LOGIN
// ===============================

showLoginBtn.addEventListener("click", function () {

    registerSection.style.display = "none";
    loginSection.style.display = "block";

});


// ===============================
// REGISTER
// ===============================

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Temporary hackathon registration
    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("ecoquestUser", JSON.stringify(user));

    alert("Registration successful! Please login.");

    // Go back to login
    registerSection.style.display = "none";
    loginSection.style.display = "block";

});


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(
        localStorage.getItem("ecoquestUser")
    );

    // Check whether user exists
    if (!savedUser) {

        alert("No account found. Please register first.");
        return;

    }

    // Check credentials
    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        // Store login status
        localStorage.setItem("loggedIn", "true");

        // Store username for dashboard
        localStorage.setItem("currentUser", savedUser.name);

        alert("Login successful! 🌱");

        // Hide authentication
        authSection.style.display = "none";

        // Show onboarding
        onboardingSection.style.display = "block";

    } else {

        alert("Incorrect email or password.");

    }

});