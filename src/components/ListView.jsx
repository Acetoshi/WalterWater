import { usePosition } from "../Contexts/PositionProvider";
import InfoCard from "./InfoCard";

import "../styles/listview.css";

const ListView = ({ isDisplayed, setIsDisplayed, filters }) => {
  const { nearbyPOIs } = usePosition();

  return (
    <button
      role="button"
      aria-label="close list view"
      onClick={(event) => {
        console.log(event.target);
        setIsDisplayed(false);
      }}
      className={
        isDisplayed ? "list-view-container" : "list-view-container hidden"
      }
    >
      <ul className={isDisplayed ? "list-view" : "list-view hidden"}>
        {nearbyPOIs
          .filter(
            (point) =>
              (filters.userWantsToilets && point.tags.amenity === "toilets") ||
              (filters.userWantsWater &&
                point.tags.amenity === "drinking_water") ||
              (filters.userWantsFood && point.tags.amenity === "restaurant")
          )
          .map((point) => (
            <li key={point.id}>
              <InfoCard point={point} setIsDisplayed={setIsDisplayed} />
            </li>
          ))}
      </ul>
    </button>
  );
};

export default ListView;
