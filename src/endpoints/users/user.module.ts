import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user";
import { SearchUserService } from "./services/search";
import { UserController } from "./user.controller";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [SearchUserService],
})
export class UserModule {}
