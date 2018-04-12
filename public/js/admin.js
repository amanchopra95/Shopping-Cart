$(function () {

    function refreshProducts(){
        let productDisplay = $('#product-display')
        for(product of products){
            productDisplay.append(`
                <div class="col-lg-4">
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
    }

    $('#submit-product').click( (event) => {
        event.preventDefault();
        postProduct({
            name: $('#product-name').val(),
            price: $('#product-price').val()
        }, refreshProducts)
    })

    $('#delete-product').click( (event) => {
        event.preventDefault();
        let id = getProductId($('#delete-product-name').val());
        deleteProduct(id);
    })
})