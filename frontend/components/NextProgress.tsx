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
      className={`flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-2000 ease-in-out ${
        loading ? "opacity-100" : "opacity-0"
      } ${loading ? "" : "pointer-events-none"}`}
    >
      <div className="flex flex-col items-center">
        <img src="teste.gif" alt="Loading..." className="w-20" />
        <p className="text-2xl text-white mt-4">Carregando...</p>
      </div>
    </section>
  );
}
