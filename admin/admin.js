// ================================
// ZTA ADMIN - SECURITY SYSTEM
// ================================

// Password for login
const correctPass = "89OQBSADETWNA";

// Check if user logged in
const isLogged = localStorage.getItem("zta_admin_login");

if (!isLogged) {
    // If user tries to enter admin.html without login
    window.location.href = "admin-login.html";
}



// ================================
// LOGOUT SYSTEM
// ================================
function logoutAdmin() {
    localStorage.removeItem("zta_admin_login");
    window.location.href = "admin-login.html";
}



// ================================
// PANEL BUTTON FUNCTIONS
// ================================

// Example: status log writer
function writeStatus(msg) {
    const logBox = document.getElementById("logBox");
    if (logBox) {
        let line = document.createElement("p");
        line.className = "text-green-400";
        line.textContent = "➜ " + msg;
        logBox.appendChild(line);
    }
}



// PANEL BUTTON EXAMPLES
function restartServer() {
    writeStatus("[SYSTEM] Restarting server...");
    setTimeout(() => writeStatus("[SYSTEM] Server restarted successfully ✔"), 1000);
}

function clearCache() {
    writeStatus("[SYSTEM] Clearing cache...");
    setTimeout(() => writeStatus("[SYSTEM] Cache cleared ✔"), 800);
}

function runDiagnostics() {
    writeStatus("[SYSTEM] Running diagnostics...");
    setTimeout(() => writeStatus("[SYSTEM] All systems operational ✔"), 1200);
}

function updateSystem() {
    writeStatus("[SYSTEM] Checking for updates...");
    setTimeout(() => writeStatus("[SYSTEM] System updated ✔"), 1500);
}

function sendAlert() {
    writeStatus("[ALERT] Global alert triggered 🚨");
}



// ================================
// OPTIONAL — AUTO WELCOME MSG
// ================================
window.onload = () => {
    writeStatus("Welcome, ADMIN — ZTA Panel Activated.");
};
