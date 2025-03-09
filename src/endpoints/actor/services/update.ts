import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActorEntity } from "../entities/actor";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { UpdateActorModel } from "../models/update";

@Injectable()
export class UpdateActorService {
	constructor(
		@InjectRepository(ActorEntity)
		private actorRepository: Repository<ActorEntity>,

		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	public async update(model: UpdateActorModel) {
		const user = await this.userRepository.findOneBy({ id: model.user_id });
		if (!user) {
			throw new NotFoundException(`Usuário com ID ${model.user_id} não encontrado.`);
		}

		const existingActor = await this.actorRepository.findOne({
			where: { id: model.actor_id },
		});
		if (!existingActor) {
			throw new NotFoundException(`Ator com ID ${model.actor_id} não encontrado.`);
		}

		existingActor.skin = model.skin;
		existingActor.direction_x = model.direction_x;
		existingActor.direction_y = model.direction_y;
		existingActor.world = model.world;
		existingActor.position_x = model.position_x;
		existingActor.position_y = model.position_y;

		await this.actorRepository.save(existingActor);

		return { message: `O personagem ${existingActor.name} foi atualizado com sucesso!` };
	}
}
