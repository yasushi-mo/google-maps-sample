import { useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

export type SearchResult = {
  id: string;
  name: string;
  address: string;
  position: { lat: number; lng: number };
};

export function useTextSearch() {
  const map = useMap();
  // places ライブラリの読み込みが終わるまでは null が返る
  const placesLib = useMapsLibrary("places");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!map || !placesLib || query.trim() === "") return;
    setError(null);

    try {
      const { places } = await placesLib.Place.searchByText({
        textQuery: query,
        // 検索対象をホテルに限定する
        includedType: "hotel",
        useStrictTypeFiltering: true,
        // 課金額はここで指定した項目で決まる
        fields: ["displayName", "location", "formattedAddress"],
        locationBias: map.getCenter(),
        language: "ja",
        region: "jp",
        maxResultCount: 10,
      });

      const next: SearchResult[] = places.flatMap((place) =>
        place.location
          ? [
              {
                id: place.id,
                name: place.displayName ?? "",
                address: place.formattedAddress ?? "",
                position: place.location.toJSON(),
              },
            ]
          : [],
      );
      setResults(next);

      // すべての検索結果が画面に入るように表示位置を調整する
      if (next.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        next.forEach((result) => bounds.extend(result.position));
        map.fitBounds(bounds);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "検索に失敗しました");
    }
  };

  return { results, error, search };
}