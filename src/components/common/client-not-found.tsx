"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import clsx from "clsx";
import { ADD_REMOVE_CLIENTS } from "hexis/constants/routenames";

type Props = {
  isGroupPage?: boolean;
};

export default function ClientNotFound({ isGroupPage = false }: Props) {
  const router = useRouter();

  const addRemoveClients = () => {
    router.push(ADD_REMOVE_CLIENTS);
  };

  return (
    <div
      className={clsx("flex flex-col gap-4 w-full justify-center items-center", !isGroupPage && "h-screen -mt-32", isGroupPage && "mt-32")}
    >
      <div className="text-3xl">Client not found</div>
      <Button text="Add clients" className="mt-1 font-medium min-w-[20%]" onClick={addRemoveClients} />
    </div>
  );
}
