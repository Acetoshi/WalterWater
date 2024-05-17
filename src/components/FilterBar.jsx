import "../styles/FilterBar.css";

function FilterBar({ filters }) {
  const handleDisplayModeChange = () => {
    filters.setListIsDisplayed(() => !filters.listIsDisplayed);
  };

  return (
    <div className="FilterBar">
      <button
        type="button"
        className="button-filter"
        id="displayDataButton"
        onClick={handleDisplayModeChange}
      >
        {filters.listIsDisplayed ? (
          <span
            className="icon-search-location-1"
            aria-label="Affichage de la carte"
          />
        ) : (
          <span
            className="icon-liste-a-puces"
            aria-label="Affichage en mode liste des points"
          />
        )}
      </button>
      <button
        type="button"
        className="button-filter"
        onClick={() => filters.setUserWantsWater(!filters.userWantsWater)}
      >
        <span
          className={
            filters.userWantsWater ? "icon-faucet" : "icon-faucet deactivated"
          }
          aria-label="Affichage des Point d'eau"
        />
      </button>

      <button
        type="button"
        className="button-filter"
        onClick={() => filters.setUserWantsFood(!filters.userWantsFood)}
      >
        <span
          className={
            filters.userWantsFood
              ? "icon-restaurant"
              : "icon-restaurant deactivated"
          }
          aria-label="Afficher des lieux pour se restaurer"
        />
      </button>

      <button
        type="button"
        className="button-filter"
        onClick={() => filters.setUserWantsToilets(!filters.userWantsToilets)}
      >
        <span
          className={
            filters.userWantsToilets
              ? "icon-toilette"
              : "icon-toilette deactivated"
          }
          aria-label="Afficher des toilettes"
        />
      </button>
    </div>
  );
}
export default FilterBar;
