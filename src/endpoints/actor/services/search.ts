import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SearchActorsModel, SearchOwnActorModel, SearchSpecificActorModel } from "../models/search";
import { UsersActorsEntity } from "@databaseendpoints/users/entities/users-actors";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { ActorEntity } from "../entities/actor";

@Injectable()
export class SearchActorService {
	constructor(
		@InjectRepository(ActorEntity)
		private actorRepository: Repository<ActorEntity>,

		@InjectRepository(UsersActorsEntity)
		private usersActorRepository: Repository<UsersActorsEntity>,

		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	public async searchAll(model: SearchActorsModel): Promise<ActorEntity[]> {
		const user = await this.userRepository.findOneBy({ id: model.id });
		if (!user) {
			throw new NotFoundException(`Usuário com ID ${model.id} não encontrado.`);
		}

		const userActor = await this.usersActorRepository.find({
			where: { user: { id: model.id } },
			relations: ["actor"],
		});

		return userActor.map((userActor) => userActor.actor);
	}

	public async searchById(model: SearchSpecificActorModel): Promise<ActorEntity> {
		const result = await this.actorRepository.findOneBy({
			id: model.id,
		});

		if (!result) {
			throw new NotFoundException(`Personagem com ID ${model.id} não encontrado.`);
		}

		return result;
	}

	public async searchOwnActor(model: SearchOwnActorModel): Promise<ActorEntity> {
		const user = await this.userRepository.findOneBy({ id: model.user_id });
		if (!user) {
			throw new NotFoundException(`Usuário com ID ${model.user_id} não encontrado.`);
		}

		const userActor = await this.usersActorRepository.findOne({
			where: {
				user: { id: model.user_id },
				actor: { id: model.actor_id },
			},
			relations: ["actor"],
		});

		if (!userActor) {
			throw new NotFoundException(
				`Personagem com ID ${model.actor_id} não pertence ao usuário ${model.user_id}.`,
			);
		}

		return userActor.actor;
	}
}
