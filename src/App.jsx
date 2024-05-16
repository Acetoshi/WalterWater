import { useEffect, useState } from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import UserLocation from "./components/UserLocation";

function App() {

  return (
    <>
      <MapContainer center={[48.216671, -1.55]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UserLocation />

      </MapContainer>
    </>
  );
}

export default App;
