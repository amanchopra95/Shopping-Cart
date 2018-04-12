/**
 * Created by Aman Chopra 19-03-2018
 */

 let cart = [];
 let item = function (name, price, count){
     this.name = name;
     this.price = price;
     this.count = count;
 } 
 let cartList;

$(document).ready(function () {

    cartList = $('#items');
    
    refreshCart(true);
    
    $('.add-to-cart').click(function(event) {
        event.preventDefault();

        let name = $(this).attr('data-name');
        let price = Number($(this).attr('data-price'));

        addItemToCart(name, price, 1);
        refreshCart(true);
    });

    
});

function displayCart(i) {

    let tr = '';
    tr =`
        <tr>
            <td>
                <span class="col-xs-2" onclick="removeCompleteItem(${i})"><i class="fas fa-times"></i></span>
                <span class="col-xs-3"><img src="images/Wallpaper.jpg" class="img-thumbnail"></span>
                <span class="col-xs-2"><p id="pname">${cart[i].name}</p></span>
            </td>
            <td>${cart[i].price}</td>
            <td>
                <span class="col-2" onclick="addCount(${i})"><i class="fas fa-plus"></i></span>
                <span class="col-1">${cart[i].count}</span>
                <span class="col-2" onclick="minusCount(${i})"><i class="fas fa-minus"></i></span>
            </td>
            <td>Rs.${cart[i].price * cart[i].count}</td>
        </tr>
    `;
    
    return tr;
}


function addItemToCart(name, price, count) {
    
    for (let i in cart){
        if( cart[i].name === name ){
            cart[i].count += count;
            saveCart();
            return;
        }
    }

    let items = new item(name, price, count); //makes a new object.
    cart.push(items);
    saveCart();
    
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart(){
    cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null){
        cart = []
    }
}

function removeEverything() {
    cart.empty();
    saveCart();
    refreshCart();
}

function removeCompleteItem(i) {
    cart.splice(i, 1);
    saveCart();
    refreshCart();
}

function addCount(i) {
    
    cart[i].count++;
    saveCart();
    refreshCart();
}

function itemCount(name, count) {

    for(let i in cart){
        if (cart[i].name === name){
            cart[i].count = count;
            break;
        }
    }
    refreshCart();
}

function minusCount(i) {

    cart[i].count--;
    if (cart[i].count == 0){
        cart.splice(i, 1);
    }

    saveCart();
    refreshCart();
}

function total() {
    let total = 0;
    for (let i in cart) {
        total += cart[i].count*cart[i].price;
    }
    return total;
}

function refreshCart(firstPageLoad = false){

    if(!firstPageLoad){
        saveCart();
    }
    cartList.empty();
    loadCart();

    for(let i in cart){
        let cartItem = displayCart(i);
        cartList.append(cartItem);
    }
    cartList.append(`
    <td id="cart-table-total" colspan="4">Total</td>
    <td>${total()}</td>
    `)

}
