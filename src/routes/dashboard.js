const route = require('express').Router()
const acl = require('../accessControl')
const fs = require('fs')
const User = require("../db/model")
const multer = require('multer')

const upload = multer(
    {
        dest: 'public/uploads',
        limits: {
            fileSize: 10000000, 
            files: 1
        },
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb (new Error ("Only jpg, jpeg or png files allowed."), false)
            }

            return cb(null, true)
        }
    }
).single('image')

route.get('/', (req, res) => {
    if(!req.user){
        return res.send("Unauthorized")
    }

    res.render('dashboard', {user: req.user})
})

route.get('/status', (req, res) => res.send({status: !!req.user}))

route.post('/upload', acl.ensureLogin, (req, res) => {
    upload (req, res, (err) => {
        if (err) {
            res.send(err.message)
        } else {
            
        }

    })
})

module.exports = route