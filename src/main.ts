import { AppModule } from "@database/app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.setGlobalPrefix("api");
	app.useGlobalPipes(new ValidationPipe());

	const configService = app.get(ConfigService);
	const port = configService.get("NEST_PORT");

	await app.listen(port);
}
bootstrap();
