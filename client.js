document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get form data
    const formData = {
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send POST request to server
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                console.log("Email sent successfully");
                // Optionally, display a success message to the user
            } else {
                console.error("Failed to send email");
                // Optionally, display an error message to the user
            }
        })
        .catch(error => {
            console.error("Error sending email:", error);
            // Optionally, display an error message to the user
        });
});
