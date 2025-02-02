import { useCallback } from 'react';
import { useMap } from 'react-leaflet';
import usePOIs from '../../../Contexts/PointsOfInterest/usePOIs';
import usePOIsFocuser from '@/Contexts/PointsOfInterest/usePOIsFocuser';
import MarkerClusterGroup from 'react-leaflet-cluster';
import CustomMarker from '../CustomMarker/CustomMarker';
import { Point } from '@/Contexts/contexts.types';
import useMapTracker from '@/Contexts/Position/useMapTracker';
import './Markers.css';
import usePosition from '@/Contexts/Position/usePosition';

export default function Markers() {
  const { POIs } = usePOIs();
  const map = useMap();
  usePOIsFocuser();
  useMapTracker();
  const { mapPosition } = usePosition();

  // useCallBack needed because of marker clusters, otherwise the whole map is re-rendered all the time
  const handleMarkerClick = useCallback(
    (point: Point) => {
      const latOffset = (mapPosition.bounds.maxLat - mapPosition.bounds.minLat) / 3; //this offset wil zoom the map slightly over the marker, so the user can read the pop-up properly
      map.flyTo([point.lat + latOffset, point.lon], mapPosition.zoomLevel, {
        easeLinearity: 1,
        duration: 0.6,
      });
    },
    [mapPosition.zoomLevel]
  );

  //TODO : use this reference : https://wiki.openstreetmap.org/wiki/Key:wikimedia_commons to find a way to obtain images from wikimedia.
  return (
    <MarkerClusterGroup
      key={'marker-cluster-group'}
      chunkedLoading
      disableClusteringAtZoom={18}
      spiderfyOnMaxZoom={false}
      polygonOptions={{ stroke: false }}
      maxClusterRadius={110}
    >
      {POIs &&
        POIs.map((point: Point, index: number) => (
          <CustomMarker key={`${point.id}+${index}`} point={point} onMarkerClick={handleMarkerClick} />
        ))}
    </MarkerClusterGroup>
  );
}
