import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import mapProviders from '../../utilities/mapProviders.json';
import UserMarker from '../../components/map_components/UserMarker/UserMarker';
import Markers from '../../components/map_components/Markers/Markers';
import Walter from '../../components/UI/Walter/Walter';
import ListToggle from '../../components/map_UI/ListToggle/ListToggle';
import ListView from '../../components/map_UI/ListView/ListView';
import RecenterButton from '../../components/map_UI/RecenterButton/RecenterButton';
import FiltersDrawer from '../../components/map_UI/FiltersDrawer/FiltersDrawer';
import MapProviderSelector from '../../components/map_UI/MapProviderSelector/MapProviderSelector';
import DataFetchingNotifier from '../../components/map_UI/DataFetchingNotifier/DataFetchingNotifier';
import { MapSelecter } from './Map.types';
import Onboarding from '@/components/UI/Onboarding/Onboarding';
import './leaflet.css'; // to stay up to date, you can always : import 'leaflet/dist/leaflet.css';

export default function Map() {
  const [listIsDisplayed, setListIsDisplayed] = useState<boolean>(false);
  const [mapSelecter, setMapSelecter] = useState<MapSelecter>({
    isOpen: false,
    providerId: Number(localStorage.getItem('mapProviderId')),
  });

  return (
    <>
      <Onboarding />
      <ListView listState={{ listIsDisplayed, setListIsDisplayed }} />

      <MapContainer center={[47.216671, -1.55]} zoomControl={false} zoom={14}>
        <TileLayer
          attribution={mapProviders[mapSelecter.providerId].attribution}
          url={mapProviders[mapSelecter.providerId].tilesUrl}
        />
        <MapProviderSelector
          mapSelecter={mapSelecter}
          setMapSelecter={setMapSelecter}
        />
        <Markers />
        <UserMarker />
        <DataFetchingNotifier />
        <RecenterButton />
        <FiltersDrawer />
        <ListToggle listState={{ listIsDisplayed, setListIsDisplayed }} />
        <Walter />
      </MapContainer>
    </>
  );
}
