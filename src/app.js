const express = require('express')
require('./database/dbController')
const User = require('./models/user')
const Leave = require('./models/leave')

const app = express()

app.use(express.json())

//Get all user
app.get('/users', (req, res) => {
    User.find({}).then( (users)=> {
        res.send(users)
    }).catch( (e) => {
        res.send(e)
    })
})

//Get user by id
app.get('/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id).then( (user) => {
        res.send(user)
    }).catch( (e) => {
        res.send(e)
    })
})

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then( (_user) => {
        res.send(_user)
    }).catch( (e) => {
        res.send(e)
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

        res.send("Inserted the leave")
    })
})

app.post('/test', (req,res) => {
    console.log(req.body)
})

app.listen(4444, () => {
    console.log('Application is running in port 4444')
})