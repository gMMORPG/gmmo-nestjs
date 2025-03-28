import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateActorModel {
	@IsNumber({}, { message: "O id do usuário deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O id do usuário deve ser informado!" })
	user_id: number;

	@IsNumber({}, { message: "O id do personagem deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O id do personagem deve ser informado!" })
	actor_id: number;

	@IsNumber({}, { message: "A direção X deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "A direção X deve ser informado!" })
	direction_x: number;

	@IsNumber({}, { message: "A direção Y deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "A direção Y deve ser informado!" })
	direction_y: number;

	@IsString({ message: "O mundo deve ser um texto!" })
	@IsNotEmpty({ message: "O mundo é um campo obrigatório!" })
	world: string;

	@IsNumber({}, { message: "A posição X deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "A posição X deve ser informado!" })
	position_x: number;

	@IsNumber({}, { message: "A posição Y deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "A posição Y deve ser informado!" })
	position_y: number;
}
