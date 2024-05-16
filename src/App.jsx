import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import UserLocation from "./components/UserLocation";
import "./assets/icomoon/style.css";
import "./styles/global.css";
import FilterBar from "./components/FilterBar";
import Markers from "./components/Markers";
import PositionProvider from "./Contexts/PositionProvider";

function App() {
  const [userWantsWater, setUserWantsWater] = useState(true);
  return (
    <>
      <MapContainer center={[48.216671, -1.55]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PositionProvider>
          <UserLocation />
          {userWantsWater && <Markers typeOfAmenity={"water"} radius={0.1} />}
          <Markers typeOfAmenity={"toilets"} radius={0.1} />
        </PositionProvider>
      </MapContainer>
      <FilterBar filters={{userWantsWater, setUserWantsWater}} />
    </>
  );
}

export default App;
