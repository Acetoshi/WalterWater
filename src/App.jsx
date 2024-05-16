import { MapContainer, TileLayer } from "react-leaflet";
import "./components/FilterBar"
import Footer from "./components/FilterBar";

function App() {
  return (
    <>
      <MapContainer center={[47.216671, -1.55]} zoom={14}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      </MapContainer>
      <Footer/>
    </>
  );
}

export default App;
