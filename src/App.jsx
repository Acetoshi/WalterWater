import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import UserLocation from "./components/UserLocation";
import FilterBar from "./components/FilterBar";
import Walter from "./components/Walter";
import Markers from "./components/Markers";
import PositionProvider from "./Contexts/PositionProvider";
import "./assets/icomoon/style.css";
import "./styles/global.css";
import "./styles/listview.css";
import ListView from "./components/ListView";

function App() {
  const [listIsDisplayed, setListIsDisplayed] = useState(false);
  const [userWantsWater, setUserWantsWater] = useState(true);
  const [userWantsToilets, setUserWantsToilets] = useState(true);
  const [userWantsFood, setUserWantsFood] = useState(false);

  const handleDisplayModeChange = (mode) => {
    setListIsDisplayed(mode);
  };
  const initialData = [
    {
      adresse:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      distance:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      denivele:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      temps_estime:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
    },
    {
      adresse:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      distance:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      denivele:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      temps_estime:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
    },
    {
      adresse:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      distance:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      denivele:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      temps_estime:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
    },
  ];

  return (
    <PositionProvider>
      <Walter />
      <ListView data={initialData} isDisplayed={listIsDisplayed} />
      <MapContainer center={[47.216671, -1.55]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocation />

        {userWantsWater && <Markers typeOfAmenity={"water"} />}
        {userWantsToilets && <Markers typeOfAmenity={"toilets"} />}
        {userWantsFood && <Markers typeOfAmenity={"food"} />}
      </MapContainer>
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
        onDisplayModeChange={handleDisplayModeChange}
      />
    </PositionProvider>
  );
}

export default App;
