const express = require('express')
require('./database/dbController')
const userRouter = require('./routers/userRouter')
const leaveRouter = require('./routers/leaveRouter')
const Leave = require('./models/leave')
const hbs = require('hbs')
const path = require('path')

const app = express()
const viewFolder = path.join(__dirname,'../templates/views')
const partialFolder = path.join(__dirname,'../templates/partials')
const staticFolder = path.join(__dirname,'/utils')

app.use(express.urlencoded())
app.use(express.static(staticFolder))
app.use(express.json())
app.use(userRouter)
app.use(leaveRouter)

app.set('view engine', 'hbs')
app.set('views', viewFolder)
hbs.registerPartials(partialFolder)


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/applyLeave', (req, res) => {
    res.render('applyLeave')
})

app.get('/signUp', (req, res) => {
    res.render('signUp')
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.listen(4444, () => {
    console.log('Application is running in port 4444')
})

const jwt = require('jsonwebtoken')

const main = () => {
    const token = jwt.sign({id:144725}, "nobodyknowswhatitis", { expiresIn: "2 days" })
    const isValid = jwt.verify(token,"nobodyknowswhatitis")
    console.log(isValid)
}

main()