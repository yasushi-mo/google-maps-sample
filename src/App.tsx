import { APIProvider } from '@vis.gl/react-google-maps'
import { GOOGLE_MAPS_API_KEY } from './config'
import { PlaceFinder } from './components/PlaceFinder';

function App() {
  return (
   <APIProvider apiKey={GOOGLE_MAPS_API_KEY} language="ja" region="JP">
      <PlaceFinder />
   </APIProvider>
  )
}

export default App
