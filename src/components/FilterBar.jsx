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
            <span
              className="icon-search-location-1"
              aria-label="Affichage de la carte"
            />
            <p>show map</p>
          </>
        ) : (
          <>
            <span
              className="icon-liste-a-puces"
              aria-label="Affichage en mode liste des points"
            />
            <p>show list</p>
          </>
        )}
      </button>
      <button
        type="button"
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
          aria-label="Affichage des Point d'eau"
        />
        water
      </button>

      <button
        type="button"
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
          aria-label="Afficher des lieux pour se restaurer"
        />
        restaurants
      </button>

      <button
        type="button"
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
          aria-label="Afficher des toilettes"
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
