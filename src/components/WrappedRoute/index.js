// allows us to wrap a page + display its title
import React from 'react'
import { Route, Link } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs'

import './style.scss'

const WrappedRoute = ({component: Component, title, ...rest}) => (
  <Route {...rest} render={props => (
    <div className="container-fluid">
      <section id="title">
        <div className="container-fluid">
          <h1>{title}</h1>
          <Breadcrumbs
            className="pull-left"
            title={title}
            path={props.match.path}
          />

          <ul className="nav nav-pills pull-right">
            <li role="presentation">
              <Link to="/contact">Contact Us</Link>
            </li>

            <li role="presentation">
              <Link to="/copyright">Copyright</Link>
            </li>
          </ul>
        </div>
      </section>

      <section id="content">
        <Component {...props} />
      </section>
    </div>
  )}/>
)

export default WrappedRoute