// ===============================
// STORAGE UTILITIES
// ===============================

// Save data
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


// Get data
function getData(key) {

    const data = localStorage.getItem(key);

    if (!data) {
        return null;
    }

    return JSON.parse(data);
}


// Remove data
function removeData(key) {
    localStorage.removeItem(key);
}


// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}


// Get current user
function getCurrentUser() {
    return localStorage.getItem("currentUser");
}