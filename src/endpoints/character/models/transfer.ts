import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class TransferCharacterModel {
	@IsNumber({}, { message: "O ID deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID deve ser informado!" })
	user_id: number;

	@IsNumber({}, { message: "O ID deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID deve ser informado!" })
	new_user_id: number;

	@IsNumber({}, { message: "O ID do personagem deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID do personagem deve ser informado!" })
	character_id: number;
}
