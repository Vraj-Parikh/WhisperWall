import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    isVerified?: boolean;
    isAcceptionMessages?: boolean;
    username?: string;
  }
  interface Session {
    user: User & DefaultSession["user"];
  }
  interface JWT extends User {}
}
