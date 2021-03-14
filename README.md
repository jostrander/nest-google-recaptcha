# Google recaptcha module

### Install
```
$ npm i nest-google-recaptcha
```

### Configuration

```typescript
@Module({
    imports: [
        GoogleRecaptchaModule.forRoot({
            secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
            version: 3,     // Optional, for V3
            minScore: 0.5,  // Optional, for V3
            response: req => req.headers.authorization,
            skipIf: req => process.env.NODE_ENV !== 'production',
            onError: e => {
                throw new BadRequestException('Invalid recaptcha.')
            }
        })
    ],
})
export class AppModule {
}
```

### Usage

```typescript

@Controller('feedback')
export class FeedbackController {
    @Recaptcha()
    @Post('send')
    async send(): Promise<any> {
        // TODO: Implement it.
    }
}

```

Enjoy!
