const multer = require('multer')
const { User } = require('../db/model')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    limits: {
        fileSize: 100000000,
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
            return cb(new Error("This file is not supported."), false)
        }
        return cb(null, true)
    },
    storage: storage
})

function displayPhoto (req, res) {
    User.findById(req.params.userId)
        .then((user) => {
            if (user.photo){
                res.sendFile(path.resolve(`./public/uploads/${user.photo}`))
            } else {
                res.send("No such file exist.")
            }  
        })
        .catch((err) => res.send(err.message))
}

function uploadImage(req , res) {
    if (req.file == undefined) {
        res.render('dashboard', {msg: 'Error no file selected'})
    } else {
        User.findById(req.user.id)
            .then((user) => {
                user.update({ photo: req.file.filename })
                    .then(() => res.render('dashboard', {msg: "File uploaded", user: req.user}))
                    .catch((err) => res.render('dashboard', {msg: err.message}))
            })
            .catch((err) => res.send(err.message))
    }
} 

module.exports = {
    upload,
    uploadImage,
    displayPhoto
}