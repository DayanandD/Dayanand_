document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
  
    var formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
  
    fetch("https://main.d1j5edzp5c3rgz.amplifyapp.com/submitForm", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById("response").innerHTML = data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  