import React from 'react'
import BaseTimelineSliderMap from '../BaseTimelineSliderMap'
import MapLegend from '../../components/MapLegend'
import legend from './legend.json'
import timeline from './timeline.json'

class MargarineProduction extends BaseTimelineSliderMap {
  getTimeline () {
    return timeline
  }

  render () {
    const data = this.getCurrentData()

    return (
      <article>
        <div className="container-fluid row" key="map-container">
          <div className="col-xs-10 map">
            <img src={`/img/${data.map}`} />
          </div>

          <div className="col-xs-2">
            <div className="row">
              <img src="/img/OleoProd_legend_normal.png" />
            </div>

            <MapLegend labels={legend} title="Butter Production" />
          </div>
        </div>

        <div className="container-fluid row" key="timeline-container">
          {this.renderTimelineSlider()}
        </div>

        <div className="container-fluid row" key="notes">
          <p>
            These maps show the growth of butter production on a state-by-state
            basis from 1870 to 1900. Beginning in 1880, they also show the
            proliferation of oleomargarine production facilities.
          </p>

          <p>
            Playing the maps in sequence shows a subtle but visible shift in
            the dominant dairy states. In mid-century, the Northeast and
            upstate New York in particular were leaders in butter production.
            As settlement expanded across the continent, so too did butter
            production, shifting from the east of the Great Lakes to the west.
            Lake lands in particular were crucial for dairy production, because
            reliable water supplies kept grass and pasturelands flourishing
            for cows so that farmers could produce quality butter from their
              milk. After 1870, margarine factories sprouted first on the east
            coast (a consequence of Paraf’s early escapades) but became more
            prominent in the meatpacking Midwest by the turn of the century.
          </p>

          <p>
            Source: <i>Statistical Abstract of the United States</i>, 1910 edition (pp. 147-148)
          </p>
        </div>
      </article>
    )
  }
}

export default MargarineProduction