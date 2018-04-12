let products = [];

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

function getProductId(name) {
    let pid;
    console.log("In getProductId function")
    $.get('/'+name, (id) => {
        pid = id;
    });
    console.log(pid);
    return pid;
}

function deleteProduct(id){
    console.log("In deleteProduct function.")
    $.get('/'+id+'/delete', () => {
        console.log("Product deleted")
    })
}

$(function () {

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
                                <ul class="list-inline-group">
                                    <li>Lorem</li>
                                    <li>Porem</li>
                                    <li>Ipsum</li>
                                </ul>
                                <div class="text-center">Price :<snap id="price">${product.price}</snap></div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-primary add-to-cart" data-name="${product.name}" data-price="${product.price}">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            `)
        }

        $('.add-to-cart').click(function(event) {
            event.preventDefault();
    
            let name = $(this).attr('data-name');
            let price = Number($(this).attr('data-price'));
    
            addItemToCart(name, price, 1);
            refreshCart(true);
        });
    }
    getProducts(refreshProducts);
})