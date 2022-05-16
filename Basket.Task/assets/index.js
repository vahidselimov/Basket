let addButtons = document.querySelectorAll(".addbtn");
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("basket") !== null) {
      calcCount();
    }
  });
let index=[]
addButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        if(localStorage.getItem("index")!==null)
        index=JSON.parse(localStorage.getItem("index"))

        let model = this.parentNode.querySelector("h5").innerText
        let image = this.parentNode.previousElementSibling.src
        let price = this.parentNode.querySelector(".price").innerText
         let id = this.getAttribute("data-id");
        let existedProduct = index.find((x) => x.id == id)
        if (existedProduct === undefined) {
            let product = {
              id,
              model,
              image,
              price,
              count: 1,
            };
            index.push(product);
          } else {
            existedProduct.count++;
          }
     
        
        localStorage.setItem("index",JSON.stringify(index))
        calcCount();

    })
})
function calcCount() {
    let basket = JSON.parse(localStorage.getItem("index"));
    let count = basket.reduce((t, val) => {
      return (t += val.count);
    }, 0);
    let countValue = document.querySelector("sup");
    countValue.innerText = count;
  }
  function displaycard() {
    let cartItems = localStorage.getItem("index");
    cartItems = JSON.parse(cartItems);
    let productsContainer = document.querySelector(".products")
    if (cartItems && productsContainer) {
        productsContainer.innerHTML = '';
        Object.values(cartItems).map(index => {
            productsContainer.innerHTML += `
       <div class="product"><i class="fa-regular fa-circle-xmark"></i><img class="imagee" src="${index.image}" alt="product"><span class="models">${index.model}</span>
       </div>
       <div class="pricee">${index.price}$</div>
       <div class="quantity"><i class="fa-solid fa-angle-left icon"></i>
       <span class="count">${index.count}</span><i class="fa-solid fa-angle-right icon"></i>
       </div>
       <div class="totals">$${index.count*index.price}
       </div>
       `
       
        })
    }
    
}
displaycard();
