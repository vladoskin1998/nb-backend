"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateOrString = void 0;
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
//# sourceMappingURL=utils.js.map