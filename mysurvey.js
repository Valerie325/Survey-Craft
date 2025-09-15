// document.addEventListener("DOMContentLoaded", function () {
//   const surveyContainer = document.getElementById("surveyContainer");
//   const modal = document.getElementById("surveyModal");
//   const modalTitle = document.getElementById("modalSurveyTitle");
//   const modalQuestions = document.getElementById("modalQuestionsContainer");
//   const closeModal = document.querySelector(".close");

//   let savedSurveys = JSON.parse(localStorage.getItem("surveys")) || [];

//   if (savedSurveys.length === 0) {
//     surveyContainer.innerHTML = "<p>No surveys available.</p>";
//   } else {
//     savedSurveys.forEach((survey, index) => {
//       let surveyDiv = document.createElement("div");
//       surveyDiv.classList.add("survey-item");
//       surveyDiv.innerHTML = `
//                 <h3>${survey.title}</h3>
//                 <button class="view-survey" data-index="${index}">View Details</button>
//             `;
//       surveyContainer.appendChild(surveyDiv);
//     });

//     document.querySelectorAll(".view-survey").forEach((button) => {
//       button.addEventListener("click", function () {
//         let index = this.getAttribute("data-index");
//         let survey = savedSurveys[index];

//         modalTitle.innerText = survey.title;
//         modalQuestions.innerHTML = "";

//         survey.questions.forEach((question) => {
//           let questionDiv = document.createElement("div");
//           questionDiv.classList.add("survey-question");

//           questionDiv.innerHTML = `<p>${question.text}</p>`;

//           if (question.type === "radio" && question.options) {
//             question.options.forEach((option) => {
//               let label = document.createElement("label");
//               let input = document.createElement("input");
//               input.type = "radio";
//               input.name = question.text;
//               input.value = option;
//               label.appendChild(input);
//               label.appendChild(document.createTextNode(option));
//               questionDiv.appendChild(label);
//             });
//           } else if (question.type === "text") {
//             let input = document.createElement("input");
//             input.type = "text";
//             questionDiv.appendChild(input);
//           }

//           modalQuestions.appendChild(questionDiv);
//         });

//         modal.style.display = "block";
//       });
//     });
//   }

//   closeModal.addEventListener("click", function () {
//     modal.style.display = "none";
//   });

//   window.addEventListener("click", function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   });
// });