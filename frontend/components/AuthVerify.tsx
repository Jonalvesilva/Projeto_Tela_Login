"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { parseCookies } from "nookies";

export default function AuthVerify() {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;
    if (!token) {
      if (path == "/signup") {
        router.push("/signup");
      } else {
        router.push("/");
      }
    } else {
      if (path == "/signup" || path == "/") {
        router.push("/home");
      }
    }
  }, []);

  return <></>;
}
