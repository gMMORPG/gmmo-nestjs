import { CharacterEntity } from "@database/endpoints/character/entities/character";
import { DatabaseEntity } from "@databasedatabase/database.entity";
import { Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user";

@Entity("users_characters")
export class UsersCharactersEntity extends DatabaseEntity {
	@ManyToOne(
		() => UserEntity,
		(user) => user.characters,
	)
	user: UserEntity;

	@ManyToOne(
		() => CharacterEntity,
		(characters) => characters.users,
	)
	character: CharacterEntity;
}
