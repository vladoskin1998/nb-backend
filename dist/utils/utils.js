"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = exports.generateRandomFourDigitCode = exports.isValidNationality = exports.isNullOrString = exports.isDateOrString = void 0;
function isDateOrString(value) {
    if (value instanceof Date) {
        return true;
    }
    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
        return true;
    }
    return false;
}
exports.isDateOrString = isDateOrString;
function isNullOrString(value) {
    if (typeof value === 'string' || value === null) {
        return true;
    }
    return false;
}
exports.isNullOrString = isNullOrString;
function isValidNationality(nationality) {
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
exports.isValidNationality = isValidNationality;
const generateRandomFourDigitCode = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.generateRandomFourDigitCode = generateRandomFourDigitCode;
const getDistance = ({ myLat, myLng, lat, lng }) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat - myLat);
    const dLon = toRad(lng - myLng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(myLat)) *
            Math.cos(toRad(lat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
};
exports.getDistance = getDistance;
//# sourceMappingURL=utils.js.map