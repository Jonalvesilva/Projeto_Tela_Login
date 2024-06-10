"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { api } from "@/api/api";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { success, error } from "@/functions/toast";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import AuthVerify from "@/components/AuthVerify";

type Login = {
  email: string;
  senha: string;
};

const loginSchema = z.object({
  email: z.string().email({ message: "Email Inválido" }),
  senha: z.string(),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(loginSchema) });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await api.post("signin", data);
    if (response.data.success) {
      success("Login Realizado com Sucesso.");
      console.log(response);
      setCookie(null, "token", response.data.token);
      setLoading(false);
      router.push("/home");
    } else {
      error(response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center h-screen">
      <AuthVerify />
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="/login.jpg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="text"
              id="email"
              {...register("email")}
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <span className="text-red-500">{`${errors.email.message}`}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Senha</label>
            <input
              type="password"
              id="senha"
              {...register("senha")}
              name="senha"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors.senha && (
              <span className="text-red-500">{`${errors.senha.message}`}</span>
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
              "Login"
            ) : (
              <ImSpinner2 size={20} className="animate-spin" />
            )}
          </button>
        </form>

        <div className="mt-6 text-blue-500 text-center">
          <Link href="/signup" className="hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
