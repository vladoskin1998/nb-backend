"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLogger = void 0;
const common_1 = require("@nestjs/common");
class MyLogger extends common_1.ConsoleLogger {
    log(message, stack) {
        super.log(message, stack);
    }
    error(message, stack, context) {
        super.error(message, stack);
    }
}
exports.MyLogger = MyLogger;
//# sourceMappingURL=MyLogger.js.map