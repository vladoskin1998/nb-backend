"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUALITYENUM = exports.FAMILYSTATUS = exports.EDUCATION = exports.SEX = exports.ORIENTATION = exports.PRIVACY = exports.METHOD_REGISTRATION = exports.ROLES = exports.HTTP_MESSAGE = exports.ERROR_MESSAGE = void 0;
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
    ROLES["ALLUSERS"] = "all users";
    ROLES["ADMIN"] = "admin";
    ROLES["COORDINATORS"] = "coordinators";
    ROLES["USER"] = "user";
    ROLES["BLOCKED"] = "blocked";
})(ROLES = exports.ROLES || (exports.ROLES = {}));
var METHOD_REGISTRATION;
(function (METHOD_REGISTRATION) {
    METHOD_REGISTRATION["FACEBOOK"] = "facebook";
    METHOD_REGISTRATION["GOOGLE"] = "google";
    METHOD_REGISTRATION["JWT"] = "jwt";
})(METHOD_REGISTRATION = exports.METHOD_REGISTRATION || (exports.METHOD_REGISTRATION = {}));
var PRIVACY;
(function (PRIVACY) {
    PRIVACY["EVERYONE"] = "Everyone";
    PRIVACY["ONLYME"] = "Only me";
    PRIVACY["NEIBS"] = "Neibs";
})(PRIVACY = exports.PRIVACY || (exports.PRIVACY = {}));
var ORIENTATION;
(function (ORIENTATION) {
    ORIENTATION["HETERO"] = "Hetero";
    ORIENTATION["GAY"] = "Gay";
    ORIENTATION["LESBIAN"] = "Lesbian";
    ORIENTATION["QUEER"] = "Queer";
    ORIENTATION["ASEXUAL"] = "Asexual";
    ORIENTATION["PANSEXUAL"] = "Pansexual";
    ORIENTATION["DEMISEXUAL"] = "Demisexual";
    ORIENTATION["BISEXUAL"] = "Bisexual";
    ORIENTATION["DIDNOTDECIDE"] = "Did not decide";
    ORIENTATION["OTHER"] = "Other";
})(ORIENTATION = exports.ORIENTATION || (exports.ORIENTATION = {}));
var SEX;
(function (SEX) {
    SEX["MALE"] = "Male";
    SEX["FEMALE"] = "Female";
})(SEX = exports.SEX || (exports.SEX = {}));
var EDUCATION;
(function (EDUCATION) {
    EDUCATION["HIGHSCHOOL"] = "High School";
    EDUCATION["TECHCPLLEGE"] = "Tech. College";
    EDUCATION["PHDOTD"] = "Ph.D";
    EDUCATION["STUDYCOLLEGE"] = "Study in college";
    EDUCATION["PHD"] = "PhD";
    EDUCATION["BACHERLOR"] = "Bachelor";
    EDUCATION["MASTERDEGREE"] = "Master\u2019s degree";
})(EDUCATION = exports.EDUCATION || (exports.EDUCATION = {}));
var FAMILYSTATUS;
(function (FAMILYSTATUS) {
    FAMILYSTATUS["SINGLE"] = "Single";
    FAMILYSTATUS["INRELATIONSHIP"] = "In a relationship";
    FAMILYSTATUS["ENGAGED"] = "Engaged";
    FAMILYSTATUS["MARRIED"] = "Married";
    FAMILYSTATUS["CIVILMARIEGE"] = "In a civil marriage";
    FAMILYSTATUS["COMPLICATED"] = "It\u2019s Complicated";
    FAMILYSTATUS["SEPARATETHREADING"] = "Separate threading";
})(FAMILYSTATUS = exports.FAMILYSTATUS || (exports.FAMILYSTATUS = {}));
var QUALITYENUM;
(function (QUALITYENUM) {
    QUALITYENUM["INTERESTS"] = "Interests";
    QUALITYENUM["SKILLS"] = "Skills";
    QUALITYENUM["PROFESSION"] = "Profession";
    QUALITYENUM["NATIONALITY"] = "Nationality";
})(QUALITYENUM = exports.QUALITYENUM || (exports.QUALITYENUM = {}));
//# sourceMappingURL=enum.js.map