import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { ComparePasswordModel } from "../models/compare-password";
import { HashPasswordModel } from "../models/hash-password";

@Injectable()
export class BcryptService {
	private readonly saltRounds = 10;

	async hashPassword(model: HashPasswordModel): Promise<string> {
		return hash(model.password, this.saltRounds);
	}

	async comparePassword(model: ComparePasswordModel): Promise<boolean> {
		return compare(model.password, model.hash);
	}
}
