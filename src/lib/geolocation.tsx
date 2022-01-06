export function getCurrentGeolocation(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude, longitude },
          } = position;
          resolve({ latitude, longitude });
        },
        () => {
          reject(new Error('Cannot get coords'));
        }
      );
    }
  });
}
