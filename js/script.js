/**
 * Created by Aman Chopra 19-03-2018
 */

 let cart = []
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
        console.log(cart);
        refreshCart(true);
    });

    $('.count').change(function(event) {
        let name = $(this).attr('data-name');
        let count = Number($(this).val());
        itemCount(name, count);
    });
    
});

function displayCart(i) {

    let tr = '';
    
    tr = $('<tr></tr>');
    let product = $('<td data-th="Product"></td>');
    let removeHtml = $('<div class="col-xs-2">'+
        '<button class="btn btn-danger btn-xs remove" data-name="'+cart[i].name+'"><i class="glyphicon glyphicon-remove-circle"></i></button></div>')
        .click( () => {
            removeCompleteItem(cart[i].name);
        });
    let imgHtml = $('<div class="col-xs-5">'+
        '<img src="images/Wallpaper.jpg" class="img-thumbnail"></div>');
    let productName = $('<div class="col-xs-5 name">'+
        '<h4 id="pname">'+cart[i].name+'</h4></div>');
    let productPrice = $('<td data-th="Price">'+cart[i].price+'</td>');
    let productCount = $('<td data-th="Count"><input type="number" value="'+cart[i].count+'" class="count" data-name="'+cart[i].name+'"></td>');
    let subtotal = $('<td data-th="Subtotal">'+subTotal(cart[i].name)+'</td>');
    let btnwrapper = $('<td data-th=""></td>');
    let addbtn = $('<button class="btn btn-primary btn-xs addbtn" data-name="'+cart[i].name+'"><i class="glyphicon glyphicon-plus"></i></button>')
    .click(() => {
        addCount(cart[i].name);
    });
    let minusbtn = $('<button class="btn btn-danger btn-xs minusbtn" data-name="'+cart[i].name+'"><i class="glyphicon glyphicon-minus"></i></button>')
    .click( () => {
        minusCount(cart[i].name);
    });

    tr.append(product.append(removeHtml).append(imgHtml).append(productName)).append(productPrice).append(productCount).append(subtotal).append
    (btnwrapper.append(addbtn).append(minusbtn));
    
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

function removeItemFromCart(name) {
    for (let i in cart) {
        if (cart[i].name === name){
            cart[i].count--;
            if (cart[i].count == 0){
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart();
    refreshCart();
}

function removeCompleteItem(name) {
    for (let i in cart) {
        if(cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }

    saveCart();
    refreshCart();
}

function addCount(name) {
    
    for(let i in cart) {
        if (cart[i].name === pname){
            cart[i].count += count;
            break;
        }
    }

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

function minusCount(name) {

    console.log(name);
    for(let i in cart){
        if (cart[i].name === name){
            cart[i].count--;
        }
    }

    saveCart();
    refreshCart();
}

function subTotal(name) {
    let subTotal = 0;
    for(let i in cart){
        if(cart[i].name === name){
            subTotal = cart[i].count*cart[i].price
            break;
        }
    }
    return subTotal;
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


}
