require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const port = process.env.PORT
require('./dbConnect.js')

const indexRouter = require('./routes/index.js')
const apiRouter = require('./routes/api.js')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

// app.get('/', function(req, res) {
//     res.send('hello handwriting')
// })
// app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use(express.static(path.join(__dirname, 'dist')))

app.listen(port, function() {
    console.log(`Express app started on ${port}`)
})