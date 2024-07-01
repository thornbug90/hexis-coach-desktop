import React from "react";
import Sidebar from "hexis/components/common/sidebar";
import LoggingOutComponent from "hexis/components/common/logging-out";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoggingOutComponent />
      <main className="w-full">
        <div className="flex flex-row gap-1 h-full">
          <div className="lg:w-[60px] lg:hover:overflow-visible">
            <Sidebar />
          </div>
          <div className="flex flex-col lg:min-w-5/6 w-full items-end bg-background-500 h-screen">{children}</div>
        </div>
      </main>
    </>
  );
}
