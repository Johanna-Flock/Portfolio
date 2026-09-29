const nameInput = document.getElementById("name");
const nameErrorIcon = nameInput.parentElement.querySelector(".error_icon");
const nameSuccessIcon = nameInput.parentElement.querySelector(".success_icon");
const nameRequiredMessage = nameInput.parentElement.querySelector(".required_message");
const nameInvalidMessage = nameInput.parentElement.querySelector(".invalid_message");


const emailInput = document.getElementById("email");
const emailErrorIcon = emailInput.parentElement.querySelector(".error_icon");
const emailSuccessIcon = emailInput.parentElement.querySelector(".success_icon");
const emailRequiredMessage = emailInput.parentElement.querySelector(".required_message");
const emailInvalidMessage = emailInput.parentElement.querySelector(".invalid_message");

const messageInput = document.getElementById("message");
const messageErrorIcon = messageInput.parentElement.querySelector(".error_icon");
const messageSuccessIcon = messageInput.parentElement.querySelector(".success_icon");
const messageRequiredMessage = messageInput.parentElement.querySelector(".required_message");
const messageInvalidMessage = messageInput.parentElement.querySelector(".invalid_message");



async function sendMail() {
    const privacyCheckbox = document.querySelector('input[name="privacy"]');
    const privacyError = document.querySelector(".privacy_error");

    if (!privacyCheckbox.checked) {
        privacyError.style.display = "block";
        return;
    }
    privacyError.style.display = "none";

    if (
        !validateName() ||
        !validateEmail() ||
        !validateMessage()
    ) {
        return;
    }

    const data = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    };

    const response = await fetch("contact.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
        alert("Nachricht gesendet!");
    } else {
        alert("Fehler.");
    }
}

//Focus

nameInput.addEventListener("focus", function () {
    console.log("FOCUS");
    if (nameInput.value.trim() === "") {
        nameInput.classList.add("error");
        nameRequiredMessage.style.display = "block";
        nameErrorIcon.style.display = "block";
    }
});

emailInput.addEventListener("focus", function () {
    if (emailInput.value.trim() === "") {
        emailInput.classList.add("error");
        emailErrorIcon.style.display = "block";
        emailRequiredMessage.style.display = "block";
    }
});

messageInput.addEventListener("focus", function () {
    if (messageInput.value.trim() === "") {
        messageInput.classList.add("error");
        messageErrorIcon.style.display = "block";
        messageRequiredMessage.style.display = "block";
    }
});

//Input

nameInput.addEventListener("input", function () {
    nameRequiredMessage.style.display = "none";
    nameInvalidMessage.style.display = "none";
});

emailInput.addEventListener("input", function () {
    emailRequiredMessage.style.display = "none";
    emailInvalidMessage.style.display = "none";

});

messageInput.addEventListener("input", function () {
    messageRequiredMessage.style.display = "none";
    messageInvalidMessage.style.display = "none";
});


//Validierung der Formulardaten - Blur-Eventlistener für die Eingabefelder



nameInput.addEventListener("blur", validateName);

function validateName() {
    const value = nameInput.value.trim();

    nameInput.classList.remove("error", "success");
    nameErrorIcon.style.display = "none";
    nameSuccessIcon.style.display = "none";
    nameRequiredMessage.style.display = "none";
    nameInvalidMessage.style.display = "none";

    if (value === "") {
        nameInput.classList.add("error");
        nameErrorIcon.style.display = "block";
        nameRequiredMessage.style.display = "block";
        return false;
    }

    if (value.length < 2) {
        nameInput.classList.add("error");
        nameErrorIcon.style.display = "block";
        nameInvalidMessage.style.display = "block";
        return false;
    }

    nameInput.classList.add("success");
    nameSuccessIcon.style.display = "block";

    return true;
}

emailInput.addEventListener("blur", validateEmail);

function validateEmail() {
    const email = emailInput.value.trim();
    emailInput.classList.remove("error", "success");
    emailErrorIcon.style.display = "none";
    emailSuccessIcon.style.display = "none";
    emailRequiredMessage.style.display = "none";
    emailInvalidMessage.style.display = "none";
    if (email === "") {
        emailInput.classList.add("error");
        emailErrorIcon.style.display = "block";
        emailRequiredMessage.style.display = "block";
        return false;
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
        emailInput.classList.add("error");
        emailErrorIcon.style.display = "block";
        emailInvalidMessage.style.display = "block";
        return false;
    }
    emailInput.classList.add("success");
    emailSuccessIcon.style.display = "block";
    return true;
}

messageInput.addEventListener("blur", validateMessage);

function validateMessage() {
    const message = messageInput.value.trim();
    messageInput.classList.remove("error", "success");
    messageErrorIcon.style.display = "none";
    messageSuccessIcon.style.display = "none";
    messageRequiredMessage.style.display = "none";
    messageInvalidMessage.style.display = "none";

    if (message === "") {
        messageInput.classList.add("error");
        messageErrorIcon.style.display = "block";
        messageRequiredMessage.style.display = "block";
        return false;
    }
    if (message.length < 10) {
        messageInput.classList.add("error");
        messageErrorIcon.style.display = "block";
        messageInvalidMessage.style.display = "block";
        return false;
    }

    messageInput.classList.add("success");
    messageSuccessIcon.style.display = "block";
    return true;
}

const privacyCheckbox = document.querySelector(".input_checkbox");
const submitButton = document.querySelector(".submit_btn");

privacyCheckbox.addEventListener("change", function () {
    if (privacyCheckbox.checked) {
        submitButton.classList.add("active");
    } else {
        submitButton.classList.remove("active");
    }
});