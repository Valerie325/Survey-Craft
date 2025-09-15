// Get Elements
const openBtn = document.getElementById("openSettings");
const closeBtn = document.getElementById("closeSettings");
const sidebar = document.getElementById("settingsSidebar");
const mainMenu = document.getElementById("mainMenu");
const sections = document.querySelectorAll(".settings-section");
const menuLinks = document.querySelectorAll(".settings-menu a");
const backButtons = document.querySelectorAll(".back-btn");

// Open Sidebar
openBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

// Close Sidebar
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  resetSidebar(); // Reset to main menu when closing
});

// Show Selected Section
menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    let sectionId = event.target.getAttribute("data-section");

    if (sectionId) {
      mainMenu.style.display = "none";
      document.getElementById(sectionId).style.display = "block";
    }
  });
});

// Back to Main Menu
backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    resetSidebar();
  });
});

// Reset Sidebar (Show Main Menu, Hide Sections)
function resetSidebar() {
  mainMenu.style.display = "block";
  sections.forEach((section) => {
    section.style.display = "none";
  });
}

// Logout Confirmation
const logoutBtn = document.querySelector(".logout");
const logoutPopup = document.getElementById("logoutConfirm");
const confirmLogout = document.getElementById("confirmLogout");
const cancelLogout = document.getElementById("cancelLogout");

// Show Logout Confirmation
logoutBtn.addEventListener("click", () => {
  logoutPopup.classList.remove("hidden");
});

// Confirm Logout
confirmLogout.addEventListener("click", () => {
  alert("Logged out successfully!");
  logoutPopup.classList.add("hidden");
  sidebar.classList.remove("active");
});

// Cancel Logout
cancelLogout.addEventListener("click", () => {
  logoutPopup.classList.add("hidden");
});