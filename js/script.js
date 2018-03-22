/**
 * Created by Aman Chopra 19-03-2018
 */

 let cart = []
 let item = function (name, price, count){
     this.name = name;
     this.price = price;
     this.count = count;
 } 

$(document).ready(function () {
    
    $('.add-to-cart').click(function(event) {
        event.preventDefault();
        let name = $(this).attr('data-name');
        let price = Number($(this).attr('data-price'));

        addItemToCart(name, price, 1);
        console.log(cart);
        displayCart();

    });

    


    
});

function displayCart() {

    let tr = $('<tr></tr>');
    for(let i in cart){

        let product = $('<td data-th="Product"></td>');
        let removeHtml = $('<div class="col-xs-2" id="remove">'+
            '<i class="glyphicon glyphicon-remove-circle"></i></div>');
        let imgHtml = $('<div class="col-xs-5">'+
            '<img src="images/Wallpaper.jpg" class="img-thumbnail"></div>');
        let productName = $('<div class="col-xs-5">'+
            '<h4>${cart[i].name}</h4></div>');
        let productPrice = $('<td data-th="Price">${cart[i].price}</td>');
        let productCount = $('<td data-th="Count"><input type="number" value="${cart[i].count}" id="count"></td>');
        let subTotal = $('<td data-th="Subtotal">${subTotal(cart[i].name)}</td>');
        let btnwrapper = $('<td data-th="">');
        let addbtn = $('<button class="btn btn-primary btn-xs" id="addbtn"><i class="glyphicon glyphicon-plus"></i></button>');
        let minusbtn = $('<button class="btn btn-danger btn-xs" id="minusbtn"><i class="glyphicon glyphicon-minus"></i></button></td></tr>');

        tr.append(prodcut.append(removeHtml).append(imgHtml).append(productName))
        .append(productPrice).append(productCount).append(subTotal).append(btnwrapper.append(addbtn).append(minusbtn))
    }

    $('#items').append(tr);
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
    for (i in cart) {
        if (cart[i].name === name){
            cart[i].count--;
            if (cart[i].count == 0){
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart();
}

function removeCompleteItem(name) {
    for (var i in cart) {
        if(cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }

    saveCart();
}

function addCount(name, count) {
    for(var i in cart) {
        if (cart[i].name === name){
            cart[i].count += count;
        }
    }

    saveCart();
}

function minusCount(name, count) {
    for(var i in cart){
        if (cart[i].name === name){
            cart[i].count--;
        }
    }

    saveCart();
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
