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

  maybeCloseDropdown (ev) {
    if (ev && ev.target) {
      if (!ev.target.dataset['dropdown-toggle']) {
        if (this.state.isOpen) {
          return this.toggleDropdown(true)
        }

        this.toggleDropdown()
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
        {links.map((link, idx) => (
          <li key={`${ariaName}-link-${idx}`}>
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
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

    if (isOpen) {
      className.push('open')
    }

    return (
      <li
        className={className.join(' ')}
        data-dropdown="true"
        onClick={this.toggleDropdown}
        style={{cursor: 'pointer'}}
      >
        <a
          aria-expanded={this.state.isOpen}
          aria-haspopup="true"
          className="dropdown-toggle"
          data-toggle="dropdown"
        >
          {this.props.children}
        </a>

        {this.maybeRenderDropdown()}
      </li>
    )
  }
}

NavbarDropdown.propTypes = propTypes
NavbarDropdown.defaultProps = defaultProps

export default NavbarDropdown