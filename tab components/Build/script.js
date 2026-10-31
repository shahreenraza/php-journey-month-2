const products = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1500, rating: 4.5 },
    { id: 2, name: "Smart Watch", category: "Electronics", price: 2500, rating: 4.7 },
    { id: 3, name: "Bluetooth Speaker", category: "Electronics", price: 1200, rating: 4.2 },
    { id: 4, name: "Laptop Stand", category: "Electronics", price: 900, rating: 4.1 },
    { id: 5, name: "Wireless Mouse", category: "Electronics", price: 700, rating: 4.3 },
    { id: 6, name: "Keyboard", category: "Electronics", price: 1100, rating: 4.4 },
    { id: 7, name: "USB Cable", category: "Electronics", price: 250, rating: 4.0 },
    { id: 8, name: "Power Bank", category: "Electronics", price: 1800, rating: 4.6 },

    { id: 9, name: "Cotton T-Shirt", category: "Clothing", price: 500, rating: 4.2 },
    { id: 10, name: "Denim Jeans", category: "Clothing", price: 1400, rating: 4.5 },
    { id: 11, name: "Hoodie", category: "Clothing", price: 1600, rating: 4.6 },
    { id: 12, name: "Casual Shirt", category: "Clothing", price: 900, rating: 4.1 },
    { id: 13, name: "Jacket", category: "Clothing", price: 2400, rating: 4.7 },
    { id: 14, name: "Sports Trousers", category: "Clothing", price: 1200, rating: 4.3 },
    { id: 15, name: "Summer Dress", category: "Clothing", price: 1900, rating: 4.4 },
    { id: 16, name: "Sweatshirt", category: "Clothing", price: 1300, rating: 4.2 },

    { id: 17, name: "JavaScript Basics", category: "Books", price: 450, rating: 4.8 },
    { id: 18, name: "Python Guide", category: "Books", price: 550, rating: 4.7 },
    { id: 19, name: "Web Development", category: "Books", price: 650, rating: 4.6 },
    { id: 20, name: "Data Structures", category: "Books", price: 750, rating: 4.5 },
    { id: 21, name: "Computer Networks", category: "Books", price: 600, rating: 4.3 },
    { id: 22, name: "Database Systems", category: "Books", price: 800, rating: 4.4 },
    { id: 23, name: "HTML and CSS", category: "Books", price: 400, rating: 4.6 },

    { id: 24, name: "Backpack", category: "Accessories", price: 1000, rating: 4.5 },
    { id: 25, name: "Wrist Watch", category: "Accessories", price: 2200, rating: 4.6 },
    { id: 26, name: "Sunglasses", category: "Accessories", price: 800, rating: 4.1 },
    { id: 27, name: "Wallet", category: "Accessories", price: 600, rating: 4.2 },
    { id: 28, name: "Water Bottle", category: "Accessories", price: 350, rating: 4.3 },
    { id: 29, name: "Cap", category: "Accessories", price: 300, rating: 4.0 },
    { id: 30, name: "Travel Bag", category: "Accessories", price: 2000, rating: 4.7 }
];

const searchInput = document.getElementById("search-input");
const categoryFilters = document.querySelectorAll(".category-filter");
const priceFilter = document.getElementById("price-filter");
const priceValue = document.getElementById("price-value");
const sortSelect = document.getElementById("sort-select");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");
const productGrid = document.getElementById("product-grid");

const params = new URLSearchParams(window.location.search);

searchInput.value = params.get("search") || "";
priceFilter.value = params.get("price") || 5000;
sortSelect.value = params.get("sort") || "default";

const savedCategories = params.getAll("category");

categoryFilters.forEach(checkbox => {
    checkbox.checked = savedCategories.includes(checkbox.value);
});


function updateURL() {
    const newParams = new URLSearchParams();

    if (searchInput.value.trim()) {
        newParams.set("search", searchInput.value.trim());
    }

    categoryFilters.forEach(checkbox => {
        if (checkbox.checked) {
            newParams.append("category", checkbox.value);
        }
    });

    newParams.set("price", priceFilter.value);
    newParams.set("sort", sortSelect.value);

    const query = newParams.toString();

    history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}


function displayProducts(productArray) {
    productGrid.innerHTML = "";

    productArray.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p class="product-price">Price: ₹${product.price}</p>
            <p>Rating: ⭐ ${product.rating}</p>
        `;

        productGrid.appendChild(card);
    });

    resultCount.textContent =
        `Showing ${productArray.length} of ${products.length} products`;

    emptyMessage.hidden = productArray.length !== 0;
}


function filterProducts() {
    const searchText = searchInput.value.trim().toLowerCase();
    const maxPrice = Number(priceFilter.value);

    const selectedCategories = Array.from(categoryFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    let filteredProducts = products.filter(product => {

        const matchesSearch = product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

  
    const sortValue = sortSelect.value;

    if (sortValue === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(filteredProducts);
    updateURL();
}


searchInput.addEventListener("input", filterProducts);

categoryFilters.forEach(checkbox => {
    checkbox.addEventListener("change", filterProducts);
});

priceFilter.addEventListener("input", function() {
    priceValue.textContent = priceFilter.value;
    filterProducts();
});

sortSelect.addEventListener("change", filterProducts);


window.addEventListener("popstate", function() {
    const currentParams = new URLSearchParams(window.location.search);

    searchInput.value = currentParams.get("search") || "";
    priceFilter.value = currentParams.get("price") || 5000;
    priceValue.textContent = priceFilter.value;
    sortSelect.value = currentParams.get("sort") || "default";

    const categories = currentParams.getAll("category");

    categoryFilters.forEach(checkbox => {
        checkbox.checked = categories.includes(checkbox.value);
    });

    filterProducts();
});


priceValue.textContent = priceFilter.value;
filterProducts();
