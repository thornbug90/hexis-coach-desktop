"use client";

import { ADD_REMOVE_CLIENTS } from "hexis/constants/routenames";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function NoClients() {
  const router = useRouter();

  const addRemoveClients = () => {
    router.push(ADD_REMOVE_CLIENTS);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-screen justify-center items-center -mt-32">
      <div className="text-2xl">Welcome to the Hexis Coach Hub</div>
      <div className="text-xl">Add clients to get started</div>
      <Button text="Add clients" className="mt-5 font-medium min-w-[20%]" onClick={addRemoveClients} />
    </div>
  );
}
