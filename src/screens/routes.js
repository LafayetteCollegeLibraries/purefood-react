// similar to `/src/maps/index.js`, this provides an array
// of route props for the pages of the application, allowing
// us to concat with the maps object and iteratively generate
// our site's routes
import Home from './Home'
import TableOfContents from './TableOfContents'
import Notes from './Notes'
import Copyright from './Copyright'

export default [
  {
    path: '/',
    html: '<em>Pure Adulteration</em> Digital Companion Site',
    component: Home,
  },
  {
    path: '/chapters',
    title: 'Table of Contents',
    component: TableOfContents,
  },
  {
    path: '/notes',
    title: 'Notes on Data Sets',
    component: Notes,
  },
  {
    path: '/copyright',
    title: 'Copyright',
    component: Copyright,
  }
]
