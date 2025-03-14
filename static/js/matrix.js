(function() {
    // Get the canvas element
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext('2d');

    // Set initial canvas dimensions
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const fontSize = 16; // Slightly increased for better visibility
    let columns = Math.floor(canvas.width / fontSize);
    let drops = new Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slightly darker background effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0'; // Green Matrix Effect
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0; // Reset drop to the top
            }
            drops[i]++; // Move the drop down
        }
    }

    // Start animation
    setInterval(draw, 50);

    // Handle window resize smoothly
    window.addEventListener('resize', function() {
        setCanvasSize();
        columns = Math.floor(canvas.width / fontSize);
        drops = new Array(columns).fill(1); // Reset drops to match new screen size
    });
})();
