import { Popup, Marker } from 'react-leaflet';
import { searchIcon } from '../../../utilities/icons';

export default function SearchMarker({ latLng, address }) {
  return (
    <Marker position={latLng} icon={searchIcon}>
      <Popup>
        <h3>Search result</h3>
        {address}
      </Popup>
    </Marker>
  );
}
