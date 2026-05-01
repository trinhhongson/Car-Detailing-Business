// --- SCROLL ANIMATIONS ---
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// --- IMAGE COMPARISON SLIDER LOGIC ---
const sliders = document.querySelectorAll('.compare-slider');

sliders.forEach(slider => {
    slider.addEventListener('input', (e) => {
        const sliderVal = e.target.value;
        const container = e.target.closest('.compare-container');
        
        const beforeImg = container.querySelector('.img-before');
        const sliderLine = container.querySelector('.slider-line');
        const sliderBtn = container.querySelector('.slider-button');

        // Adjust the clip path to reveal/hide the image based on the slider value (0 to 100)
        beforeImg.style.clipPath = `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)`;
        
        // Move the visible line and button to match
        sliderLine.style.left = `${sliderVal}%`;
        sliderBtn.style.left = `${sliderVal}%`;
    });
});