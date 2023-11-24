export function isDateOrString(value: any): boolean {
  if (value instanceof Date) {
    return true;
  }

  if (typeof value === 'string' && !isNaN(Date.parse(value))) {
    return true;
  }

  return false;
}

export function isNullOrString(value: any): boolean {

  if (typeof value === 'string' || value === null) {
    return true;
  }

  return false;
}

export function isValidNationality(nationality: any): boolean {

  if (!Array.isArray(nationality)) {
    return false;
  }

  for (const key of nationality) {
    if (typeof key !== 'object' || !('_id' in key) || !('title' in key)) {
      return false;
    }
  }

  return true;
}


export const generateRandomFourDigitCode = () => {
  const min = 1000; 
  const max = 9999; 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const   getDistance = ({ myLat, myLng, lat, lng }: {
  myLat: number;
  myLng: number;
  lat: number;
  lng: number;
}):number => {

  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; 
  const dLat = toRad(lat - myLat);
  const dLon = toRad(lng - myLng);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(myLat)) *
      Math.cos(toRad(lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}