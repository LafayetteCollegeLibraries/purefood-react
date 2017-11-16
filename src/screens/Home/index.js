import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <figure className="col-xs-4">
          <img src="/img/berghaus_hydra.png" />
          <figcaption>
            A. Berghaus, “The Hydra-Headed Monster of Adulteration.” Rural New Yorker, May 1887
          </figcaption>
        </figure>
        <div className="col-xs-8">
          <p>This is the digital map companion to <i>Pure Adulteration: Cheating on Nature in the Age of Manufactured Food</i> (under contract with the University of Chicago Press). The book is set between the dawn of manufactured food in the mid-1800s and the onset of modern food policy in the early 1900s, a period in food and agricultural history known, among other things, as the Era of Adulteration. It was a period of enormous environmental upheaval in many notable ways. Environmental and cultural historians commonly point to rural-urban shifts, expansion, colonization, imperialism, the birth of national parks, and a nascent conservationist ethos to frame those changes. But one of the more remarkable transitions was taking place in agricultural environments. Conventional agricultural production and food identity were radically upended in just a half century with new factory systems, new manufactured products, and new ways of buying, cooking and, ultimately, knowing food. What is more, those changes grew amidst a rampant concern for character grounded in sincerity and authenticity in response to the perceived instability of a changing world. <i>Pure Adulteration</i> uses debates about purity and adulteration—debased, corrupted, or contaminated food—to examine how the new manufacturing practices challenged cultural ideas of “nature” and “natural” and how those challenges resulted in new science-based food regulation. It finds those debates as the outcome of cultural angst over sincerity, authenticity, honesty, and trust intertwined with environmental concerns about nature, purity, and health and all invested in understanding a newly complex food system.</p>
          <p>The maps at this companion site help illustrate the changing circumstances of late-nineteenth century food systems. They begin with a tour of one of the century’s most notorious con man, <Link to="/paraf">the Chevalier Alfred Paraf</Link>. They then provide visual access to <Link to="/margarine-legislation">changes in legislation</Link>, commodity production for <Link to="/margarine-production">oleomargarine</Link> and <Link to="/cottonseed-production">cottonseed oil</Link>, and export patterns for three contentious adulterants of the era, <Link to="/margarine-exports">oleomargarine</Link>, <Link to="/cottonseed-exports">cottonseed oil</Link>, and <Link to="/glucose-exports">glucose (“grape-sugar”)</Link>. <Link to="/chapters">The Table of Contents</Link> provides further summaries of each chapter of the book and links to relevant supporting maps. <Link to="/notes">A Notes page</Link> provides references to original GIS map production and the data used to build those maps.</p>
        </div>
      </div>
    </div>
  )
}

export default Home