import { ConsoleLogger } from '@nestjs/common';
export declare class MyLogger extends ConsoleLogger {
    log(message: any, stack?: string | ''): void;
    error(message: any, stack?: string | '', context?: string): void;
}
