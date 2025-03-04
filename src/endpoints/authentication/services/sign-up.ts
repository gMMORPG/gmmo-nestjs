import { UserEntity } from "@database/endpoints/users/entities/user";
import { BcryptService } from "@database/shared/bcrypt/services/bcrypt";
import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { SignUpModel } from "../models/sign-up";

@Injectable()
export class SignUpService {
	constructor(
		@InjectRepository(UserEntity)
		private repository: Repository<UserEntity>,
		private readonly bcrypt: BcryptService,
	) {}

	public async signUp(dto: SignUpModel) {
		if (!dto.password) {
			throw new BadRequestException(
				"Ops! A senha não foi informada, verifique os campos e tente novamente!",
			);
		}

		const hashPassword = await this.bcrypt.hashPassword({
			password: dto.password,
		});

		const user = this.repository.create({
			email: dto.email,
			password: hashPassword,
		});

		try {
			return await this.repository.save(user);
		} catch (error) {
			if (error instanceof QueryFailedError && error.message.includes("SQLITE_CONSTRAINT")) {
				throw new ConflictException("Ops! O email informado já está em uso por outro jogador!");
			}

			throw new InternalServerErrorException("Ops! Erro desconhecido ao tentar se cadastrar.");
		}
	}
}
