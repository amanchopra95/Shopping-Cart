$(function () {

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

    $('#submit-product').click( (event) => {
        event.preventDefault();
        postProduct({
            name: $('#product-name').val(),
            price: $('#product-price').val(),
            quantity: $('#product-quantity').val()
        }, refreshTableProduct)
    })

    getAdminProducts(refreshTableProduct);
})