import React from 'react'
import PropTypes from 'prop-types'
import timeline from './timeline.json'

import EventContent from './EventContent'
import Slider from '../../components/TimelineSlider'

const SLIDESHOW_RATE = 2500
let SLIDESHOW_INTERVAL

class ParafsItinerary extends React.PureComponent {
  constructor (props) {
    super(props)

    this.handleChangeTimelineStep = this.handleChangeTimelineStep.bind(this)
    this.renderTimelineSlider = this.renderTimelineSlider.bind(this)

    this.handleTogglePlay = this.handleTogglePlay.bind(this)
    this.togglePause = this.togglePause.bind(this)
    this.togglePlay = this.togglePlay.bind(this)

    this.state = {
      currentStep: 0,
      playing: false,
    }
  }

  handleChangeTimelineStep (value) {
    this.setState({currentStep: value})
  }

  handleTogglePlay () {
    console.log('handleTogglePlay')
    if (SLIDESHOW_INTERVAL && this.state.playing) {
      return this.togglePause()
    }

    return this.togglePlay()
  }

  togglePause () {
    console.log('toggling pause')
    clearInterval(SLIDESHOW_INTERVAL)
    this.setState({playing: false})
  }

  togglePlay() {
    console.log('toggling play')
    SLIDESHOW_INTERVAL = setInterval(() => {
      const { currentStep } = this.state
      let nextStep = currentStep + 1

      if (nextStep >= timeline.length) {
        return this.togglePause()
      }

      this.setState({currentStep: nextStep})
    }, SLIDESHOW_RATE)
  }

  renderTimelineSlider () {
    const { currentStep, playing } = this.state

    return (
      <Slider
        data={timeline}
        onChange={this.handleChangeTimelineStep}
        onTogglePlay={this.handleTogglePlay}
        orientation="horizontal"
        playing={playing}
        value={currentStep}
      />
    )
  }

  render () {
    const { currentStep } = this.state
    const data = timeline[currentStep]
    const title = data.location

    return (
      <article>
        <h2>{title}</h2>
        <div className="container-fluid">
          <div className="row">
            <div id="location-content" className="col-xs-4">
              <EventContent {...data} />
            </div>

            <div id="map-content" className="col-xs-8">
              <article className="container-fluid" key="static-text">
                <p>
                  This is the Paraf Itinerary. Chapter 1 of the book includes
                  the story of the Chevalier Alfred Paraf. He was a chemist and
                  con man who travelled from his 1844 birthplace in Mulhouse, near
                  the Rhine River in present-day France, to the United States,
                  then across North America, and finally to South America where
                  he died in 1885. The sixteen-step itinerary here follows his
                  path with snapshots of his main stopping points. The travelogue
                  maps his efforts, investments, patents, scams, and accrual of
                  foes.
                </p>
              </article>

              <div className="container-fluid row" key="map">
                <div className="map">
                  <img src={`/img/${data.map}`} />
                </div>
              </div>
              
              <div className="container-fluid row" key="timeline-slider">
                {this.renderTimelineSlider()}
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default ParafsItinerary