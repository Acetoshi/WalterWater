import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import PositionProvider from "../Contexts/PositionProvider";
import UserLocation from "../components/UserLocation";
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
  const [userWantsWater, setUserWantsWater] = useState(true);
  const [userWantsToilets, setUserWantsToilets] = useState(true);
  const [userWantsFood, setUserWantsFood] = useState(false);
  const [mapSelecter, setMapSelecter] = useState({
    isOpen: false,
    providerId: Number(localStorage.getItem("mapProviderId")),
  });

  return (
    <PositionProvider>
      <ListView
        isDisplayed={listIsDisplayed}
        setIsDisplayed={setListIsDisplayed}
        filters={{
          userWantsWater,
          userWantsToilets,
          userWantsFood,
        }}
      />
      <MapProviderSelector
        mapSelecter={mapSelecter}
        setMapSelecter={setMapSelecter}
      />
      <RecenterButton />
      <SearchThisArea />
      <FilterBar
        filters={{
          userWantsWater,
          setUserWantsWater,
          userWantsToilets,
          setUserWantsToilets,
          userWantsFood,
          setUserWantsFood,
          listIsDisplayed,
          setListIsDisplayed,
        }}
      />

      <Walter />
      <MapContainer center={[47.216671, -1.55]} zoomControl={false} zoom={14}>
        <TileLayer
          attribution={mapProviders[mapSelecter.providerId].attribution}
          url={mapProviders[mapSelecter.providerId].tilesUrl}
        />

        <UserLocation />
        <MapTracker setMapSelecter={setMapSelecter} />
        <MapRecenterer />

        {userWantsWater && <Markers typeOfAmenity={"water"} />}
        {userWantsToilets && <Markers typeOfAmenity={"toilets"} />}
        {userWantsFood && <Markers typeOfAmenity={"food"} />}

        <Capybara />
      </MapContainer>
    </PositionProvider>
  );
}
