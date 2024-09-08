import { useState, useEffect } from 'react';

const useMediaDevices = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
    null
  );

  const requestMediaDevices = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(userStream);
      setPermissionGranted(true);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('User denied access to camera or microphone.');
        } else {
          setError('Error accessing camera or microphone: ' + err.message);
        }
      } else {
        setError('Unknown error occurred.');
      }
      setPermissionGranted(false);
    }
  };

  useEffect(() => {
    requestMediaDevices();
    return () => {
      // Cleanup the stream when the component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null); // Optionally, clear the stream state
      }
    };
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return { stream, permissionGranted, error };
};

export default useMediaDevices;
