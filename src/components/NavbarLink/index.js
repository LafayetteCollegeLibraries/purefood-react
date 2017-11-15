import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const propTypes = {
  to: PropTypes.string.isRequired,
}

const NavbarLink = ({to, children, ...rest}) => (
  <li { ...rest }>
    <Link to={to}>{children}</Link>
  </li>
)

NavbarLink.propTypes = propTypes

export default NavbarLink