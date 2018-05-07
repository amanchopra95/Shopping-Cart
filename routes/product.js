const routes = require('express').Router();
const {Product} = require('../db/model.js');
const acl = require('../accessControl');

routes.get('/', (req, res) => {
    Product.findAll()
    .then((products) => { res.json(products)})
    .catch((err) => { res.send(err.message)})
});

/* routes.get('/admin', (req, res) => {
    Product.findAll({
        where: {
            userId: req.user.id
        }
    }).then((products) => {res.json(products)})
    .catch((err) => { res.send(err.message) })
}) */

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


module.exports = routes;