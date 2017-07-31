import React from 'react'
import { Route } from 'react-router-dom'
import Navbar from '../../containers/Navbar'

import ParafsItinerary from '../../maps/ParafsItinerary'


const pages = [
  {
    url: '/paraf',
    title: 'Paraf\'s Itinerary',
    component: ParafsItinerary,
  },
  // {
  //   url: '/margarine-legislation',
  //   title: 'Oleomargarine Legislation',
  // },
  // {
  //   url: '/margarine-production',
  //   title: 'Butter and Oleomargarine Production',
  // },
  // {
  //   url: '/cottonseed-production',
  //   title: 'Cottonseed Oil Production',
  // },
  // {
  //   url: '/cottonseed-exports',
  //   title: 'Cottonseed Oil Exports',
  // },
  // {
  //   url: '/glucose-exports',
  //   title: 'Glucose Exports',
  // },
  // {
  //   url: '/margarine-exports',
  //   title: 'Oleomargarine Exports',
  // },
  // {
  //   url: '/oil-exports',
  //   title: 'Oleo Oil Exports',
  // }
]


const App = () => (
  <div>
    <Navbar key="navbar" mapPages={pages} />
    {pages.map(page => (
      <Route key={page.url} path={page.url} component={page.component} />
    ))}
  </div>
)

export default App