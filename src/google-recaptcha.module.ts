import { DynamicModule, HttpModule, HttpService, Module, Provider } from '@nestjs/common';
import { GoogleRecaptchaGuard } from './guards/google-recaptcha.guard';
import { GoogleRecaptchaValidator } from './services/google-recaptcha.validator';
import { GoogleRecaptchaModuleOptions } from './interfaces/google-recaptcha-module-options';

@Module({
})
export class GoogleRecaptchaModule {
    static forRoot(options: GoogleRecaptchaModuleOptions): DynamicModule {
        return {
            module: GoogleRecaptchaModule,
            imports: [
                HttpModule,
            ],
            providers: [GoogleRecaptchaGuard, GoogleRecaptchaValidator, {
                provide: 'GoogleRecaptchaModuleOptions',
                useValue: options
            }],
            exports: [GoogleRecaptchaGuard, GoogleRecaptchaValidator],
        }
    }
}
