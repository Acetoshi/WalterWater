import { useState } from "react";
import { Pane, MapContainer, TileLayer } from "react-leaflet";
import PositionProvider from "../Contexts/PositionProvider";
import PointsOfInterestProvider from "../Contexts/PointsOfInterestProvider";
import UserMarker from "../components/UserMarker";
import Markers from "../components/Markers";
import MapTracker from "../components/MapTracker";
import MapRecenterer from "../components/MapRecenterer";
import FilterBar from "../components/FilterBar";
import SearchThisArea from "../components/SearchThisArea";
import Walter from "../components/Walter";
import Capybara from "../components/EasterEgg";
import ListView from "../components/ListView";
import RecenterButton from "../components/RecenterButton";
import mapProviders from "../scripts/mapProviders.json";
import MapProviderSelector from "../components/MapProviderSelector";

export default function Map() {
  const [listIsDisplayed, setListIsDisplayed] = useState(false);
  const [mapSelecter, setMapSelecter] = useState({
    isOpen: false,
    providerId: Number(localStorage.getItem("mapProviderId")),
  });

  return (
    <PositionProvider>
      <PointsOfInterestProvider>
        <ListView
          isDisplayed={listIsDisplayed}
          setIsDisplayed={setListIsDisplayed}
        />
        <MapProviderSelector
          mapSelecter={mapSelecter}
          setMapSelecter={setMapSelecter}
        />
        <RecenterButton />

        <FilterBar listState={{ listIsDisplayed, setListIsDisplayed }} />

        <Walter />
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
        </MapContainer>
      </PointsOfInterestProvider>
    </PositionProvider>
  );
}
