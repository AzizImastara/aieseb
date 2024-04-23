// scroll on top
document.getElementById("logo").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 3000);

    arabSlides[arabSlideIndex].classList.add("displaySlide");
    arabIntervalId = setInterval(nextArabSlide, 5000);
}

const slides = document.querySelectorAll(".slides .slide");
let slideIndex = 0;
let intervalId = null;

const arabSlides = document.querySelectorAll(".slidesArab .slideArab");
let arabSlideIndex = 0;
let arabIntervalId = null;

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });

  const currentSlide = slides[slideIndex];
  currentSlide.classList.add("displaySlide");
}

function prevSlide() {
  clearInterval(intervalId);
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

function showArabSlide(index) {
  if (index >= arabSlides.length) {
      arabSlideIndex = 0;
  } else if (index < 0) {
      arabSlideIndex = arabSlides.length - 1;
  }

  arabSlides.forEach(slide => {
      slide.classList.remove("displaySlide");
  });

  const currentArabSlide = arabSlides[arabSlideIndex];
  currentArabSlide.classList.add("displaySlide");
}

function prevArabSlide() {
  clearInterval(arabIntervalId);
  arabSlideIndex--;
  if (arabSlideIndex < 0) {
      arabSlideIndex = arabSlides.length - 1;
  }
  showArabSlide(arabSlideIndex);
}

function nextArabSlide() {
  arabSlideIndex++;
  if (arabSlideIndex >= arabSlides.length) {
      arabSlideIndex = 0;
  }
  showArabSlide(arabSlideIndex);
}

function sendMessage() {
  let name = document.querySelector('input[name="name"]').value;
  let email = document.querySelector('input[name="email"]').value;
  let message = document.querySelector('textarea[name="message"]').value;

  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    // Menampilkan toast error jika ada kolom yang kosong
    var errorToast = new bootstrap.Toast(document.getElementById("errorToast"));
    errorToast.show();
    return;
  }

  // Menampilkan toast success jika semua kolom terisi
  var successToast = new bootstrap.Toast(
    document.getElementById("successToast")
  );
  successToast.show();

  // Reset form
  document.querySelector("form").reset();

  // Scroll kembali ke atas halaman
  window.scrollTo({ top: 0, behavior: "smooth" });
}


