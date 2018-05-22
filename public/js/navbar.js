//Check if the user is login or not.
function checkLoginStatus(done) {
    $.get('/dashboard/status', (data) => {
        if(data.status){
            checkAdminStatus(done, data)
        }
        else {
            done(data)
        }
    })
}

function checkAdminStatus(done, login) {
    let status = {
        'status': login.status,
    }
    /**
     * Using Promises in jQuery.
     */
    $.get('/admin/status')
        .done((data) => {
            status.admin = data.admin
        })
        .fail(() => {
            status.admin = false
        })
        .always(() => {
            done(status)
        })

/*      Using callbacks.

        $.get('/admin/status', (data) => {
        let status = {}
        if(data.admin){
            status = {
                'status': login.status,
                'admin': data.admin,
            }
        } else if (data == ){
            status = {
                'status': login.status,
                'admin': false
            }
        }

        done(status)
    }) */
}

//Add the navbar to every page.
/**
 * @param {object} status- contains roles as well
 */

function addNavbar(status) {
    let navbarButton
    if(!(status.status)) {
        navbarButton = `
        <li class="list-item">
            <a class="nav-link" href="/login">
                <i class="fas fa-sign-in-alt"></i>
                    Login
            </a>
        </li>
        <li class="list-item">
            <a class="nav-link" href="/signup">
                <i class="fas fa-user-plus"></i>
                    Signup
            </a>
        </li>
        `
    }   else if(!(status.admin)){
            navbarButton = `
                <li class="list-item">
                    <a class="nav-link" href="/logout">
                        Logout
                    </a>
                </li>
                `
        }   else {
            navbarButton = `
            <li class="list-item">
                <a class="nav-link" href="/admin">
                    Admin
                </a>
            </li>
            <li class="list-item">
                <a class="nav-link" href="/logout">
                    Logout
                </a>
            </li>
            `
            } 

    $('body').prepend(`
    <nav class="navbar navbar-default" id="header">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">Home</a>
        </div>
        <ul class="nav navbar-nav">
            `+navbarButton+`
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
}

$(function () {
    checkLoginStatus(addNavbar)
})