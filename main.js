window.onload = function () {
  var nav = document.getElementById("nav-wrapper");
  var hamburger = document.getElementById("js-hamburger");
  var blackBg = document.getElementById("js-black-bg");

  hamburger.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
  blackBg.addEventListener("click", function () {
    nav.classList.remove("open");
  });
};

window.addEventListener("load", () => {
  const slider = document.querySelector(".slider");
  const slides = Array.from(slider.children);
  const gap = 48;
  const speed = 1.0;
  let offsetX = 0;

  // Clone original slides for seamless loop
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
  });

  // Allow layout to stabilize before measuring
  setTimeout(() => {
    const firstSlide = slides[0];
    const slideWidth = firstSlide.offsetWidth;

    const visibleSlides = 4; // How many are visible at once
    const totalVisibleWidth = (slideWidth + gap) * visibleSlides;

    const originalContentWidth = (slideWidth + gap) * slides.length;

    // 👇 Adjust this manually for better timing
    const resetPoint = originalContentWidth - totalVisibleWidth + 15.0;

    function loop() {
      offsetX -= speed;

      if (-offsetX >= resetPoint) {
        offsetX = 0;
        slider.style.transform = `translateX(0px)`;
      } else {
        slider.style.transform = `translateX(${offsetX}px)`;
      }

      requestAnimationFrame(loop);
    }

    loop();
  }, 50);
});
