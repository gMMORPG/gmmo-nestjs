import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
	type: "sqlite",
	database: configService.get<string>("DB_NAME") || "database.sqlite",
	entities: [`${__dirname}/../endpoints/**/*/entities/*{.ts,.js}`],
	migrations: [`${__dirname}/migrations/*.ts`],
	synchronize: true,
	logging: false,
};

export default new DataSource(dataSourceOptions);
