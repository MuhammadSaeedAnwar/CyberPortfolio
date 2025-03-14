document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with slower animations
    AOS.init({
        duration: 1200,
        once: true,
        easing: 'ease-out-cubic'
    });

    // Typing effect with professional messages
    const texts = [
        'Cybersecurity Professional',
        'Security Analyst',
        'Ethical Hacker',
        'Digital Guardian'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.querySelector('.typed-text');

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 150;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // Smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });

    // Initialize EmailJS with public key
    emailjs.init("jBeC_OX8Sdhd1Sjp8"); 

    // Enhanced contact form with EmailJS integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            // Get form values
            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            // Show sending state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            submitButton.disabled = true;

            // Send email using EmailJS
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

                // Reset form
                contactForm.reset();
            })
            .catch(function(error) {
                console.error("FAILED...", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Please try again later.",
                });
            })
            .finally(() => {
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            });
        });
    }

    // Animate skill bars on scroll with smooth progression
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
            }
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.progress-bar').forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.setAttribute('data-width', width);
        observer.observe(bar);
    });
});
