import { useEffect } from "react";
import "./MapProviderSelector.css";
import mapProviders from "@/utilities/mapProviders.json";
import usePosition from "@/Contexts/Position/usePosition";
import { useMap } from "react-leaflet";
import MapProviderSelecterProps from "./MapProviderSelector.props";

export default function MapProviderSelector({ mapSelecter, setMapSelecter }:MapProviderSelecterProps) {
  const { userLocation } = usePosition();
  const map = useMap();

  // this is needed to useLocalStorage to remember the user's last map provider
  useEffect(() => {
    localStorage.setItem("mapProviderId", mapSelecter.providerId.toString());
  }, [mapSelecter]);

  // This is needed to close the MapProviderSelecter menu when the map moves
  useEffect(() => {
    const handleMoveStart = () => {
      setMapSelecter((mapSelecter) => {
        return { ...mapSelecter, isOpen: false };
      });
    };
    map.on("movestart", handleMoveStart);

    return () => {
      map.off("movestart", handleMoveStart);
    };
  }, [userLocation]);

  return (
    <div id="map-provider-selector-container">
      <button
        id="map-provider-selector-menu-button"
        aria-label="open or close map providers menu"
        type="button"
        className="button-feedback"
        onClick={() =>
          setMapSelecter((mapSelecter) => {
            return { ...mapSelecter, isOpen: !mapSelecter.isOpen };
          })
        }
      >
        <img
          src="/icons/layers.svg"
          alt="recenter the map on your position"
        ></img>
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
                {provider.alias === "simple" && (
                  <img src="/mapPreviews/simple.jpg" alt="" />
                )}
                {provider.alias === "detailed" && (
                  <img src="/mapPreviews/detailed.jpg" alt="" />
                )}
                {provider.alias === "cycling" && (
                  <img src="/mapPreviews/cycle.jpg" alt="" />
                )}
                {provider.alias === "satellite" && (
                  <img src="/mapPreviews/satellite.jpg" alt="" />
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
