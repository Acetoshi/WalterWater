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
        name="show map"
        className="toggle-input"
        checked={!listIsDisplayed}
        onClick={handleToggle}
        onChange={handleToggle}
      />

      <input
        type="radio"
        id="toggle-input-list"
        name="show list"
        className="toggle-input"
        checked={listIsDisplayed}
        onClick={handleToggle}
        onChange={handleToggle}
      />

      <label htmlFor="toggle-input-map" className="map-label">
        <img src="/icons/map.svg" alt="show map" />
      </label>

      <label htmlFor="toggle-input-list" className="list-label">
        <img src="/icons/list.svg" alt="show list" />
      </label>

      <span className="toggle-slider" />

    </fieldset>
  );
}