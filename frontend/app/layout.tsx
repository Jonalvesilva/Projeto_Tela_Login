import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import NextProgress from "@/components/NextProgress";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import NextProgress from "@/components/NextProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tela Login/Logout",
  description: "Tela Login e Logout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <NextProgress />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
