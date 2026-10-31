const openButton = document.getElementById("open-modal");
const backdrop = document.getElementById("modal-backdrop");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-modal");
const confirmButton = document.getElementById("confirm-modal");

function openModal() {
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
}

function closeModal() {
    backdrop.hidden = true;
    document.body.style.overflow = "";
    openButton.focus();
}

openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
confirmButton.addEventListener("click", closeModal);


backdrop.addEventListener("click", function(event) {
    if (event.target === backdrop) {
        closeModal();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && !backdrop.hidden) {
        closeModal();
    }
});

modal.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        const focusableElements = modal.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});
