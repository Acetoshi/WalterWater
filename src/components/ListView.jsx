import { usePosition } from "../Contexts/PositionProvider";
import InfoCard from "./InfoCard";
import "../styles/listview.css";

const ListView = ({ isDisplayed, filters }) => {
  const { nearbyPOIs } = usePosition();

  return (
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
            <InfoCard pointOfInterest={point} />
          </li>
        ))}
    </ul>
  );
};

export default ListView;
