export interface GoogleRecaptchaValidatorOptions {
    secretKey: string;
    version?: number;
    minScore?: number;
    onError?: (errorCodes: string) => never,
}
