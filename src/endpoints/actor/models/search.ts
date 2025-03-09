import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SearchSpecificActorModel {
	@IsNumber({}, { message: "O ID deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID deve ser informado!" })
	id: number;
}

export class SearchActorsModel {
	@IsNumber({}, { message: "O ID deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID deve ser informado!" })
	id: number;
}

export class SearchOwnActorModel {
	@IsNumber({}, { message: "O id do usuário deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O id do usuário deve ser informado!" })
	user_id: number;

	@IsNumber({}, { message: "O id do personagem deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O id do personagem deve ser informado!" })
	actor_id: number;
}
