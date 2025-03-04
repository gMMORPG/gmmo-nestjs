import {
	CanActivate,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";

@Injectable()
export class ServerGuard implements CanActivate {
	constructor(private configService: ConfigService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();

		const authorizationHeader = request.headers.authorization;
		if (!authorizationHeader) {
			throw new UnauthorizedException("Token de autorização ausente.");
		}

		const [bearer, secret] = authorizationHeader.split(" ");

		if (bearer !== "Bearer" || !secret) {
			throw new UnauthorizedException("Token de autorização inválido.");
		}

		const serverSecret = this.configService.get<string>("SERVER_SECRET");
		if (!serverSecret) {
			throw new InternalServerErrorException("SERVER_SECRET não está configurado!");
		}

		if (secret !== serverSecret) {
			throw new UnauthorizedException("Ops! O token informado é inválido!");
		}

		return true;
	}
}
