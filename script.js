// ==========================================
// GET HTML ELEMENTS
// ==========================================

const galleryItems = document.querySelectorAll(".gallery-item");

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const imageTitle = document.getElementById("imageTitle");

const imageCounter = document.getElementById("imageCounter");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");


// Stores currently visible gallery items

let visibleItems = Array.from(galleryItems);


// Stores current image position

let currentIndex = 0;


// ==========================================
// UPDATE VISIBLE IMAGES
// ==========================================

function updateVisibleItems() {

    visibleItems = Array.from(galleryItems).filter(function (item) {

        return !item.classList.contains("hide");

    });

}


// ==========================================
// BONUS: FILTER / CATEGORY FUNCTION
// ==========================================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active class from all buttons

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active class to selected button

        button.classList.add("active");


        // Find selected category

        const selectedCategory =
            button.getAttribute("data-filter");


        // Check every gallery image

        galleryItems.forEach(function (item) {

            // Show everything

            if (selectedCategory === "all") {

                item.classList.remove("hide");

            }

            // Show matching category

            else if (
                item.classList.contains(selectedCategory)
            ) {

                item.classList.remove("hide");

            }

            // Hide other categories

            else {

                item.classList.add("hide");

            }

        });


        // Update images used by lightbox

        updateVisibleItems();

    });

});


// ==========================================
// OPEN LIGHTBOX
// ==========================================

galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        // Do nothing if item is hidden

        if (item.classList.contains("hide")) {

            return;

        }


        // Get currently visible images

        updateVisibleItems();


        // Find position of clicked image

        currentIndex = visibleItems.indexOf(item);


        // Display selected image

        showImage();


        // Open lightbox

        lightbox.classList.add("show");


        // Stop background scrolling

        document.body.style.overflow = "hidden";

    });

});


// ==========================================
// SHOW IMAGE IN LIGHTBOX
// ==========================================

function showImage() {

    // Safety check

    if (visibleItems.length === 0) {

        return;

    }


    // Current gallery item

    const currentItem =
        visibleItems[currentIndex];


    // Get image inside current item

    const image =
        currentItem.querySelector("img");


    // Set large lightbox image

    lightboxImage.src =
        image.src;


    // Set alt text

    lightboxImage.alt =
        image.alt;


    // Set image title

    imageTitle.textContent =
        image.getAttribute("data-title") || image.alt;


    // Set counter

    imageCounter.textContent =
        (currentIndex + 1) +
        " / " +
        visibleItems.length;

}


// ==========================================
// NEXT IMAGE
// ==========================================

function nextImage() {

    if (visibleItems.length === 0) {

        return;

    }


    currentIndex++;


    // If last image is reached,
    // return to first image

    if (currentIndex >= visibleItems.length) {

        currentIndex = 0;

    }


    showImage();

}


// Next button click

nextBtn.addEventListener("click", function (event) {

    // Prevent click from closing lightbox

    event.stopPropagation();


    nextImage();

});


// ==========================================
// PREVIOUS IMAGE
// ==========================================

function previousImage() {

    if (visibleItems.length === 0) {

        return;

    }


    currentIndex--;


    // If first image is passed,
    // go to last image

    if (currentIndex < 0) {

        currentIndex =
            visibleItems.length - 1;

    }


    showImage();

}


// Previous button click

prevBtn.addEventListener("click", function (event) {

    event.stopPropagation();


    previousImage();

});


// ==========================================
// CLOSE LIGHTBOX
// ==========================================

function closeLightbox() {

    // Hide lightbox

    lightbox.classList.remove("show");


    // Allow page scrolling again

    document.body.style.overflow = "";

}


// Close button

closeBtn.addEventListener("click", function (event) {

    event.stopPropagation();


    closeLightbox();

});


// ==========================================
// CLICK OUTSIDE IMAGE TO CLOSE
// ==========================================

lightbox.addEventListener("click", function (event) {

    // Close only when dark background is clicked

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// ==========================================
// KEYBOARD CONTROLS
// ==========================================

document.addEventListener("keydown", function (event) {

    // Keyboard controls should work
    // only when lightbox is open

    if (!lightbox.classList.contains("show")) {

        return;

    }


    // RIGHT ARROW = NEXT

    if (event.key === "ArrowRight") {

        nextImage();

    }


    // LEFT ARROW = PREVIOUS

    else if (event.key === "ArrowLeft") {

        previousImage();

    }


    // ESCAPE = CLOSE

    else if (event.key === "Escape") {

        closeLightbox();

    }

});


// ==========================================
// INITIALIZE
// ==========================================

updateVisibleItems();