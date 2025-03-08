import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CharacterEntity } from "../entities/character";
import {
	SearchCharactersModel,
	SearchOwnCharacterModel,
	SearchSpecificCharacterModel,
} from "../models/search";
import { UsersCharactersEntity } from "@databaseendpoints/users/entities/users-characters";
import { UserEntity } from "@databaseendpoints/users/entities/user";

@Injectable()
export class SearchCharacterService {
	constructor(
		@InjectRepository(CharacterEntity)
		private characterRepository: Repository<CharacterEntity>,

		@InjectRepository(UsersCharactersEntity)
		private usersCharacterRepository: Repository<UsersCharactersEntity>,

		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	public async searchAll(model: SearchCharactersModel): Promise<CharacterEntity[]> {
		const user = await this.userRepository.findOneBy({ id: model.id });
		if (!user) {
			throw new NotFoundException(`Usuário com ID ${model.id} não encontrado.`);
		}

		const userCharacters = await this.usersCharacterRepository.find({
			where: { user: { id: model.id } },
			relations: ["character"],
		});

		return userCharacters.map((userCharacter) => userCharacter.character);
	}

	public async searchById(model: SearchSpecificCharacterModel): Promise<CharacterEntity> {
		const result = await this.characterRepository.findOneBy({
			id: model.id,
		});

		if (!result) {
			throw new NotFoundException(`Personagem com ID ${model.id} não encontrado.`);
		}

		return result;
	}

	public async searchOwnCharacter(model: SearchOwnCharacterModel): Promise<CharacterEntity> {
		const user = await this.userRepository.findOneBy({ id: model.user_id });
		if (!user) {
			throw new NotFoundException(`Usuário com ID ${model.user_id} não encontrado.`);
		}

		const userCharacter = await this.usersCharacterRepository.findOne({
			where: {
				user: { id: model.user_id },
				character: { id: model.character_id },
			},
			relations: ["character"],
		});

		if (!userCharacter) {
			throw new NotFoundException(
				`Personagem com ID ${model.character_id} não pertence ao usuário ${model.user_id}.`,
			);
		}

		return userCharacter.character;
	}
}
