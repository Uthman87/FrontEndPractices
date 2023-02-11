let label = document.getElementById("label");
let shoppingCart = document.getElementById('shopping-cart');

// console.log(shopItemData);

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let total = basket.map((product) => product.item).reduce((x, y) => x + y, 0);
    document.getElementById("cartAmount").innerHTML = total;
}

calculation();


let genereateCartItem = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemData.find((item) => item.id === id) || [];


                return `
                <div class="cart-item">
                    <img width="100" src="${search.img}" alt="">
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${search.name}</p>
                                <p class="cart-item-price">$ ${search.price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>

                        <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                     
                        <h3>$ ${item * search.price}</h3>
                    </div>
                </div>
            `;
            }).join(""));
    } else {
        shoppingCart = ``

        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to Home</button>
            </a>
        `
    }
}

genereateCartItem();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);
    if(search === undefined) {
         basket.push({
             id: id,
             item: 1
         });
    } else {
         search.item += 1;
    }

    genereateCartItem();
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
 
 }
 
 let decrement = (id) => {
     let search = basket.find((x) => x.id === id);
 
     if(search === undefined) return;
 
     else if(search.item === 0) return;
     else {
          search.item -= 1;
     }
 
     update(id);
     basket = basket.filter((x) => x.item !== 0);
     genereateCartItem();
     localStorage.setItem("data", JSON.stringify(basket));
 
 }
 
 let update = (id) => {
     let search = basket.find((x) => x.id === id);
     let quantity = search.item;
     document.getElementById(id).innerHTML = quantity;
     calculation();
     TotalAmount(); 
 }


 let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem);
    genereateCartItem();
    TotalAmount(); 
    calculation()
    localStorage.setItem("data", JSON.stringify(basket)); 
    location.reload();
 }


 let clearCart = () => {
    basket = [];
    genereateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
    location.reload();
 }


 let TotalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id} = x;
            let search = shopItemData.find((y) => y.id === id) || [];
            return item * search.price 
        }).reduce((x, y) => x+y, 0);

        label.innerHTML = `
            <h2>Total Bill : $ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart </button>
        `
    } else return;
 }
TotalAmount(); 