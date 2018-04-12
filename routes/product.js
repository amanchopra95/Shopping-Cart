const routes = require('express').Router();
const {Product} = require('../db/model.js');

routes.get('/', (req, res) => {
    Product.findAll()
    .then((products) => { res.json(products)})
    .catch((err) => { res.send(err.message)})
});

routes.post('/', (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price
    })
    .then((productCreated) => { res.json(productCreated)})
    .catch((err) => { res.send(err.message)})
});

routes.get('/:name', (req, res) => {
    console.log(req.params.name);
    Product.findOne({
        where: {
            name: req.params.name
        }
    }).then((product) => {
        res.send(product.id);
    }).catch((err) => {
        res.send(err.message);
    })
})

routes.get('/:id/delete', (req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            Product.destroy({
                where: {
                    id: product.dataValues.id
                }
            }).then(() => {
                res.redirect('/products')
            })
            .catch((err) => {
                res.send(err)
            })
        }).catch((err) => {
            res.send(err)
        })
})


module.exports = routes;