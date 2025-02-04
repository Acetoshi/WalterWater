import { Popup, Marker } from 'react-leaflet';
import { searchIcon } from '../../../utilities/icons';

export default function SearchMarker({ latLng, address }) {
  return (
    <Marker position={latLng} icon={searchIcon.zoomed}>
      <Popup keepInView={false} autoPan={false}>
        <h3>Search result</h3>
        {address}
      </Popup>
    </Marker>
  );
}
