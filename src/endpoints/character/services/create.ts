import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CharacterEntity } from "../entities/character";
import { SearchCharactersModel, SearchSpecificCharacterModel } from "../models/search";
import { UsersCharactersEntity } from "@databaseendpoints/users/entities/users-characters";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { CreateCharacterModel } from "../models/create";

@Injectable()
export class CreateCharacterService {
	constructor(
		@InjectRepository(CharacterEntity)
		private characterRepository: Repository<CharacterEntity>,

		@InjectRepository(UsersCharactersEntity)
		private usersCharacterRepository: Repository<UsersCharactersEntity>,

		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	public async create(model: CreateCharacterModel) {
		const user = await this.userRepository.findOneBy({ id: model.id });
		if (!user) {
			throw new NotFoundException(`Usuário com ID ${model.id} não encontrado.`);
		}

		const existingCharacter = await this.characterRepository.findOneBy({
			name: model.name,
		});

		if (existingCharacter) {
			throw new NotAcceptableException(`Já existe um personagem com o nome ${model.name}.`);
		}

		const character = this.characterRepository.create({
			name: model.name,
			skin: model.skin,
		});

		await this.characterRepository.save(character);

		const usersCharacter = this.usersCharacterRepository.create({
			user: user,
			character: character,
		});

		await this.usersCharacterRepository.save(usersCharacter);

		return { message: `O personagem ${character.name} foi criado com sucesso!` };
	}
}
