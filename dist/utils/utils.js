"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomFourDigitCode = exports.isValidNationality = exports.isNullOrString = exports.isDateOrString = void 0;
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
//# sourceMappingURL=utils.js.map