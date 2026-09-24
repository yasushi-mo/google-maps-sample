import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_MAP_ID, TOKYO_STATION } from './config'

function App() {
  return (
   <APIProvider apiKey={GOOGLE_MAPS_API_KEY} language="ja" region="JP">
     <Map
      style={{ width: "100vw", height: "100vh" }}
        defaultCenter={TOKYO_STATION}
        defaultZoom={15}
        mapId={GOOGLE_MAPS_MAP_ID}
        gestureHandling="greedy"
     />
   </APIProvider>
  )
}

export default App
