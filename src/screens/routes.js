// similar to `/src/maps/index.js`, this provides an array
// of route props for the pages of the application, allowing
// us to concat with the maps object and iteratively generate
// our site's routes
import Home from './Home'
import TableOfContents from './TableOfContents'
import Notes from './Notes'
import Copyright from './Copyright'
import Contact from './Contact'

const screens = [
  {
    path: '/',
    title: 'Home',
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
  },
  {
    path: '/contact',
    title: 'Contact Us',
    component: Contact,
  }
]

export default screens