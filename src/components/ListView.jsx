import { usePosition } from "../Contexts/PositionProvider";
import InfoCard from "./InfoCard";

const ListView = ({ isDisplayed ,filters}) => {
  const { nearbyPOIs } = usePosition();

  return (
    <ul className={isDisplayed ? "list-view" : "list-view hidden"}>
      {filters.userWantsToilets && nearbyPOIs.map((item, index) => (
        <li key={item.id}>
          <InfoCard pointOfInterest={item} />
        </li>
      ))}
      {filters.userWantsWater && nearbyPOIs.map((item, index) => (
        <li key={item.id}>
          <InfoCard pointOfInterest={item} />
        </li>
      ))}
      {filters.userWantsFood && nearbyPOIs.map((item, index) => (
        <li key={item.id}>
          <InfoCard pointOfInterest={item} />
        </li>
      ))}
    </ul>
  );
};

export default ListView;
