/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_js_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/js/slider.js */ \"./src/js/slider.js\");\n/* harmony import */ var _src_js_slider_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_js_slider_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_js_books_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/js/books.js */ \"./src/js/books.js\");\n/* harmony import */ var _src_js_books_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_js_books_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_scss_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _src_js_burger_menu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/js/burger-menu.js */ \"./src/js/burger-menu.js\");\n/* harmony import */ var _src_js_burger_menu_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_js_burger_menu_js__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://bookshop/./index.js?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bookshop/./src/scss/style.scss?");

/***/ }),

/***/ "./src/js/books.js":
/*!*************************!*\
  !*** ./src/js/books.js ***!
  \*************************/
/***/ (() => {

eval("const key = \"AIzaSyDPyMW3omOoTvGmNKkFR515qQRk_ooAHc8\";\r\n\r\nlet currentPage = 0;\r\nconst countBooks = 6;\r\nlet activeCategory = document.querySelector(\r\n  \".main__content-categories-link.active\"\r\n).innerText;\r\n\r\nconst cartStorage = JSON.parse(localStorage.getItem(\"cart\") ?? \"[]\");\r\ndocument.querySelector(\".cart-count\").textContent = cartStorage.length;\r\nconst contentWrapper = document.querySelector(\".main__content\");\r\nconst btnMore = contentWrapper.querySelector(\r\n  \".main__content-button.btn-more\"\r\n);\r\n\r\n\r\n\r\nconst getBooks = (subject, startPage, countBooks) => {\r\n  return fetch(\r\n    `https://www.googleapis.com/books/v1/volumes?q=\"subject:${subject}\"&key=${key}&printType=books&startIndex=${startPage}&maxResults=${countBooks}&langRestrict=en`\r\n  )\r\n    .then((response) => response.json())\r\n    .then((json) => json[\"items\"])\r\n    .catch(() => console.log(error));\r\n};\r\n\r\nconst showBooks = async () => {\r\n  let books = await getBooks(\r\n    activeCategory,\r\n    currentPage * countBooks,\r\n    countBooks\r\n  );\r\n  currentPage++;\r\n  books.forEach((book) => {\r\n    let img =\r\n      book.volumeInfo.imageLinks?.thumbnail ?? \"src/images/png/bookCover.png\";\r\n    let author = book.volumeInfo.authors;\r\n    let title = book.volumeInfo.title;\r\n    let averageRating = book.volumeInfo?.averageRating ?? \"\";\r\n    let ratingCount = book.volumeInfo?.ratingCount ?? \"\";\r\n    let description = book.volumeInfo?.description ?? \"\";\r\n    let saleAbility = book.saleInfo.saleAbility;\r\n    let price = \"Not for sale\";\r\n    let priceType = \"\";\r\n    // let btn = \"NOT FOR SALE\";\r\n\r\n    if (saleAbility === \"FOR_SALE\") {\r\n      price = book.saleInfo.retailPrice?.amount;\r\n      priceType = book.saleInfo.retailPrice?.currencyCode;\r\n      // btn = \"BUY NOW\";\r\n    }\r\n    const newBook = `<article class=\"bookcard\">\r\n            <div class=\"bookcard__image\">\r\n              <img src=\"${img}\" alt=\"Book cover\" />\r\n            </div>\r\n            <div class=\"bookcard__body\">\r\n              <p class=\"bookcard__author\">${author}</p>\r\n              <h2 class=\"bookcard__title\">${title}</h2>\r\n              <div class=\"bookcard__rating\">\r\n                <div class=\"bookcard__rating-info\">${averageRating}</div>\r\n                <div class=\"bookcard__rating-count\">${ratingCount}</div>\r\n              </div>\r\n              <p class=\"bookcard__description\">${description}</p>\r\n              <div class=\"bookcard__price\">\r\n                <span class=\"bookcard__price-type\">${priceType}</span>\r\n                <span class=\"bookcard__price-amount\">${price}</span>\r\n              </div>\r\n              <button class=\"main__content-button btn--buy\" data-id=\"${book.id}\">${\r\n      cartStorage.includes(book.id) ? \"IN THE CART\" : \"BUY NOW\"\r\n    }</button>\r\n            </div>\r\n          </article>\r\n    `;\r\n    document.querySelector(\".main__content-books\").innerHTML += newBook;\r\n    // document.querySelector(\".cart-count\").textContent = cartStorage.length;\r\n  });\r\n};\r\n\r\nshowBooks();\r\n\r\n\r\n//корзина\r\ndocument.addEventListener(\"click\", function (event) {\r\n  if (event.target.classList.contains(\"btn--buy\")) {\r\n    const id = event.target.dataset.id;\r\n    if (cartStorage.includes(id)) {\r\n      cartStorage.splice(cartStorage.indexOf(id), 1);\r\n      event.target.innerText = \"BUY NOW\";\r\n    } else {\r\n      cartStorage.push(id);\r\n      event.target.innerText = \"IN THE CART\";\r\n    }\r\n    localStorage.setItem(\"cart\", JSON.stringify(cartStorage));\r\n    document.querySelector(\".cart-count\").textContent = cartStorage.length;\r\n  }\r\n});\r\n\r\n\r\n// активные категории\r\ncontentWrapper.addEventListener(\"click\", (e) => {\r\n  if (e.target.classList.contains(\"main__content-categories-link\")) {\r\n    contentWrapper\r\n      .querySelector(\".main__content-categories-link.active\")\r\n      ?.classList?.remove(\"active\");\r\n    e.target.classList.add(\"active\");\r\n    contentWrapper.querySelector(\".main__content-books\").innerHTML = \"\";\r\n    activeCategory = e.target.innerText;\r\n    showBooks();\r\n  }\r\n});\r\n\r\nbtnMore.addEventListener(\"click\", (e) => {\r\n  console.log(currentPage);\r\n  currentPage += countBooks;\r\n  showBooks();\r\n});\r\n\r\n\n\n//# sourceURL=webpack://bookshop/./src/js/books.js?");

/***/ }),

