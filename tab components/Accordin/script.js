
const questions = document.querySelectorAll(".accordion-question");


questions.forEach(function (question) {
    question.addEventListener("click", function () {

        // Find the answer panel for this question
        const panel = question.nextElementSibling;

        // Check whether this answer is already open
        const isOpen =
            question.getAttribute("aria-expanded") === "true";

        // Close all answer panels
        questions.forEach(function (otherQuestion) {
            const otherPanel = otherQuestion.nextElementSibling;

            otherQuestion.setAttribute("aria-expanded", "false");
            otherPanel.style.height = "0px";

            otherQuestion.querySelector(".icon").textContent = "+";
        });

        // If the clicked answer was closed, open it
        if (!isOpen) {
            panel.style.height = panel.scrollHeight + "px";

            question.setAttribute("aria-expanded", "true");
            question.querySelector(".icon").textContent = "−";
        }
    });
});
