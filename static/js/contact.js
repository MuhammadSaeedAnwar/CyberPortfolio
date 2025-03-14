document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("jBeC_OX8Sdhd1Sjp8"); // Your Public Key

    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page refresh

        let formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        console.log("Form Data:", formData); // Debugging

        emailjs.send("service_dzztboa", "template_y091eqd", formData)
        .then(function(response) {
            console.log("SUCCESS!", response);
            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "We've received your message and will respond shortly.",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
                timer: 3000
            });
            document.getElementById("contact-form").reset();
        }, function(error) {
            console.error("FAILED...", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please try again later.",
            });
        });
    });
});
