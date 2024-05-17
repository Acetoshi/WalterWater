import { usePosition } from "../Contexts/PositionProvider";
import InfoCard from "./InfoCard";

const ListView = ({ isDisplayed ,filters}) => {
  const { nearbyToilets, nearbyFood, nearbyWater } = usePosition();

  return (
    <ul className={isDisplayed ? "list-view" : "list-view hidden"}>
      {filters.userWantsToilets && nearbyToilets.map((item, index) => (
        <li key={item.id}>
          <InfoCard pointOfInterest={item} />
        </li>
      ))}
      {filters.userWantsWater && nearbyWater.map((item, index) => (
        <li key={item.id}>
          <InfoCard pointOfInterest={item} />
        </li>
      ))}
      {filters.userWantsFood && nearbyFood.map((item, index) => (
        <li key={item.id}>
          <InfoCard pointOfInterest={item} />
        </li>
      ))}
    </ul>
  );
};

export default ListView;
