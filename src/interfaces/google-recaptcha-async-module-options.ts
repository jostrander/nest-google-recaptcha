import { ModuleMetadata } from "@nestjs/common/interfaces";
import { GoogleRecaptchaModuleOptions } from "./google-recaptcha-module-options";

export interface GoogleRecaptchaAsyncModuleOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (
        ...args: any[]
    ) => Promise<GoogleRecaptchaModuleOptions> | GoogleRecaptchaModuleOptions
    inject?: any[]
}