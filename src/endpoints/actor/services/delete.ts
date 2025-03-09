import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersActorsEntity } from "@databaseendpoints/users/entities/users-actors";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { DeleteActorModel } from "../models/delete";
import { ActorEntity } from "../entities/actor";

@Injectable()
export class DeleteActorService {
	constructor(
		@InjectRepository(ActorEntity)
		private actorRepository: Repository<ActorEntity>,

		@InjectRepository(UsersActorsEntity)
		private usersActorRepository: Repository<UsersActorsEntity>,

		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	public async delete(model: DeleteActorModel) {
		const user = await this.userRepository.findOneBy({ id: model.id });
		if (!user) {
			throw new NotFoundException(`Usuário com ID ${model.id} não encontrado.`);
		}

		const userActor = await this.usersActorRepository.findOne({
			where: { user: { id: model.id }, actor: { id: model.actor_id } },
			relations: ["actor"],
		});
		if (!userActor) {
			throw new NotFoundException(
				`Personagem com ID ${model.actor_id} não encontrado para o usuário com ID ${model.id}.`,
			);
		}

		await this.usersActorRepository.remove(userActor);
		await this.actorRepository.remove(userActor.actor);

		return { message: `O personagem ${userActor.actor.name} foi deletado com sucesso!` };
	}
}
