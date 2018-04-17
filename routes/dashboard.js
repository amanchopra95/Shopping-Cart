const route = require('express').Router()

route.get('/', (req, res) => {
    if(!req.user){
        return res.send("Unauthorized")
    }

    res.render('dashboard', {user: req.user})
})

route.get('/status', (req, res) => res.send({status: !!req.user}))

module.exports = route