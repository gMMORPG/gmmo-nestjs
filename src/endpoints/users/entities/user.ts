import { Column, Entity, OneToMany } from "typeorm";
import { DatabaseEntity } from "../../../database/database.entity";
import { UsersActorsEntity } from "./users-actors";

@Entity("users")
export class UserEntity extends DatabaseEntity {
	@Column({ name: "email", type: "varchar", unique: true })
	email: string;

	@Column({ name: "password", type: "varchar" })
	password: string;

	@Column({ name: "last_login", type: "varchar", nullable: true })
	last_login: Date;

	@Column({ name: "max_actor_slots", type: "int", default: 3 })
	max_actor_slots: number;

	@Column({ name: "money", type: "int", default: 0 })
	money: number;

	@OneToMany(
		() => UsersActorsEntity,
		(actor) => actor.user,
	)
	actors: UsersActorsEntity;
}
