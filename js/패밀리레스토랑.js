let currentIndex = 0;
const slideCount = document.querySelectorAll(".slide").length;
const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".dot");

function goToSlide(index) {
  slides.style.transform = `translateX(-${index * 100}vw)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
  currentIndex = index;
}

document.getElementById("prev").addEventListener("click", () => {
  let index = currentIndex - 1;
  if (index < 0) index = slideCount - 1;
  goToSlide(index);
});

document.getElementById("next").addEventListener("click", () => {
  let index = (currentIndex + 1) % slideCount;
  goToSlide(index);
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.index);
    goToSlide(index);
  });
});

setInterval(() => {
  const nextIndex = (currentIndex + 1) % slideCount;
  goToSlide(nextIndex);
}, 4000);
