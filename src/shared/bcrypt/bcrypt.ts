import { Module } from "@nestjs/common";
import { BcryptService } from "./services/bcrypt";

@Module({
	providers: [BcryptService],
	exports: [BcryptService],
})
export class BcryptModule {}
