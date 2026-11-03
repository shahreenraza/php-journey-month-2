const searchInput = document.querySelector("#search-input");
const productList = document.querySelector("#product-list");

const products = ["Laptop", "Phone", "Headphones", "Keyboard", "Mouse"];
let timer;

function displayProducts(items) {
  productList.innerHTML = items.map(item =>
    `<div class="product">${item}</div>`
  ).join("");
}

displayProducts(products);

searchInput.addEventListener("input", () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    const query = searchInput.value.toLowerCase().trim();
    displayProducts(products.filter(item =>
      item.toLowerCase().includes(query)
    ));
  }, 300);
});