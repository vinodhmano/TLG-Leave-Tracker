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

leaveRouter.post('/leaves', (req, res) => {
    const leave = new Leave({
        startDate: '02/18/2020',
        endDate: '03/07/2020',
        numberOfBusinessDays: 15,
        numberOfHours: 120,
        leaveType: 'Vacation',
        approvedStatus: 'Approved',
        appliedInESA: 'Yes'
    })
    
    // Using Promise
    leave.save().then( (_leave) => {
        res.send(_leave)
    }).catch( (e) => {
        res.send(e)
    })
})

module.exports = leaveRouter