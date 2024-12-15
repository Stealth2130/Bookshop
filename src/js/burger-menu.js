// Скрипт для бургер меню

const hamb = document.querySelector(".header__hamburger_menu");
const popup = document.querySelector("#header__popup");
const menu = document.querySelector("#header__menu").cloneNode(1);
const body = document.body;

menu.classList.remove("header__menu"); //navbar
menu.classList.add("popup__menu");

hamb.addEventListener("click", hambHandler);

function hambHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}

const links = Array.from(menu.children);

links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
}
