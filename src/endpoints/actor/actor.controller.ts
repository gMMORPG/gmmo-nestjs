import { ServerGuard } from "@database/shared/guards/server.guard";
import { Body, Controller, Delete, Get, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateActorModel } from "./models/create";
import { SearchActorsModel, SearchOwnActorModel, SearchSpecificActorModel } from "./models/search";
import { CreateActorService } from "./services/create";
import { SearchActorService } from "./services/search";
import { DeleteActorModel } from "./models/delete";
import { DeleteActorService } from "./services/delete";
import { TransferActorModel } from "./models/transfer";
import { TransferActorService } from "./services/transfer";
import { UpdateActorService } from "./services/update";
import { UpdateActorModel } from "./models/update";

@Controller("actor")
@UseGuards(ServerGuard)
export class ActorController {
	constructor(
		private readonly searchService: SearchActorService,
		private readonly createService: CreateActorService,
		private readonly deleteService: DeleteActorService,
		private readonly transferService: TransferActorService,
		private readonly updateService: UpdateActorService,
	) {}

	@Get("own") async searchOwnActor(@Query() model: SearchOwnActorModel) {
		return await this.searchService.searchOwnActor(model);
	}

	@Get("all") async searchAll(@Query() model: SearchActorsModel) {
		return await this.searchService.searchAll(model);
	}

	@Post() async create(@Body() model: CreateActorModel) {
		return await this.createService.create(model);
	}

	@Delete() async delete(@Body() model: DeleteActorModel) {
		return await this.deleteService.delete(model);
	}

	@Patch("transfer")
	async transfer(@Body() model: TransferActorModel) {
		return await this.transferService.transfer(model);
	}

	@Put() async update(@Body() model: UpdateActorModel) {
		return await this.updateService.update(model);
	}
}
