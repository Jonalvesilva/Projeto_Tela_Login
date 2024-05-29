import {
  JsonController,
  Get,
  Body,
  Post,
  UseBefore,
} from "routing-controllers";
import { SignInService } from "../services/signin.services";
import { Service } from "typedi";
import { encryptPasswordMiddleware } from "../middlewares/passwordEncrypt";

@Service()
@JsonController("/")
export class SignInController {
  constructor(private readonly signinService: SignInService) {}

  @Post("signin")
  async Login(@Body() body: any) {
    const response = await this.signinService.Login(body.email, body.senha);
    return response;
  }

  @Post("signup")
  @UseBefore(encryptPasswordMiddleware)
  async Add(@Body() body: any) {
    const response = await this.signinService.Add(body);
    return response;
  }
}
