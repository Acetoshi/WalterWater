import { VariableSizeList as List } from "react-window";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";
import InfoCard from "./InfoCard";
import "../styles/listview.css";

export default function ListView({ isDisplayed, setIsDisplayed }) {
  const { POIs } = usePOIs();

  return (
    <List
      className={
        isDisplayed ? "list-view-container" : "list-view-container hidden"
      }
      innerElementType={"ul"}
      height={1024}
      width={"unset"}
      itemCount={POIs.length}
      itemSize={() => 360}
      overscanCount={4}
    >
      {({ index, style }) => (
          <InfoCard
            point={POIs[index]}
            setIsDisplayed={setIsDisplayed}
            style={{
              ...style, left:"unset"
            }}
          />
      )}
    </List>
  );
}

// Close button functionality (if needed)
{
  /* <button
  role="button"
  aria-label="close list view"
  onClick={(event) => {
    // Close the list view if clicking outside
    if (event.target.className === "list-view-container") {
      setIsDisplayed(false);
    }
  }}
  className={isDisplayed ? "list-view-container" : "list-view-container hidden"}
>
</button> */
}
