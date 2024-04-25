// From HTML
const categoryList = document.querySelector(".categories");
const productsArea = document.querySelector(".products");
const basketBtn = document.querySelector("#basket");
const closeBtn = document.querySelector("#close");
const modal = document.querySelector('.modal-wrapper');
const basketList = document.querySelector('#list');
const totalSpan = document.querySelector('#total-price');
const totalCount = document.querySelector('#count');



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

//Variable of basket
let basket = [];
let total = 0;


// Tx of Modal
basketBtn.addEventListener('click', () => {
  modal.classList.add('active');
  renderBasket();
});


// Closing basket
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});


// Tx of Basket

// Adding products to basket
function addToBasket(product) {
  const found = basket.find((i) => i.id === product.id);

  if (found) {
    found.amount++;
  } else {
    basket.push(product);
  }
}


// listing baskets products
function renderBasket() {
  const cardsHTML = basket
    .map(
      (product) => `
     <div class="item">
            <img src=${product.img} />
            <h3 class="title">${product.title}</h3>
            <h4 class="price">${product.price} $</h4>
            <p> Qty: ${product.amount}</p>
            <img onclick="deleteItem(${product.id})" id="delete" src="/images/Delete.png" />
      </div>
  `
    ) 
    .join(' ');


  basketList.innerHTML = cardsHTML;

  calculateTotal();
}

// Basket total calculating
function calculateTotal() {
  const sum = basket.reduce((sum, i) => sum + i.price * i.amount, 0);

  const amount = basket.reduce((sum, i) => sum + i.amount, 0);

  if(amount <= 1){
    totalCount.innerText = amount + ' ' + 'item';
  } else {
    totalCount.innerText = amount + ' ' + 'items';
  }

  totalSpan.innerText = sum;
}

// Deleting items of basket
function deleteItem(deleteid) {
  basket = basket.filter((i) => i.id !== deleteid);

  // Updating the list
  renderBasket();

  // Updating the total
  calculateTotal();
}



