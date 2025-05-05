import {
  ApplicationNestConfig,
  ApplicationRedocConfig,
  ApplicationSwaggerConfig,
} from '@/app.config';
import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ApplicationNestConfig(app);
  ApplicationSwaggerConfig(app);
  ApplicationRedocConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
