const route = require('express').Router()
const ensureLogin = require('../middlewares/accessControl').ensureLogin
const photo = require('../utils/uploadImage')



route.get('/', (req, res) => {
    if (!req.user) {
        res.send("Unauthorised.")
    }
    res.render('dashboard', {user: req.user})
})

route.get('/get/profile-pic/:userId', ensureLogin, photo.displayPhoto)

route.get('/status', (req, res) => res.send({status: !!req.user}))

route.post('/', photo.upload.single('photo'), photo.uploadImage)


module.exports = route