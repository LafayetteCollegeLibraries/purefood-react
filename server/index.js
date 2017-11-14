const fs = require('fs')
const express = require('express')
const path = require('path')
const React = require('react')
const render = require('react-dom/server').renderToString
const StaticRouter = require('react-router-dom/StaticRouter')
const AppComponent = require('../build/screens/App')

const publicPath = path.join(__dirname, '..', 'public')
const pathToIndex = path.join(publicPath, 'index.html')

const rawIndex = fs.readFileSync(pathToIndex, 'utf8')
const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('*', function (req, res) {
  const context = {}
  const routerProps = {
    location: req.url,
    context,
  }

  const rendered = render(
    React.createElement(StaticRouter.default, routerProps,
      React.createElement(AppComponent)
    )
  )

  const html = rawIndex.replace(
    '<div id="app-target"></div>',
    `<div id="app">${rendered}</div>`
  )

  res.status(context.statusCode || 200)
  res.send(html)

  // res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.listen(8081)