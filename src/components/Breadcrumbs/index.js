import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
}

const Breadcrumbs = props => {
  // skip breadcrumbs on the home page
  if (props.path === '/') {
    return null
  }

  let className = 'breadcrumb'

  if (props.className) {
    className += ' ' + props.className
  }

  return (
    <ul className={className}>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        {props.title}
      </li>
    </ul>
  )
}

Breadcrumbs.propTypes = propTypes

export default Breadcrumbs