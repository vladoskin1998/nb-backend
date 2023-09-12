"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv_1 = require("dotenv");
const MyLogger_1 = require("./logger/MyLogger");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const express = require("express");
const path_1 = require("path");
console.log("https://nb-nb.onrender.com");
async function bootstrap() {
    const env = path_1.default === null || path_1.default === void 0 ? void 0 : path_1.default.join(__dirname, "../", '.env');
    (0, dotenv_1.config)({
        path: env
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: new MyLogger_1.MyLogger() });
    app.enableCors({
        origin: ['http://localhost:5000', 'http://localhost:3000', "https://nb-nb.onrender.com", "http://5.180.180.221:5000"],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix("api");
    app.use(cookieParser());
    app.use(express.static('build'));
    await app.listen(process.env.APP_PORT || 5000, () => console.log('Server started on port ' + process.env.APP_PORT || 5000));
}
bootstrap();
//# sourceMappingURL=main.js.map