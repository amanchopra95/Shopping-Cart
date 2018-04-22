let products = [];
//let cart = {};
////if(localStorage.getItem('cart')){
    //cart = JSON.parse(localStorage.getItem('cart'));
//}

function getProducts(done) {
    $.get('/products', (data) => {
        products = data;
        done();
    });
}

function postProduct(product, done) {
    $.post('/products', product, (data) => {
        getProducts(done);
    });
}

function getCart(done) {
    $.get('/cart', (data) => {
        console.log(typeof data)
        let savedCart = {}
        for (item of data) {
            savedCart['' + item.productId] = item.quantity
            console.log(savedCart)
        }
        done(savedCart)
    })
}

function refreshProducts(){
    let productDisplay = $('#product-display')
    for(product of products){
        productDisplay.append(`
            <div class="col-lg-4 col-md-3 col-sm-6 col-xs-12">
                <div class="panel-group" id="product">
                    <div class="panel panel-default">
                        <img class="img-responsive" src="images/Wallpaper.jpg">
                        <h4 class="panel-heading text-center" id="heading">
                            ${product.name}
                        </h4>
                        <div id="description">
                            <ul class="list-inline-group text-center">
                                <li>Lorem</li>
                                <li>Porem</li>
                                <li>Ipsum</li>
                            </ul>
                            <div class="text-center">Price :<snap id="price">${product.price}</snap></div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary" onclick = "addItemToCart(${product.id})">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        `)
    }

    /*window.addItemToCart = function (id) {
        console.log("Inside window function")
        if(cart[id]){
            cart[id] = cart[id] + 1;
        } else{
            cart[id] = 1;
        }
        localStorage.setItem("cart", JSON.stringify(cart))
        refreshProducts()
    }*/

    /**$('.add-to-cart').click(function(event) {
        event.preventDefault();

        let name = $(this).attr('data-name');
        let price = Number($(this).attr('data-price'));

        addItemToCart(name, price, 1);
        refreshCart(true);
    });*/
}

$(function () {
    getProducts(refreshProducts);
})