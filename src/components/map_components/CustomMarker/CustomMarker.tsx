import { memo, useEffect, useRef, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import usePOIs from '@/Contexts/PointsOfInterest/usePOIs';
import { iconMap } from '@/utilities/icons';
import POIDetails from '../../map_UI/POIDetails/POIDetails';
import CustomMarkerProps from './CustomMarker.props';
import L from 'leaflet';
import './LeafletPopup.css';

function CustomMarkerComponent({ point, onMarkerClick }: CustomMarkerProps) {
  const [isSelected, setIsSelected] = useState(false);
  const normalIcon = iconMap[point.tags.amenity].regular;
  const zoomedIcon = iconMap[point.tags.amenity].zoomed;

  return (
    <Marker
      key={point.id}
      position={[point.lat, point.lon]}
      icon={isSelected ? zoomedIcon : normalIcon}
      autoPanOnFocus={false}
      eventHandlers={{
        click: () => onMarkerClick(point),
        popupopen: () => setIsSelected(true),
        popupclose: () => setIsSelected(false),
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
