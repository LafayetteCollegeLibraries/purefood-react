import React from 'react'
import { Route } from 'react-router-dom'
import Navbar from '../../containers/Navbar'

import pages from '../../maps'

const App = () => (
  <div>
    <Navbar key="navbar" mapPages={pages} />
    {pages.map(page => (
      <Route
        key={page.url}
        path={page.url}
        component={page.component}
        title={page.title}
      />
    ))}
  </div>
)

export default App