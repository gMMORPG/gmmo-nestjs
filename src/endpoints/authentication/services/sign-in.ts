import { UserEntity } from "@database/endpoints/users/entities/user";
import { BcryptService } from "@database/shared/bcrypt/services/bcrypt";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignInModel } from "../models/sign-in";

@Injectable()
export class SignInService {
	constructor(
		@InjectRepository(UserEntity)
		private repository: Repository<UserEntity>,
		private readonly cryptoService: BcryptService,
	) {}

	public async signIn(dto: SignInModel): Promise<UserEntity> {
		const user = await this.repository.findOneBy({
			email: dto.email,
		});
		if (!user) {
			throw new NotFoundException("Ops! O email informado não está associado a um usuário!");
		}

		const isPasswordValid = await this.cryptoService.comparePassword({
			password: dto.password,
			hash: user.password,
		});
		if (!isPasswordValid) {
			throw new UnauthorizedException("Ops! Senha incorreta!");
		}

		await this.repository.update(user.id, { last_login: new Date().toISOString() });

		return user;
	}
}
