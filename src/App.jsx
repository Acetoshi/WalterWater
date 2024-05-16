
import { MapContainer, TileLayer} from "react-leaflet";
import UserLocation from "./components/UserLocation";
import FilterBar from "./components/FilterBar"
import "./assets/icomoon/style.css";

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
      <FilterBar />
    </>
  );
}

export default App;
