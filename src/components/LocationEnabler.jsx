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
          setImportantMessage("Geolocation successfull !");
          setTimeout(() => setWalterIsVisible(false), 2000);
          setTimeout(() => setImportantMessage(""), 2500);
          setLocationStatus("located");
        },
        () => console.log("Unable to retrieve your location")
      );
    } else {
      console.log("Geolocation not supported");
    }
  }

  // this function is used to get the user's location when using a native app
  useEffect(() => {
    // Listen for the custom 'locationReceived' event when the component mounts
    const handleLocationReceived = (event) => {
      const { latitude, longitude } = event.detail;
      console.log("Received location from native app:", latitude, longitude);

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
    console.log(localStorage.getItem("userLat"));
    if (!localStorage.getItem("userLat")) {
      console.log(localStorage.getItem("userLat"));
      console.log("nothin in local storage");
      setImportantMessage("Enable location to get nearby points of interest !");
      setWalterIsVisible(true);
    } else {
      //getUserLocation();
      console.log(localStorage.getItem("userLat"));
    }
  }, []);

  return locationStatus !== "located" ? (
    <button className="enable-location-button" onClick={getUserLocation}>
      {locationStatus === "unknown" && <span>enable location</span>}
      {locationStatus === "fetching" && (
        <span>
          <span className="loader"></span>
          working
        </span>
      )}
    </button>
  ) : null;
}
