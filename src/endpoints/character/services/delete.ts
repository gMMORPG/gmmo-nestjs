import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CharacterEntity } from "../entities/character";
import { UsersCharactersEntity } from "@databaseendpoints/users/entities/users-characters";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { DeleteCharacterModel } from "../models/delete";

@Injectable()
export class DeleteCharacterService {
	constructor(
		@InjectRepository(CharacterEntity)
		private characterRepository: Repository<CharacterEntity>,

		@InjectRepository(UsersCharactersEntity)
		private usersCharacterRepository: Repository<UsersCharactersEntity>,

		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	public async delete(model: DeleteCharacterModel) {
		const user = await this.userRepository.findOneBy({ id: model.id });
		if (!user) {
			throw new NotFoundException(`Usuário com ID ${model.id} não encontrado.`);
		}

		const userCharacter = await this.usersCharacterRepository.findOne({
			where: { user: { id: model.id }, character: { id: model.character_id } },
			relations: ["character"],
		});
		if (!userCharacter) {
			throw new NotFoundException(
				`Personagem com ID ${model.character_id} não encontrado para o usuário com ID ${model.id}.`,
			);
		}

		await this.usersCharacterRepository.remove(userCharacter);
		await this.characterRepository.remove(userCharacter.character);

		return { message: `O personagem ${userCharacter.character.name} foi deletado com sucesso!` };
	}
}
