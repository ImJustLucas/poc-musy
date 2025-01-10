import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>("CORS_ORIGIN", "*").split(", "),
    credentials: true,
    exposedHeaders: configService
      .get<string>("CORS_EXPOSED_HEADERS", "")
      .split(", "),
    methods: configService.get<string>("CORS_ALLOWED_METHODS", "").split(", "),
    allowedHeaders: configService
      .get<string>("CORS_ALLOWED_HEADERS", "")
      .split(", "),
  });
  await app.listen(process.env.PORT || 1337, "0.0.0.0");
}
bootstrap();
