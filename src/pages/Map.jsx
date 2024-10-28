import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import UserMarker from "../components/UserMarker";
import Markers from "../components/Markers";
import MapTracker from "../components/MapTracker";
import MapRecenterer from "../components/MapRecenterer";
import Walter from "../components/Walter";
import Capybara from "../components/EasterEgg";
import ListToggle from "../components/ListToggle";
import ListView from "../components/ListView";
import RecenterButton from "../components/RecenterButton";
import FiltersDrawer from "../components/FiltersDrawer";
import SearchThisArea from "../components/SearchThisArea";
import mapProviders from "../scripts/mapProviders.json";
import MapProviderSelector from "../components/MapProviderSelector";

export default function Map() {
  const [listIsDisplayed, setListIsDisplayed] = useState(false);
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
      <RecenterButton />

      <FiltersDrawer listState={{ listIsDisplayed, setListIsDisplayed }} />

      <MapContainer center={[47.216671, -1.55]} zoomControl={false} zoom={14}>
        <TileLayer
          attribution={mapProviders[mapSelecter.providerId].attribution}
          url={mapProviders[mapSelecter.providerId].tilesUrl}
        />

        <SearchThisArea />

        <Markers />

        <UserMarker />
        <MapTracker setMapSelecter={setMapSelecter} />
        <MapRecenterer />

        <Capybara />
        <Walter />
        <ListToggle listState={{ listIsDisplayed, setListIsDisplayed }} />
      </MapContainer>
    </>
  );
}
