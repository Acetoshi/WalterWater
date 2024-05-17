// import Logo from "./assets/demo-files/fonts/icomoon.svg";
import { usePosition } from "../Contexts/PositionProvider";
import InfoCard from "./InfoCard";

const ListView = ({ isDisplayed }) => {
  const { nearbyToilets, nearbyFood, nearbyWater } = usePosition();

  return (
    <ul className={isDisplayed ? "list-view" : "list-view hidden"}>
      {nearbyToilets.map((item, index) => (
        <li key={item.id}>
          <InfoCard pointOfInterest={item} />
        </li>
      ))}
    </ul>
  );
};

export default ListView;
