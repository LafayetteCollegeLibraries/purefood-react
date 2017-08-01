import React from 'react'
import NavbarLink from '../NavbarLink'
import NavbarDropdown from '../NavbarDropdown'

export default class Navbar extends React.PureComponent {
  render () {
    return (
      <div id="navbar" className="navbar-collapse collapse row">
        <ul className="menu nav navbar-left col-xs-2">
          <li>
            <a href="https://digital.lafayette.edu" className="navbar-brand pull-left">
              <img src="/img/dss_logo.png" />
            </a>
          </li>
        </ul>

        <ul id="navbar-menu" className="menu nav col-xs-9 row">
          <NavbarLink to="/">Home</NavbarLink>
          <NavbarLink to="/chapters">Table of Contents</NavbarLink>
          <NavbarDropdown links={this.props.mapPages}>Maps</NavbarDropdown>
          <NavbarLink to="/notes">Notes</NavbarLink>
        </ul>
      </div>
    )
  }
}
