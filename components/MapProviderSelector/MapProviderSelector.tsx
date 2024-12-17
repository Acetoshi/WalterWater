"use client";
import { useEffect } from "react";
import Image from "next/image";
import mapProviders from "./mapProviders.json";
import MapProviderSelectorProps from "./MapProviderSelector.props";
import "./MapProviderSelector.css";

export default function MapProviderSelector({
  mapSelecter,
  setMapSelecter,
}: MapProviderSelectorProps) {
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
        className="button-feedback"
        onClick={() =>
          setMapSelecter((mapSelecter) => {
            return { ...mapSelecter, isOpen: !mapSelecter.isOpen };
          })
        }
      >
        <Image
          src="/icons/layers.svg"
          alt="recenter the map on your position"
        ></Image>
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
                  <Image src="/mapPreviews/simple.jpg" alt="" />
                )}
                {provider.alias === "detailed" && (
                  <Image src="/mapPreviews/detailed.jpg" alt="" />
                )}
                {provider.alias === "cycling" && (
                  <Image src="/mapPreviews/cycle.jpg" alt="" />
                )}
                {provider.alias === "satellite" && (
                  <Image src="/mapPreviews/satellite.jpg" alt="" />
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
