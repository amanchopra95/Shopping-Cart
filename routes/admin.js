const route = require('express').Router()
const { Product } = require('../db/model.js')

route.use('/', (req, res, next) => {
    if(!req.user){
        return res.send("Unauthorized")
    } else{
       return next()
    }
})

route.get('/', (req, res) => {
    res.render('admin/admin')
})

route.get('/adminProducts', (req, res) => {
    Product.findAll({
        where: {
            userId: req.user.id
        } 
    }).then((products) => { res.json(products) })
    .catch((err) => {res.send(err.message)})
})

module.exports = route