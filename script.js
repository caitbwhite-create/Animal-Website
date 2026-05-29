// ==========================================================================
// JUNGLE SAFARI INTERACTIVE ENGINE
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initScrollSpy();
    initJungleAmbience();
});

/**
 * ScrollSpy: Dynamically highlights the active sidebar button 
 * based on which animal group is currently visible on the screen.
 */
function initScrollSpy() {
    const sidebarLinks = document.querySelectorAll(".sidebar .side-btn");
    const animalGroups = document.querySelectorAll(".main-content .animal-group");
    
    if (sidebarLinks.length === 0 || animalGroups.length === 0) return;

    const options = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Focuses on the upper-middle section of the viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                sidebarLinks.forEach(link => {
                    link.classList.remove("active-scroll");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active-scroll");
                    }
                });
            }
        });
    }, options);

    animalGroups.forEach(group => observer.observe(group));
}

/**
 * Pure Audio Synthesis: Generates a realistic tropical cricket chirp 
 * using the browser's Web Audio API when clicking the footer footprint.
 */
function initJungleAmbience() {
    const footer = document.querySelector("footer p");
    if (!footer) return;

    footer.style.cursor = "pointer";
    footer.title = "Click to hear the jungle night!";

    footer.addEventListener("click", () => {
        // Create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        // Synthesize a cricket chirp pattern
        for (let i = 0; i < 5; i++) {
            const time = ctx.currentTime + (i * 0.3);
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(4500, time); // High pitched insect frequency
            osc.frequency.exponentialRampToValueAtTime(5000, time + 0.1);
            
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.05, time + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(time);
            osc.stop(time + 0.15);
        }
    });
}