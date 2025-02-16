const offcanvasElementList = document.querySelectorAll(".offcanvas");
const offcanvasList = [...offcanvasElementList].map(
  (offcanvasEl) => new bootstrap.Offcanvas(offcanvasEl)
);
const arraProducts = [
  {
    id: 1,
    name: "Cappuccino",
    price: "5$",
    Image: "/assets/img-1.png",
    description: "Coffee 50% | Milk 50%",
  },
  {
    id: 2,
    name: "Chai Latte",
    price: "6$",
    Image: "/assets/img-2.png",
    description: "Coffee 30% | Milk 70%",
  },
  {
    id: 3,
    name: "Macchiato",
    price: "4$",
    Image: "/assets/img-3.png",
    description: "Coffee 80% | Milk 20%",
  },
  {
    id: 4,
    name: "Expresso",
    price: "2$",
    Image: "/assets/img-4.png",
    description: "Coffee 100% | No Milk",
  },
];
const menue = document.querySelector(".menue");
const cartBody = document.querySelector(".offcanvas-body");
const quantity = document.querySelector(".quantity");
const total = document.querySelector(".total");
const subTotalPrice = document.querySelector(".total-price");
const arrowUp = document.querySelector(".arrow-btn");
let checkOutList = [];
const initApp = function () {
  if (localStorage.getItem("cart")) {
    checkOutList = JSON.parse(localStorage.getItem("cart"));
  }
  renderCart();
};
const displayProduct = function (products) {
  products.forEach((product, key) => {
    const html = `   
 <div class="col-md-4 col-lg-3 text-center py-3">
    <div class="card">
      <div class="card-img-top w-100">
        <img
        id="${product.id}"
          class="img-fluid w-100"
          src="${product.Image}"
          alt="${product.name}"
        />
      </div>
      <div class="card-title">
        <h1 class="main-title fs-2 product-name">${product.name}</h1>
      </div>
      <div class="card-body">
        <p class="fs-5 main-paragraph product-description">
          ${product.description}
        </p>
        <p class="fs-5 main-paragraph price">${product.price}</p>
        <button onclick="addTocart(${key})" href="" class="btn main-btn rounded-pill">Add to cart</button>
      </div>
    </div>
  </div>
  `;
    menue.insertAdjacentHTML("beforeend", html);
    console.log(key);
  });
};
console.log(checkOutList);
displayProduct(arraProducts);
const addTocart = function (id) {
  if (checkOutList[id] == null) {
    checkOutList[id] = arraProducts[id];
    checkOutList[id].quantity = 1;
  } else {
    checkOutList[id].quantity += 1;
  }
  renderCart();
  localStorage.setItem("cart", JSON.stringify(checkOutList));
};

const renderCart = function () {
  cartBody.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  checkOutList.forEach((item, key) => {
    totalPrice += parseInt(item.price) * item.quantity;
    count += item.quantity;
    const html = `  
      <div class="row align-items-center text-center py-2 border-black border-2 border-so">
          <div class="col-3">
            <div class="img">
              <img class="img-fluid" src="${item.Image}" alt="${item.name}" />
            </div>
          </div>
          <div class=" col-3 col-md-3">
            <div class="name">
              <p>${item.name}</p>
            </div>
          </div>
          <div class=" col-1 col-md-2">
            <div class="price">
              <p>${parseInt(item.price) * item.quantity}$</p>
            </div>
          </div>
          <div class="col-5 col-md-4">
            <div class="quantity-item">
              <button class="btn  rounded-circle" onclick="changeQuantity(${key},${
      item.quantity - 1
    })">-</button>
              <span>${item.quantity}</span>
                <button  class="btn  rounded-circle" onclick="changeQuantity(${key},${
      item.quantity + 1
    })">
                  +
                </button>
            </div>
          </div>
        </div>
    
      `;
    cartBody.insertAdjacentHTML("beforeend", html);
  });
  total.innerHTML = `subtotal : ${count} item`;
  subTotalPrice.innerHTML = totalPrice;
  quantity.innerHTML = count;
};
const changeQuantity = function (key, quantity) {
  if (quantity == 0) {
    delete checkOutList[key];
  } else {
    checkOutList[key].quantity = quantity;
  }
  renderCart();
};
initApp();

window.onscroll = function () {
  if (this.scrollY >= 1000) {
    arrowUp.classList.add("show");
  } else {
    arrowUp.classList.remove("show");
  }
};
arrowUp.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
