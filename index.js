import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    
    const nextScreen = (screenNum) => {
        screens.forEach(s => s.classList.remove('active'));
        const nextScreenElement = document.getElementById('screen' + screenNum);
        if (nextScreenElement) {
            nextScreenElement.classList.add('active');
        }
    };

    const startCut = () => {
        document.getElementById('knife-line').style.display = 'block';
    };

    const endCut = () => {
        document.getElementById('cake-status').innerText = "Perfect Cut! 🍰";
        const cakeNextButton = document.getElementById('cake-next');
        if (cakeNextButton) {
            cakeNextButton.style.display = 'inline-block';
        }

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
    };

    // --- Event Listeners ---

    // Screen 1 Button
    const btnScreen1 = document.getElementById('btn-screen1');
    if (btnScreen1) {
        btnScreen1.addEventListener('click', () => nextScreen(2));
    }

    // Screen 2 Button
    const btnScreen2 = document.getElementById('btn-screen2');
    if (btnScreen2) {
        btnScreen2.addEventListener('click', () => nextScreen(3));
    }

    // Cake Container Events
    const cakeContainer = document.getElementById('cake-container');
    if (cakeContainer) {
        cakeContainer.addEventListener('mousedown', startCut);
        cakeContainer.addEventListener('mouseup', endCut);
        // Add touch events for mobile
        cakeContainer.addEventListener('touchstart', startCut);
        cakeContainer.addEventListener('touchend', endCut);
    }

    // Screen 3 "Make a Wish!" Button
    const btnScreen3 = document.getElementById('cake-next');
    if (btnScreen3) {
        btnScreen3.addEventListener('click', () => nextScreen(4));
    }

    // Screen 4 "Replay" Button
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) {
        btnReplay.addEventListener('click', () => location.reload());
    }
});