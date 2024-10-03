import { useRef } from "react";
import { usePosition } from "../Contexts/PositionProvider";
import recenterIconFull from "../assets/icons/recenterWhite.png";
import recenterIconEmpty from "../assets/icons/recenterWhiteEmpty.png";

import "../styles/recenterButton.css";

export default function RecenterButton() {
  const { mapPosition, recenterIsNeeded, setrecenterIsNeeded } = usePosition();

  return (
    <button
      id="recenter-button"
      type="button"
      onClick={() => setrecenterIsNeeded(!recenterIsNeeded)}
    >
      <img
        src={
          mapPosition.distanceFromUser >= 0.2
            ? recenterIconEmpty
            : recenterIconFull
        }
        alt="recenter the map on your position"
      ></img>
    </button>
  );
}
