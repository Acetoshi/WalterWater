import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import UserLocation from "./components/UserLocation";
import "./assets/icomoon/style.css";
import "./styles/global.css";
import "./styles/listview.css";
import FilterBar from "./components/FilterBar";
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

  return (
    <>
      <MapContainer center={[47.216671, -1.55]} zoom={14}>
        {stateInfos === "carte" ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <ListView data={initialData} />
        )}
      </MapContainer>
      <FilterBar onDisplayModeChange={handleDisplayModeChange} />
    </>
  );
}

export default App;
