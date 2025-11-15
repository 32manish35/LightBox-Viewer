// select DOM elements
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const closeBtn = document.getElementById("close-btn");
const lightboxImage = document.getElementById("lightbox-image");

// helper: open lightbox with full-size image src
function openLightbox(fullSrc, altText = "") {
  lightboxImage.src = fullSrc;
  lightboxImage.alt = altText;
  lightbox.style.display = "flex";        // make visible (tests expect display:flex)
  lightbox.setAttribute("aria-hidden", "false");
}

// helper: close lightbox
function closeLightbox() {
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = ""; // optional: clear src
}

// attach click to each thumbnail
galleryItems.forEach((img) => {
  img.addEventListener("click", () => {
    // build full-size URL by removing '-thumbnail' from the src
    const thumbSrc = img.src;
    const fullSrc = thumbSrc.replace("-thumbnail", "");
    openLightbox(fullSrc, img.alt || "");
  });
});

// close when close button clicked
closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

// close when clicking the overlay (but not when clicking the image)
lightbox.addEventListener("click", (e) => {
  // if click target is the overlay (the lightbox div) then close
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// optional: close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.style.display === "flex") {
    closeLightbox();
  }
});
