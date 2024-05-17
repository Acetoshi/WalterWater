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
  const [stateInfos, setStateInfos] = useState("carte");

  const handleDisplayModeChange = (mode) => {
    setStateInfos(mode);
  };
  const initialData = [
    {
      adresse: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      distance: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      denivele: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!",
      temps_estime: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, repellendus!"
    }
  ];
  const [userWantsWater, setUserWantsWater] = useState(true);
  const [userWantsToilets, setUserWantsToilets] = useState(true);
  const [userWantsFood, setUserWantsFood] = useState(false);
  return (
    <>
      <Walter />
      <MapContainer center={[47.216671, -1.55]} zoom={14}>
        {stateInfos === "carte" ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <PositionProvider>
          <ListView data={initialData} />
        )}
          {userWantsWater && <Markers typeOfAmenity={"water"} radius={0.1} />}
          {userWantsToilets && (
            <Markers typeOfAmenity={"toilets"} radius={0.1} />
          )}
          {userWantsFood && <Markers typeOfAmenity={"food"} radius={0.1} />}
        </PositionProvider>
      </MapContainer>
      <FilterBar
        filters={{
          userWantsWater,
          setUserWantsWater,
          userWantsToilets,
          setUserWantsToilets,
          userWantsFood,
          setUserWantsFood,
        }}
        onDisplayModeChange={handleDisplayModeChange} 

      />
    </>
  );
}

export default App;
