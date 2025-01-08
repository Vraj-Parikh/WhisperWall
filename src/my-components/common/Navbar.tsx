"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ToggleThemeSwitch from "./ToggleThemeSwitch";
const Navbar = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const router = useRouter();
  const handleLogOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };
  const handleLogIn = () => {
    router.push("/sign-in");
  };
  return (
    <div className="bg-slate-800">
      <div className="container mx-auto py-2.5 xs:py-3 md:py-4 px-6 sm:px-0 flex justify-between items-center">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={35}
            height={35}
            className="rounded-md"
            priority
            quality={100}
          />
        </Link>
        <div className="flex items-center justify-center gap-3 xs:gap-5 md:gap-7 lg:gap-10">
          <ToggleThemeSwitch />
          {isAuthenticated ? (
            <CustomButton
              className="bg-white text-black font-bold tracking-wider"
              onClick={handleLogOut}
            >
              Log Out
            </CustomButton>
          ) : (
            <CustomButton
              className="bg-white text-black font-bold tracking-wider text-sm h-7 xs:h-9 hover:bg-white hover:scale-95"
              onClick={handleLogIn}
            >
              Log In
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
