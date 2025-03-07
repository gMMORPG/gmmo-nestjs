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

	@Column({ name: "max_character_slots", type: "int", default: 3 })
	max_character_slots: number;

	@Column({ name: "money", type: "int", default: 0 })
	money: number;

	@OneToMany(
		() => UsersCharactersEntity,
		(character) => character.user,
	)
	characters: UsersCharactersEntity;
}
