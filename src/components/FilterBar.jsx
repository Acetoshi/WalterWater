import PropTypes from "prop-types";
import "../styles/filterBar.css";
import { usePOIs } from "../Contexts/PointsOfInterestProvider";

function FilterBar({ listState }) {
  const { listIsDisplayed, setListIsDisplayed } = listState;
  const { userFilters, setUserFilters } = usePOIs();

  const handleDisplayModeChange = () => {
    setListIsDisplayed(() => !listIsDisplayed);
  };

  return (
    <div className="filterbar">
      <button
        type="button"
        className="filter-button"
        id="displayDataButton"
        onClick={handleDisplayModeChange}
      >
        {listIsDisplayed ? (
          <>
            <span className="icon-search-location-1" />
            show map
          </>
        ) : (
          <>
            <span className="icon-liste-a-puces" />
            show list
          </>
        )}
      </button>
      <button
        role="button"
        aria-pressed={userFilters.water}
        className="filter-button"
        onClick={() =>
          setUserFilters(() => {
            return { ...userFilters, water: !userFilters.water };
          })
        }
      >
        <span
          className={
            userFilters.water ? "icon-faucet" : "icon-faucet deactivated"
          }
        />
        water
      </button>

      <button
        role="button"
        aria-pressed={userFilters.food}
        className="filter-button"
        onClick={() =>
          setUserFilters(() => {
            return { ...userFilters, food: !userFilters.food };
          })
        }
      >
        <span
          className={
            userFilters.food ? "icon-restaurant" : "icon-restaurant deactivated"
          }
        />
        restaurants
      </button>

      <button
        role="button"
        aria-pressed={userFilters.toilets}
        className="filter-button"
        onClick={() =>
          setUserFilters(() => {
            return { ...userFilters, toilets: !userFilters.toilets };
          })
        }
      >
        <span
          className={
            userFilters.toilets ? "icon-toilette" : "icon-toilette deactivated"
          }
        />
        toilets
      </button>
    </div>
  );
}

export default FilterBar;

FilterBar.proptypes = {
  filters: PropTypes.object.isRequired,
};
