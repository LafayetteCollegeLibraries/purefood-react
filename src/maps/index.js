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
    url: '/paraf',
    title: "Paraf's Itinerary",
    component: ParafsItinerary,
  },
  {
    url: '/margarine-legislation',
    title: 'Oleomargarine Legislation',
    component: MargarineLegislation,
  },
  {
    url: '/margarine-production',
    title: 'Butter and Oleomargarine Production',
    component: MargarineProduction,
  },
  {
    url: '/cottonseed-production',
    title: 'Cottonseed Oil Production',
    component: CottonseedProduction,
  },
  {
    url: '/cottonseed-exports',
    title: 'Cottonseed Oil Exports',
    component: CottonseedExports,
  },
  {
    url: '/glucose-exports',
    title: 'Glucose Exports',
    component: GlucoseExports,
  },
  {
    url: '/margarine-exports',
    title: 'Oleomargarine Exports',
    component: MargarineExports,
  },
  {
    url: '/oil-exports',
    title: 'Oleo Oil Exports',
    component: OilExports,
  },
]