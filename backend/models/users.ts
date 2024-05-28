import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
}

export const userSchema = new Schema<IUser>({
  nome: {
    required: true,
    type: Schema.Types.String,
    min: 3,
    max: 20,
  },
  sobrenome: {
    required: true,
    type: Schema.Types.String,
    min: 3,
    max: 20,
  },

  email: {
    required: true,
    type: Schema.Types.String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Por favor, insira um endereço de e-mail válido"],
  },

  senha: {
    required: true,
    type: Schema.Types.String,
  },
});

export const UserModel = model<IUser>("User", userSchema);
