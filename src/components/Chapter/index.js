import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  chapter: PropTypes.number.isRequired,
  title: PropTypes.string,

  thumbnailPath: PropTypes.string.isRequired
}

const Chapter = props => {
  return (
    <article className="Chapter">
      <h2>
        Chapter {props.chapter}
        {props.title ? <small>{props.title}</small> : null}
      </h2>

      <div className="container-fluid">
        <div className="media">
          <div className="media-left">
            <img className="media-object" width="128px" src={props.thumbnailPath} />
          </div>

          <div className="media-body">
            {props.children}
          </div>
        </div>
      </div>
    </article>
  )
}

export default Chapter