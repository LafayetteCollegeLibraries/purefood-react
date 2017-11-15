import React from 'react'

import HeaderContainer from '../HeaderContainer'
import Navbar from '../Navbar'

const NavContainer = props => (
  <nav role="navigation" className="NavContainer navbar navbar-inverse">
    <HeaderContainer />
    <Navbar mapPages={props.mapPages} />
  </nav>
)

export default NavContainer