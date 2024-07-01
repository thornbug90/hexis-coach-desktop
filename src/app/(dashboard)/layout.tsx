import LoggingOutComponent from "hexis/components/common/logging-out";
import Sidebar from "hexis/components/common/sidebar";
import React from "react";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoggingOutComponent />
      <main className="w-full">
        <div className="flex flex-row h-full">
          <div className="lg:w-[60px] lg:hover:overflow-visible">
            <Sidebar />
          </div>

          <div className="flex flex-col lg:min-w-5/6 w-full items-end bg-background-500 h-full">{children}</div>
        </div>
      </main>
    </>
  );
}
