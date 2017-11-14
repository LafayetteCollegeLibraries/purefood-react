import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLink from '../NavbarLink'
import NavbarDropdown from '../NavbarDropdown'

import './style.scss'

const shareLabel = (
  <div>
    <img src="/img/ShareIcon.png" />
    <div>Share</div>
  </div>
)

const Navbar = props => (
  <div id="navbar-container" className="container-fluid">
    <div id="navbar" className="navbar-collapse collapse row">
      <ul className="menu nav navbar-left col-xs-2">
        <li>
          <a href="https://digital.lafayette.edu" className="navbar-brand pull-left">
            <img src="/img/dss_logo.png" />
          </a>
        </li>
      </ul>

      <ul id="navbar-menu" className="menu nav col-xs-9 row">
        <NavbarLink to="/" className="col-xs-3">
          Home
        </NavbarLink>

        <NavbarLink to="/chapters" className="col-xs-3">
          Table of Contents
        </NavbarLink>

        <NavbarDropdown
          className="col-xs-3"
          label="Maps"
          links={props.mapPages}
          showArrow
        />

        <NavbarLink to="/notes" className="col-xs-3">
          Notes
        </NavbarLink>
      </ul>
    </div>
  </div>
)

export default Navbar