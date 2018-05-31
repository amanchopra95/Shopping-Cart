const routes = require('express').Router();
const {Product} = require('../db/model.js');
const acl = require('../middlewares/accessControl');
const upload = require('../utils/uploadImage').productForm


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
routes.post('/', upload.single('image'), (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        userId: req.user.id,
        image: req.file.filename
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
    Product.update(
        {
            quantity: req.body.quantity
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then((result) => {
        console.log(result)

        res.send("Updated")

    }).catch((err) => {
        res.send(err.message)
    })
/*     Promise.all(updates.map(o => Product.upsert(o, {fields: ['quantity']})))
    .then(() => {
        res.redirect('back')
    })
    .catch((err) => {
        res.send(err.message)
    }) */
})



module.exports = routes;