const form = document.getElementById("registration-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    successMessage.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    let isValid = true;

    if (name === "") {
        nameError.textContent = "Name is required";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email";
        isValid = false;
    }

   
    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters";
        isValid = false;
    }

    if (confirmPassword === "") {
        confirmPasswordError.textContent = "Please confirm your password";
        isValid = false;
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match";
        isValid = false;
    }

    if (isValid) {
        successMessage.textContent = "Registration successful!";

        form.reset();
    }
});
