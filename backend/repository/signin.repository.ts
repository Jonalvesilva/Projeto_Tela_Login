import { Service } from "typedi";
import { Login, User, UserMaybeOutput } from "../types/types";
import { UserModel } from "../models/users";

@Service()
export class SignInRepository implements Login<User> {
  async findByEmailPassword(
    email: string,
    senha: string
  ): Promise<User | null> {
    const user = await UserModel.findOne({ email, senha }).lean();
    return user;
  }
  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email }).lean();
    return user;
  }
  async add(data: User): Promise<UserMaybeOutput<User>> {
    let user;
    try {
      user = (await UserModel.create(data)).toJSON();
    } catch (error: any) {
      return { success: false, data: null, error: error };
    }

    return { success: true, data: user };
  }
}
