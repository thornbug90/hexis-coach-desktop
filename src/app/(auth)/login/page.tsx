import { LoginForm } from "hexis/app/(auth)/login/components/form";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function Login() {
  return (
    <div className="md:columns-2 gap-0">
      <div
        className="hidden md:block w-full h-screen bg-cover "
        style={{
          backgroundImage: "url('/images/login-background.png')",
        }}
      ></div>
      {/* Login Form section */}
      <div className="h-screen p-3 md:p-8 bg-background-500">
        <Link href="https://www.hexis.live">
          <Image
            className="md:absolute right-8 top-8 mx-auto py-2 md:py-0"
            src="/images/dark_logo.png"
            alt="Hexis dark logo"
            width={128}
            height={37.03}
          />
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
