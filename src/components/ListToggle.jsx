import "../styles/listToggle.css";

export default function ListToggle({ listState }) {
  const { listIsDisplayed, setListIsDisplayed } = listState;

  const handleToggle = () => setListIsDisplayed(!listIsDisplayed);

  return (
    <fieldset id="list-toggle-container">
      <legend>{`select map view or list view`}</legend>

      <input
        type="radio"
        id="toggle-input-map"
        name="button-reservation"
        className="toggle-input"
        checked={!listIsDisplayed}
        onChange={handleToggle}
      />

      <input
        type="radio"
        id="toggle-input-list"
        name="button-reservation"
        className="toggle-input"
        checked={listIsDisplayed}
        onChange={handleToggle}
      />

      <label htmlFor="toggle-input-map" className="map-label">
        <img src="/icons/map.svg" alt="show map" />
      </label>

      <label htmlFor="toggle-input-list" className="list-label">
        <img src="/icons/list.svg" alt="show map" />
      </label>

      <span className="toggle-slider" />

    </fieldset>
  );
}