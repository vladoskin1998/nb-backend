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
