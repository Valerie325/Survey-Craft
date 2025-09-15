
// Get all FAQ question elements
const faqQuestions = document.querySelectorAll(".faq-question");

// Add event listeners to each FAQ question
faqQuestions.forEach((question) => {
  question.addEventListener("click", function () {
    const answer = this.nextElementSibling; // Get the corresponding answer
    // Toggle the display of the answer
    if (answer.style.display === "block") {
      answer.style.display = "none";
    } else {
      answer.style.display = "block";
    }
  });
});
