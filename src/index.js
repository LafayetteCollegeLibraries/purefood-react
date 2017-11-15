import React from 'react'
import { render } from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import App from './screens/App'

const Wrapped = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

render(Wrapped, document.querySelector('#app'))
