import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import UserLocation from "./components/UserLocation";
import FilterBar from "./components/FilterBar";
import Walter from "./components/Walter";
import Markers from "./components/Markers";
import PositionProvider from "./Contexts/PositionProvider";
import "./assets/icomoon/style.css";
import "./styles/global.css";

function App() {
  const [userWantsWater, setUserWantsWater] = useState(true);
  const [userWantsToilets, setUserWantsToilets] = useState(true);
  const [userWantsFood, setUserWantsFood] = useState(false);
  return (
    <>
      <Walter />
      <MapContainer center={[48.216671, -1.55]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PositionProvider>
          <UserLocation />
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
      />
    </>
  );
}

export default App;
