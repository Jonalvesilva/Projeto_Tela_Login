import { SignInRepository } from "../repository/signin.repository";
import bcrypt from "bcrypt";
import { Service } from "typedi";
import { User } from "../types/types";

@Service()
export class SignInService {
  constructor(private readonly signinRepository: SignInRepository) {}

  async Login(email: string, senha: string) {
    try {
      // Verificar se o usuário existe com o email fornecido
      const user = await this.signinRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: "Email e/ou senha estão incorretos" };
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      const match = await bcrypt.compare(senha, user.senha!);
      if (!match) {
        return { success: false, message: "Email e/ou senha estão incorretos" };
      }

      return { success: true, message: "Ok" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async Add(data: User) {
    //Verificar email
    try {
      const emailVerify = await this.signinRepository.findByEmail(data.email);
      if (emailVerify != null) {
        return { success: false, message: "Email já utilizado" };
      }
    } catch (e) {
      return { success: false, message: e };
    }
    const response = await this.signinRepository.add(data);
    return response;
  }
}
