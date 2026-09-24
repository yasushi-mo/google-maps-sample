import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

type Props = {
  position: { lat: number; lng: number };
  title: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  onClose: () => void;
};

export function PlaceMarker({
  position,
  title,
  description,
  selected,
  onSelect,
  onClose,
}: Props) {
  // 吹き出しの表示位置を決めるため、マーカーのインスタンスを取得する
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker ref={markerRef} position={position} title={title} onClick={onSelect}>
        <Pin
          background={selected ? "#d93025" : "#1a73e8"}
          borderColor="#ffffff"
          glyphColor="#ffffff"
        />
      </AdvancedMarker>
      {selected && (
        <InfoWindow anchor={marker} onCloseClick={onClose}>
          <strong>{title}</strong>
          {description && <p>{description}</p>}
        </InfoWindow>
      )}
    </>
  );
}