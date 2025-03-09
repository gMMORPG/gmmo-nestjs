import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActorController } from "./actor.controller";
import { SearchActorService } from "./services/search";
import { UsersActorsEntity } from "@databaseendpoints/users/entities/users-actors";
import { UserEntity } from "@databaseendpoints/users/entities/user";
import { CreateActorService } from "./services/create";
import { DeleteActorService } from "./services/delete";
import { TransferActorService } from "./services/transfer";
import { ActorEntity } from "./entities/actor";
import { UpdateActorService } from "./services/update";

@Module({
	imports: [TypeOrmModule.forFeature([ActorEntity, UsersActorsEntity, UserEntity])],
	controllers: [ActorController],
	providers: [
		SearchActorService,
		CreateActorService,
		DeleteActorService,
		TransferActorService,
		UpdateActorService,
	],
})
export class ActorModule {}
