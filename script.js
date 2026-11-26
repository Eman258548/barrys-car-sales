var link = document.getElementById("suv-enquiry");

if (link) {
    link.onclick = function() {
        window.location.href = "enquiry.html";
    };
}
var form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        document.getElementById("form-status").textContent =
            "Thank you! Your enquiry has been submitted successfully.";

        form.reset();
    });
}

// Audio reader for visually impaired users


// Audio reader for visually impaired users

const readButton = document.getElementById("read-page");
const stopButton = document.getElementById("stop-reading");
const audioStatus = document.getElementById("audio-status");

if (readButton && stopButton && audioStatus) {

    readButton.addEventListener("click", function () {

        if (!("speechSynthesis" in window)) {
            audioStatus.textContent =
                "Sorry, audio reading is not supported by this browser.";
            return;
        }

        window.speechSynthesis.cancel();

        const pageContent = document.querySelector("main");
        const textToRead = pageContent.innerText;

        const speech = new SpeechSynthesisUtterance(textToRead);

        speech.lang = "en-GB";
        speech.rate = 1;
        speech.volume = 1;

        speech.onend = function () {
            audioStatus.textContent = "Finished reading the page.";
        };

        speech.onerror = function () {
            audioStatus.textContent = "Unable to play audio. Please try again.";
        };

        window.speechSynthesis.speak(speech);

        audioStatus.textContent = "Reading the page aloud.";
    });

    stopButton.addEventListener("click", function () {
        window.speechSynthesis.cancel();
        audioStatus.textContent = "Audio stopped.";
    });

}

// Hatchback picture slider

document.querySelectorAll(".car-slider").forEach(function (slider) {
    const images = [
        "hatchback1.jpg",
        "hatchback2.jpg",
        "hatchback3.jpg",
        "hatchback4.jpg",
        "hatchback5.jpg"
    ];

    const mainImage = slider.querySelector(".car-slide");
    const thumbnails = slider.nextElementSibling.nextElementSibling.querySelectorAll("img");
    const count = slider.nextElementSibling;

    let current = 0;

    function showImage(index) {
        current = (index + images.length) % images.length;
        mainImage.src = images[current];
        mainImage.alt = "Hatchback picture " + (current + 1);
        count.textContent = "Picture " + (current + 1) + " of " + images.length;

        thumbnails.forEach(function (thumbnail, i) {
            thumbnail.classList.toggle("active", i === current);
        });
    }

    slider.querySelector(".prev").addEventListener("click", function () {
        showImage(current - 1);
    });

    slider.querySelector(".next").addEventListener("click", function () {
        showImage(current + 1);
    });

    thumbnails.forEach(function (thumbnail, index) {
        thumbnail.addEventListener("click", function () {
            showImage(index);
        });
    });
});
// Expanded car picture viewer
const imageViewer = document.getElementById("image-viewer");
const expandedImage = document.getElementById("expanded-image");
const closeViewer = document.getElementById("close-viewer");
const previousExpanded = document.getElementById("previous-expanded");
const nextExpanded = document.getElementById("next-expanded");

if (imageViewer && expandedImage && closeViewer &&
    previousExpanded && nextExpanded) {

    let galleryImages = [];
    let currentExpanded = 0;

    function openExpandedImage(image) {
        const gallery = image.closest(".car-thumbnails") ||
                        image.closest(".car-slider").parentElement;

        galleryImages = Array.from(
            gallery.querySelectorAll(".car-slide, .car-thumbnails img")
        );

        // Use the thumbnail list if available, otherwise use slider image
        const thumbnails = gallery.querySelector(".car-thumbnails");

        if (thumbnails) {
            galleryImages = Array.from(thumbnails.querySelectorAll("img"));
        }

        currentExpanded = galleryImages.findIndex(
            item => item.src === image.src
        );

        if (currentExpanded < 0) currentExpanded = 0;

        showExpandedImage();
        imageViewer.hidden = false;
        closeViewer.focus();
    }

    function showExpandedImage() {
        const image = galleryImages[currentExpanded];
        expandedImage.src = image.src;
        expandedImage.alt = image.alt;
    }

    document.querySelectorAll(".car-slide, .car-thumbnails img")
        .forEach(function (image) {
            image.addEventListener("click", function () {
                openExpandedImage(image);
            });
        });

    nextExpanded.addEventListener("click", function () {
        currentExpanded = (currentExpanded + 1) % galleryImages.length;
        showExpandedImage();
    });

    previousExpanded.addEventListener("click", function () {
        currentExpanded = (currentExpanded - 1 + galleryImages.length)
                          % galleryImages.length;
        showExpandedImage();
    });

    closeViewer.addEventListener("click", function () {
        imageViewer.hidden = true;
    });

    imageViewer.addEventListener("click", function (event) {
        if (event.target === imageViewer) {
            imageViewer.hidden = true;
        }
    });

    document.addEventListener("keydown", function (event) {
        if (imageViewer.hidden) return;

        if (event.key === "Escape") imageViewer.hidden = true;
        if (event.key === "ArrowRight") nextExpanded.click();
        if (event.key === "ArrowLeft") previousExpanded.click();
    });
}