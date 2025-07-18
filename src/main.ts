import { NestFactory } from '@nestjs/core';
import {
  ApplicationNestConfig,
  ApplicationRedocConfig,
  ApplicationSwaggerConfig,
} from '@gglk/app.config';
import { AppModule } from '@gglk/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ApplicationNestConfig(app);
  ApplicationSwaggerConfig(app);
  ApplicationRedocConfig(app);

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
