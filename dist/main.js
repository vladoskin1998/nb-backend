"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv_1 = require("dotenv");
const MyLogger_1 = require("./logger/MyLogger");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    (0, dotenv_1.config)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: new MyLogger_1.MyLogger() });
    app.enableCors({
        origin: ['http://localhost:5000',
            'http://localhost:3000',
            'https://maps.googleapis.com',
            "http://178.20.154.144:5000",
            "http://178.20.154.144:5001",
            "https://environs.life",
        ],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix("api");
    app.use(cookieParser());
    await app.listen(process.env.APP_PORT || 5000, () => console.log('Server started on port ' + process.env.APP_PORT || 5000));
}
bootstrap();
//# sourceMappingURL=main.js.map