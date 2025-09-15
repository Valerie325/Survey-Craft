
// Welcome Message for signup
            document.addEventListener("DOMContentLoaded", function () {
              let storedName = localStorage.getItem("username");

              if (storedName) {
                document.getElementById(
                  "welcomeMessage"
                ).innerText = `🎉 Welcome, ${storedName}! Your account has been created successfully. Start creating surveys now!🚀`;
              } else {
                document.getElementById("welcomeMessage").innerText =
                  "🎉 Welcome to your dashboard!";
              }
            });
// document.addEventListener("DOMContentLoaded", function () {
//   let storedName = localStorage.getItem("username");
//   let isNewUser = localStorage.getItem("isNewUser");
//   let welcomeMessage = document.getElementById("welcomeMessage");

//   if (storedName) {
//     if (isNewUser === "true") {
//       welcomeMessage.innerText = `🎉 Welcome, ${storedName}! Your account has been created successfully. Start creating surveys now! 🚀`;
//     } else {
//       welcomeMessage.innerText = `👋 Welcome back, ${storedName}! Ready to continue your surveys?`;
//     }
//   } else {
//     welcomeMessage.innerText = "🎉 Welcome to your dashboard!";
//   }

//   // Ensure isNewUser is reset after displaying the signup message
//   localStorage.setItem("isNewUser", "false");
// });






//           document
//             .getElementById("signupBtn")
//             .addEventListener("click", function (event) {
//               event.preventDefault();

//               let fullName = document.getElementById("nameInput").value.trim();

//               if (fullName) {
//                 localStorage.setItem("username", fullName);
//                 localStorage.setItem("isNewUser", "true"); // Ensure it's marked as a new user
//                 window.location.href = "dashboard.html"; // Redirect after storing data
//               }
//             });



//          document
//            .getElementById("loginBtn")
//            .addEventListener("click", function (event) {
//              event.preventDefault();

//              let userName = document.getElementById("nameLog").value.trim();
//              let storedName = localStorage.getItem("username");

//              if (userName && userName === storedName) {
//                localStorage.setItem("isNewUser", "false"); // Mark as returning user
//                window.location.href = "dashboard.html"; // Redirect to dashboard
//              } else {
//                alert("Invalid username or account does not exist.");
//              }
//            });


//             // Welcome message after login in

//          document
//            .getElementById("loginBtn")
//            .addEventListener("click", function (event) {
//              event.preventDefault();

//              let userName = document.getElementById("nameLog").value.trim();
//              let storedName = localStorage.getItem("username");

//              if (userName && userName === storedName) {
//                localStorage.setItem("isNewUser", "false"); // Mark as returning user
//                window.location.href = "dashboard.html"; // Redirect to dashboard
//              }
//            });



// // FAQ section
//             document.querySelectorAll(".faq-question").forEach((button) => {
//               button.addEventListener("click", () => {
//                 const answer = button.nextElementSibling;
//                 answer.style.display =
//                   answer.style.display === "block" ? "none" : "block";
//               });
//             });