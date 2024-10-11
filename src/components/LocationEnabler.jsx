import { usePosition } from "../Contexts/PositionProvider";

export default function LocationEnabler() {
  const { setUserLocation } = usePosition();

  useEffect(getUserLocation, []);

  // this function is used to get the user's location when using a web browser
  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
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
  }, [setUserLocation]);

  return (
    <>
      <button>enable location</button>
      <button>remind me later</button>
    </>
  );
}
