"use client";

import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/themeProvider";
import { Providers } from "./Provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider, useSession } from "next-auth/react";
import {
  useLoadUserQuery,
  useSocialAuthMutation,
} from "@/redux/features/api/apislicer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable},${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
const Custom = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoadUserQuery({}, { refetchOnFocus: false });
  const [loading, setLoading] = useState(true);
  const { data } = useSession();
  const [socilaAuth, { isLoading: socialLoading }] = useSocialAuthMutation();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  useEffect(() => {
    return () => {
      if (!user) {
        if (data?.user) {
          socilaAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: {
              url: data?.user?.image,
            },
          }).then(() => {
            if (!isLoading) if (!socialLoading) setLoading(false);
          });
        } else {
          if (!isLoading) if (!socialLoading) setLoading(false);
        }
      }
    };
  }, [isLoading, socialLoading, data]);
  return (
    <>
      {loading ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
