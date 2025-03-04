import { DatabaseModule } from "@database/database/database.module";
import { AuthenticationModule } from "@database/endpoints/authentication/authentication.module";
import { CharacterModule } from "@database/endpoints/character/character.module";
import { UserModule } from "@database/endpoints/users/user.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		AuthenticationModule,
		UserModule,
		CharacterModule,
	],
})
export class AppModule {}
