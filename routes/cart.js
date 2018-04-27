const route = require('express').Router()
const { Cart } = require('../db/model')

route.use('/', (req, res, next) => {
    if(!req.user){
        res.send([])
    } else {
        next()
    }
})

route.get('/', (req, res) => {
    Cart.findAll({
        where: {userId: req.user.id}
    }).then((cartItems) => {
        console.log("Got the cart of the user")
        res.json(cartItems)
    })
})

route.post('/', (req, res) => {
    let usercart = req.body.usercart
    usercart = usercart.map(o => {
        o.userId = req.user.id
        return o
    })
    Promise.all(usercart.map( o => Cart.upsert(o, {fields: ['quantity']})))
    .then(result => {
       res.json({result: "Successful"}) 
    })
    .catch((err) => {
        res.json({error: err})
    })
})

route.delete('/', (req, res) => {
    let usercart = req.body
    usercart.userId = req.user.id

    Cart.destroy({
        where: {
            productId: usercart.productId,
            userId: usercart.userId
        }
    }).then(() => {
            res.redirect('back')
    })
    .catch((err) => {
        res.send(err)
    })
})

module.exports = route