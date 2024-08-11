import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkGeolocationPermission = () => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'denied') {
        setError(
          'Geolocation access is denied. Please enable location permissions in your browser settings:\n\n' +
            '- In Chrome: Go to Settings > Privacy and security > Site settings > Location\n' +
            '- In Firefox: Click the lock icon next to the URL > More Information > Permissions > Access Your Location\n' +
            '- In Safari: Go to Safari > Preferences > Websites > Location'
        );
      } else if (result.state === 'granted') {
        // El permiso ya fue concedido
        requestUserLocation();
      } else if (result.state === 'prompt') {
        // El permiso aún no se ha solicitado
        requestUserLocation();
      }
    });
  };

  const requestUserLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        const timezone = await getTimeZoneFromCoordinates(latitude, longitude);
        setTimezone(timezone);
        setLoading(false);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setError('Location access denied by the user.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          console.warn('La información de ubicación no está disponible.');
        } else if (error.code === error.TIMEOUT) {
          console.warn('La solicitud para obtener la ubicación ha expirado.');
        } else {
          setError('Error getting location');
        }
        setLoading(false);
      }
    );
  };

  const getTimeZoneFromCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<string> => {
    const response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=G81K1JKN5FR2&format=json&by=position&lat=${latitude}&lng=${longitude}`
    );
    // const geoApiUrl=`https://api.bigdatacloud.net/data/reverse-geocode-cliente?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    const data = await response.json();
    return data.zoneName;
  };

  useEffect(() => {
    checkGeolocationPermission();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return { location, timezone, error, loading };
};

export default useGeolocation;
