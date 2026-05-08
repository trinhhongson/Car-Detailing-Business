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

// --- MODAL LOGIC & SERVICE DATA ---
const serviceData = {
    premium: `
        <ul class="modal-list">
            <li><strong>Full Interior Vacuuming:</strong> Seats, carpets, mats, trunk, and tight spaces. Removes dirt, crumbs and debris.</li>
            <li><strong>Interior Surface Wipe-Down:</strong> Dashboard, center console, door panels, cup holders cleaned with non-greasy, anti-static products for a fresh finish.</li>
            <li><strong>Window & Mirror Cleaning:</strong> Streak-free cleaning of all interior glass. Enhances visibility and overall clarity.</li>
            <li><strong>Air Vent & Crevice Dusting:</strong> Compressed air and detailing brushes used to clean vents and seams. Improves air quality and removes hidden dust.</li>
            <li><strong>Hand Wash & Dry:</strong> Removes surface dirt, grime, and road debris using safe, non-abrasive methods.</li>
            <li><strong>Wheel & Tire Cleaning:</strong> Cleans brake dust and road buildup from wheels and tires; may include tire shine.</li>
            <li><strong>Bug & Tar Removal:</strong> Targets stubborn contaminants on bumpers, grilles, and lower panels.</li>
            <li><strong>Sealant Application:</strong> Adds a protective layer to the paint, enhancing shine and guarding against UV rays, rain, and pollutants.</li>
            <li><strong>Exterior Glass Cleaning:</strong> Ensures streak-free windows and mirrors.</li>
            <li><strong>Door Jamb Cleaning:</strong> Cleans hidden grime from door frames and hinges.</li>
        </ul>
    `,
    deluxe: `
        <ul class="modal-list">
            <li><strong>Full Interior Vacuuming:</strong> Seats, carpets, mats, trunk, and pet hair. Removes embedded dirt and debris.</li>
            <li><strong>Dashboard, Console & Panel Detailing:</strong> Deep-cleaned with brushes and microfiber tools. Every button, dial, and seam is addressed.</li>
            <li><strong>Air Vent & Crevice Cleaning:</strong> Compressed air and detailing brushes used to clean vents and seams.</li>
            <li><strong>Window & Mirror Cleaning:</strong> Streak-free cleaning of all interior glass.</li>
            <li><strong>Odor Elimination Treatment:</strong> Enzyme-based deodorizer or ozone treatment neutralizes smoke, pet, and mildew odors.</li>
            <li><strong>Seatbelt & Headliner Cleaning:</strong> Spot-treated and gently cleaned for a complete refresh.</li>
            <li><strong>Full Hand Wash & Foam Bath:</strong> Scratch-free cleaning using pH-balanced soap. Pressure rinse and hand dry with microfiber towels.</li>
            <li><strong>Iron & Fallout Decontamination:</strong> Dissolves embedded brake dust and industrial fallout. Preps paint for clay bar treatment.</li>
            <li><strong>Clay Bar Treatment:</strong> Removes bonded contaminants like tree sap, overspray, and road grime. Restores smoothness to paint surfaces.</li>
            <li><strong>Bug & Tar Removal:</strong> Targets stubborn buildup on bumpers, grilles, and lower panels.</li>
            <li><strong>Tire & Rim Cleaning + Shine:</strong> Deep cleans wheels and tires. Applies premium tire shine for a rich, dark finish.</li>
            <li><strong>Door Jamb Cleaning:</strong> Cleans hidden grime from door frames and hinges.</li>
            <li><strong>Premium Wax:</strong> Adds long-lasting protection and deep gloss. Enhances water beading and UV resistance.</li>
        </ul>
    `,
    full: `
        <p style="margin-bottom: 15px; color: #fff;"><strong>Includes everything from the Deluxe Package, plus:</strong></p>
        <ul class="modal-list">
            <li><strong>Trim & Plastic Dressing:</strong> Restores faded trim and plastic surfaces with UV-resistant dressing.</li>
            <li><strong>Shampoo Upholstery and Leather Conditioning:</strong> Shampooing upholstery and conditioning leather deeply cleans and restores your seats—lifting stains, refreshing textures, and preserving softness for a like-new feel.</li>
        </ul>
    `,
    interior: `
        <p style="margin-bottom: 15px; color: #fff;"><strong>Base Package:</strong> Interior Detail from Deluxe Package</p>
        <h4 style="color: #007BFF; margin-bottom: 10px;">Available Add-ons:</h4>
        <ul class="modal-list">
            <li><strong>Heavy Pet Hair Removal:</strong> +$45 and Up (upon inspection)</li>
            <li><strong>Dress Interior Plastic | UV Treatment:</strong> +$60</li>
            <li><strong>Leather Cleaning and Conditioning:</strong> +$75</li>
            <li><strong>Seat Shampoo | Extraction:</strong> +$120 Starting Price</li>
            <li><strong>Shampoo Floor Carpets | Mats:</strong> +$100 Starting Price</li>
        </ul>
    `,
    exterior: `
        <p style="margin-bottom: 15px; color: #fff;"><strong>Base Package:</strong> Exterior Detail Wash and Wax</p>
        <h4 style="color: #007BFF; margin-bottom: 10px;">Available Add-ons:</h4>
        <ul class="modal-list">
            <li><strong>Iron Removal:</strong> +$45 and Up</li>
            <li><strong>Claybar Treatment:</strong> +$60 and Up</li>
            <li><strong>Headlight Restoration:</strong> +$80</li>
            <li><strong>Paint Polish:</strong> +$150</li>
        </ul>
    `
};

function openModal(serviceKey, title) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-body').innerHTML = serviceData[serviceKey];
    
    const modal = document.getElementById('service-modal');
    modal.style.display = 'flex';
    
    // Tiny delay to allow display:flex to register before animating opacity
    setTimeout(() => { modal.style.opacity = '1'; }, 10);
    
    // Lock the background body from scrolling while the modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('service-modal');
    modal.style.opacity = '0';
    
    // Wait for the fade out animation to finish before hiding it entirely
    setTimeout(() => { 
        modal.style.display = 'none'; 
        document.body.style.overflow = 'auto'; // Unlock body scroll
    }, 300);
}

// Close the modal if the user clicks the dark background outside the box
window.onclick = function(event) {
    const modal = document.getElementById('service-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// --- PARALLAX BACKGROUND EFFECT ---
const parallaxBg = document.querySelector('.parallax-bg');

window.addEventListener('scroll', () => {
    // Calculate how far down the page the user has scrolled (returns a number between 0 and 1)
    let scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Prevent it from glitching if they bounce past the bottom on a Mac/iPhone
    if (scrollPercent > 1) scrollPercent = 1;
    if (scrollPercent < 0) scrollPercent = 0;

    // Move the background up by a maximum of 20vh. 
    // Since the image is 120vh tall, it will never run out of picture!
    parallaxBg.style.transform = `translateY(-${scrollPercent * 50}vh)`;
});