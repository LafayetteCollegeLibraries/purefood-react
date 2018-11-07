const fs = require('fs')
const express = require('express')
const compression = require('compression')
const path = require('path')
const React = require('react')
const render = require('react-dom/server').renderToString
const StaticRouter = require('react-router-dom/StaticRouter')
const Helmet = require('react-helmet').Helmet
const AppComponent = require('../build/screens/App')

const renderIndex = require('./render-index-html')
const publicPath = path.join(__dirname, '..', 'public')

// const pathToIndex = path.join(publicPath, 'index.html')
// const rawIndex = fs.readFileSync(pathToIndex, 'utf8')

const app = express()

// compress responses
app.use(compression())

// use <app-route>/public as the static file directory
// (_not_ serving public/index.html)
app.use(express.static(publicPath, { index: false }))

// route everything else to our react app, which is rendered server-side first
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

  const helmet = Helmet.renderStatic()
  const html = renderIndex({app: rendered, helmet})

  res.status(context.statusCode || 200)
  res.send(html)
})

app.listen(process.env.PORT || 8081)

// write the pid to a file and setup listeners
// to remove it when the app closes

fs.mkdir('tmp', err => {
  if (err) { return }

  fs.writeFileSync('tmp/server.pid', process.pid)
})

const cleanup = function () {
  fs.unlink('tmp/server.pid', err => {
    fs.rmdir('tmp', err => {
      process.exit()
    })
  })
}

;['exit', 'SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'].forEach(signal => {
  process.on(signal, cleanup)
})

