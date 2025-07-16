// main.js

const tabBackgrounds = [
    'linear-gradient(135deg, #fffde4 0%, #ffe680 100%)', // Education - yellow
    'linear-gradient(135deg, #e0f7fa 0%, #b3e5fc 100%)', // Health - light blue
    'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)', // Women Empowerment - gold
    'linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)'  // Contact - greenish
];
function showTab(index) {
    var tabs = document.querySelectorAll('.tab');
    var contents = document.querySelectorAll('.tab-content');
    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
        contents[i].classList.toggle('active', i === index);
    });
    document.body.style.background = tabBackgrounds[index];
}
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.background = tabBackgrounds[0];
    // Slider setup
    let currentSlide = 0;
    const slides = document.getElementById('slides').children;
    const totalSlides = slides.length;
    const dotsContainer = document.getElementById('slider-dots');
    let autoSlideInterval;

    function renderDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (i === currentSlide ? ' active' : '');
            dot.onclick = () => showSlide(i);
            dotsContainer.appendChild(dot);
        }
    }

    function showSlide(idx) {
        currentSlide = (idx + totalSlides) % totalSlides;
        for (let i = 0; i < totalSlides; i++) {
            slides[i].classList.toggle('active', i === currentSlide);
        }
        renderDots();
    }

    function moveSlide(dir) {
        showSlide(currentSlide + dir);
    }

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => moveSlide(1), 5000);
    }

    document.querySelector('.slider').addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    document.querySelector('.slider').addEventListener('mouseleave', startAutoSlide);

    // Expose functions globally
    window.moveSlide = moveSlide;
    window.showSlide = showSlide;

    showSlide(0);
    startAutoSlide();
});