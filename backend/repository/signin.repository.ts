import { Service } from "typedi";
import { Login, User, UserMaybeOutput } from "../types/types";

@Service()
export class SignInRepository implements Login<User> {
  findByEmailPassword(email: string, senha: string): Promise<User | null> {
    return { nome: "teste" } as any;
  }
  findByEmail(email: string): Promise<User | null> {
    return { nome: "teste" } as any;
  }
  add(data: Omit<User, string>): Promise<UserMaybeOutput<User>> {
    throw new Error("Method not implemented.");
  }
}
