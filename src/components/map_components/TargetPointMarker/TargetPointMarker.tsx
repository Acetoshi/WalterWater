import usePOIs from '@/Contexts/PointsOfInterest/usePOIs';
import { Marker, Popup } from 'react-leaflet';
import { iconMap } from '@/utilities/icons';
import POIDetails from '@/components/map_UI/POIDetails/POIDetails';

export default function TargetPointMarker() {
  const { targetPoint, setTargetPoint } = usePOIs();

  return (
    targetPoint.id != 0 && (
      <Marker
        position={{ lat: targetPoint.lat, lng: targetPoint.lon }}
        icon={iconMap[targetPoint.tags.amenity].zoomed}
        zIndexOffset={200}
        eventHandlers={{ popupclose: () => setTargetPoint({ ...targetPoint, id: 0 }) }}
      >
        <Popup keepInView={false} autoPan={false}>
          <POIDetails point={targetPoint} />
        </Popup>
      </Marker>
    )
  );
}
