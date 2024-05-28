import { JsonController, Get, Body } from "routing-controllers";
import { SignInService } from "../services/signin.services";
import { Service } from "typedi";

@Service()
@JsonController("/")
export class SignInController {
  constructor(private readonly signinService: SignInService) {}

  @Get()
  async Login(@Body() body: any) {
    const response = await this.signinService.Login(body.email, body.senha);
    return response;
  }
}
