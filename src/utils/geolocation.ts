const STORAGE_KEY = 'app_location';

function storeLocation(location: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.debug('Could not save location');
  }
}

function getLocationFromStorage(): number[] | undefined {
  try {
    const storedJSON = localStorage.getItem(STORAGE_KEY);
    if (storedJSON) {
      return JSON.parse(storedJSON);
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
}

export default function getLocation(): Promise<number[]> {
  const savedLocation = getLocationFromStorage();
  if (savedLocation) {
    return Promise.resolve(savedLocation);
  }
  if ('geolocation' in navigator) {
    return new Promise<number[]>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position =>
          resolve([position.coords.latitude, position.coords.longitude]),
        () => reject(new Error('Geolocation API not available'))
      );
    }).then(location => {
      storeLocation(location);
      return location;
    });
  } else {
    return Promise.reject(new Error('Geolocation API not available'));
  }
}
