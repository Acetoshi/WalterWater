import { useEffect } from 'react';
import { Popup, Marker, useMap } from 'react-leaflet';
import usePosition from '../../../Contexts/Position/usePosition';
import { walterIcon } from '../../../utilities/icons';

export default function UserMarker() {
  const { userLocation } = usePosition();

  const map = useMap();

  useEffect(() => {
    map.setView(userLocation, 15);
  }, [userLocation]);

  return (
    <Marker position={userLocation} icon={walterIcon}>
      <Popup keepInView={false} autoPan={false}>
        <h4>Your position</h4>
        This is you, explorer, use filters to find water or toilets around you. Have a great time.
      </Popup>
    </Marker>
  );
}
