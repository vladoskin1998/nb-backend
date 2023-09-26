export function isDateOrString(value: any): boolean {
    if (value instanceof Date) {
      return true;
    }
  
    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      return true;
    }
  
    return false;
  }