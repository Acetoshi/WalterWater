import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import mapProviders from "../scripts/mapProviders.json";
import UserMarker from "../components/UserMarker";
import Markers from "../components/map_components/Markers/Markers";
import MapTracker from "../components/MapTracker";
import POIsFocuser from "../components/POIsFocuser";
import Walter from "../components/UI/Walter/Walter";
import Capybara from "../components/EasterEgg";
import ListToggle from "../components/map_UI/ListToggle/ListToggle";
import ListView from "../components/map_UI/ListView/ListView";
import RecenterButton from "../components/map_UI/RecenterButton/RecenterButton";
import FiltersDrawer from "../components/map_UI/FiltersDrawer/FiltersDrawer";
import MapProviderSelector from "../components/map_UI/MapProviderSelector/MapProviderSelector";
import DataFetchingNotifier from "../components/map_UI/DataFetchingNotifier/DataFetchingNotifier";

export default function Map() {
  const [listIsDisplayed, setListIsDisplayed] = useState<boolean>(false);
  const [mapSelecter, setMapSelecter] = useState({
    isOpen: false,
    providerId: Number(localStorage.getItem("mapProviderId")),
  });

  return (
    <>
      <ListView listState={{ listIsDisplayed, setListIsDisplayed }} />
      <MapProviderSelector
        mapSelecter={mapSelecter}
        setMapSelecter={setMapSelecter}
      />

      <MapContainer center={[47.216671, -1.55]} zoomControl={false} zoom={14}>
        <TileLayer
          attribution={mapProviders[mapSelecter.providerId].attribution}
          url={mapProviders[mapSelecter.providerId].tilesUrl}
        />
        <Markers />
        <UserMarker />
        <MapTracker setMapSelecter={setMapSelecter} />

        <DataFetchingNotifier />
        <RecenterButton />
        <POIsFocuser />
        <FiltersDrawer listState={{ listIsDisplayed, setListIsDisplayed }} />
        <ListToggle listState={{ listIsDisplayed, setListIsDisplayed }} />

        <Capybara />
        <Walter />
      </MapContainer>
    </>
  );
}
