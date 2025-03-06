import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CharacterController } from "./character.controller";
import { CharacterEntity } from "./entities/character";
import { SearchCharacterService } from "./services/search";
import { UsersCharactersEntity } from "@databaseendpoints/users/entities/users-characters";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { CreateCharacterService } from "./services/create";
import { DeleteCharacterService } from "./services/delete";
import { TransferCharacterService } from "./services/transfer";

@Module({
	imports: [TypeOrmModule.forFeature([CharacterEntity, UsersCharactersEntity, UserEntity])],
	controllers: [CharacterController],
	providers: [
		SearchCharacterService,
		CreateCharacterService,
		DeleteCharacterService,
		TransferCharacterService,
	],
})
export class CharacterModule {}
