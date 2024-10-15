import { VariableSizeList } from "react-window";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";
import InfoCard from "./InfoCard";
import "../styles/listview.css";

const ListView = ({ isDisplayed, setIsDisplayed }) => {
  const { POIs } = usePOIs();

  return (
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
      <VariableSizeList
        className={isDisplayed ? "list-view-container" : "list-view-container hidden"}
        height={1000}
        width={400}
        itemCount={POIs.length}
        itemSize={()=>200}
      >
        {({ index }) => (
          <InfoCard point={POIs[index]} setIsDisplayed={setIsDisplayed} />
        )}
      </VariableSizeList>
    </button>
  );
};

export default ListView;
