import { memo, useEffect, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import usePOIs from '@/Contexts/PointsOfInterest/usePOIs';
import { faucetIcon, toiletIcon, foodIcon } from '@/utilities/icons';
import POIDetails from '../../map_UI/POIDetails/POIDetails';
import CustomMarkerProps from './CustomMarker.props';
import L from 'leaflet';
import './LeafletPopup.css';

function CustomMarkerComponent({ point, onMarkerClick }: CustomMarkerProps) {

  // these and the useEffect are needed to programatically open the popup of any marker on the map
  const { targetPoint } = usePOIs();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (markerRef.current && point.id == targetPoint.id) {
      setTimeout(() => markerRef.current?.openPopup(), 700);
    }
  }, [targetPoint]);

  const iconMap = {
    drinking_water: faucetIcon,
    toilets: toiletIcon,
    restaurant: foodIcon,
  };

  return (
    <Marker
      key={point.id}
      position={[point.lat, point.lon]}
      icon={iconMap[point.tags.amenity]}
      autoPanOnFocus={false}
      ref={markerRef}
      eventHandlers={{
        click: () => onMarkerClick(point),
      }}
    >
      <Popup keepInView={false} autoPan={false}>
        <POIDetails point={point} />
      </Popup>
    </Marker>
  );
}

const CustomMarker = memo(CustomMarkerComponent);

export default CustomMarker;
