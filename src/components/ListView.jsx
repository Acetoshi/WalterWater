import { usePosition } from "../Contexts/PositionProvider";
import InfoCard from "./InfoCard";

const ListView = ({ data, isDisplayed }) => {
  console.log(data);

  const { nearbyToilets, nearbyFood, nearbyWater } = usePosition();
  return (
    <ul className={isDisplayed ? "list-view" : "list-view hidden"}>
      {nearbyToilets.map((item, index) => (
        <li key={item.id}>
          <InfoCard pointOfInterest={item}/>
        </li>
      ))}
    </ul>
  );
};

export default ListView;
