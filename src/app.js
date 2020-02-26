const express = require('express')
require('./database/dbController')
const userRouter = require('./routers/userRouter')
const leaveRouter = require('./routers/leaveRouter')
const hbs = require('hbs')

const app = express()
const viewFolder = '/Users/admin/node/TLG-Leave-Tracker/templates/views'
const partialFolder = '/Users/admin/node/TLG-Leave-Tracker/templates/partials'
const staticFolder = '/Users/admin/node/TLG-Leave-Tracker/src/utils'

app.use(express.static(staticFolder))
app.use(express.json())
app.use(userRouter)
app.use(leaveRouter)

app.set('view engine', 'hbs')
app.set('views', viewFolder)
hbs.registerPartials(partialFolder)


app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.post('/test', (req,res) => {
    console.log(req.body)
})

app.listen(4444, () => {
    console.log('Application is running in port 4444')
})