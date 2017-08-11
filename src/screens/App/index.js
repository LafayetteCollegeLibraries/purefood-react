import React from 'react'
import WrappedRoute from '../../components/WrappedRoute'
import NavContainer from '../../components/NavContainer'

import maps from '../../maps'
import screens from '../routes'

import '../../scss/main.scss'

const routes = [].concat(maps, screens)

const App = () => (
  <div id="main">
    <NavContainer mapPages={maps} />
    
    {routes.map(routeData => (
      <WrappedRoute
        key={routeData.path}
        exact={true}
        {...routeData}
      />
    ))}
  </div>
)

export default App