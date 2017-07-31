import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  color: PropTypes.string,
}

const ColorLegend = props => {
  const { color, ...rest } = props
  return (
    <div 
      {...rest}
      style={{
        display: 'inline-block',
        height: '24px',
        padding: '8px',
        border: '1px solid #000',
        backgroundColor: color,
      }}
    />
  )
}

const MapLegend = props => {
  return (
    <div className="row">
      <div className="container-fluid">
        <h3>{props.title}</h3>
      </div>

      {props.labels.map((label, index) => (
        <div className="row" key={`legend-label-${index}`}>
          <ColorLegend className="col-xs-2" color={label.color} />
          <div className="col-xs-10">{label.text}</div>
        </div>
      ))}
    </div>
  )
}

MapLegend.propTypes = propTypes

export default MapLegend