import "../styles/listToggle.css"

export default function ListToggle({ listState }) {
  const { listIsDisplayed, setListIsDisplayed } = listState;

  return (
    <div id="list-toggle-container">

    
    <button
      type="button"
      className="button-feedback"
      id="list-toggle"
      onClick={() => setListIsDisplayed(!listIsDisplayed)}
    >
      {listIsDisplayed ? (
        <>
          <img src="/icons/map.svg" alt="show map" />
          show map
        </>
      ) : (
        <>
          <img src="/icons/list.svg" alt="show list" />
          show list
        </>
      )}
    </button>
  </div>
  )
 
}
