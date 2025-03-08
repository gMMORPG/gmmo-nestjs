import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SearchSpecificCharacterModel {
	@IsNumber({}, { message: "O ID deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID deve ser informado!" })
	id: number;
}

export class SearchCharactersModel {
	@IsNumber({}, { message: "O ID deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID deve ser informado!" })
	id: number;
}

export class SearchOwnCharacterModel {
	@IsNumber({}, { message: "O id do usuário deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O id do usuário deve ser informado!" })
	user_id: number;

	@IsNumber({}, { message: "O id do personagem deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O id do personagem deve ser informado!" })
	character_id: number;
}
