"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default function NextProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(true);
      delay(2000).then(() => {
        setLoading(false);
      });
    }
  }, [pathname, searchParams]);

  return (
    <section
      id="globalLoader"
      className={`flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black z-10 ${
        loading ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center">
        <Image src="/teste.gif" alt="Loading..." width={80} height={80} />
        <p className="text-2xl text-white mt-4">Carregando...</p>
      </div>
    </section>
  );
}
