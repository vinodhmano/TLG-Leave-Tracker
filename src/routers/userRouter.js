const User = require('../models/user')
const express = require('express')
const userRouter = express.Router()

//Get all user
userRouter.get('/users', (req, res) => {
    User.find({}).then( (users)=> {
        res.send(users)
    }).catch( (e) => {
        res.send(e)
    })
})

//Get user by id
userRouter.get('/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id).then( (user) => {
        res.send(user)
    }).catch( (e) => {
        res.send(e)
    })
})

//Create users
userRouter.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then( (_user) => {
        res.send(_user)
    }).catch( (e) => {
        res.send(e)
    })
})

module.exports = userRouter