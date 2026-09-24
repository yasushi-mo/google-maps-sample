import { useState } from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { PlaceMarker } from "./components/PlaceMarker";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_MAP_ID, TOKYO_STATION } from './config'

function App() {
  const [selected, setSelected] = useState(false);

  return (
   <APIProvider apiKey={GOOGLE_MAPS_API_KEY} language="ja" region="JP">
     <Map
      style={{ width: "100vw", height: "100vh" }}
      defaultCenter={TOKYO_STATION}
      defaultZoom={15}
      mapId={GOOGLE_MAPS_MAP_ID}
      gestureHandling="greedy"
     >
      <PlaceMarker
        position={TOKYO_STATION}
        title="東京駅"
        description="東京都千代田区丸の内1丁目"
        selected={selected}
        onSelect={() => setSelected(true)}
        onClose={() => setSelected(false)}
      />
     </Map>
   </APIProvider>
  )
}

export default App
