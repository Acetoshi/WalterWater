import "../styles/mapProviderSelector.css";
import layerIcon from "../assets/icons/layers.svg";
import mapProviders from "../scripts/mapProviders.json";
import icon from "../assets/icons/time.svg";

export default function MapProviderSelector({ mapSelecter, setMapSelecter }) {
  console.log(mapSelecter);

  return (
    <div id="map-provider-selector-container">
      <button
        id="map-provider-selector-menu-button"
        type="button"
        onClick={() =>
          setMapSelecter((mapSelecter) => {
            return { ...mapSelecter, isOpen: !mapSelecter.isOpen };
          })
        }
      >
        <img src={layerIcon} alt="recenter the map on your position"></img>
      </button>
      <div className="map-provider-menu-mask">
        <ul
          className={`map-provider-menu ${
            mapSelecter.isOpen ? "open" : "closed"
          }`}
        >
          {mapProviders.map((provider, index) => (
            <li key={provider.name}>
              <button
                onClick={() =>
                  setMapSelecter((mapSelecter) => {
                    return {
                      providerId: index,
                      isOpen: !mapSelecter.isOpen,
                    };
                  })
                }
              >
                <img src={icon} />
                <p>{provider.alias}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
