import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersActorsEntity } from "@databaseendpoints/users/entities/users-actors";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { TransferActorModel } from "../models/transfer";

@Injectable()
export class TransferActorService {
	constructor(
		@InjectRepository(UsersActorsEntity)
		private usersActorRepository: Repository<UsersActorsEntity>,

		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	public async transfer(model: TransferActorModel) {
		const newOwner = await this.userRepository.findOneBy({ id: model.new_user_id });
		if (!newOwner) {
			throw new NotFoundException(`Usuário com ID ${model.new_user_id} não encontrado.`);
		}

		const userActor = await this.usersActorRepository.findOne({
			where: { user: { id: model.user_id }, actor: { id: model.actor_id } },
			relations: ["actor", "user"],
		});

		if (!userActor) {
			throw new NotFoundException(
				`Personagem com ID ${model.actor_id} não encontrado para o usuário com ID ${model.user_id}.`,
			);
		}

		if (model.user_id === model.new_user_id) {
			throw new BadRequestException("Você não pode transferir um personagem para si mesmo.");
		}

		userActor.user = newOwner;
		await this.usersActorRepository.save(userActor);

		return {
			message: `O personagem ${userActor.actor.name} foi transferido para o usuário ${newOwner.email} com sucesso!`,
		};
	}
}
