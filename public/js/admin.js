$(function () {

//Refresh the admin table of products.
    function refreshTableProduct(adminProducts) {
        let productTableRow = $('#product-table-row');
        productTableRow.empty();
        for (product of adminProducts) {
            productTableRow.append(`
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>
                    <a href="../products/${product.id}/delete"><span><i class="fas fa-trash-alt"></i></span></a>
                </td>
            </tr>
            `)
        }
    }
//Submit request to post data in the database.
    $('#submit-product').click( (event) => {
        event.preventDefault();
        let formData = new FormData(document.getElementById('productForm'))
        console.log(formData.getAll('image'))
        /* formData.append('name', $('#product-name').val())
        formData.append('price', $('#product-price').val())
        formData.append('quantity', $('#product-quantity').val())
        formData.append('image', $('#product-image')[0]) */
        postProduct(formData, refreshTableProduct)
        /* postProduct({
            name: $('#product-name').val(),
            price: $('#product-price').val(),
            quantity: $('#product-quantity').val(),
            image: $('#product-image')
        }, refreshTableProduct) */
    })

    getAdminProducts(refreshTableProduct);
})