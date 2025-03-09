import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteActorModel {
	@IsNumber({}, { message: "O ID deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID deve ser informado!" })
	id: number;

	@IsNumber({}, { message: "O ID do personagem deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID do personagem deve ser informado!" })
	actor_id: number;
}
