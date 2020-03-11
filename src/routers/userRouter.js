const User = require('../models/user')
const jwt = require('jsonwebtoken')
const express = require('express')

const userRouter = express.Router()

//Get all user
userRouter.get('/users', (req, res) => {
    try {
        User.find({}).then( (users)=> {
            res.send(users)
        }).catch( (e) => {
            res.send(e)
        })    
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get user by id
userRouter.get('/users/:id', (req, res) => {
    try {
        const id = req.params.id
        User.findById(id).then( (user) => {
            res.send(user)
        }).catch( (e) => {
            res.send(e)
    })    
    } catch (error) {
        res.status(500).send(error)
    }
})

userRouter.post('/loginVerification', (req, res) => {
    User.findOne({id: req.body.empId}).then( (user) => {
        if(!user)
            return res.render('signUp');
        return res.render('applyLeave');
    }).catch( (e) => {
        console.log(e);
    })
})

//Create users
userRouter.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.getAuthToken()
        res.status(201).send({ user, token })
    }catch (error) {
        res.status(500).send(error)
    }
})

//Login
userRouter.post('/users/login', async (req, res) =>{
    try {
        const user = await User.findUserByEmpId(req.body.id)
        const token = await user.getAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = userRouter