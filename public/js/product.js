//Array of objects of products in the database.
let products = [];

// To get products from the database.
function getProducts(done) {
    $.get('/products', (data) => {
        products = data;
        done();
    });
}

//Store products in the database.
function postProduct(product, done) {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "../products", true)
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(this.responseText)
            getProducts(done)
            getAdminProducts(done)
        } else {
            console.log("Error " + xhr.status + "Response " + xhr.responseText)
        }
    }
    xhr.send(product)
    /* $.ajax({
        method: 'POST',
        type: 'POST',
        url: '../products',
        data: product,
        contentType: false,
        processType: false,
        success: (data) => {
            getProducts(done);
            getAdminProducts(done);
        },
        error: (err) => {
            console.log(err)
        }
    }); */
    console.log(product)
    /* $.post('/products', product, (data) => {
        getProducts(done);
        getAdminProducts(done);
    }) */
}

//Get the cart of the user from the database.
//cart gets saved in the localStorage.
//cart is an object of the form {'productId': quantity}
function getCart(done) {
    $.get('/cart', (data) => {
        let savedCart = {}
        for (item of data) {
            savedCart['' + item.productId] = item.quantity
        }
        done(savedCart)
    })
}

//Function gets called when the admin posts some new products in the database.
function getAdminProducts(done) {
    $.get('/admin/adminProducts', (data) => {
        let adminProducts = []
        adminProducts = data
        done(adminProducts)
    })
}


//Gets called to refresh the page after every addition or deletion of product in the database.
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
}

$(function () {
    getProducts(refreshProducts);
})