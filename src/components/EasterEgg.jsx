import { Marker, Popup } from "react-leaflet";
import { capybaraIcon } from "../scripts/icons";

export default function Capybara() {
  return (
    <Marker position={[47.066669, -0.88333]} icon={capybaraIcon}>
      <Popup>Cholet is life</Popup>
    </Marker>
  );
}
