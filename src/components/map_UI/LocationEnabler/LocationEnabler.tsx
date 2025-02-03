import { useState, useEffect } from 'react';
import usePosition from '../../../Contexts/Position/usePosition';

//TODO : convert this to a utility, a hook
// the point of this component is to avoid being too pushy with the user by requesting his location stairght up

export default function LocationEnabler({ walterSays }) {
  const { setUserLocation, askUserLocation } = usePosition();
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // this function is used to get the user's location when using a web browser
  async function getUserLocation() {
    setLocationStatus('loading');
    const success = await askUserLocation();

    if (success) {
      walterSays('Geolocation success', `You're ready to explore nearby places!`, 2500, true);
      setLocationStatus('success');
    } else {
      walterSays('Geolocation error', `I couldn't locate you, refresh the page and try again.`, 3500, true);
      setLocationStatus('error');
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
    window.addEventListener('locationReceived', handleLocationReceived);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('locationReceived', handleLocationReceived);
    };
  }, []);

  // only ask for permission if user never allowed location before
  useEffect(() => {
    if (!localStorage.getItem('ww_user_lat_lng')) {
      walterSays('Enable Geolocation', `Enable location to get nearby points of interest !`, 20000, true);
    } else {
      getUserLocation();
    }
  }, []);

  return locationStatus !== 'success' && locationStatus !== 'error' ? (
    <button
      className={`enable-location-button button-feedback ${locationStatus === 'loading' ? 'disabled' : ''}`}
      onClick={getUserLocation}
    >
      {locationStatus === 'idle' && <span>enable location</span>}
      {locationStatus === 'loading' && (
        <span>
          <span className="loader"></span> working
        </span>
      )}
    </button>
  ) : null;
}
