import { MapContainer, TileLayer } from "react-leaflet";
import "./components/FilterBar";
import "./assets/icomoon/style.css";
import "./styles/global.css";
import FilterBar from "./components/FilterBar";

function App() {
  return (
    <>
      <MapContainer center={[47.216671, -1.55]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <FilterBar />
    </>
  );
}

export default App;
