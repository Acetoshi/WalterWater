import { memo, useEffect, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import usePOIs from '@/Contexts/PointsOfInterest/usePOIs';
import { faucetIcon, toiletIcon, foodIcon } from '@/utilities/icons';
import POIDetails from '../../map_UI/POIDetails/POIDetails';
import CustomMarkerProps from './CustomMarker.props';
import './LeafletPopup.css';

function CustomMarkerComponent({ point, onMarkerClick }: CustomMarkerProps) {
  const { openPopupId } = usePOIs();

  const iconMap = {
    drinking_water: faucetIcon,
    toilets: toiletIcon,
    restaurant: foodIcon,
  };

  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current && point.id == openPopupId) {
      setTimeout(() => markerRef.current.openPopup(), 700);
    }
  }, [openPopupId]);

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
