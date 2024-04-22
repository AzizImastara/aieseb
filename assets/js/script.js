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
}

const slides = document.querySelectorAll(".slides .slide");
let slideIndex = 0;
let intervalId = null;


function showSlide(index) {
  if (index >= slides.length) {
      slideIndex = 0;
  } else if (index < 0) {
      slideIndex = slides.length - 1;
  }

  slides.forEach(slide => {
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

