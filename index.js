import confetti from 'canvas-confetti';

function nextScreen(screenNum) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen' + screenNum).classList.add('active');
}

// Simple Cake Cutting Logic
function startCut() {
    document.getElementById('knife-line').style.display = 'block';
}

function endCut() {
    document.getElementById('cake-status').innerText = "Perfect Cut! 🍰";
    document.getElementById('cake-next').style.display = 'inline-block';
    
    // Trigger confetti when the cake is cut
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) { // Ensure canvas exists
        const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true
        });
        myConfetti({
            particleCount: 100,
            spread: 160
        });
    }
}

// Expose functions to the global scope if needed by HTML onclick attributes
window.nextScreen = nextScreen;
window.startCut = startCut;
window.endCut = endCut;