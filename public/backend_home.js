// From HTML
const categoryList = document.querySelector(".categories");
const productsArea = document.querySelector(".products");

document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchProducts();
});


const baseUrl = "https://api.escuelajs.co/api/v1";


// Fetching Categories
async function fetchCategories() {
  await fetch(`${baseUrl}/categories`)
    .then((res) => res.json())
    .then((data) => renderCategories(data.slice(1, 5))) 
    .catch((err) => console.log(err)); 
}


// Rendering Categories
function renderCategories(categories) {
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category-card");
    categoryDiv.innerHTML = `
        <img src=${category.image}>
        <p>${category.name}</p>`;
    categoryList.appendChild(categoryDiv);
  });
}


// Sending request for products
async function fetchProducts() {
  try {
    const res = await fetch(`${baseUrl}/products`);
    const data = await res.json();
    console.log(data);
    renderProducts(data.slice(3, 28));
  } catch (err) {
    console.log(err);
  }
}


// Rendering Products
function renderProducts(products) {
  const productsHTML = products
    .map(
      (product) =>
        ` <div class="card">
        <img src=${product.images[0]}>
        <h4>${product.title}</h4>
        <h4>${product.category.name ? product.category.name : "Others"}</h4>
        <div class="action">
            <span>${product.price}$</span>
            <button id= "product-btn" onclick="addToBasket({id:${product.id},title: '${
          product.title
        } ' ,price:${product.price},img:'${
          product.images[0]
        }',amount:1})">Add to Basket</button>
        </div>
    </div>`
    )
    .join(" "); 

  productsArea.innerHTML += productsHTML;
}
