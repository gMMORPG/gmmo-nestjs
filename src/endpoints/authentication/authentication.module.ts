import { UserEntity } from "@database/endpoints/users/entities/user";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BcryptModule } from "../../shared/bcrypt/bcrypt";
import { AuthenticationController } from "./authentication.controller";
import { SignInService } from "./services/sign-in";
import { SignUpService } from "./services/sign-up";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), BcryptModule],
	controllers: [AuthenticationController],
	providers: [SignInService, SignUpService],
})
export class AuthenticationModule {}
