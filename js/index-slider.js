    const slider = document.getElementById('image-slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let counter = 0;
    let hoverPosition = 0;

    nextButton.addEventListener('click', () => {
        if (counter < slides.length - 1) {
            counter++;
        } else {
            counter = 0;
        }
        updateSlider();
    });

    prevButton.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
        } else {
            counter = slides.length - 1;
        }
        updateSlider();
    });

    /*Slide animation to the right, the next image*/
    nextButton.addEventListener('mousemove', (e) => {
        const rect = nextButton.getBoundingClientRect();
        const hoverPosition = (e.clientX - rect.left) / rect.width;
        const maxPreviewWidth = 18;
        const previewPercentage = hoverPosition * maxPreviewWidth;
    
        slider.style.transform = `translateX(-${counter * 100 + previewPercentage}%)`;
    });

    /*Slide animation to the left, the previous image*/
    prevButton.addEventListener('mousemove', (e) => {
        const rect = prevButton.getBoundingClientRect();
        const hoverPosition = e.clientX / rect.width;
        const maxPreviewWidth = 18;
        const previewPercentage = hoverPosition * maxPreviewWidth;
    
        slider.style.transform = `translateX(-${counter * 100 - previewPercentage}%)`;
    });

    nextButton.addEventListener('mouseleave', () => {
        hoverPosition = 0;
        updateSliderHover();
    });

    prevButton.addEventListener('mouseleave', () => {
        hoverPosition = 0;
        updateSlider();
    });

    function updateSlider() {
        const percentage = -counter * 100;
        slider.style.transform = `translateX(${percentage}%)`;
    }

    function updateSliderHover() {
        const percentage = (-counter * 100) + (hoverPosition * 25);
        slider.style.transform = `translateX(${percentage}%)`;
    }