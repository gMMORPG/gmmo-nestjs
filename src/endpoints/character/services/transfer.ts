import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersCharactersEntity } from "@databaseendpoints/users/entities/users-characters";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { TransferCharacterModel } from "../models/transfer";

@Injectable()
export class TransferCharacterService {
	constructor(
		@InjectRepository(UsersCharactersEntity)
		private usersCharacterRepository: Repository<UsersCharactersEntity>,

		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	public async transfer(model: TransferCharacterModel) {
		const newOwner = await this.userRepository.findOneBy({ id: model.new_user_id });
		if (!newOwner) {
			throw new NotFoundException(`Usuário com ID ${model.new_user_id} não encontrado.`);
		}

		const userCharacter = await this.usersCharacterRepository.findOne({
			where: { user: { id: model.user_id }, character: { id: model.character_id } },
			relations: ["character", "user"],
		});

		if (!userCharacter) {
			throw new NotFoundException(
				`Personagem com ID ${model.character_id} não encontrado para o usuário com ID ${model.user_id}.`,
			);
		}

		if (model.user_id === model.new_user_id) {
			throw new BadRequestException("Você não pode transferir um personagem para si mesmo.");
		}

		userCharacter.user = newOwner;
		await this.usersCharacterRepository.save(userCharacter);

		return {
			message: `O personagem ${userCharacter.character.name} foi transferido para o usuário ${newOwner.email} com sucesso!`,
		};
	}
}
