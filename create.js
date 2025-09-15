document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".create-btn");
  const modal = document.getElementById("surveyModal");
  const modalTitle = document.getElementById("surveyTitle");
  const modalQuestions = document.getElementById("surveyQuestions");
  const closeModal = document.getElementById("closeModal");
  const saveSurvey = document.getElementById("saveSurvey");
  const addQuestion = document.getElementById("addQuestion");
  const templates = document.getElementsByClassName("templates");
  let surveyData = [];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      const questions = JSON.parse(button.getAttribute("data-questions"));

      modalTitle.textContent = title;
      surveyData = questions;
      renderQuestions();

      modal.style.display = "flex"; // Show modal
      //   templates.style.overlay = " rgba(14, 13, 13,0.5)";
    });
  });

  function renderQuestions() {
    modalQuestions.innerHTML = ""; // Clear previous questions
    surveyData.forEach((q, index) => {
      const questionWrapper = document.createElement("div");
      questionWrapper.classList.add("question");

      // Editable question text
      const questionText = document.createElement("div");
      questionText.textContent = q.question;
      questionText.classList.add("question-text");
      questionText.setAttribute("contenteditable", "true"); // Editable field
      questionText.addEventListener("input", () => {
        surveyData[index].question = questionText.textContent; // Save changes
      });

      questionWrapper.appendChild(questionText);

      if (q.type === "radio") {
        q.options.forEach((option) => {
          const radioContainer = document.createElement("div");
          radioContainer.classList.add("radio-container");

          const input = document.createElement("input");
          input.type = "radio";
          input.name = `question-${index}`;
          input.value = option;

          const span = document.createElement("span");
          span.textContent = option;

          radioContainer.appendChild(input);
          radioContainer.appendChild(span);
          questionWrapper.appendChild(radioContainer);
        });
      } else if (q.type === "text") {
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.classList.add("text-input");
        textInput.placeholder = "Type your response...";
        questionWrapper.appendChild(textInput);
      }

      modalQuestions.appendChild(questionWrapper);
    });
  }

  addQuestion.addEventListener("click", () => {
    const newQuestionText = prompt("Enter your question:");
    if (newQuestionText) {
      const newQuestion = {
        question: newQuestionText,
        type: "text", // Default to text input
      };
      surveyData.push(newQuestion);
      renderQuestions();
    }
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal
  });

  saveSurvey.addEventListener("click", () => {
    alert("Survey has been saved successfully!");
    modal.style.display = "none"; // Hide modal
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});