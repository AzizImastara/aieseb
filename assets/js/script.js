// scroll on top
document.getElementById("logo").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Slideer / Carousel
document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
  slides[slideIndex].classList.add("displaySlide");
  intervalId = setInterval(nextSlide, 3000);

  arabSlides[arabSlideIndex].classList.add("displaySlide");
  arabIntervalId = setInterval(nextArabSlide, 5000);
}

// Img slide
const slides = document.querySelectorAll(".slides .slide");
let slideIndex = 0;
let intervalId = null;

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

// Arabic Slide
const arabSlides = document.querySelectorAll(".slidesArab .slideArab");
let arabSlideIndex = 0;
let arabIntervalId = null;

function showArabSlide(index) {
  if (index >= arabSlides.length) {
    arabSlideIndex = 0;
  } else if (index < 0) {
    arabSlideIndex = arabSlides.length - 1;
  }

  arabSlides.forEach((slide) => {
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

let getYearNumber = new Date().getFullYear().toString();
let getMonth = new Date().getMonth() + 1;
let monthZero = getMonth.toString().padStart(2, "0");

function jadwalSholat() {
  return {
    allCity: [],
    jadwalSholat: [],
    loading: true,
    loadingJadwal: true,
    lokasi: "",
    search: "",
    selectedCityId: "1638",
    connect() {
      fetch("https://api.myquran.com/v2/sholat/kota/semua")
        .then((response) => response.json())
        .then((data) => {
          this.allCity = data.data;
          this.loading = false;

          const defaultCity = this.allCity.find(
            (city) => city.id === this.selectedCityId
          );
          if (defaultCity) {
            this.jadwal(defaultCity.id);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.loading = false;
        });
    },
    jadwal(id) {
      this.loadingJadwal = true;
      fetch(
        `https://api.myquran.com/v2/sholat/jadwal/${id}/${getYearNumber}/${monthZero}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.jadwalSholat = data.data.jadwal;
          this.lokasi = data.data.lokasi;
          this.loadingJadwal = false;
          console.log(this.lokasi);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.loadingJadwal = false;
        });
    },
    filteredCities() {
      return this.allCity.filter((city) => {
        return city.lokasi.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  };
}

// punya button belajar
var tombol = document.getElementsByClassName("btn");

for (var i = 0; i < tombol.length; i++) {
  tombol[i].addEventListener("click", function () {
    // Mengubah teks tombol saat diklik
    this.innerHTML = "Tombol telah diklik";
    window.location.href = "syahadat.html";
  });
}

// Punya Quiz
const quizData = [
  {
    question: "Rukun Iman ada berapa?",
    a: "6",
    b: "1",
    c: "5",
    d: "4",
    correct: "a",
  },
  {
    question: "Rukun Islam ada berapa?",
    a: "10",
    b: "5",
    c: "4",
    d: "2",
    correct: "b",
  },
  {
    question: "shalat shubuh berapa rakaat?",
    a: "6",
    b: "4",
    c: "2",
    d: "1",
    correct: "c",
  },
  {
    question: "rukun islam yang dilaksanakan di bulan ramadhan adalah?",
    a: "shalat",
    b: "haji",
    c: "zakat",
    d: "puasa",
    correct: "d",
  },
];

const nameInput = document.getElementById("name");
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
let currentQuiz = 0;
let score = 0;
loadQuiz();
function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}
function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}
function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const answer = getSelected();
  if (answer !== undefined) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else if (score == 4) {
      quiz.innerHTML = `
        <h2>Selamat, ${name}! Kamu telah menyelesaikan kuis.</h2>
        <h2>Kamu menjawab ${score} dari ${quizData.length} pertanyaan secara benar.</h2>
        <h2>kelas yang cocok untuk kamu adalah kelas menengah</h2>
        <h2>Semoga Istiqamah</h2>
        <h2>Pembimbing kamu..</h2>
        <button onclick="window.location.href = 'index.html';">Selesai</button>
      `;
    } else if (score < 4) {
      quiz.innerHTML = `
      <h2>Selamat, ${name}! Kamu telah menyelesaikan kuis.</h2>
        <h2>Kamu menjawab ${score} dari ${quizData.length} pertanyaan secara benar.</h2>
      <h2>kelas yang cocok untuk kamu adalah kelas dasar</h2>
      <h2>Semoga Istiqamah</h2>
      <h2>Pembimbing kamu..</h2>
      <button onclick="window.location.href = 'index.html';">Selesai</button>
      `;
    }
  } else {
    alert("Silakan pilih jawaban sebelum melanjutkan.");
  }
});
