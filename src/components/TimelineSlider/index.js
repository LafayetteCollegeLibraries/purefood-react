import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-bootstrap-slider'

import 'bootstrap-slider/dist/css/bootstrap-slider.min.css'
import './style.scss'

const propTypes = {
  autoplay: PropTypes.bool,
  data: PropTypes.array,
  dataLabelKey: PropTypes.string,
  hideControls: PropTypes.bool,
  onChange: PropTypes.func,
  playing: PropTypes.bool,
  playingInterval: PropTypes.number,
}

const defaultProps = {
  autoplay: false,
  data: [],
  dataLabelKey: 'year',
  hideControls: false,
  playing: false,
  playingInterval: 2500,

  // default slider props
  orientation: 'horizontal',
  onChange: () => {},
  onTogglePlay: () => {},
  value: 0,
}

class TimelineSlider extends React.PureComponent {
  constructor (props) {
    super(props)

    this.getTickProps = this.getTickProps.bind(this)
    this.moveBackward = this.moveBackward.bind(this)
    this.moveForward = this.moveForward.bind(this)
  }

  getTickProps () {
    const { data, dataLabelKey } = this.props
    
    return data.reduce((out, datum, index) => {
      out.ticks.push(index)
      out.ticks_labels.push(datum[dataLabelKey])
      return out
    }, {ticks: [], ticks_labels: []})
  }

  moveBackward () {
    this.props.onChange(this.props.value - 1)
  }

  moveForward () {
    this.props.onChange(this.props.value + 1)
  }

  timelineButton(whichIcon, onClick) {
    const { data, value } = this.props
    let disabled = false

    if (whichIcon === 'forward' && (value + 1 === data.length)) {
      disabled = true
    }

    if (whichIcon === 'backward' && value === 0) {
      disabled = true
    }

    return (
      <div className="col-xs-1" key={whichIcon}>
        <button
          type="button"
          className={`glyphicon btn btn-default glyphicon-${whichIcon}`}
          onClick={onClick}
          disabled={disabled}
        />
      </div>
    ) 
  }

  render () {
    const {
      data,
      dataLabelKey,
      onChange,
      playing,

      ...sliderProps
    } = this.props

    if (data.length === 0) {
      return null
    }

    return (
      <div className="TimeSlider-container container-fluid row">
        {this.timelineButton(playing ? 'pause' : 'play', this.props.onTogglePlay)}
        {this.timelineButton('backward', this.moveBackward)}
        <div className="col-xs-9">
          <Slider
            change={ev => onChange(ev.target.value)}
            formatter={idx => data[idx][dataLabelKey]}
            min={0}
            max={data.length - 1}

            {...this.getTickProps()}
            {...sliderProps}
          />
        </div>
        {this.timelineButton('forward', this.moveForward)}
      </div>
    )
  }
}

TimelineSlider.propTypes = propTypes
TimelineSlider.defaultProps = defaultProps

export default TimelineSlider