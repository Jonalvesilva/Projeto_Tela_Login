import { ZodIssue } from "zod";

//Tipos Integrantes
export type User = {
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
};

//Tipo Funcionario
export type UserMaybeOutput<Entity> = {
  success: boolean;
  data: Entity | null;
  error?: string;
};

//Interface Repository Funcionario
export interface Login<Entity> {
  findByEmailPassword(email: string, senha: string): Promise<Entity | null>;
  findByEmail(email: string): Promise<Entity | null>;
  add(data: Omit<Entity, string>): Promise<UserMaybeOutput<Entity>>;
}
