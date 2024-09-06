import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environmentVariables } from './env/envoriment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Music Api')
    .setDescription('Tecnologias: Nestjs, Swagger, Prisma, Postgres e Docker')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  const port = environmentVariables.appPort;
  await app.listen(port || 3000, () =>
    console.log(
      `App is Running\nDocumentation available on http://localhost:${port}/api`,
    ),
  );
}
bootstrap();
