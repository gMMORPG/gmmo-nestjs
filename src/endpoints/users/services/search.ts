import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user";
import { SearchSpecificUserModel } from "../models/search";

@Injectable()
export class SearchUserService {
	constructor(
		@InjectRepository(UserEntity)
		private repository: Repository<UserEntity>,
	) {}

	public async searchAll(): Promise<UserEntity[]> {
		return await this.repository.find();
	}

	public async searchById(model: SearchSpecificUserModel): Promise<UserEntity> {
		const result = await this.repository.findOneBy({
			id: model.id,
		});

		if (!result) {
			throw new NotFoundException(`Usuário com ID ${model.id} não encontrado.`);
		}

		return result;
	}
}
