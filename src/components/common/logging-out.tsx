"use client";
import { useAppSelector } from "hexis/hooks/useRedux";
import React from "react";

const LoggingOutComponent = () => {
  const { loggingOut } = useAppSelector(({ user: { loggingOut } }) => ({
    loggingOut,
  }));
  return (
    <>
      {loggingOut && (
        <div className="w-full h-screen justify-center items-center flex  bg-background-500 z-[9999999]">
          <div className="text-center text-xl">Logging out...</div>
        </div>
      )}
    </>
  );
};

export default LoggingOutComponent;
