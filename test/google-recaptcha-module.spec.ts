import { Test } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import { GoogleRecaptchaValidator } from '../src/services/google-recaptcha.validator';
import { GoogleRecaptchaGuard } from '../src/guards/google-recaptcha.guard';
import { GoogleRecaptchaModule } from '../src/google-recaptcha.module';

describe('Google recaptcha module', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const testingModule = await Test.createTestingModule({
            imports: [
                GoogleRecaptchaModule.forRoot({
                    secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
                    version: 3,
                    minScore: 0.5,
                    response: req => req.headers.authorization,
                    skipIf: req => process.env.NODE_ENV !== 'production',
                    onError: e => {
                        throw new BadRequestException('Invalid recaptcha.')
                    }
                })
            ],
        }).compile();

        app = testingModule.createNestApplication();
    });

    test('Test validator provider', () => {
        const guard = app.get(GoogleRecaptchaValidator);

        expect(guard).toBeInstanceOf(GoogleRecaptchaValidator);
    });

    test('Test validator provider options', () => {
        const guard = app.get(GoogleRecaptchaValidator);

        expect(guard['options']).toBeDefined()
    });

    test('Test guard provider', () => {
        const guard = app.get(GoogleRecaptchaGuard);

        expect(guard).toBeInstanceOf(GoogleRecaptchaGuard);
    });

    test('Test guard provider options', () => {
        const guard = app.get(GoogleRecaptchaGuard);

        expect(guard['options']).toBeDefined()
    });
});
