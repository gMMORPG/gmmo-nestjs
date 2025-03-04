import { ServerGuard } from "@database/shared/guards/server.guard";
import { Body, Controller, Delete, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CreateCharacterModel } from "./models/create";
import { SearchCharactersModel, SearchSpecificCharacterModel } from "./models/search";
import { CreateCharacterService } from "./services/create";
import { SearchCharacterService } from "./services/search";
import { DeleteCharacterModel } from "./models/delete";
import { DeleteCharacterService } from "./services/delete";

@Controller("character")
@UseGuards(ServerGuard)
export class CharacterController {
	constructor(
		private readonly searchService: SearchCharacterService,
		private readonly createService: CreateCharacterService,
		private readonly deleteService: DeleteCharacterService,
	) {}

	@Get("specific") async searchById(@Query() model: SearchSpecificCharacterModel) {
		return await this.searchService.searchById(model);
	}

	@Get("all") async searchAll(@Query() model: SearchCharactersModel) {
		return await this.searchService.searchAll(model);
	}

	@Post() async create(@Body() model: CreateCharacterModel) {
		return await this.createService.create(model);
	}

	@Delete() async delete(@Body() model: DeleteCharacterModel) {
		return await this.deleteService.delete(model);
	}
}
