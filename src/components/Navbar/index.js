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
          <Link to="https://digital.lafayette.edu" className="navbar-brand pull-left">
            <img src="/img/dss_logo.png" />
          </Link>
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
          // showArrow={true}
        />

        <NavbarLink to="/notes" className="col-xs-3">
          Notes
        </NavbarLink>
      </ul>

      <ul id="navbar-share-auth" className="menu nav navbar-right col-xs-1">
        <NavbarDropdown label={shareLabel}>
          <li>
            <div className="dropdown-header">
              <span>Share this page</span>
            </div>
          </li>

          <li className="divider" aria-role="separator" />

          <li>
            <span className="st_twitter_large" displayText="Twitter" />
            Twitter
          </li>

          <li>
            <span className="st_facebook_large" displayText="Facebook" />
            Facebook
          </li>
        </NavbarDropdown>
      </ul>
    </div>
  </div>
)

export default Navbar