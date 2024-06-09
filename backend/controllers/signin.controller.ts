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
    if (response.success) {
      const token = jwt.sign(
        { email },
        process.env.VERCEL_JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token, {
        domain: "projeto-tela-login-site.vercel.app",
        path: "/",
      });
    }
    return response;
  }

  @Post("signup")
  @UseBefore(encryptPasswordMiddleware)
  async Add(@Body() body: any, @Res() res: any) {
    const response = await this.signinService.Add(body);
    const email = body.email;
    if (response.success) {
      const token = jwt.sign(
        { email },
        process.env.VERCEL_JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token, {
        domain: "projeto-tela-login-site.vercel.app",
        path: "/",
      });
    }
    return response;
  }
}
