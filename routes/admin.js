const route = require('express').Router()
const { Product } = require('../db/model.js')
const acl = require('../accessControl')

/* route.use('/', (req, res, next) => {
    if(!req.user){
        return res.send("Unauthorized")
    } else{
       return next()
    }
}) */

route.get('/status', acl.ensureAdmin, (req, res) => {
    res.send({admin: true})
})

route.get('/', acl.ensureRole('admin'), (req, res) => {
    res.render('admin/admin')
})

route.get('/adminProducts', acl.ensureAdmin, (req, res) => {
    Product.findAll({
        where: {
            userId: req.user.id
        } 
    }).then((products) => { res.json(products) })
    .catch((err) => {res.send(err.message)})
})

module.exports = route