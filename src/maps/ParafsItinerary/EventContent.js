// component to render the unique timeline-event contnet for `Paraf's Itinerary` maps
import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  year: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  thumbnail: PropTypes.shape({
    image: PropTypes.string.isRequired,
    caption: PropTypes.string,
  }).isRequired,

  thumbnailPath: PropTypes.string,

  // optional props
  map: PropTypes.string,
  title: PropTypes.string,
}

const defaultProps = {
  thumbnailPath: '/img'
}

const EventContent = props => {
  const {
    year,
    title,
    location,
    content,
    thumbnail,
    thumbnailPath,

    // not used, but pulled anyway as it's not a valid container-prop
    map,

    ...containerProps
  } = props

  const contentHTML = Array.isArray(content) ? content.join('</p><p>') : content

  return (
    <div {...containerProps}>
      <div key="location-description">
        <div className="container-fluid">
          <h4>{title ? title : year}</h4>
          <p dangerouslySetInnerHTML={{__html: contentHTML}} />
        </div>

        <div className="location-urban-scale container-fluid">
          <a className="fancy" href={`${thumbnailPath}/${thumbnail.image}`}>
            <img
              className="img-responsive img-thumbnail img-lightbox"
              alt="location thumbnail"
              src={`${thumbnailPath}/${thumbnail.image}`}
            />
          </a>
          <p dangerouslySetInnerHTML={{__html: thumbnail.caption}} />
        </div>
      </div>
    </div>
  )
}

EventContent.defaultProps = defaultProps
EventContent.propTypes = propTypes

export default EventContent
