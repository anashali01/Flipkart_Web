// Hero Section Slider 
const track = document.querySelector(".slider .slide");
const next = document.querySelector(".slider .next");
const prev = document.querySelector(".slider .prev");
const images = document.querySelectorAll(".slider .slide-images");
let currentIndex = 0;
const total = images.length;
function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}
next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % total;
  updateSlider();
});
prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + total) % total;
  updateSlider();
})
function autoSlide() {
  currentIndex = (currentIndex + 1) % total;
  updateSlider();
}
setInterval(autoSlide, 3000);



// Cart - Details fetch from JSON file
let products = null;
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    // console.log(products);
    addDataToHTML(productList, "Furniture");
    addDataToHTML(productList2, "Shoes");
    addDataToHTML(productList3, "Electronics");
  })

// 3 variables For 3 sections 
let productList = document.querySelector('.product-list');  //Main class for add data 
let productList2 = document.querySelector('.product-list2');  //Main class for add data 
let productList3 = document.querySelector('.product-list3');  //Main class for add data 

function addDataToHTML(list, category) {
  let filteredCategory = products.filter(prod => prod.category === category);     //Function for add Data

  filteredCategory.forEach((product, index) => {    //ForEach for each cart add

    // create cart column
    let col = document.createElement("div");
    // if (index == 0) col.setAttribute('id', 'slide1');                              //Columns for perfect responsive and our cart in column.
    col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "card-slide1");
    //Create cart wrapper for each cart
    let cart = document.createElement('div');           //one div for bg color or target each cart
    cart.classList.add('cart');
    // create new element item for redirect to another page
    let newProduct = document.createElement('a');
    newProduct.href = `details.html?id=${product.id}`;
    newProduct.classList.add('item');

    // Show data 
    newProduct.innerHTML = `
    
      <div class="item-image d-flex justify-content-center">
        <img class="w-100 object-fit-cover h-100" src="${product.image}" alt="${product.name}">
      </div>
      <div class="item-details">
        <h3>${product.name}</h3>
        <span class="price me-4">${product.price}</span>
        <button class="mb-4 rounded-4 px-2 border-0 py-2 bg-black text-white AddToCart" >
        <svg class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
          </svg>
        </button>
      </div>
    `;
    cart.appendChild(newProduct); // put product in cart
    col.appendChild(cart);        // put cart in column
    list.appendChild(col); // put column in row


    // Add to cart
    document.querySelectorAll(".AddToCart").forEach((btn, index) => {    //Take each button with it index 
      btn.onclick = function (e) {
        e.preventDefault();
        let cartArr = JSON.parse(localStorage.getItem("cart")) || [];     //The first time, cartArr will be an empty array.
        let product = products[index];                                    //When you add an item, it saves the array to localStorage.
        let existing = cartArr.find(item => item.id === product.id);      //Next time, it loads the saved cart.
        if (existing) {
          existing.quantity += 1;
        } else {
          cartArr.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cartArr));
        alert("Item add Successfully");
      }
    });
  });
}


// cart slider for 1 section
document.getElementById('scrollLeft').addEventListener("click", () => {
  productList.scrollBy({ left: -300, behavior: 'smooth' });
})
document.getElementById('scrollRight').addEventListener("click", () => {
  productList.scrollBy({ left: 300, behavior: 'smooth' });
})
// cart slider for 2 section 
document.getElementById('scrollLeft2').addEventListener("click", () => {
  productList2.scrollBy({ left: -300, behavior: 'smooth' });
})
document.getElementById('scrollRight2').addEventListener("click", () => {
  productList2.scrollBy({ left: 300, behavior: 'smooth' });
})
// cart slider for 3 section 
document.getElementById('scrollLeft3').addEventListener("click", () => {
  productList3.scrollBy({ left: -300, behavior: 'smooth' });
})
document.getElementById('scrollRight3').addEventListener("click", () => {
  productList3.scrollBy({ left: 300, behavior: 'smooth' });
})








