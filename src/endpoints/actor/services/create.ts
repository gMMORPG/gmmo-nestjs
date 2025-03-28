import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActorEntity } from "../entities/actor";
import { UsersActorsEntity } from "@databaseendpoints/users/entities/users-actors";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { CreateActorModel } from "../models/create";

@Injectable()
export class CreateActorService {
	constructor(
		@InjectRepository(ActorEntity)
		private actorRepository: Repository<ActorEntity>,

		@InjectRepository(UsersActorsEntity)
		private usersActorRepository: Repository<UsersActorsEntity>,

		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	public async create(model: CreateActorModel) {
		const user = await this.userRepository.findOneBy({ id: model.id });
		if (!user) {
			throw new NotFoundException(`Usuário com ID ${model.id} não encontrado.`);
		}

		const existingActor = await this.actorRepository.findOneBy({
			name: model.name,
		});

		if (existingActor) {
			throw new NotAcceptableException(`Já existe um personagem com o nome ${model.name}.`);
		}

		const actor = this.actorRepository.create({
			name: model.name,
		});

		await this.actorRepository.save(actor);

		const usersActor = this.usersActorRepository.create({
			user: user,
			actor: actor,
		});

		await this.usersActorRepository.save(usersActor);

		return { message: `O personagem ${actor.name} foi criado com sucesso!` };
	}
}
