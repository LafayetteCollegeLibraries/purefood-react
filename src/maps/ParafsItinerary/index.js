import React from 'react'
import BaseTimelineSliderMap from '../BaseTimelineSliderMap'
import PropTypes from 'prop-types'
import timeline from './timeline.json'

import EventContent from './EventContent'
import Slider from '../../components/TimelineSlider'

class ParafsItinerary extends BaseTimelineSliderMap {
  getTimeline () {
    return timeline
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