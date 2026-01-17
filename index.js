import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Scroll Animations ---
    const sections = document.querySelectorAll('.scroll-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.2, // trigger when 20% of the element is visible
    });

    // Observe each section, except the first one which is already visible
    sections.forEach((section, index) => {
        if (index > 0) {
            observer.observe(section);
        }
    });


    // --- Cake Cutting Logic ---
    const startCut = () => {
        document.getElementById('knife-line').style.display = 'block';
    };

    const endCut = () => {
        const cakeStatus = document.getElementById('cake-status');
        if (cakeStatus.innerText.includes('Waiting')) { // Prevent re-triggering confetti
            cakeStatus.innerText = "Perfect Cut! 🍰";
            
            const canvas = document.getElementById('confetti-canvas');
            if (canvas) {
                const myConfetti = confetti.create(canvas, {
                    resize: true,
                    useWorker: true
                });
                myConfetti({
                    particleCount: 150,
                    spread: 180,
                    origin: { y: 0.6 }
                });
            }
        }
    };

    // Cake Container Events
    const cakeContainer = document.getElementById('cake-container');
    if (cakeContainer) {
        cakeContainer.addEventListener('mousedown', startCut);
        cakeContainer.addEventListener('mouseup', endCut);
        cakeContainer.addEventListener('touchstart', startCut, { passive: true }); // passive for better scroll performance
        cakeContainer.addEventListener('touchend', endCut);
    }


    // --- Replay Button ---
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) {
        btnReplay.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Optionally reload after a delay to see the scroll animation
            // setTimeout(() => location.reload(), 500);
        });
    }
});
