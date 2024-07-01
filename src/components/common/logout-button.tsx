"use client";
import { useSupabase } from "hexis/providers/supabase-provider";
import { useDispatch } from "react-redux";
import { setCoachStatus, setLoggingOut, setSelectedClient, setUser } from "hexis/state/user/slice";
import ExitIcon from "../icons/general/ExitIcon";

export default function SidebarButton() {
  const { supabase } = useSupabase();
  const dispatch = useDispatch();

  // Sign out
  const signOut = async () => {
    dispatch(setLoggingOut(true));
    await supabase.auth.signOut();
    dispatch(setSelectedClient(undefined));
    dispatch(setUser(undefined));
    dispatch(setCoachStatus(false));
    dispatch(setLoggingOut(false));
  };

  return (
    <button onClick={signOut} className="flex text-white hover:text-activeblue-100 gap-5 items-center sidebar">
      <span className="icon pl-[10px]">
        <ExitIcon color="currentColor" width={19} height={19} />
      </span>

      <span className="text whitespace-nowrap">Log out</span>
    </button>
  );
}
