const formContainer = document.querySelector(".form-container");
const switchToLogin = document.querySelector(".switch-to-login");
const switchToSignup = document.querySelector(".switch-to-signup");

// Switch to Log In - Slide Left
switchToLogin.addEventListener("click", () => {
  formContainer.classList.add("show-login");
  
});

// Switch to Sign Up - Slide Right
switchToSignup.addEventListener("click", () => {
  formContainer.classList.remove("show-login");
});


document
  .getElementById("signupBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    let nameValue = document.getElementById("nameInput").value;

    if (nameValue.trim() !== "") {
      localStorage.setItem("username", nameValue); // Store name in local storage
      window.location.href = "pages/dashboard.html"; // Redirect to dashboard
    } else {
      alert("Please enter your full name before signing up.");
    }
  });