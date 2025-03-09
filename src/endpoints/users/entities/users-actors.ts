import { DatabaseEntity } from "@databasedatabase/database.entity";
import { Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user";
import { ActorEntity } from "@databaseendpoints/actor/entities/actor";

@Entity("users_actors")
export class UsersActorsEntity extends DatabaseEntity {
	@ManyToOne(
		() => UserEntity,
		(user) => user.actors,
	)
	user: UserEntity;

	@ManyToOne(
		() => ActorEntity,
		(actors) => actors.users,
	)
	actor: ActorEntity;
}
