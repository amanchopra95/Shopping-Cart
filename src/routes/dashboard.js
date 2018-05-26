const route = require('express').Router()
const acl = require('../accessControl')
const fs = require('fs')
const { User } = require("../db/model")
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer(
    {
        limits: {
            fileSize: 10000000, 
            files: 1
        },
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb (new Error ("Only jpg, jpeg or png files allowed."), false)
            }
            return cb(null, true)
        },
        storage: storage
    }
)

route.get('/', (req, res) => {
    if(!req.user){
        return res.send("Unauthorized")
    }

    res.render('dashboard', {user: req.user})
})

route.get('/status', (req, res) => res.send({status: !!req.user}))

route.post('/', upload.single('photo'), (req, res) => {
        if (req.file == undefined) {
            res.render('dashboard', {
                msg: "Error: No file selected"
            })
        } else {
            User.findById(req.user.id)
                .then((user) => {
                    user.update({ photo: req.file.filename })
                        .then(() => res.render('dashboard', { msg: "File uploaded to the server", user: req.user}))
                        .catch((err) => res.render('dashboard', { msg: err.message }))
                })
                .catch((err) => res.render('dashboard', { msg: "Some problem occured couldn't connect with the database" }))
        }
    })


module.exports = route