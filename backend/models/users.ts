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
  },

  senha: {
    required: true,
    type: Schema.Types.String,
  },
});

// Antes de salvar, criptografa a senha
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    // Verifica se a senha é forte o suficiente antes de criptografar
    const isStrongEnough =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(
        this.senha!
      );
    if (!isStrongEnough) {
      throw new Error(
        "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."
      );
    }
    const hashedPassword = await bcrypt.hash(this.senha!, 10);
    this.senha! = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function (candidatePassword: any) {
  try {
    return await bcrypt.compare(candidatePassword, this.senha);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const User = model<IUser>("User", userSchema);
