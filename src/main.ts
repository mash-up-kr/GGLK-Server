import { NestFactory } from '@nestjs/core';
import {
  ApplicationNestConfig,
  ApplicationRedocConfig,
  ApplicationSwaggerConfig,
} from '@/app.config';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ApplicationNestConfig(app);
  ApplicationSwaggerConfig(app);
  ApplicationRedocConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
