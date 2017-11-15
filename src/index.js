import React from 'react'
import { render, hydrate } from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import App from './screens/App'

const Wrapped = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

const nodeEnv = process.env.NODE_ENV
const renderFn = nodeEnv && nodeEnv.toLowerCase() === 'production'
  ? hydrate
  : render

renderFn(Wrapped, document.querySelector('#app'))
