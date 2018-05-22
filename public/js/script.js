/**
 * Created by Aman Chopra 19-03-2018
 */

 //let cart = [];
 /**let item = function (name, price, count){
     this.name = name;
     this.price = price;
     this.count = count;
 }*/
 
 let cart = {};
 let cartList;

$(function () {

    cartList = $('#items');
    loadCart()
    //getProducts(refreshCart);

    
    /*$('.add-to-cart').click(function(event) {
        event.preventDefault();

        let name = $(this).attr('data-name');
        let price = Number($(this).attr('data-price'));

        addItemToCart(name, price, 1);
        refreshCart(true);
    });*/

    window.saveToServer = function() {
        let body = {usercart: []}
        $('#btn-save').text('Saving...').prop('disabled', true)
        for (productId in cart){
            body.usercart.push({
                productId,
                quantity: cart[productId]
            })
        }

        $.post('/cart', body, (data) => {
            $('#btn-save').text('Saved!').prop('disabled', true)
            setTimeout(() => {
                $('#btn-save').text('Save').prop('disabled', false)
            }, 1000)

        })
    
    }
    checkLoginStatus((status) => {
        if(!status.status){
            $('#btn-save').hide()
        }
        getProducts((products) => {
            getCart((savedCart) => {
                cart = Object.assign(savedCart, cart)
                refreshCart();
            })
        })
    })

});


function displayCart(product) {
    let tr = '';
    tr =`
        <tr>
            <td>
                <span class="col-xs-2 deleteItem" onclick="deleteFromCart(${product.id})"><i class="fas fa-times"></i></span>
                <span class="col-xs-3"><img src="/images/Wallpaper.jpg" class="img-thumbnail"></span>
                <span class="col-xs-2"><p id="pname">${product.name}</p></span>
            </td>
            <td>${product.price}</td>
            <td>
                <span class="col-2" onclick="addCount(${product.id}, ${product.quantity})"><i class="fas fa-plus"></i></span>
                <span class="col-1">${cart[product.id]}</span>
                <span class="col-2" onclick="minusCount(${product.id})"><i class="fas fa-minus"></i></span>
            </td>
            <td>Rs.${(product.price * (cart[product.id] || 0)).toFixed(2)}</td>
        </tr>
    `;
    
    return tr;
}


function addItemToCart(id) {
    if(cart[id]){
        cart[id] = cart[id] + 1;
    } else{
        cart[id] = 1;
    }
    saveCart();
    getProducts(refreshCart);

    /** for (let i in cart){
        if( cart[i].name === name ){
            cart[i].count += count;
            saveCart();
            return;
        }
    }

    let items = new item(name, price, count); //makes a new object.
    cart.push(items);
    saveCart();*/
    
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart(){
    cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null){
        cart = {}
    }
}

function removeEverything() {
    cart.empty();
    saveCart();
    refreshCart();
}

function deleteFromCart(id) {
    body = {productId: id}
    $.ajax({
        url: '/cart',
        type: 'DELETE',
        data: body,
        success: removeCompleteItem(id)
    })
}

function removeCompleteItem(i) {
    
    delete cart[i]
    //cart.splice(i, 1);
    saveCart();
    refreshCart();
}

function addCount(i, quant) {
    
    if(cart[i]){
        if(cart[i] < quant){
            cart[i] = cart[i] + 1
        } else {
            console.log("Does not have enough quantity.")
        }
        
    }
    //cart[i].count++;
    saveCart();
    refreshCart();
}

/**function itemCount(id) {

    if(cart[id]){
        return cart[id]
    } else {

    }
}*/

function minusCount(i) {

    if(cart[i]){
        cart[i] = cart[i] - 1;
        if(cart[i] == 0){
            delete cart[i]
        }
    }
    //cart[i].count--;
    //if (cart[i].count == 0){
    //    cart.splice(i, 1);
    //}

    saveCart();
    refreshCart();
}

function total() {
    let total = 0;
    for (product of products) {
        if(cart[product.id]){
            total += product.price * (cart[product.id] || 0);
        }
    }
    return total.toFixed(2);
}

function refreshCart(firstPageLoad = false){
    if(!firstPageLoad){
        saveCart();
    }
    cartList.empty();
    loadCart();
    for(product of products){
        if(cart[product.id]){
            let cartItem = displayCart(product);
            cartList.append(cartItem);
        } 
    }
    if (!cartList){
        cartList.append(`<p>Add items to your cart.</p>`);
    } else{
        cartList.append(`
        <td id="cart-table-total" colspan="4">Total</td>
        <td>${total()}</td>
        `)
    }

}


