import "../styles/FilterBar.css";

function FilterBar({filters}) {
  return (
    <div className="FilterBar">
      <button type="button" className="button-filter" id="displayDataButton">
        <span
          className="icon-liste-a-puces"
          aria-label="Affichage en mode liste des points"
        />
      </button>
      <button type="button" className="button-filter" onClick={()=>filters.setUserWantsWater(!filters.userWantsWater)}>
        <span className="icon-faucet" aria-label="Affichage des Point d'eau" />
      </button>

      <button type="button" className="button-filter">
        <span
          className="icon-restaurant"
          aria-label="Afficher des lieux pour se restaurer"
        />
      </button>

      <button type="button" className="button-filter">
        <span className="icon-toilette" aria-label="Afficher des toilettes" />
      </button>
    </div>
  );
}
export default FilterBar;
