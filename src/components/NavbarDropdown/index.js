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

  componentWillMount () {
    document.addEventListener('click', this.maybeCloseDropdown, true)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.maybeCloseDropdown, true)
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
            <Link to={link.path}>{link.title}</Link>
          </li>
        )) : this.props.children}
      </ul>
    )
  }

  toggleDropdown (isOpen) {
    this.setState(prevState => ({
      isOpen: isOpen === undefined ? !prevState.isOpen : isOpen,
    }))
  }

  render () {
    const { isOpen } = this.state
    const className = ['dropdown', 'col-xs-3']
    const { links, showArrow, ...rest } = this.props

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
      >
        <a
          aria-expanded={this.state.isOpen}
          aria-haspopup="true"
          className="dropdown-toggle"
          onClick={this.toggleDropdown}
          data-toggle="dropdown"
        >
          {this.props.label}

          { showArrow ? <i className="glyphicon-arrow-down" /> : null }
        </a>


        {this.maybeRenderDropdown()}
      </li>
    )
  }
}

NavbarDropdown.propTypes = propTypes
NavbarDropdown.defaultProps = defaultProps

export default NavbarDropdown