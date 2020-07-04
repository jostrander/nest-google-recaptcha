import { HttpService, InternalServerErrorException, Injectable, Inject } from '@nestjs/common';
import { GoogleRecaptchaValidatorOptions } from '../interfaces/google-recaptcha-validator-options';
import * as qs from 'querystring'

@Injectable()
export class GoogleRecaptchaValidator {
    private readonly apiUrl = 'https://www.google.com/recaptcha/api/siteverify';
    private readonly headers = {'Content-Type': 'application/x-www-form-urlencoded'};

    constructor(
        private readonly http: HttpService,
        @Inject('GoogleRecaptchaModuleOptions') 
        private readonly options: GoogleRecaptchaValidatorOptions) {
    }

    validate(response: string): Promise<boolean> {
        return this.http.post(this.apiUrl, qs.stringify({secret: this.options.secretKey, response}), {headers: this.headers})
            .toPromise()
            .then(res => res.data.success)
            .catch(e => {
                if (this.options.onError) {
                    return this.options.onError(e);
                }

                throw new InternalServerErrorException('Failed recaptcha verification.');
            });
    }
}
