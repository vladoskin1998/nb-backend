"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METHOD_REGISTRATION = exports.ROLES = exports.HTTP_MESSAGE = exports.ERROR_MESSAGE = void 0;
var ERROR_MESSAGE;
(function (ERROR_MESSAGE) {
    ERROR_MESSAGE["ERROR_ACCESS_DIR"] = "ERROR ACCESS DIR";
    ERROR_MESSAGE["ERROR_FILE_EXTENSION"] = "BAD FILE EXTENSION, ONLY ALLOWED .jpg.png.jpeg.mp4, 30MB";
})(ERROR_MESSAGE = exports.ERROR_MESSAGE || (exports.ERROR_MESSAGE = {}));
var HTTP_MESSAGE;
(function (HTTP_MESSAGE) {
    HTTP_MESSAGE["FILE_DELETE"] = "ALL FILES WAS DELETED SUCCESSFULY";
    HTTP_MESSAGE["EXISTING_USER"] = "USER ALREDY EXITING";
})(HTTP_MESSAGE = exports.HTTP_MESSAGE || (exports.HTTP_MESSAGE = {}));
var ROLES;
(function (ROLES) {
    ROLES["ADMIN"] = "admin";
    ROLES["USER"] = "user";
})(ROLES = exports.ROLES || (exports.ROLES = {}));
var METHOD_REGISTRATION;
(function (METHOD_REGISTRATION) {
    METHOD_REGISTRATION["FACEBOOK"] = "facebook";
    METHOD_REGISTRATION["GOOGLE"] = "google";
    METHOD_REGISTRATION["JWT"] = "jwt";
})(METHOD_REGISTRATION = exports.METHOD_REGISTRATION || (exports.METHOD_REGISTRATION = {}));
//# sourceMappingURL=enum.js.map