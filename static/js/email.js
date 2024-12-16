function sendMail(contactForm){
    if (validateForm()) {
        emailjs.send("service_wsyeaez","template_1ode6xb",{
            name: contactForm.name.value.trim(),
            message: contactForm.message.value.trim(),
            reply_to: contactForm.email.value.trim()
            }).then(
                (response) => {
                    console.log("SUCCESS", response);
                    window.location.href = "thank-you"; 
                },
                (error) => {
                    console.log("FAILED", error);
                    alert("An error occurred while sending your message. Please try again later.");
                }
            );
        return false;
    } else {
        console.error("Validation failed. Please correct the errors and try again.");
        return false;
    }
}

/**Function to validate the form */
function validateForm() {
    let isValid = true;

    let nameInput = document.forms.contactForm.name;
    let emailInput = document.forms.contactForm.email;
    let enquiryInput = document.forms.contactForm.message;

    if (nameInput.value.trim() === "") {
        nameInput.classList.add("is-invalid");
        isValid = false;
    } else {
        nameInput.classList.remove("is-invalid");
    }

    if (emailInput.value.trim() === "") {
        emailInput.classList.add("is-invalid");
        isValid = false;
    } else {
        emailInput.classList.remove("is-invalid");
    }

    if (enquiryInput.value.trim() === "") {
        enquiryInput.classList.add("is-invalid");
        isValid = false;
    } else {
        enquiryInput.classList.remove("is-invalid");
    }

    return isValid;
}