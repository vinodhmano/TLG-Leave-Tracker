const express = require('express')
require('./database/dbController')
const User = require('./models/user')

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


app.listen(4444, () => {
    console.log('Application is running in port 4444')
})