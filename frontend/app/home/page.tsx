"use client";
import AuthVerify from "@/components/AuthVerify";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { success } from "@/functions/toast";

export default function Home() {
  const router = useRouter();
  const logout = () => {
    destroyCookie(null, "token", { path: "/" }); // Remove o cookie "token"
    success("Logout realizado com sucesso!");
    router.push("/"); // Redireciona para a página de login após logout
  };
  return (
    <div className="p-5">
      {" "}
      <AuthVerify />
      Home
      <button
        onClick={() => logout()}
        className="p-2 bg-green-600 text-xl ml-5 rounded-xl text-white "
      >
        Logout
      </button>
    </div>
  );
}
