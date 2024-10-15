import { useState, useEffect } from "react";
import { usePosition } from "../Contexts/PositionProvider";

// the point of this component is to avoid being too pushy with the user by requesting his location stairght up

export default function LocationEnabler({
  setWalterIsVisible,
  setImportantMessage,
}) {
  const { setUserLocation } = usePosition();
  const [locationStatus, setLocationStatus] = useState("unknown");

  // this function is used to get the user's location when using a web browser
  function getUserLocation() {
    setLocationStatus("fetching");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationStatus("located");
          setImportantMessage("Geolocation successfull !");
          setTimeout(() => setWalterIsVisible(false), 2000);
          setTimeout(() => setImportantMessage(""), 2500);
        },
        () => {
          setImportantMessage(
            "I couldn't locate you, refresh the page and try again."
          );
          setLocationStatus("failed");
        }
      );
    } else {
        setImportantMessage(
            "Geolocation isn't supported by your browser"
          );
          setLocationStatus("failed");
    }
  }

  // this function is used to get the user's location when using a native app
  useEffect(() => {
    // Listen for the custom 'locationReceived' event when the component mounts
    const handleLocationReceived = (event) => {
      const { latitude, longitude } = event.detail;

      // Override navigator.geolocation.getCurrentPosition with the received location
      navigator.geolocation.getCurrentPosition = (successCallback) => {
        successCallback({
          coords: {
            latitude,
            longitude,
          },
        });
      };

      // Manually set the user location using the received coordinates
      setUserLocation({ lat: latitude, lng: longitude });
    };

    // Add event listener for the 'locationReceived' event
    window.addEventListener("locationReceived", handleLocationReceived);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("locationReceived", handleLocationReceived);
    };
  }, []);

  // only ask for permission if user never allowed location before
  useEffect(() => {
    if (!localStorage.getItem("userLat")) {
      setImportantMessage("Enable location to get nearby points of interest !");
      setWalterIsVisible(true);
    } else {
      getUserLocation();
    }
  }, []);

  return locationStatus !== "located" && locationStatus !== "failed" ? (
    <button
      className={`enable-location-button button-feedback ${
        locationStatus === "fetching" ? "disabled" : ""
      }`}
      onClick={getUserLocation}
    >
      {locationStatus === "unknown" && <span>enable location</span>}
      {locationStatus === "fetching" && (
        <span>
          <span className="loader"></span>
          {" "}working
        </span>
      )}
    </button>
  ) : null;
}
