const images = [
  { url: "./src/images/png/bannerOne.png" },
  { url: "./src/images/png/bannerTwo.png" },
  { url: "./src/images/png/bannerThree.png" },
];


function initSlider(images, options) {
  if (!images || !images.length) return;

  options = options || {
    dots: true,
    autoplay: true,
    autoplayInterval: 5000,
    arrows: false,
  };

  const sliderWrapper = document.querySelector(".main__slider");
  const sliderImages = sliderWrapper.querySelector(".main__slider-image");
  const sliderArrows = sliderWrapper.querySelector(".main__slider-arrows");
  const oneSliderArrow = sliderArrows.querySelectorAll(".main__slider-arrow");

  initImages();

  if (options.dots) {
    initDots();
  }

  if (options.autoplay) {
    initAutoplay();
  }

  if (options.arrows) {
    initArrows();
  } else {
    oneSliderArrow.forEach((arrow) => {
      arrow.style.display = "none";
    });
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(`.n${num}`).classList.add("active");

    if (options.dots) {
      let dotsWrapper = document.querySelector(".main__slider-points");
      dotsWrapper.querySelector(".active").classList.remove("active");
      dotsWrapper.querySelector(`.n${num}`).classList.add("active");
    }
  }

  function initImages() {
    images.forEach((image, index) => {
      let imageElement = document.createElement("div");
      imageElement.classList = `image n${index} ${index ? "" : "active"}`;
      imageElement.dataset.index = index;
      imageElement.style.backgroundImage = `url(${image.url})`;
      sliderImages.appendChild(imageElement);
    });
    console.log(`Высота ${document.documentElement.clientHeight}`);
    console.log(`Ширина ${document.documentElement.clientWidth}`);
  }

  function initArrows() {
    let lastIndex = images.length - 1;
    oneSliderArrow.forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNum = +sliderImages.querySelector(".active").dataset.index;
        let nextNum;
        if (arrow.classList.contains("left")) {
          nextNum = curNum === 0 ? lastIndex : curNum - 1;
        } else {
          nextNum = curNum === lastIndex ? 0 : curNum + 1;
        }
        moveSlider(nextNum);
      });
    });
  }

  function initDots() {
    let dotsWrapper = document.createElement("div");
    dotsWrapper.className = "main__slider-points";
    images.forEach((image, index) => {
      let dot = document.createElement("div");
      dot.className = `main__slider-points-item n${index} ${
        index ? "" : "active"
      }`;
      dot.dataset.index = index;
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      });
      dotsWrapper.appendChild(dot);
    });
    sliderWrapper.appendChild(dotsWrapper);
  }

  function initAutoplay() {
    setInterval(() => {
      let curNum = +sliderImages.querySelector(".active").dataset.index;
      let nextNum = curNum === images.length - 1 ? 0 : curNum + 1;
      moveSlider(nextNum);
    }, options.autoplayInterval);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let sliderOptions = {
    dots: true,
    autoplay: true,
    autoplayInterval: 5000,
    arrows: true,
  };

  initSlider(images, sliderOptions);
});
