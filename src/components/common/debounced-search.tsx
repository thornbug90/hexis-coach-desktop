import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "hexis/state/user/slice";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ALL_CLIENTS, GROUPS } from "hexis/constants/routenames";
import { setGroupClientsSearchQuery } from "hexis/state/groups/slice";

type Props = {
  active: boolean;
};

function DebouncedSearch({ active }: Props) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const currentRoute = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    currentRoute === ALL_CLIENTS ? dispatch(setSearchQuery(term)) : dispatch(setGroupClientsSearchQuery(term));
  };

  return (
    <div className={clsx("w-full", currentRoute === ALL_CLIENTS && "min-w-[168px]")}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className={clsx(
          "rounded-lg text-base bg-background-300 outline-0 text-white w-full",
          currentRoute === ALL_CLIENTS && "w-40 p-3 text-sm",
          !active && "pointer-events-none opacity-60",
          currentRoute?.includes(GROUPS) && "placeholder-opacity-50 placeholder-white",
        )}
        placeholder="Search by Name"
      />
    </div>
  );
}

export default DebouncedSearch;
