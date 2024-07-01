import React from "react";
import Link from "next/link";
import ResetPasswordForm from "./components/form";
import Image from "next/image";

export default function ResetPassword() {
  return (
    <div className="h-screen flex">
      <div
        className="hidden md:block w-1/2 h-screen bg-cover "
        style={{
          backgroundImage: "url('/images/request-password-background.png')",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="relative flex justify-center w-screen items-center h-screen md:flex-1 flex-col bg-background-500">
        <Link href="https://www.hexis.live">
          <Image
            className="absolute right-8 top-8 mx-auto py-2 md:py-0"
            src="/images/dark_logo.png"
            alt="Hexis dark logo"
            width={128}
            height={37.03}
          />
        </Link>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
