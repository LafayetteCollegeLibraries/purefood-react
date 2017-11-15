import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })),
}

const defaultProps = {
  links: [],
}

class NavbarDropdown extends React.PureComponent {
  constructor (props) {
    super(props)

    this.maybeCloseDropdown = this.maybeCloseDropdown.bind(this)
    this.maybeRenderDropdown = this.maybeRenderDropdown.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)

    this.state = {
      isOpen: props.isOpen || false,
    }
  }

  getArrow () {
    return (
      <svg
        width="7"
        height="7"
        viewBox="0 0 10 10"
        version="1.1"
        style={{marginLeft: '10px', verticalAlign: 'middle'}}
      >
        <path d="M0,0L5,10L10,0" />
      </svg>
    )
  }

  maybeCloseDropdown (ev) {
    const { isOpen } = this.state

    if (ev && ev.target) {
      const { dataset } = ev.target

      if (!dataset['toggle']) {
        if (isOpen) {
          return this.toggleDropdown(false)
        }
      }
    }
  }

  maybeRenderDropdown () {
    const { isOpen } = this.state

    if (!isOpen) {
      return null
    }

    const { links, name } = this.props

    if (this.props.links.length === 0) {
      return null
    }

    const ariaName = name ? `${name}-dropdown` : 'dropdown'

    return (
      <ul aria-labelledby={ariaName} className="dropdown-menu">
        {links ? links.map((link, idx) => (
          <li key={`${ariaName}-link-${idx}`}>
            <a href={link.path}>
              {link.title}
            </a>
          </li>
        )) : this.props.children}
      </ul>
    )
  }

  toggleDropdown () {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render () {
    const { isOpen } = this.state
    const className = ['dropdown', 'col-xs-3']
    const { links, showArrow, label, ...rest } = this.props

    if (isOpen) {
      className.push('open')
    }

    if (rest.className) {
      className.push(rest.className)
      delete rest.className
    }

    return (
      <li
        {...rest}
        className={className.join(' ')}
        data-toggle="dropdown"
        style={{cursor: 'pointer'}}
        onMouseEnter={this.toggleDropdown}
        onMouseLeave={this.toggleDropdown}
      >
        <a
          aria-expanded={this.state.isOpen}
          aria-haspopup="true"
          className="dropdown-toggle"
          data-toggle="dropdown"
        >
          {this.props.label}

          { showArrow ? this.getArrow() : null }
        </a>

        {this.maybeRenderDropdown()}
      </li>
    )
  }
}

NavbarDropdown.propTypes = propTypes
NavbarDropdown.defaultProps = defaultProps

export default NavbarDropdown