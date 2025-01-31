import { Popup, Marker, useMap } from 'react-leaflet';
import { walterIcon } from '../../../utilities/icons';

export default function SearchMarker({latLng, address}) {

  return (
    <Marker position={latLng} icon={walterIcon}>
      <Popup>
        <p>
          {address}
        </p>
      </Popup>
    </Marker>
  );
}
