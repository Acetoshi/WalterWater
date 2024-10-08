import { useEffect } from "react";
import mapProviders from "../scripts/mapProviders.json";
import "../styles/mapProviderSelector.css";

export default function MapProviderSelector({ mapSelecter, setMapSelecter }) {
  //see how the menu gets auto-closed when the map moves in MapTracker Component

  // this is needed to useLocalStorage to remember the user's last map provider
  useEffect(() => {
    localStorage.setItem("mapProviderId", mapSelecter.providerId.toString());
  }, [mapSelecter]);

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
        <img src="/icons/layers.svg" alt="recenter the map on your position"></img>
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
                {provider.alias === "simple" && <img src="/mapPreviews/simple.jpg" alt=""/>}
                {provider.alias === "detailed" && (
                  <img src="/mapPreviews/detailed.jpg" alt=""/>
                )}
                {provider.alias === "cycling" && <img src="/mapPreviews/cycle.jpg" alt=""/>}
                {provider.alias === "satellite" && (
                  <img src="/mapPreviews/satellite.jpg" alt=""/>
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
