import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { GoogleRecaptchaValidator } from '../services/google-recaptcha.validator';
import { GoogleRecaptchaGuardOptions } from '../interfaces/google-recaptcha-guard-options';

@Injectable()
export class GoogleRecaptchaGuard implements CanActivate {
    constructor(
        private readonly validator: GoogleRecaptchaValidator,
        @Inject('GoogleRecaptchaModuleOptions')
        private readonly options: GoogleRecaptchaGuardOptions) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const skip = await this.options.skipIf(request);

        if (skip) {
            return true;
        }

        const response = await this.options.response(request);

        return this.validator.validate(response);
    }
}
