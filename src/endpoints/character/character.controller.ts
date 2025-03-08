import { ServerGuard } from "@database/shared/guards/server.guard";
import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreateCharacterModel } from "./models/create";
import {
	SearchCharactersModel,
	SearchOwnCharacterModel,
	SearchSpecificCharacterModel,
} from "./models/search";
import { CreateCharacterService } from "./services/create";
import { SearchCharacterService } from "./services/search";
import { DeleteCharacterModel } from "./models/delete";
import { DeleteCharacterService } from "./services/delete";
import { TransferCharacterModel } from "./models/transfer";
import { TransferCharacterService } from "./services/transfer";

@Controller("character")
@UseGuards(ServerGuard)
export class CharacterController {
	constructor(
		private readonly searchService: SearchCharacterService,
		private readonly createService: CreateCharacterService,
		private readonly deleteService: DeleteCharacterService,
		private readonly transferService: TransferCharacterService,
	) {}

	@Get("own") async searchOwnCharacter(@Query() model: SearchOwnCharacterModel) {
		return await this.searchService.searchOwnCharacter(model);
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

	@Patch("transfer")
	async transfer(@Body() model: TransferCharacterModel) {
		return await this.transferService.transfer(model);
	}
}
