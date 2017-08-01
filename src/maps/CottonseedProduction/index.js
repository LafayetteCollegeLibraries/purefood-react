import React from 'react'
import BaseTimelineSliderMap from '../BaseTimelineSliderMap'
import timeline from './timeline.json'
import legend from './legend.json'

class CottonseedProduction extends BaseTimelineSliderMap {
  getTimeline () {
    return timeline
  }

  legendDot (color, size) {
    return (
      <div 
        style={{
          backgroundColor: color,
          borderRadius: '100%',
          display: 'inline-block',
          height: size,
          width: size,
        }}
      />
    )
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

          {/* TODO: refactor legend */}
          <div className="col-xs-2" style={{display: 'inline-block'}}>
            <div className="row">
              <h3>Cottonseed Oil Crushing Mills</h3>
            </div>
            {legend.mills.map(({color, width, text}, index) => (
              <div className="row" key={`dot-${index}`}>
                <div className="col-xs-2 text-center" style={{padding: 0}}>
                  {this.legendDot(color, width)}
                </div>

                <div className="col-xs-10">
                  {text}
                </div>
              </div>
            ))}

            <div className="row">
              <h3>Cotton Production in 500 lb. bales</h3>
            </div>

            {legend.cotton.map(({color, width, text}, index) => (
              <div className="row" key={`dot-${index}`}>
                <div className="col-xs-2 text-center" style={{}}>
                  {this.legendDot(color, width)}
                </div>

                <div className="col-xs-10">
                  {text}
                </div>
              </div>
            ))}

            <div className="row">
              <div
                className="col-xs-2 text-center"
                style={{
                  backgroundColor: '#b2b2b2',
                  borderWidth: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
                >
                <div
                  style={{
                    backgroundColor: '#e0e0e0',
                    border: '0px solid #e0e0e0',
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    display: 'inline-block',
                    height: '2px',
                    marginBottom: '4px',
                    width: '100%',
                  }}
                />
              </div>

              <div className="col-xs-10">
                Principal Railroads
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid row" key="timeline-container">
          {this.renderTimelineSlider()}
        </div>

        <div className="container-fluid row" key="notes">
          <p>
            These maps illustrate the changing geography of cottonseed oil.
            In the postbellum period, cotton growers began to crush their
            formerly discarded cottonseeds to collect oil. The organic oil
            was then used to mix (adulterate) olive oil in the Mediterranean
            and to blend with lard (pig fat) from meatpackers in the Midwest.
            Crushing seeds was a new industry. It used a byproduct of the
            cotton empire to generate a new market. It also furthered the
            reliance on cotton as a staple crop in the South and Texas.
          </p>

          <p>
            The two layers of the maps show two features changing over time.
            One is the growth of cotton production; the second is the rise
            of the cottonseed oil crushing industry. As the legend notes,
            each green dot represents 1000 bales of cotton, while the size
            of the red dot indicates how many crushing mills each state had.
          </p>

          <p>
            The crushing industry was nearly non-existent in 1860. It grew
            to mills in the dozens in the 1870s and then in the several hundreds
            by the early 1900s. By that point, cottonseed oil was a common
            component in the consumer product market. Shortening, meatpacking,
            and grocers’ companies—like N.K. Fairbanks’ Cottolene and Proctor
            and Gamble’s Crisco— developed new markets built on the regular
            supply of the organic oil from the South. The purpose of the
            maps is to show the geographical path of cottonseed oil in relation
            to the growth of cotton production itself. These maps help
            illustrate a new layer of southern economy with the rise of the
            oil by-product industry.
          </p>

          <p>
            Sources: <i>Bureau of the U.S. Census</i>, 1860, 1870, 1880, 1900; <i>Manufacturers’ Record</i>, 1887, 1916; <i>Oil, Paint, and Drug Reporter</i>.
          </p>
        </div>
      </article>
    )
  }
}

export default CottonseedProduction