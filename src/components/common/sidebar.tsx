"use client";

import LogoutButton from "./logout-button";
import Link from "next/link";
import {
  AllClientsIcon,
  ChevronLeft,
  CloseIcon,
  DefaultAvatar,
  GraphPinIcon,
  HexisLogoIcon,
  HexisLogoText,
  NotesIcon,
} from "../icons/general";
import { usePathname } from "next/navigation";
import { ALL_CLIENTS, ATHLETE_HOME, ATHLETE_PROFILE, CLIENT, CLIENT_PROFILE, FUEL_PLAN, GROUPS, NOTES } from "hexis/constants/routenames";
import { useDispatch } from "react-redux";
import { isCoach } from "hexis/utils/entitlementsChecker";
import { IUser, setSelectedClient } from "hexis/state/user/slice";
import { hideSidebar, showSidebar } from "hexis/state/global/slice";
import { useState, useEffect } from "react";
import { useAppSelector } from "hexis/hooks/useRedux";
import { GetAllActiveClientsQuery, UpdateUserInput } from "hexis/generated/graphql";
import UserIcon from "../icons/general/UserIcon";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "hexis/lib/graphql-client";
import { getTimezone } from "hexis/utils/dates";

export default function Sidebar() {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const dispatch = useDispatch();

  const { mutateAsync: updateUserMutation } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (user: UpdateUserInput) => {
      return updateUser({
        input: user,
      });
    },
  });

  useEffect(() => {
    // Function to update the screenWidth state
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial call to set the screenWidth state
    handleResize();

    // Attach event listener to window resize to update the screenWidth state
    window.addEventListener("resize", handleResize);

    updateUserMutation({
      timezone: getTimezone(),
    });

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth && screenWidth >= 1024) {
      dispatch(showSidebar());
    }
  }, [dispatch, screenWidth]);

  const handleSetClient = (user: IUser) => dispatch(setSelectedClient(user as GetAllActiveClientsQuery["getMyChildren"][0]));

  const { user, sidebarOpen } = useAppSelector(({ user: { user }, global: { sidebarOpen } }) => ({
    user,
    sidebarOpen,
  }));
  let coachStatus = false;
  if (user) {
    coachStatus = isCoach(user);
  }
  const currentRoute = usePathname();

  return (
    <div
      id="sidebar"
      className={clsx(
        "w-screen bg-background-400 h-screen lg:w-[60px]  lg:hover:w-[200px] lg:overflow-hidden lg:hover:overflow-visible lg:px-3 lg:hover:px-8 lg:fixed relative transition-transform z-[9999] text-sm whitespace-nowrap",
        {
          hidden: !sidebarOpen,
        },
      )}
    >
      <div
        className={`lg:hidden flex flex-row absolute top-16 right-8 -translate-y-1.5 `}
        onClick={() => {
          dispatch(hideSidebar());
        }}
      >
        <CloseIcon width={19} height={19} />
      </div>{" "}
      {coachStatus ? (
        currentRoute?.includes(CLIENT) ? (
          <div className="flex flex-col h-full w-full py-6 justify-between">
            <div className="flex flex-col gap-8">
              <Link href="/" className="flex items-center gap-[14.83px]">
                <span className="">
                  <HexisLogoIcon />
                </span>

                <span>
                  <HexisLogoText />
                </span>
              </Link>

              <Link href="/">
                <div className="flex hover:text-activeblue-100 gap-5 items-center">
                  <span className="pl-[10px]">
                    <ChevronLeft width={19} height={19} color="currentColor" />
                  </span>

                  <span>Back</span>
                </div>
              </Link>

              <div className="p-px w-full bg-gray-400 opacity-20 rounded-full"></div>

              <div className="flex flex-col gap-6">
                <Link href={FUEL_PLAN}>
                  <div
                    className={clsx("flex hover:text-activeblue-100 gap-5 items-center", {
                      "text-activeblue-100": currentRoute === FUEL_PLAN,
                    })}
                  >
                    <span className="pl-[10px]">
                      <GraphPinIcon width={19} height={19} color="currentColor" />
                    </span>

                    <span>Fuel plan</span>
                  </div>
                </Link>

                <Link href={NOTES}>
                  <div
                    className={clsx("flex hover:text-activeblue-100 gap-5 items-center", {
                      "text-activeblue-100": currentRoute === NOTES,
                    })}
                  >
                    <span className="pl-[10px]">
                      <NotesIcon width={19} height={19} color="currentColor" />
                    </span>

                    <span>Consult Notes</span>
                  </div>
                </Link>

                <Link href={CLIENT_PROFILE}>
                  <div
                    className={clsx("flex hover:text-activeblue-100 gap-5 items-center", {
                      "text-activeblue-100": currentRoute === CLIENT_PROFILE,
                    })}
                  >
                    <span className="pl-[10px]">
                      <DefaultAvatar width={19} height={19} color="currentColor" />
                    </span>

                    <span>Profile</span>
                  </div>
                </Link>
              </div>
            </div>

            <LogoutButton />
          </div>
        ) : (
          <div className="flex flex-col h-full w-full py-6 justify-between">
            <div className="flex flex-col gap-8">
              <Link href="/" className="flex items-center gap-[14.83px]">
                <span className="">
                  <HexisLogoIcon width={38.434} height={38.434} />
                </span>

                <span>
                  <HexisLogoText />
                </span>
              </Link>

              <Link href={ALL_CLIENTS}>
                <div
                  className={clsx("flex hover:text-activeblue-100 gap-5 items-center", {
                    "text-activeblue-100": currentRoute === ALL_CLIENTS,
                  })}
                >
                  <span className="pl-[10px]">
                    <UserIcon color="currentColor" width={19} height={19} />
                  </span>

                  <span>All Clients</span>
                </div>
              </Link>

              <Link href={GROUPS}>
                <div
                  className={clsx("flex hover:text-activeblue-100 gap-5 items-center", {
                    "text-activeblue-100": currentRoute === GROUPS,
                  })}
                >
                  <span className="pl-[10px]">
                    <AllClientsIcon color="currentColor" width={19} height={19} />
                  </span>

                  <span>Groups</span>
                </div>
              </Link>

              <div className="p-px w-full bg-gray-400 opacity-20 rounded-full"></div>

              <Link
                rel="noopener noreferrer"
                href={`${process.env.NEXT_PUBLIC_HEXIS_WEB_URL || "https://dev-hexis-web-app.onrender.com"}/dashboard?referer=desktop`}
              >
                <div className="flex hover:text-carbcodemedium-100 gap-5 items-center">
                  <div className="hidden md:flex justify-center items-center text-sm w-6 h-6 p-2 rounded-full bg-carbcodehigh-100  ml-[10px]">
                    <p className="text-center">{user?.firstName && user?.firstName[0].toUpperCase()}</p>
                  </div>

                  <span>Account</span>
                </div>
              </Link>
            </div>
            <LogoutButton />
          </div>
        )
      ) : (
        <div className="flex flex-col h-full w-full py-6 justify-between">
          <div className="flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-[14.83px]">
              <span className="">
                <HexisLogoIcon />
              </span>

              <span>
                <HexisLogoText />
              </span>
            </Link>

            <Link href={ATHLETE_HOME}>
              <div
                className={clsx("flex hover:text-activeblue-100 gap-5 items-center", {
                  "text-activeblue-100": currentRoute === ATHLETE_HOME,
                })}
              >
                <span className="pl-[10px]">
                  <GraphPinIcon width={19} height={19} color="currentColor" />
                </span>

                <span>Fuel plan</span>
              </div>
            </Link>

            <Link href={ATHLETE_PROFILE} onClick={() => handleSetClient(user!)}>
              <div
                className={clsx("flex hover:text-activeblue-100 gap-5 items-center", {
                  "text-activeblue-100": currentRoute === ATHLETE_PROFILE,
                })}
              >
                <span className="pl-[10px]">
                  <DefaultAvatar width={19} height={19} color="currentColor" />
                </span>

                <span>Profile</span>
              </div>
            </Link>

            <div className="p-px w-full bg-gray-400 opacity-20 rounded-full"></div>

            <Link href={`${process.env.NEXT_PUBLIC_HEXIS_WEB_URL || "https://dev-hexis-web-app.onrender.com"}/dashboard?referer=desktop`}>
              <div className={clsx("flex hover:text-activeblue-100 gap-5 items-center")}>
                <span className=" ml-[10px]">
                  <HexisLogoIcon width={20} height={20} />
                </span>

                <span>Account</span>
              </div>
            </Link>
          </div>

          <LogoutButton />
        </div>
      )}
    </div>
  );
}
