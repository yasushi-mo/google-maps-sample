import { useState, type FormEvent } from "react";
import { Map } from "@vis.gl/react-google-maps";
import { PlaceMarker } from "./PlaceMarker";
import { useTextSearch } from "../hooks/useTextSearch";
import { GOOGLE_MAPS_MAP_ID, TOKYO_STATION } from "../config";

export function PlaceFinder() {
  const { results, error, search } = useTextSearch();
  const [query, setQuery] = useState("ホテル");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedId(null);
    void search(query);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", height: "100vh" }}>
      <aside style={{ padding: 16, overflowY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <input
            value={query}
            placeholder="例：駅近"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">検索</button>
        </form>
        {error && <p role="alert">{error}</p>}
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <button type="button" onClick={() => setSelectedId(result.id)}>
                {result.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <Map
        defaultCenter={TOKYO_STATION}
        defaultZoom={15}
        mapId={GOOGLE_MAPS_MAP_ID}
        gestureHandling="greedy"
      >
        {results.map((result) => (
          <PlaceMarker
            key={result.id}
            position={result.position}
            title={result.name}
            description={result.address}
            selected={result.id === selectedId}
            onSelect={() => setSelectedId(result.id)}
            onClose={() => setSelectedId(null)}
          />
        ))}
      </Map>
    </div>
  );
}
