"use client";
import AuthVerify from "@/components/AuthVerify";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { api } from "@/api/api";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { success, error } from "@/functions/toast";
import { useRouter } from "next/navigation";

type Cadastro = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
};

const cadastroSchema = z.object({
  nome: z.string().min(3, { message: "Mínimo 3 caracteres" }),
  sobrenome: z.string().min(3, { message: "Mínimo 3 caracteres" }),
  email: z.string().email({ message: "Email Inválido" }),
  senha: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .regex(/[a-z]/, {
      message: "A senha deve conter pelo menos uma letra minúscula.",
    })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula.",
    })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um dígito." })
    .regex(/[!@#$%^&*]/, {
      message: "A senha deve conter pelo menos um caractere especial.",
    }),
});

export default function Signup() {
  const {
    handleSubmit,
    register,
    trigger,

    formState: { errors },
  } = useForm<Cadastro>({
    resolver: zodResolver(cadastroSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await api.post("signup", data);
    if (response.data.success) {
      success("Cadastro Realizado com Sucesso.");
      setLoading(false);
      router.push("/home");
    } else {
      error(response.data.message);
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <AuthVerify />
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover bg-center  lg:block lg:w-2/5"
          style={{ backgroundImage: "url('signup.jpg')" }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Cadastre-se Aqui
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Bem-vindo(a)! Estamos empolgados em tê-lo(a) conosco. Por favor,
              preencha o formulário abaixo para criar sua conta:
            </p>

            <form
              className="grid grid-cols-1 gap-9 mt-8 md:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Nome
                </label>
                <input
                  {...register("nome")}
                  onKeyUp={() => trigger("nome")}
                  type="text"
                  placeholder="John"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.nome && (
                  <span className="text-red-500 pl-1">{`${errors.nome.message}`}</span>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Sobrenome
                </label>
                <input
                  {...register("sobrenome")}
                  onKeyUp={() => trigger("sobrenome")}
                  type="text"
                  placeholder="Snow"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.sobrenome && (
                  <span className="text-red-500 pl-1">{`${errors.sobrenome.message}`}</span>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email
                </label>
                <input
                  {...register("email")}
                  onKeyUp={() => trigger("email")}
                  type="email"
                  placeholder="johnsnow@example.com"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.email && (
                  <span className="text-red-500 pl-1">{`${errors.email.message}`}</span>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Senha
                </label>
                <input
                  {...register("senha")}
                  onKeyUp={() => trigger("senha")}
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.senha && (
                  <span className="text-red-500 pl-1">{`${errors.senha.message}`}</span>
                )}
              </div>

              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-600 text-white flex justify-center font-semibold rounded-md py-2 px-4 w-full ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {!loading ? (
                  "Cadastrar"
                ) : (
                  <ImSpinner2 size={20} className="animate-spin" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
