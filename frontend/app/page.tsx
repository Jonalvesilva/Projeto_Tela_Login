"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { api } from "@/api/api";

type Login = {
  email: string;
  senha: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<Login>();
  const onSubmit = async (data: any) => {
    const response = await api.post("signin", data);
    console.log(response.data, data);
  };

  return (
    <div className="bg-gray-50 flex justify-center items-center h-screen">
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
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
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
