import { PartialType } from "@nestjs/mapped-types";
import { SignInModel } from "./sign-in";
import {
	IsNotEmpty,
	IsString,
	Validate,
	ValidationArguments,
	ValidationOptions,
} from "class-validator";
import { Match } from "@database/shared/validators/match";

export function IsPasswordMatch(validationOptions?: ValidationOptions) {
	return (object: any, propertyName: string) => {
		Validate(
			(value: any, args: ValidationArguments) => {
				const password = (args.object as any).password;
				return password === value;
			},
			{
				message: "A senha e a confirmação da senha devem ser iguais.",
				...validationOptions,
			},
		)(object, propertyName);
	};
}

export class SignUpModel extends PartialType(SignInModel) {
	@IsString({ message: "A confirmação da senha deve ser um texto!" })
	@IsNotEmpty({ message: "A confirmação da senha é um campo obrigatório!" })
	@Match("password", { message: "A confirmação da senha deve ser igual a senha informada!" })
	passwordConfirmation: string;
}
