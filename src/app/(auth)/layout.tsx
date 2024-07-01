import React from "react";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full">{children}</main>
    </>
  );
}
