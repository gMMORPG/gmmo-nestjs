import { Column, Entity, OneToMany } from "typeorm";
import { UsersActorsEntity } from "@databaseendpoints/users/entities/users-actors";
import { DatabaseEntity } from "../../../database/database.entity";

@Entity("actor")
export class ActorEntity extends DatabaseEntity {
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

	@Column({ name: "world", type: "varchar", default: "1" })
	world: string;

	@Column({ name: "position_x", type: "int", default: 64 })
	position_x: number;

	@Column({ name: "position_y", type: "int", default: 64 })
	position_y: number;

	@OneToMany(
		() => UsersActorsEntity,
		(users) => users.actor,
	)
	users: UsersActorsEntity[];
}
