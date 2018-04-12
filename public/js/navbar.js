$(function () {
    $('body').prepend(`
    <nav class="navbar navbar-default" id="header">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">Home</a>
        </div>
        <ul class="nav navbar-nav">
            <li><a href="/admin">Admin</a></li>
        </ul>
        <div class="pull-right">
            <ul class="nav navbar-nav">
                <li id="cart">
                    <a href="#myCart" data-toggle="modal" data-target="#myCart">
                        <i class="fas fa-shopping-cart"></i>
                        Cart
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
    `)
})