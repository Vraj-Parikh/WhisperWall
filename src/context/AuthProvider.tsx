"use client";
import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  children: React.ReactNode;
};
export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
}
