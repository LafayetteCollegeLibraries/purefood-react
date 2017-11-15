import React from 'react'
import { Link } from 'react-router-dom'
import BaseTimelineSliderMap from '../BaseTimelineSliderMap'
import timeline from './timeline.json'

class MargarineExports extends BaseTimelineSliderMap {
  getTimeline () {
    return timeline
  }

  render () {
    const data = this.getCurrentData()

    if (data === null) {
      return null
    }

    return (
      <article>
        <div className="container-fluid row" key="map-container">
          <div className="col-xs-10 map">
            <img src={`/img/${data.map}`} />
          </div>

          <div className="col-xs-2 map-legend-container">
            <img src="/img/margarine_exports_legend.png" />
          </div>
        </div>

        <div className="container-fluid row" key="timeline-container">
          {this.renderTimelineSlider()}
        </div>

        <div className="container-fluid row" key="notes">
          <p>
            These maps show the growth in exports of finished oleomargarine
            from the United States to other regions in the world from 1890
            to 1910. The government distinguished these exports from raw oleo
            oil (see this page), which producers also shipped by the thousands
            of tons to foreign markets.
          </p>

          <p>
            For margarine, the trade grew from five export ports in 1890 (Boston,
              New York, Philadelphia, Detroit, and New Orleans) to six in 1910
            and from five main global regional destinations to eight. This was
            an increase from about 6 million pounds to 26 million pounds by the
            first decade of the twentieth century. Most of those foreign
            shipments first went to British colonial holdings in the West Indies,
            before being displaced in priority by shipments to Germany, Norway,
            and The Netherlands by the early twentieth century. As with shipments
            of raw oleo oil, notable trends include a change in destination
            into the early 1900s to include expanding markets in Asia, Central
            America, South America, and Africa. Full data sets of the flow paths
            listing individual nations and quantities are 
            <Link to="/notes">here</Link>.
          </p>

          <ol id="notes">
            <li>
              Because trade records provide a wide range of quantities per year,
              for the sake of reader legibility the maps represent proportions.
              For example, an arrow five-hatch-marks wide is five orders of
              magnitude greater than an arrow with one hatch mark, while the
              width of the five-hatch arrow is five times the width of the
              one-hatch arrow. Readers can thus view the maps to gain a sense
              of growth in export markets, relative quantities to various parts
              of the world, and sense of scale in the global marketplace for
              supposed adulterants.
            </li>

            <li>
              The maps derive from government trade statistics that listed
              departure ports (export locations) and final destinations (import
              locations), but not together. For instance, while we know
              manufacturers shipped x pounds of raw oleo oil from New York
              in 1890, we do not know where, specifically, that specific
              quantity ended up. Therefore, the maps show the commodities
              shipped from individual U.S. ports to meet in the Atlantic before
              dispersing to final destinations.
            </li>

            <li>
              In general, government statistics used to construct theses maps
              documented foreign imports by country. Thus, in creating these
              maps the countries were aggregated into regions such as Northern
              Europe, Southern Europe, South America, Central America, Africa,
              and Asia. On the export side, various cities were aggregated into
              regions based on geographical proximity. The full data sets show
              specific nations.
            </li>
          </ol>
        </div>
      </article>
    )
  }
}

export default MargarineExports