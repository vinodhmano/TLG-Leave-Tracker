const Leave = require('../models/leave')
const express = require('express')
const leaveRouter = express.Router()

// Get all leaves using promise
leaveRouter.get('/leaves', (req, res) => {
    Leave.find({}).then( (leaves) => {
        res.send(leaves)
    }).catch( (e) => {
        res.send(e)
    })
})

// Get by Id using promise
leaveRouter.get('/leave/:id', (req, res) => {
    const id = req.params.id
    Leave.findById(id).then( (_leave) => {
        res.send(_leave)
    }).catch( (e) => {
        res.send(e)
    })
})

leaveRouter.post('/leaves', async (req, res) => {
    const leave = new Leave(req.body)
    // Using Promise
    leave.save().then( (_leave) => {
        res.redirect("users/signUp")
    }).catch( (e) => {
        res.send(e)
    })
})


leaveRouter.post('/test', (req, res) => {
    console.log(req.body)

})

module.exports = leaveRouter