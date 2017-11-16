import React from 'react'
import { Link } from 'react-router-dom'

const HeaderContainer = () => (
  <div className="HeaderContainer container-fluid">
    <h2>
      <Link to="https://library.lafayette.edu">
        Skillman Library at Lafayette College
      </Link>
    </h2>
    <h1>
      <Link to="/">
        <em>Pure Adulteration</em> Digital Companion Site
      </Link>
    </h1>
  </div>
)

export default HeaderContainer