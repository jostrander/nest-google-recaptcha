import { DynamicModule, HttpModule, HttpService, Module, Provider } from '@nestjs/common';
import { GoogleRecaptchaGuard } from './guards/google-recaptcha.guard';
import { GoogleRecaptchaValidator } from './services/google-recaptcha.validator';
import { GoogleRecaptchaModuleOptions } from './interfaces/google-recaptcha-module-options';
import { GoogleRecaptchaAsyncModuleOptions } from './interfaces/google-recaptcha-async-module-options';

@Module({
})
export class GoogleRecaptchaModule {
    static forRoot(options: GoogleRecaptchaModuleOptions): DynamicModule {
        const GoogleRecaptchaModuleOptionsProvider = {
            provide: 'GoogleRecaptchaModuleOptions',
            useValue: options
        }
        return {
            module: GoogleRecaptchaModule,
            imports: [
                HttpModule,
            ],
            providers: [GoogleRecaptchaGuard, GoogleRecaptchaValidator, GoogleRecaptchaModuleOptionsProvider],
            exports: [GoogleRecaptchaGuard, GoogleRecaptchaValidator, GoogleRecaptchaModuleOptionsProvider],
        }
    }

    static forRootAsync(options: GoogleRecaptchaAsyncModuleOptions): DynamicModule {
        const configProvider = this.createAsyncOptionsProvider(options)
        return {
            module: GoogleRecaptchaModule,
            imports: [
                ...options.imports,
                HttpModule
            ],
            providers: [
                configProvider,
                GoogleRecaptchaGuard,
                GoogleRecaptchaValidator
            ],
            exports: [GoogleRecaptchaGuard, GoogleRecaptchaValidator, configProvider],
        }
    }

    private static createAsyncOptionsProvider(
        options: GoogleRecaptchaAsyncModuleOptions
    ) : Provider {
        if (options.useFactory) {
            return {
                provide: 'GoogleRecaptchaModuleOptions',
                useFactory: options.useFactory,
                inject: options.inject || []
            }
        }
    }
}
