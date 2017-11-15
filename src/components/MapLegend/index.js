import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  color: PropTypes.string,
}

const ColorLegend = ({label}) => {
  const { color, image, text } = label
  const style = {}

  if (color) {
    style.backgroundColor = color
  }

  if (image) {
    style.background = `url(${image})`
  }

  return (
    <div className="row">
      <div
        className="col-xs-2"
        style={{
          display: 'inline-block',
          height: '24px',
          padding: '8px',
          border: '1px solid #000',
          ...style,
        }}
      />
      <div className="col-xs-10">
        {text}
      </div>
    </div>
  )
}

const MapLegend = props => {
  return (
    <div className="row">
      <div className="container-fluid">
        <h3>{props.title}</h3>
      </div>

      {props.labels.map((label, index) => (
        <ColorLegend key={`color-legend-${index}`} label={label} />
      ))}
    </div>
  )
}

MapLegend.propTypes = propTypes

export default MapLegend