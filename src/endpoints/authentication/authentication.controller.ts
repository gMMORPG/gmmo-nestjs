import { ServerGuard } from "@database/shared/guards/server.guard";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SignInModel } from "./models/sign-in";
import { SignUpModel } from "./models/sign-up";
import { SignInService } from "./services/sign-in";
import { SignUpService } from "./services/sign-up";

@Controller("authentication")
@UseGuards(ServerGuard)
export class AuthenticationController {
	constructor(
		private readonly signInService: SignInService,
		private readonly signUpService: SignUpService,
	) {}

	@Post("sign-in")
	public async signIn(@Body() dto: SignInModel) {
		console.log(dto);
		return await this.signInService.signIn(dto);
	}

	@Post("sign-up")
	public async signUp(@Body() dto: SignUpModel) {
		return await this.signUpService.signUp(dto);
	}
}
