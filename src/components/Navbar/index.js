import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLink from '../NavbarLink'
import NavbarDropdown from '../NavbarDropdown'

import './style.scss'

const Navbar = props => (
  <div id="navbar" className="navbar-collapse collapse row">
    <ul className="menu nav navbar-left col-xs-2">
      <li>
        <Link to="https://digital.lafayette.edu" className="navbar-brand pull-left">
          <img src="/img/dss_logo.png" />
        </Link>
      </li>
    </ul>

    <ul id="navbar-menu" className="menu nav col-xs-9 row">
      <NavbarLink to="/">Home</NavbarLink>
      <NavbarLink to="/chapters">Table of Contents</NavbarLink>
      <NavbarDropdown links={props.mapPages}>Maps</NavbarDropdown>
      <NavbarLink to="/notes">Notes</NavbarLink>
    </ul>
  </div>
)

export default Navbar