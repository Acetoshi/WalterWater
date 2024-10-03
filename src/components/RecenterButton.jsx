import "../styles/recenterButton.css";
import recenterIconFull from "../assets/icons/recenterWhite.png";
import recenterIconEmpty from "../assets/icons/recenterWhiteEmpty.png";
import { usePosition } from "../Contexts/PositionProvider";

export default function RecenterButton() {
  const { mapPosition } = usePosition();

  const handleRecenter = () => {
    console.log("djimmy");
  };

  return (
    <button id="recenter-button" type="button" onClick={handleRecenter}>
      <img src={mapPosition.distanceFromUser >= 0.2 ? recenterIconEmpty : recenterIconFull} alt="recenter the map on your position"></img>
    </button>
  );
}