/***/ "./src/js/burger-menu.js":
/*!*******************************!*\
  !*** ./src/js/burger-menu.js ***!
  \*******************************/
/***/ (() => {

eval("// Скрипт для бургер меню\r\n\r\nconst hamb = document.querySelector(\".header__hamburger_menu\");\r\nconst popup = document.querySelector(\"#header__popup\");\r\nconst menu = document.querySelector(\"#header__menu\").cloneNode(1);\r\nconst body = document.body;\r\n\r\nmenu.classList.remove(\"header__menu\"); //navbar\r\nmenu.classList.add(\"popup__menu\");\r\n\r\nhamb.addEventListener(\"click\", hambHandler);\r\n\r\nfunction hambHandler(e) {\r\n  e.preventDefault();\r\n  popup.classList.toggle(\"open\");\r\n  hamb.classList.toggle(\"active\");\r\n  renderPopup();\r\n}\r\n\r\nfunction renderPopup() {\r\n  popup.appendChild(menu);\r\n}\r\n\r\nconst links = Array.from(menu.children);\r\n\r\nlinks.forEach((link) => {\r\n  link.addEventListener(\"click\", closeOnClick);\r\n});\r\n\r\nfunction closeOnClick() {\r\n  popup.classList.remove(\"open\");\r\n  hamb.classList.remove(\"active\");\r\n}\r\n\n\n//# sourceURL=webpack://bookshop/./src/js/burger-menu.js?");

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ (() => {

eval("const images = [\r\n  { url: \"./src/images/png/bannerOne.png\" },\r\n  { url: \"./src/images/png/bannerTwo.png\" },\r\n  { url: \"./src/images/png/bannerThree.png\" },\r\n];\r\n\r\n// const image = document.querySelector(\".main__slider-image\");\r\n// const points = document.querySelector(\".main__slider-points\");\r\n// let currentIndex = 0;\r\n\r\n// const initElementSlider = () => {\r\n//   images.forEach((image, index) => {\r\n//     points.innerHTML += `<div class=\"main__slider-points-item ${\r\n//       index === 0 ? \"active\" : \"\"\r\n//     }\" data-index=\"${index}\"></div>`;\r\n//   });\r\n// };\r\n\r\n// const changeActiveElement = () => {\r\n//   document\r\n//     .querySelector(\".main__slider-points-item.active\")\r\n//     .classList.remove(\"active\");\r\n//   document\r\n//     .querySelector(`.main__slider-points-item[data-index=\"${currentIndex}\"]`)\r\n//     .classList.add(\"active\");\r\n// };\r\n\r\n// const setObject = () => {\r\n//   image.style.backgroundImage = `url(${images[currentIndex].url})`;\r\n// };\r\n\r\n// document.addEventListener(\"click\", (event) => {\r\n//   if (event.target.classList.contains(\"main__slider-points-item\")) {\r\n//     clearInterval(slider);\r\n//     currentIndex = event.target.getAttribute(\"data-index\");\r\n//     setObject();\r\n//     changeActiveElement();\r\n//     console.log(`Щелк! тек.индекс ${currentIndex} длина ${images.length}`);\r\n//     slider\r\n//   }\r\n// });\r\n\r\n// const changeImg = () => {\r\n//   if (currentIndex == 0 || currentIndex < images.length - 1) {\r\n//     currentIndex += 1;\r\n//   } else {\r\n//     currentIndex = 0;\r\n//   }\r\n//   // setTimeout(changeImg, 5000);\r\n//   setObject();\r\n//   changeActiveElement();\r\n//   console.log(`тек.индекс ${currentIndex} длина ${images.length}`);\r\n// };\r\n\r\n// initElementSlider();\r\n// setObject();\r\n// let slider = setInterval(changeImg, 2000);\r\n\r\nfunction initSlider(images, options) {\r\n  if (!images || !images.length) return;\r\n\r\n  options = options || {\r\n    dots: true,\r\n    autoplay: true,\r\n    autoplayInterval: 5000,\r\n    arrows: false,\r\n  };\r\n\r\n  const sliderWrapper = document.querySelector(\".main__slider\");\r\n  const sliderImages = sliderWrapper.querySelector(\".main__slider-image\");\r\n  const sliderArrows = sliderWrapper.querySelector(\".main__slider-arrows\");\r\n  const oneSliderArrow = sliderArrows.querySelectorAll(\".main__slider-arrow\");\r\n\r\n  initImages();\r\n\r\n  if (options.dots) {\r\n    initDots();\r\n  }\r\n\r\n  if (options.autoplay) {\r\n    initAutoplay();\r\n  }\r\n\r\n  if (options.arrows) {\r\n    initArrows();\r\n  } else {\r\n    oneSliderArrow.forEach((arrow) => {\r\n      arrow.style.display = \"none\";\r\n    });\r\n  }\r\n\r\n  function moveSlider(num) {\r\n    sliderImages.querySelector(\".active\").classList.remove(\"active\");\r\n    sliderImages.querySelector(`.n${num}`).classList.add(\"active\");\r\n\r\n    if (options.dots) {\r\n      let dotsWrapper = document.querySelector(\".main__slider-points\");\r\n      dotsWrapper.querySelector(\".active\").classList.remove(\"active\");\r\n      dotsWrapper.querySelector(`.n${num}`).classList.add(\"active\");\r\n    }\r\n  }\r\n\r\n  function initImages() {\r\n    images.forEach((image, index) => {\r\n      let imageElement = document.createElement(\"div\");\r\n      imageElement.classList = `image n${index} ${index ? \"\" : \"active\"}`;\r\n      imageElement.dataset.index = index;\r\n      imageElement.style.backgroundImage = `url(${image.url})`;\r\n      sliderImages.appendChild(imageElement);\r\n    });\r\n    console.log(`Высота ${document.documentElement.clientHeight}`);\r\n    console.log(`Ширина ${document.documentElement.clientWidth}`);\r\n  }\r\n\r\n  function initArrows() {\r\n    let lastIndex = images.length - 1;\r\n    oneSliderArrow.forEach((arrow) => {\r\n      arrow.addEventListener(\"click\", function () {\r\n        let curNum = +sliderImages.querySelector(\".active\").dataset.index;\r\n        let nextNum;\r\n        if (arrow.classList.contains(\"left\")) {\r\n          nextNum = curNum === 0 ? lastIndex : curNum - 1;\r\n        } else {\r\n          nextNum = curNum === lastIndex ? 0 : curNum + 1;\r\n        }\r\n        moveSlider(nextNum);\r\n      });\r\n    });\r\n  }\r\n\r\n  function initDots() {\r\n    let dotsWrapper = document.createElement(\"div\");\r\n    dotsWrapper.className = \"main__slider-points\";\r\n    images.forEach((image, index) => {\r\n      let dot = document.createElement(\"div\");\r\n      dot.className = `main__slider-points-item n${index} ${\r\n        index ? \"\" : \"active\"\r\n      }`;\r\n      dot.dataset.index = index;\r\n      dot.addEventListener(\"click\", function () {\r\n        moveSlider(this.dataset.index);\r\n      });\r\n      dotsWrapper.appendChild(dot);\r\n    });\r\n    sliderWrapper.appendChild(dotsWrapper);\r\n  }\r\n\r\n  function initAutoplay() {\r\n    setInterval(() => {\r\n      let curNum = +sliderImages.querySelector(\".active\").dataset.index;\r\n      let nextNum = curNum === images.length - 1 ? 0 : curNum + 1;\r\n      moveSlider(nextNum);\r\n    }, options.autoplayInterval);\r\n  }\r\n}\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n  let sliderOptions = {\r\n    dots: true,\r\n    autoplay: true,\r\n    autoplayInterval: 5000,\r\n    arrows: false,\r\n  };\r\n\r\n  initSlider(images, sliderOptions);\r\n});\r\n\n\n//# sourceURL=webpack://bookshop/./src/js/slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;