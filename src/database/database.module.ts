import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				type: "sqlite",
				database: configService.get<string>("DB_NAME") || "database.sqlite",
				entities: [`${__dirname}/../endpoints/**/*/entities/*{.ts,.js}`],
				migrations: [`${__dirname}/migrations/*.ts`],
				synchronize: true,
				logging: false,
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
