import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-bootstrap-slider'

import 'bootstrap-slider/dist/css/bootstrap-slider.min.css'
import './style.scss'

const propTypes = {
  data: PropTypes.array,
  dataLabelKey: PropTypes.string,
  onChange: PropTypes.func,
}

const defaultProps = {
  data: [],
  dataLabelKey: 'year',

  // default slider props
  orientation: 'horizontal',
  onChange: () => {},
  value: 0,
}

class TimelineSlider extends React.PureComponent {
  constructor (props) {
    super(props)

    this.getTickProps = this.getTickProps.bind(this)
  }

  getTickProps () {
    const { data, dataLabelKey } = this.props
    
    return data.reduce((out, datum, index) => {
      out.ticks.push(index)
      out.ticks_labels.push(datum[dataLabelKey])
      return out
    }, {ticks: [], ticks_labels: []})
  }

  render () {
    const {
      data,
      dataLabelKey,
      onChange,

      ...sliderProps
    } = this.props

    if (data.length === 0) {
      return null
    }

    return (
      <Slider
        change={onChange}
        formatter={idx => data[idx][dataLabelKey]}
        min={0}
        max={data.length - 1}

        {...this.getTickProps()}
        {...sliderProps}
      />
    )
  }
}

TimelineSlider.propTypes = propTypes
TimelineSlider.defaultProps = defaultProps

export default TimelineSlider