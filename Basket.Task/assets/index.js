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
