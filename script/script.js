// Use Intersection Observer to fade in sections when you scroll to them
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    threshold: 0.15, // Trigger when 15% of the section is visible
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