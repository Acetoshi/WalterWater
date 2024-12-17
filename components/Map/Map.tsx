"use client";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import PositionProvider from "@/contexts/Position/PositionProvider";
import PointsOfInterestProvider from "@/contexts/PointsOfInterest/PointsOfInterestProvider";
// import UserMarker from "../components/UserMarker";
// import Markers from "../components/Markers";
// import MapTracker from "../components/MapTracker";
// import POIsFocuser from "../components/POIsFocuser";
// import Capybara from "../components/EasterEgg";
// import ListToggle from "../components/ListToggle";
// import ListView from "../components/ListView";
// import RecenterButton from "../components/RecenterButton";
// import FiltersDrawer from "../components/FiltersDrawer";
import MapProviderSelector from "./MapUI/MapProviderSelector/MapProviderSelector";
// import DataFetchingNotifier from "../components/DataFetchingNotifier";
import mapProviders from "./MapUI/MapProviderSelector/mapProviders.json";
import "leaflet/dist/leaflet.css";
import Walter from "./MapUI/Walter/Walter";

export default function Map() {
  // const [listIsDisplayed, setListIsDisplayed] = useState(false);
  const [mapSelecter, setMapSelecter] = useState({
    isOpen: false,
    providerId: 2, //Number(localStorage.getItem("mapProviderId")),
  });

  return (
    <>
      <PositionProvider>
        <PointsOfInterestProvider>
          {/* <ListView listState={{ listIsDisplayed, setListIsDisplayed }} /> */}
          <MapProviderSelector
            mapSelecter={mapSelecter}
            setMapSelecter={setMapSelecter}
          />

          <MapContainer
            center={[47.216671, -1.55]}
            zoomControl={false}
            zoom={14}
          >
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
        <ListToggle listState={{ listIsDisplayed, setListIsDisplayed }} /> */}

        <Walter />
          </MapContainer>
        </PointsOfInterestProvider>
      </PositionProvider>
    </>
  );
}
