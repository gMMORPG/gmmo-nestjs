import { Column, Entity, OneToMany } from "typeorm";
import { DatabaseEntity } from "../../../database/database.entity";
import { UsersCharactersEntity } from "./users-characters";

@Entity("users")
export class UserEntity extends DatabaseEntity {
	@Column({ name: "email", type: "varchar", unique: true })
	email: string;

	@Column({ name: "password", type: "varchar" })
	password: string;

	@Column({ name: "last_login", type: "varchar", nullable: true })
	last_login: Date;

	@OneToMany(
		() => UsersCharactersEntity,
		(character) => character.user,
	)
	characters: UsersCharactersEntity;
}
