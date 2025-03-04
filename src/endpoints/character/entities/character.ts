import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { UsersCharactersEntity } from "@database/endpoints/users/entities/users-characters";
import { DatabaseEntity } from "../../../database/database.entity";

@Entity("character")
export class CharacterEntity extends DatabaseEntity {
	@Column({ name: "name", type: "varchar", unique: true })
	name: string;

	@Column({ name: "skin", type: "varchar" })
	skin: string;

	@Column({ name: "direction", type: "int", default: 0 })
	direction: number;

	@Column({ name: "last_access", type: "varchar", nullable: true })
	last_access: Date;

	@Column({ name: "world", type: "int", default: 1 })
	world: number;

	@Column({ name: "position_x", type: "int", default: 32 })
	position_x: number;

	@Column({ name: "position_y", type: "int", default: 32 })
	position_y: number;

	@OneToMany(
		() => UsersCharactersEntity,
		(users) => users.character,
	)
	users: UsersCharactersEntity[];
}
