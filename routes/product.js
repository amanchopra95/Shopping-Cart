const routes = require('express').Router();
const {Product} = require('../db/model.js');
const acl = require('../accessControl');

/* Get products from the server */
routes.get('/', (req, res) => {
    Product.findAll()
    .then((products) => { res.json(products)})
    .catch((err) => { res.send(err.message)})
});

routes.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id,
        }
    })
    .then((product) => { 
        if(product){
            res.json(product)
        }
        else {
            res.send("Product doesn't exist.")
        }
    })
    .catch((err) => { res.send(err.message) })
})

/* Post a product to the server */
routes.post('/', (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        userId: req.user.id
    })
    .then((productCreated) => { res.json(productCreated)})
    .catch((err) => { res.send(err.message)})
});

/* Delete a product */
routes.get('/:id/delete', acl.ensureRole('admin'), (req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            Product.destroy({
                where: {
                    id: product.dataValues.id
                }
            }).then(() => {
                res.redirect('back')
            })
            .catch((err) => {
                res.send(err)
            })
        }).catch((err) => {
            res.send(err)
        })
})

/* Update a product */
routes.patch('/:id', (req, res) => {
    let updates = req.body.updates
    Promise.all(updates.map(o => Product.upsert(o, {fields: ['quantity', 'name', 'price']})))
    .then(() => {
        res.redirect('back')
    })
    .catch((err) => {
        res.send(err.message)
    })
})



module.exports = routes;