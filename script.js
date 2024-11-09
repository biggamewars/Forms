// Handle team checkbox to toggle team member fields visibility
document.getElementById("teamCheckbox").addEventListener("change", function () {
    const teamMembers = document.getElementById("teamMembers");
    teamMembers.style.display = this.checked ? "block" : "none";
});

// Form submission handler
document.getElementById("registrationForm").addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById("registrationForm");
    const email = form.email.value;
    const phone = form.phone.value;

    // Regex for Gmail and phone validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^\d{3}-?\d{3}-?\d{4}$/;

    // Validate email and phone
    if (!emailRegex.test(email)) {
        alert("Enter a valid Gmail address.");
        return;
    }
    if (!phoneRegex.test(phone)) {
        alert("Enter a valid phone number (e.g., 123-456-7890).");
        return;
    }

    // Create FormData object to send data
    const formData = new FormData(form);

    // Submit data to Google Sheets using Google Apps Script Web App URL
    fetch('https://script.google.com/macros/s/AKfycbwGp3Q95rkskr9roudGsu39mw6id8cTjaM86X-fcqoVblETvcdMMuOD-85nBF0ctoImQQ/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(responseText => {
        console.log(responseText); // For debugging
        if (responseText.trim() === "Success") {
            showPopup(); // Show success message
            form.reset(); // Reset form
            document.getElementById("teamMembers").style.display = "none"; // Hide team section if visible
        } else {
            alert("There was an error submitting the form: " + responseText);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error submitting the form. Please try again.");
    });
}

// Show registration success popup
function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

// Close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}
