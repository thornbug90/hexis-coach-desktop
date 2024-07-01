"use client";
import { useEffect } from "react";
import { IUser, setSelectedClient } from "hexis/state/user/slice";
import Page from "../(client)/client-fuel-plan/page";
import { useAppDispatch } from "hexis/hooks/useRedux";
import { GetAllActiveClientsQuery } from "hexis/generated/graphql";

type Props = {
  user?: IUser;
};
export function AthleteMain({ user }: Props) {
  const dispatch = useAppDispatch();
  const activeUser: boolean = user && user.onboardingComplete;

  useEffect(() => {
    if (activeUser) dispatch(setSelectedClient(user as GetAllActiveClientsQuery["getMyChildren"][0]));
  }, [activeUser, dispatch, user]);

  return activeUser ? (
    <Page />
  ) : (
    <div className="flex flex-col gap-4 w-full h-screen justify-center items-center">
      <div className="text-2xl">Welcome to the Hexis Athlete Hub</div>
      <div className="text-xl">Build you profile in the Hexis App to get started</div>
    </div>
  );
}
