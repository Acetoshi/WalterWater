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

  const map=useMap();

  // these and the useEffect are needed to programatically open the popup of any marker on the map
  //TODO : its seems to me the approch with a useEffect that clicks the market is just never going to work weel. How about building a new marker altogether ?
  const { targetPoint } = usePOIs();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (markerRef.current && point.id == targetPoint.id) {
      map.flyTo({lat:point.lat,lng:point.lon})
      markerRef.current.fire('click');
    }
  }, [targetPoint]);

  const normalIcon = iconMap[point.tags.amenity].regular;
  const zoomedIcon = iconMap[point.tags.amenity].zoomed;

  return (
    <Marker
      key={point.id}
      position={[point.lat, point.lon]}
      icon={isSelected ? zoomedIcon : normalIcon}
      autoPanOnFocus={false}
      ref={markerRef}
      eventHandlers={{
        click: (event) => {
          onMarkerClick(point);
          setTimeout(() => event.target.openPopup(), 900); // this is used to open the correct pop-up from the list view  
        },
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
