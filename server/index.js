const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.post('/contact', function (req, res) {
  console.log(req.body)
})

app.listen(8081)