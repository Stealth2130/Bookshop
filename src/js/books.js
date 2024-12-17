const key = "AIzaSyDPyMW3omOoTvGmNKkFR515qQRk_ooAHc8";

let currentPage = 0;
const countBooks = 6;
let activeCategory = document.querySelector(
  ".main__content-categories-link.active"
).innerText;

const cartStorage = JSON.parse(localStorage.getItem("cart") ?? "[]");
document.querySelector(".cart-count").textContent = cartStorage.length;
const contentWrapper = document.querySelector(".main__content");
const btnMore = contentWrapper.querySelector(
  ".main__content-button.btn-more"
);



const getBooks = (subject, startPage, countBooks) => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=${key}&printType=books&startIndex=${startPage}&maxResults=${countBooks}&langRestrict=en`
  )
    .then((response) => response.json())
    .then((json) => json["items"])
    .catch(() => console.log(error));
};

const showBooks = async () => {
  let books = await getBooks(
    activeCategory,
    currentPage * countBooks,
    countBooks
  );
  currentPage++;
  books.forEach((book) => {
    let img =
      book.volumeInfo.imageLinks?.thumbnail ?? "src/images/png/bookCover.png";
    let author = book.volumeInfo.authors;
    let title = book.volumeInfo.title;
    let averageRating = book.volumeInfo?.averageRating ?? "";
    let ratingCount = book.volumeInfo?.ratingCount ?? "";
    let description = book.volumeInfo?.description ?? "";
    let saleAbility = book.saleInfo.saleAbility;
    let price = "Not for sale";
    let priceType = "";
    // let btn = "NOT FOR SALE";

    if (saleAbility === "FOR_SALE") {
      price = book.saleInfo.retailPrice?.amount;
      priceType = book.saleInfo.retailPrice?.currencyCode;
      // btn = "BUY NOW";
    }
    const newBook = `<article class="bookcard">
            <div class="bookcard__image">
              <img src="${img}" alt="Book cover" />
            </div>
            <div class="bookcard__body">
              <p class="bookcard__author">${author}</p>
              <h2 class="bookcard__title">${title}</h2>
              <div class="bookcard__rating">
                <div class="bookcard__rating-info">${averageRating}</div>
                <div class="bookcard__rating-count">${ratingCount}</div>
              </div>
              <p class="bookcard__description">${description}</p>
              <div class="bookcard__price">
                <span class="bookcard__price-type">${priceType}</span>
                <span class="bookcard__price-amount">${price}</span>
              </div>
              <button class="main__content-button btn--buy" data-id="${book.id}">${
      cartStorage.includes(book.id) ? "IN THE CART" : "BUY NOW"
    }</button>
            </div>
          </article>
    `;
    document.querySelector(".main__content-books").innerHTML += newBook;
    // document.querySelector(".cart-count").textContent = cartStorage.length;
  });
};

showBooks();


//корзина
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn--buy")) {
    const id = event.target.dataset.id;
    if (cartStorage.includes(id)) {
      cartStorage.splice(cartStorage.indexOf(id), 1);
      event.target.innerText = "BUY NOW";
    } else {
      cartStorage.push(id);
      event.target.innerText = "IN THE CART";
    }
    localStorage.setItem("cart", JSON.stringify(cartStorage));
    document.querySelector(".cart-count").textContent = cartStorage.length;
  }
});


// активные категории
contentWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("main__content-categories-link")) {
    contentWrapper
      .querySelector(".main__content-categories-link.active")
      ?.classList?.remove("active");
    e.target.classList.add("active");
    contentWrapper.querySelector(".main__content-books").innerHTML = "";
    activeCategory = e.target.innerText;
    showBooks();
  }
});

btnMore.addEventListener("click", (e) => {
  console.log(currentPage);
  currentPage += countBooks;
  showBooks();
});

