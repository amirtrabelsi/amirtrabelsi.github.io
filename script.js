let youtubePlayers = {};

// 1. Initialize YouTube Players
function onYouTubeIframeAPIReady() {
    document.querySelectorAll(".video-slide iframe").forEach((iframe) => {
        youtubePlayers[iframe.id] = new YT.Player(iframe.id);
    });
}

// 2. Slider Logic
document.querySelectorAll(".project-media.slider").forEach(slider => {
    const track = slider.querySelector(".slider-track");
    const slides = track.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");

    let index = 0;

    // Set the first slide as active initially
    slides[0].classList.add("active");

    function updateSlider() {
        // Move the track
        track.style.transform = `translateX(-${index * 100}%)`;

        // Update active class for CSS pointer-events
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
                
                // Pause video if it's not the active slide
                const iframe = slide.querySelector("iframe");
                if (iframe && youtubePlayers[iframe.id] && youtubePlayers[iframe.id].pauseVideo) {
                    youtubePlayers[iframe.id].pauseVideo();
                }
            }
        });
    }

    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents the click from reaching the iframe
        index = (index + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents the click from reaching the iframe
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    });
});