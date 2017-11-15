import ParafsItinerary from './ParafsItinerary'
import MargarineLegislation from './MargarineLegislation'
import MargarineProduction from './MargarineProduction'
import CottonseedProduction from './CottonseedProduction'
import CottonseedExports from './CottonseedExports'
import GlucoseExports from './GlucoseExports'
import MargarineExports from './MargarineExports'
import OilExports from './OilExports'

export default [
  {
    path: '/paraf',
    title: "Paraf's Itinerary",
    component: ParafsItinerary,
  },
  {
    path: '/margarine-legislation',
    title: 'Oleomargarine Legislation',
    component: MargarineLegislation,
  },
  {
    path: '/margarine-production',
    title: 'Butter and Oleomargarine Production',
    component: MargarineProduction,
  },
  {
    path: '/cottonseed-production',
    title: 'Cottonseed Oil Production',
    component: CottonseedProduction,
  },
  {
    path: '/cottonseed-exports',
    title: 'Cottonseed Oil Exports',
    component: CottonseedExports,
  },
  {
    path: '/glucose-exports',
    title: 'Glucose Exports',
    component: GlucoseExports,
  },
  {
    path: '/margarine-exports',
    title: 'Oleomargarine Exports',
    component: MargarineExports,
  },
  {
    path: '/oil-exports',
    title: 'Oleo Oil Exports',
    component: OilExports,
  },
]