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
    Product.find({
        where: {
            userId: req.user.id
        } 
    }).then((products) => { 
        if(products == 0){
            res.render('admin/admin', {message: "No products added by you"})
        } else{
            res.render('admin/admin', {products: products})
        }
     })
    .catch((err) => {res.send(err.message)})
})

module.exports = route