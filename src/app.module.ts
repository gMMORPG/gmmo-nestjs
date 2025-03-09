import { DatabaseModule } from "@database/database/database.module";
import { AuthenticationModule } from "@database/endpoints/authentication/authentication.module";
import { UserModule } from "@database/endpoints/users/user.module";
import { ActorModule } from "@databaseendpoints/actor/actor.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		AuthenticationModule,
		UserModule,
		ActorModule,
	],
})
export class AppModule {}
