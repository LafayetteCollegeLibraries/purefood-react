import React from 'react'
import { Route } from 'react-router-dom'
import Navbar from '../../containers/Navbar'

import TableOfContents from '../TableOfContents'

import pages from '../../maps'

import '../../scss/main.scss'

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

    <Route path="/chapters" component={TableOfContents} />
  </div>
)

export default App