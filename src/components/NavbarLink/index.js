import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const propTypes = {
  to: PropTypes.string.isRequired,
}

const NavbarLink = ({to, children}) => (
  <li className="col-xs-3">
    <Link to={to}>{children}</Link>
  </li>
)

NavbarLink.propTypes = propTypes

export default NavbarLink