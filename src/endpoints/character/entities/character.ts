import { Column, Entity, OneToMany } from "typeorm";
import { UsersCharactersEntity } from "@database/endpoints/users/entities/users-characters";
import { DatabaseEntity } from "../../../database/database.entity";

@Entity("character")
export class CharacterEntity extends DatabaseEntity {
	@Column({ name: "name", type: "varchar", unique: true })
	name: string;

	@Column({ name: "skin", type: "varchar" })
	skin: string;

	@Column({ name: "last_access", type: "varchar", nullable: true })
	last_access: Date;

	@Column({ name: "direction_x", type: "int", default: 0 })
	direction_x: number;

	@Column({ name: "direction_y", type: "int", default: 1 })
	direction_y: number;

	@OneToMany(
		() => UsersCharactersEntity,
		(users) => users.character,
	)
	users: UsersCharactersEntity[];
}
