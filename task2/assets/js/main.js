let photographButton = document.querySelector(".photograph-button");
let popUp = document.querySelector(".tooltip");
let sliders = document.querySelector(".sliders");
let buttons = document.querySelectorAll(".ellipse");
let counter = 0;
let slider = document.querySelector(".sliders-container");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let mainSliders = document.querySelector(".main-sliders");
let mainSlider = document.querySelector(".main-slider");
let mainCounter = 0;
let mainButtons = document.querySelectorAll(".main-ellipse");
let mainNext = document.querySelector(".main-next");
let mainPrev = document.querySelector(".main-prev");
var strX;
var mainsrtX;

window.addEventListener("load", hidPopupAfterTime);

photographButton.addEventListener("mouseenter", showPopup);
photographButton.addEventListener("mouseout", hidPopup);

slider.addEventListener("touchstart", swipestart);
slider.addEventListener(
  "touchmove",
  debounce((e) => {
    swipemove(e);
  }, 100)
);
mainSlider.addEventListener("touchstart", swipestart);
mainSlider.addEventListener(
  "touchmove",
  debounce((e) => {
    mainSwipemove(e);
  }, 100)
);
buttons[0].classList.add("show-fill-ellipse");
mainButtons[0].classList.add("show-fill-ellipse");
buttons.forEach((itm, i) => {
  itm.addEventListener("click", () => {
    counter = i;
    moveSliders();
    removeFillEliips();
    addFillEllipse();
  });
});
mainButtons.forEach((item, i) => {
  item.addEventListener("click", () => {
    mainCounter = i;
    moveMainSliders();
    removeFillMainEllipse();
    addFillMainEllipse();
  });
});
next.addEventListener("click", () => {
  let num_slides = sliders.children.length - 1;
  if (num_slides > counter) {
    ++counter;
    moveSliders();
    removeFillEliips();
    addFillEllipse();
  }
});
prev.addEventListener("click", () => {
  if (counter >= 1) {
    --counter;
    moveSliders();
    removeFillEliips();
    addFillEllipse();
  }
});

mainNext.addEventListener("click", () => {
  let num_main_slides = mainSliders.children.length - 1;
  if (num_main_slides > mainCounter) {
    ++mainCounter;
    moveMainSliders();
    removeFillMainEllipse();
    addFillMainEllipse();
  }
});

mainPrev.addEventListener("click", () => {
  if (mainCounter >= 1) {
    --mainCounter;
    moveMainSliders();
    removeFillMainEllipse();
    addFillMainEllipse();
  }
});
function swipestart(e) {
  strX = e.touches[0].clientX;
}
function mainSwipeStart(e) {
  mainsrtX = e.touches[0].clientX;
}

function debounce(fun, delay) {
  let time;
  return function (...par) {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fun(...par);
    }, delay);
  };
}

function swipemove(e) {
  var touch = e.touches[0];
  var change = strX - touch.clientX;
  console.log(change);
  if (change > 40) {
    if (counter >= 5) {
      return;
    }
    counter++;
    moveSliders();
    removeFillEliips();
    addFillEllipse();
  } else if (change < -40) {
    if (counter <= 0) {
      return;
    }
    counter--;
    moveSliders();
    removeFillEliips();
    addFillEllipse();
  }
}

function hidPopupAfterTime() {
  setTimeout(() => {
    popUp.classList.remove("show-after-load");
  }, 15000);
}
function showPopup(e) {
  setTimeout(() => {
    popUp.classList.add("show");
  }, 500);
}
function hidPopup(e) {
  popUp.classList.remove("show");
}
function moveSliders() {
  let moveDistance = sliders.children[0].clientWidth;
  sliders.style.transform = `translateX(${-moveDistance * counter}px)`;
}
function removeFillEliips() {
  buttons.forEach((itm) => itm.classList.remove("show-fill-ellipse"));
}
function addFillEllipse() {
  buttons[counter].classList.add("show-fill-ellipse");
}

function moveMainSliders() {
  let moveDistance = mainSliders.children[0].clientWidth;
  mainSliders.style.transform = `translateX(${-moveDistance * mainCounter}px)`;
}
function removeFillMainEllipse() {
  mainButtons.forEach((itm) => itm.classList.remove("show-fill-ellipse"));
}
function addFillMainEllipse() {
  mainButtons[mainCounter].classList.add("show-fill-ellipse");
}

function mainSwipeMove() {
  var touch = e.touches[0];
  var change = mainsrtX - touch.clientX;
  console.log(change);
  if (change > 40) {
    if (counter >= 5) {
      return;
    }
    mainCounter++;
    moveMainSliders();
    removeFillMainEliipse();
    addFillMainEllipse();
  } else if (change < -40) {
    if (mainCounter <= 0) {
      return;
    }
    mainCounter--;
    moveMainSliders();
    removeFillMainEliipse();
    addFillMainEllipse();
  }
}
