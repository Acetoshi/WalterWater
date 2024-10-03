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

export default function Map() {
  const [listIsDisplayed, setListIsDisplayed] = useState(false);
  const [userWantsWater, setUserWantsWater] = useState(true);
  const [userWantsToilets, setUserWantsToilets] = useState(true);
  const [userWantsFood, setUserWantsFood] = useState(false);

  return (
    <PositionProvider>
      <Walter />
      <ListView
        isDisplayed={listIsDisplayed}
        filters={{
          userWantsWater,
          userWantsToilets,
          userWantsFood,
        }}
      />

      <MapContainer center={[47.216671, -1.55]} zoomControl={false} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocation />
        <MapTracker />
        <MapRecenterer/>

        {userWantsWater && <Markers typeOfAmenity={"water"} />}
        {userWantsToilets && <Markers typeOfAmenity={"toilets"} />}
        {userWantsFood && <Markers typeOfAmenity={"food"} />}

        <Capybara />
      </MapContainer>
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
    </PositionProvider>
  );
}
