// the base class to be extended
import React from 'react'
import Slider from '../../components/TimelineSlider'

export const BASE_SLIDESHOW_RATE = 2000

class BaseTimelineSliderMap extends React.PureComponent {
  constructor (props) {
    super(props)

    this._slideshowInteral = null
    this._slideshowRate = props.slideshowRate || BASE_SLIDESHOW_RATE

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

  getCurrentData () {
    const timeline = this.getTimeline()
    
    if (!timeline) {
      return null
    }

    return timeline[this.state.currentStep]
  }

  // override this method with one that returns the data for each timeline
  getTimeline () {
    return null
  }

  handleChangeTimelineStep (value) {
    const { currentStep } = this.state
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
    const startIndex = (this.state.currentStep + 1) === timeline.length 
      ? 0
      : this.state.currentStep

    this.setState({playing: true, currentStep: startIndex})

    this._slideshowInteral = setInterval(() => {
      const { currentStep } = this.state
      let nextStep = currentStep + 1

      if (nextStep >= timeline.length) {
        return this.togglePause()
      }

      this.handleChangeTimelineStep(nextStep)

      // don't wait until the last iteration +1 to trigger the pause
      if (nextStep + 1 === timeline.length) {
        this.togglePause()
      }
    }, this._slideshowRate)
  }

  render () {
    return null
  }
}

export default BaseTimelineSliderMap