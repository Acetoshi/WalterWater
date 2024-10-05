import "../styles/mapProviderSelector.css";
import layerIcon from "../assets/icons/layers.svg";
import mapProviders from "../scripts/mapProviders.json";
import mapPreviewSimple from "../assets/mapPreviews/simple.jpg";
import mapPreviewDetailed from "../assets/mapPreviews/detailed.jpg";
import mapPreviewCycle from "../assets/mapPreviews/cycle.jpg";
import mapPreviewSatellite from "../assets/mapPreviews/satellite.jpg";

export default function MapProviderSelector({ mapSelecter, setMapSelecter }) {
  //see how the menu gets auto-closed when the map moves in MapTracker Component

  return (
    <div id="map-provider-selector-container">
      <button
        id="map-provider-selector-menu-button"
        aria-label="open or close map providers menu"
        type="button"
        onClick={() =>
          setMapSelecter((mapSelecter) => {
            return { ...mapSelecter, isOpen: !mapSelecter.isOpen };
          })
        }
      >
        <img src={layerIcon} alt="recenter the map on your position"></img>
      </button>
      <div
        className={`map-provider-menu-mask ${
          mapSelecter.isOpen ? "open" : "closed"
        }`}
      >
        <ul
          className={`map-provider-menu ${
            mapSelecter.isOpen ? "open" : "closed"
          }`}
        >
          {mapProviders.map((provider, index) => (
            <li key={provider.name}>
              <button
                aria-label={provider.alias}
                onClick={() =>
                  setMapSelecter((mapSelecter) => {
                    return {
                      providerId: index,
                      isOpen: !mapSelecter.isOpen,
                    };
                  })
                }
              >
                {provider.alias === "simple" && <img src={mapPreviewSimple} />}
                {provider.alias === "detailed" && (
                  <img src={mapPreviewDetailed} />
                )}
                {provider.alias === "cycling" && <img src={mapPreviewCycle} />}
                {provider.alias === "satellite" && (
                  <img src={mapPreviewSatellite} />
                )}
                <p>{provider.alias}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
