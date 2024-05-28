import { SignInRepository } from "../repository/signin.repository";
import { Service } from "typedi";

@Service()
export class SignInService {
  constructor(private readonly signinRepository: SignInRepository) {}

  async Login(email: string, senha: string) {
    //Verificar email
    try {
      const emailVerify = await this.signinRepository.findByEmail(email);
      console.log(emailVerify);
      if (emailVerify != null) {
        return { success: false, message: "Email já utilizado" };
      }
    } catch (e) {
      return { success: false, message: e };
    }

    //Verificar email e senha
    try {
      const emailVerify = await this.signinRepository.findByEmailPassword(
        email,
        senha
      );
      if (emailVerify == null) {
        return { success: false, message: "Email e/ou senha estão incorretos" };
      } else {
        return { success: true, message: "Ok" };
      }
    } catch (e) {
      return { success: false, message: e };
    }
  }
}
