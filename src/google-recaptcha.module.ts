import { DynamicModule, HttpModule, HttpService, Module, Provider } from '@nestjs/common';
import { GoogleRecaptchaGuard } from './guards/google-recaptcha.guard';
import { GoogleRecaptchaValidator } from './services/google-recaptcha.validator';
import { GoogleRecaptchaModuleOptions } from './interfaces/google-recaptcha-module-options';

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
}
