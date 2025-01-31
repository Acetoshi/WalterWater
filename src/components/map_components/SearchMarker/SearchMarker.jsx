import { Popup, Marker, useMap } from 'react-leaflet';
import { searchIcon } from '../../../utilities/icons';

export default function SearchMarker({latLng, address}) {

  return (
    <Marker position={latLng} icon={searchIcon}>
      <Popup>
        <p>
          {address}
        </p>
      </Popup>
    </Marker>
  );
}
