const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.post('/contact', function (req, res) {
  console.log(req)
})

app.listen(8081)