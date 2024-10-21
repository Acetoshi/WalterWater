import { FixedSizeList } from "react-window";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";
import InfoCard from "./InfoCard";
import "../styles/listview.css";

const ListView = ({ isDisplayed, setIsDisplayed }) => {
  const { POIs } = usePOIs();

  return (
    <>
      <button
        role="button"
        aria-label="close list view"
        onClick={(event) => {
          // this button is needed to close the list view only if the user clicks on the side of the list-view to close it
          if (event.target.className === "list-view-container") {
            setIsDisplayed(false);
          }
        }}
        className={
          isDisplayed ? "list-view-container" : "list-view-container hidden"
        }
      >
        {" "}
      </button>
      <FixedSizeList
        className={
          isDisplayed ? "list-view-container" : "list-view-container hidden"
        }
        innerElementType={"ul"}
        height={window.innerHeight}
        width={400}
        itemCount={POIs.length}
        itemSize={330}
      >
        {({ index }) => (
          <InfoCard point={POIs[index]} setIsDisplayed={setIsDisplayed} />
        )}
      </FixedSizeList>
    </>
  );
};

export default ListView;
