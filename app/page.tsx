"use client"
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
// import UserMarker from "../components/UserMarker";
// import Markers from "../components/Markers";
// import MapTracker from "../components/MapTracker";
// import POIsFocuser from "../components/POIsFocuser";
// import Walter from "../components/Walter";
// import Capybara from "../components/EasterEgg";
// import ListToggle from "../components/ListToggle";
// import ListView from "../components/ListView";
// import RecenterButton from "../components/RecenterButton";
// import FiltersDrawer from "../components/FiltersDrawer";
import MapProviderSelector from "@/components/MapProviderSelector/MapProviderSelector";
// import DataFetchingNotifier from "../components/DataFetchingNotifier";
import mapProviders from "@/components/MapProviderSelector/mapProviders.json"

export default function Map() {
  const [listIsDisplayed, setListIsDisplayed] = useState(false);
  const [mapSelecter, setMapSelecter] = useState({
    isOpen: false,
    providerId: Number(localStorage.getItem("mapProviderId")),
  });

  return (
    <>
      {/* <ListView listState={{ listIsDisplayed, setListIsDisplayed }} /> */}
      <MapProviderSelector
        mapSelecter={mapSelecter}
        setMapSelecter={setMapSelecter}
      />

      <MapContainer center={[47.216671, -1.55]} zoomControl={false} zoom={14}>
        <TileLayer
          attribution={mapProviders[mapSelecter.providerId].attribution}
          url={mapProviders[mapSelecter.providerId].tilesUrl}
        />
        {/* <Markers />
        <UserMarker />
        <MapTracker setMapSelecter={setMapSelecter} />

        <DataFetchingNotifier />
        <RecenterButton />
        <POIsFocuser />
        <FiltersDrawer listState={{ listIsDisplayed, setListIsDisplayed }} />
        <ListToggle listState={{ listIsDisplayed, setListIsDisplayed }} />

        <Capybara />
        <Walter /> */}
      </MapContainer>
    </>
  );
}
