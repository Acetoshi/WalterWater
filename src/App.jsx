import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import UserLocation from "./components/UserLocation";
import FilterBar from "./components/FilterBar";
import Walter from "./components/Walter";
import Markers from "./components/Markers";
import PositionProvider from "./Contexts/PositionProvider";
import Capybara from "./components/EasterEgg";
import ListView from "./components/ListView";
import SearchThisArea from "./components/SearchThisArea";
import "./assets/icomoon/style.css";
import "./styles/global.css";
import "./styles/listview.css";
import "./styles/searchThisAreaButton.css";

function App() {
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
        <SearchThisArea />

        {userWantsWater && <Markers typeOfAmenity={"water"} />}
        {userWantsToilets && <Markers typeOfAmenity={"toilets"} />}
        {userWantsFood && <Markers typeOfAmenity={"food"} />}

        <Capybara />
      </MapContainer>
      <button id="search-this-area-button"> search this area </button>
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

export default App;
