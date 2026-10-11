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


/**
 * Validates the contact form, sends the message to the server,
 * and displays feedback depending on the result.
 * Disables the submit button while the request is in progress.
 *
 * @async
 * @returns {Promise<void>}
 */
async function sendMail() {
    if (!validateContactForm()) return;

    const form = document.querySelector(".contact_form");
    const privacyCheckbox = document.querySelector(".input_checkbox");
    const submitButton = form.querySelector(".submit_btn");

    submitButton.disabled = true;

    try {
        const result = await submitContactForm();

        if (result.success) {
            resetContactForm();
            showFeedback("success");
        } else {
            showFeedback("error");
        }
    } catch (error) {
        console.error("Error sending the message:", error);
        showFeedback("error");
    } finally {
        submitButton.disabled = !privacyCheckbox.checked;
    }
}

/**
 * Validates the privacy checkbox and all contact form fields.
 * Displays the privacy error message if consent has not been given.
 *
 * @returns {boolean} True if all validations pass, otherwise false.
 */

function validateContactForm() {
    const privacyCheckbox = document.querySelector(".input_checkbox");
    const privacyError = document.querySelector(".privacy_error");

    if (!privacyCheckbox.checked) {
        privacyError.style.display = "block";
        return false;
    }
    privacyError.style.display = "none";
    return (
        validateName() &&
        validateEmail() &&
        validateMessage()
    );
}

/**
 * Sends the contact form data to the PHP backend using a POST request.
 * Parses the JSON response and throws an error if the request fails.
 *
 * @async
 * @returns {Promise<Object>} The parsed JSON response from the server.
 * @throws {Error} If the request fails or the server reports an error.
 */

async function submitContactForm() {
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
    if (!response.ok || !result.success) {
        throw new Error("Message could not be sent.");
    }
    return result;
}

/**
 * Resets the contact form and hides all validation messages and icons.
 */

function resetContactForm() {
    const form = document.querySelector(".contact_form");
    const submitButton = form.querySelector(".submit_btn");
    submitButton.classList.remove("active");
    submitButton.disabled = true;
    form.reset();
    form.querySelectorAll(".error_icon, .success_icon").forEach((icon) => {
        icon.style.display = "none";
    });
    form.querySelectorAll(
        ".required_message, .invalid_message, .privacy_error"
    ).forEach((message) => {
        message.style.display = "none";
    });
}

let feedbackTimeout;

/**
 * Displays a feedback message and hides it automatically
 * after two seconds.
 *
 * @param {"success" | "error"} type - Feedback type.
 */

function showFeedback(type) {
    const overlay = document.querySelector("#feedbackOverlay");
    if (!overlay) {
        console.error("Feedback overlay not found.");
        return;
    }
    clearTimeout(feedbackTimeout);
    overlay.classList.remove("success", "error");
    overlay.classList.add(type, "visible");
    overlay.setAttribute("aria-hidden", "false");
    feedbackTimeout = setTimeout(() => {
        overlay.classList.remove("visible");
        overlay.setAttribute("aria-hidden", "true");
    }, 2000);
}

/**
 * Validates the name input when it receives focus.
 * Checks whether the input field is empty or contains only spaces.
 * Adds the error class when no name has been entered.
 * Displays the required message and error icon.
 * Helps the user immediately recognize the missing required field.
 */

nameInput.addEventListener("focus", function () {
    if (nameInput.value.trim() === "") {
        nameInput.classList.add("error");
        nameRequiredMessage.style.display = "block";
        nameErrorIcon.style.display = "block";
    }
});

/**
 * Validates the email input when it receives focus.
 * Checks whether the input field is empty or contains only spaces.
 * Adds the error class when no email address has been entered.
 * Displays the required message and error icon.
 * Helps the user recognize that the email field is required.
 */

emailInput.addEventListener("focus", function () {
    if (emailInput.value.trim() === "") {
        emailInput.classList.add("error");
        emailErrorIcon.style.display = "block";
        emailRequiredMessage.style.display = "block";
    }
});

/**
 * Validates the message input when it receives focus.
 * Checks whether the input field is empty or contains only spaces.
 * Adds the error class when no message has been entered.
 * Displays the required message and error icon.
 * Helps the user recognize that the message field is required.
 */

messageInput.addEventListener("focus", function () {
    if (messageInput.value.trim() === "") {
        messageInput.classList.add("error");
        messageErrorIcon.style.display = "block";
        messageRequiredMessage.style.display = "block";
    }
});

/**
 * Hides validation messages while the user edits the name field.
 * Removes the required and invalid messages after new input.
 * Hides validation messages while the user edits the email field.
 * Removes the required and invalid messages after new input.
 * Also clears both messages while the user edits the message field.
 */

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

/**
 * Validates the name field when the user leaves the input.
 * Resets all previous validation states and messages.
 * Shows an error when the field is empty or the name is too short.
 * Shows a success state when the entered name is valid.
 * Returns true for valid input and false for invalid input.
 */

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

/**
 * Validates the email field when the user leaves the input.
 * Resets all previous validation states, icons, and messages.
 * Shows an error when the field is empty or the email format is invalid.
 * Shows a success state when the entered email address is valid.
 * Returns true for valid input and false for invalid input.
 */

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

/**
 * Validates the message field when the user leaves the input.
 * Resets all previous validation states, icons, and messages.
 * Shows an error when the field is empty or the message is too short.
 * Shows a success state when the message contains at least 10 characters.
 * Returns true for valid input and false for invalid input.
 */

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

/**
 * Updates the submit button when the privacy checkbox changes.
 * Checks whether the user has accepted the privacy policy.
 * Adds the active class when the checkbox is selected.
 * Removes the active class when the checkbox is unchecked.
 * Controls the visual state of the submit button.
 */


const privacyCheckbox = document.querySelector(".input_checkbox");
const submitButton = document.querySelector(".submit_btn");

privacyCheckbox.addEventListener("change", function () {
    if (privacyCheckbox.checked) {
        submitButton.classList.add("active");
        submitButton.disabled = false;
    } else {
        submitButton.classList.remove("active");
        submitButton.disabled = true;
    }
});