function ensureAdmin(req, res, next) {
    if (req.user.roles === 'admin'){
        next()
    } else {
            res.status(403).send("Unauthorized")
    }
}

function ensureRole(role) {
    return function (req, res, next){
        if(req.user.roles === role){
            next()
        } else {
            res.status(403).send("Unauthorized")
        }
    }
}

function ensureLogin(req, res, next) {
    if(!req.user){
        res.send("Not logged in")
    } else {
        next()
    }
}

module.exports = {
    ensureAdmin,
    ensureRole,
    ensureLogin
}