// the base class to be extended
import React from 'react'
import Slider from '../../components/TimelineSlider'

class BaseTimelineSliderMap extends React.PureComponent {
  constructor (props) {
    super(props)

    this._slideshowInteral = null
    this._slideshowRate = props.slideshowRate || 2500

    this.getTimeline = this.getTimeline.bind(this)
    this.handleChangeTimelineStep = this.handleChangeTimelineStep.bind(this)
    this.handleTogglePlay = this.handleTogglePlay.bind(this)
    this.renderTimelineSlider = this.renderTimelineSlider.bind(this)
    this.togglePause = this.togglePause.bind(this)
    this.togglePlay = this.togglePlay.bind(this)

    this.state = {
      currentStep: 0,
      playing: false,
    }
  }

  // override this method with one that returns the data for each timeline
  getTimeline () {
    return null
  }

  handleChangeTimelineStep (value) {
    this.setState({currentStep: value})
  }

  handleTogglePlay () {
    if (this._slideshowInteral && !!this.state.playing) {
      return this.togglePause()
    }

    return this.togglePlay()
  }

  // call this to generate a slider
  renderTimelineSlider () {
    const { currentStep, playing } = this.state

    return (
      <Slider
        data={this.getTimeline()}
        onChange={this.handleChangeTimelineStep}
        onTogglePlay={this.handleTogglePlay}
        playing={playing}
        value={currentStep}
      />
    )
  }

  togglePause () {
    clearInterval(this._slideshowInteral)
    this.setState({playing: false})
  }

  togglePlay () {
    const timeline = this.getTimeline()
    this.setState({playing: true})

    this._slideshowInteral = setInterval(() => {
      const { currentStep } = this.state
      let nextStep = currentStep + 1

      if (nextStep >= timeline.length) {
        return this.togglePause()
      }

      this.setState({currentStep: nextStep})
    }, this._slideshowRate)
  }

  render () {
    return null
  }
}

export default BaseTimelineSliderMap