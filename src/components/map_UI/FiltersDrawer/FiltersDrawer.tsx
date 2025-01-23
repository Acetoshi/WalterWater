import { useState } from "react";
import { usePOIs } from "../../../hooks/usePOIs";
import "./FiltersDrawer.css";

export default function FiltersDrawer() {
  const { userFilters, setUserFilters } = usePOIs();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        id="drawer-background"
        role="button"
        className={isOpen ? "visible" : "hidden"}
        aria-label="close drawer"
        onClick={() => setIsOpen(false)}
      ></button>
      <div id="filters-drawer-container" className={isOpen ? "open" : "closed"}>
        <button
          id="filters-drawer-button"
          aria-label="open or close filters drawer"
          role="button"
          className="button-feedback"
          onClick={() => setIsOpen(() => !isOpen)}
        >
          <img
            src="/icons/filter.svg"
            alt="recenter the map on your position"
          ></img>
        </button>
        <ul id="filters-drawer" className={isOpen ? "open" : "closed"}>
          <button
            role="button"
            aria-pressed={userFilters.water}
            className="filter-button button-feedback"
            onClick={() =>
              setUserFilters(() => {
                return { ...userFilters, water: !userFilters.water };
              })
            }
          >
            <img
              className={userFilters.water ? "" : "deactivated"}
              src={`/icons/faucet-icon.svg`}
              alt=""
            />
            water
          </button>

          <button
            role="button"
            aria-pressed={userFilters.food}
            className="filter-button button-feedback"
            onClick={() =>
              setUserFilters(() => {
                return { ...userFilters, food: !userFilters.food };
              })
            }
          >
            <img
              className={userFilters.food ? "" : "deactivated"}
              src={`/icons/food-icon.svg`}
              alt=""
            />
            restaurants
          </button>

          <button
            role="button"
            aria-pressed={userFilters.toilets}
            className="filter-button button-feedback"
            onClick={() =>
              setUserFilters(() => {
                return { ...userFilters, toilets: !userFilters.toilets };
              })
            }
          >
            <img
              className={userFilters.toilets ? "" : "deactivated"}
              src={`/icons/toilets-icon.svg`}
              alt=""
            />
            toilets
          </button>
        </ul>
      </div>
    </>
  );
}
