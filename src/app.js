const express = require('express')
require('./database/dbController')
const User = require('./models/user')
const Leave = require('./models/leave')

const app = express()

app.get('/users', (req, res) => {
    res.send("Working")
})

app.post('/users', (req, res) => {
    const user = new User({
        id: 446343,
        firstname: 'Kumar',
        lastname: 'Mariyappan',
        supervisor: 'Kannan'
    })
    user.save( (error, data) => {
        if(error){
            return res.send(error)
        }
        res.send(data)
    })

})

app.get('/leaves', (req, res) => {
    res.send("Leave Working")
})

app.post('/leaves', (req, res) => {
    const leave = new Leave({
        startDate: '02/18/2020',
        endDate: '03/07/2020',
        numberOfBusinessDays: 15,
        numberOfHours: 120,
        leaveType: 'Vacation',
        approvedStatus: 'Approved',
        appliedInESA: 'Yes'
    })
    leave.save((error, data) => {
        if (error) {
            return res.send(error)
        }
        res.send(data)
    })

})

app.listen(4444, () => {
    console.log('Application is running in port 4444')
})