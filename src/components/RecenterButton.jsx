import { usePosition } from "../Contexts/PositionProvider";
import "../styles/recenterButton.css";

export default function RecenterButton() {
  const { mapPosition, recenterIsNeeded, setrecenterIsNeeded } = usePosition();
  
  return (
    <button
      id="recenter-button"
      type="button"
      className="button-feedback"
      onClick={() => setrecenterIsNeeded(!recenterIsNeeded)}
      disabled={(mapPosition.distanceFromUser<=0.05)}
    >
      <img
        src={
          mapPosition.distanceFromUser >= 0.2
            ? "/icons/recenterWhiteEmpty.png"
            : "/icons/recenterWhiteFull.png"
        }
        alt="recenter the map on your position"
      ></img>
    </button>
  );
}
