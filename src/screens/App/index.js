import React from 'react'
import { Helmet } from 'react-helmet'
import WrappedRoute from '../../components/WrappedRoute'
import NavContainer from '../../components/NavContainer'

import maps from '../../maps'
import screens from '../routes'

const appTitle = 'Pure Adulteration Digital Companion Site'

const routes = [].concat(screens, maps)

const App = () => (
  <div id="main">
    <Helmet
      defaultTitle={appTitle}
      titleTemplate={`%s | ${appTitle}`}
    />

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