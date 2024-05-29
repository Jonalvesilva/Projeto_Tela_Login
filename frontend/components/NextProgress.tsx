"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NextProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true); // Começa com true para garantir o carregamento

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Defina o estado de carregamento como falso após 2 segundos
    }, 2000);
  }, [pathname, searchParams]);

  return (
    <section
      className={`flex items-center justify-center bg-slate-900 fixed z-10 w-full h-full ${
        loading ? "block" : "hidden"
      }`}
    >
      <div className="relative">
        <img src="teste.gif" alt="Loading..." className="w-[200px]" />
        <p className="text-2xl text-center animate-pulse text-white mt-4">
          Carregando...
        </p>
      </div>
    </section>
  );
}
