import {
  JsonController,
  Body,
  Res,
  Post,
  UseBefore,
} from "routing-controllers";
import { SignInService } from "../services/signin.services";
import { Service } from "typedi";
import { encryptPasswordMiddleware } from "../middlewares/passwordEncrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

@Service()
@JsonController("/")
export class SignInController {
  constructor(private readonly signinService: SignInService) {}

  @Post("signin")
  async Login(@Body() body: any, @Res() res: any) {
    const response = await this.signinService.Login(body.email, body.senha);
    const email = body.email;
    let token;
    if (response.success) {
      token = jwt.sign({ email }, process.env.VERCEL_JWT_SECRET as string, {
        expiresIn: "1d",
      });
    }

    return { ...response, token };
  }

  @Post("signup")
  @UseBefore(encryptPasswordMiddleware)
  async Add(@Body() body: any, @Res() res: any) {
    const response = await this.signinService.Add(body);
    const email = body.email;
    let token;
    if (response.success) {
      token = jwt.sign({ email }, process.env.VERCEL_JWT_SECRET as string, {
        expiresIn: "1d",
      });
    }
    return { ...response, token };
  }
}
