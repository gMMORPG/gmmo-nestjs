import { ServerGuard } from "@database/shared/guards/server.guard";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { SearchSpecificUserModel } from "./models/search";
import { SearchUserService } from "./services/search";

@Controller("user")
@UseGuards(ServerGuard)
export class UserController {
	constructor(private readonly getUserService: SearchUserService) {}

	@Get("specific")
	public async searchById(@Query() model: SearchSpecificUserModel) {
		return await this.getUserService.searchById(model);
	}

	@Get("all")
	public async searchAll() {
		return await this.getUserService.searchAll();
	}
}
