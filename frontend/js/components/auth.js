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

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Real registration — calls POST /api/v1/auth/register on the backend
    const result = await registerUser(name, email, password);

    if (result && result.status === "success") {

        alert("Registration successful! Please login.");

        // Go back to login
        registerSection.style.display = "none";
        loginSection.style.display = "block";

    } else {

        alert("Registration failed. Please try again.");

    }

});


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Real login — calls POST /api/v1/auth/login on the backend
    const result = await loginUser(email, password);

    if (result && result.status === "success") {

        // Store login status
        localStorage.setItem("loggedIn", "true");

        // Store username for dashboard
        localStorage.setItem("currentUser", result.user.name);

        // Store auth token (useful once real JWTs are added later)
        localStorage.setItem("authToken", result.token);

        alert("Login successful! 🌱");

        // Hide authentication
        authSection.style.display = "none";

        // Show onboarding
        onboardingSection.style.display = "block";

    } else {

        alert("Incorrect email or password.");

    }

});