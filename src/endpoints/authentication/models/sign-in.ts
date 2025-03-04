import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

const MIN_LENGTH = "A senha deve ter pelo menos 6 caracteres,";
const MIN_NUMBERS = "deve incluir ao menos 1 números,";
const MIN_LOWERCASE = "1 letras minúsculas e";
const MIN_UPPERCASE = "ao menos 1 letra maiúscula.";

export class SignInModel {
	@IsString({ message: "O email deve ser um texto!" })
	@IsNotEmpty({ message: "O email é um campo obrigatório!" })
	@IsEmail({}, { message: "O formato do email está inválido!" })
	email: string;

	@IsString({ message: "A senha deve ser um texto!" })
	@IsNotEmpty({ message: "A senha é um campo obrigatório!" })
	@IsStrongPassword(
		{
			minLength: 6,
			minNumbers: 1,
			minLowercase: 1,
			minUppercase: 1,
			minSymbols: 0,
		},
		{
			message: `${MIN_LENGTH} ${MIN_NUMBERS} ${MIN_LOWERCASE} ${MIN_UPPERCASE}`,
		},
	)
	password: string;
}
