import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateActorModel {
	@IsNumber({}, { message: "O ID deve ser um número válido!" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	@IsNotEmpty({ message: "O ID deve ser informado!" })
	id: number;

	@IsString({ message: "O nome deve ser um texto!" })
	@IsNotEmpty({ message: "O nome é um campo obrigatório!" })
	name: string;
}
