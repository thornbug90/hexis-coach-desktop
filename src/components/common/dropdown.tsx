"use client";
import { ChevronUpIcon } from "../icons/general";
import { Goal } from "hexis/constants/user";
import { FormEvent, useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { IFilter, setClientsFilter } from "hexis/state/user/slice";
import { useAppSelector } from "hexis/hooks/useRedux";
import isEmpty from "lodash/isEmpty";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ALL_CLIENTS, GROUPS } from "hexis/constants/routenames";
import { setGroupClientsFilter } from "hexis/state/groups/slice";

type Props = {
  active: boolean;
  clientSports?: string[];
  setGroupClientFilterApplied?: Dispatch<SetStateAction<boolean>>;
  groupFilters?: boolean;
};

export default function DropdownMenu({ active, clientSports, setGroupClientFilterApplied, groupFilters }: Props) {
  const dispatch = useDispatch();
  const currentRoute = usePathname();

  const { clientsFilter } = useAppSelector(({ user: { clientsFilter } }) => ({
    clientsFilter,
  }));

  const [filters, setFilters] = useState<IFilter>({
    goals: clientsFilter?.goals || [],
    sports: clientsFilter?.sports || [],
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleOnChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (currentTarget.name === "goal") {
      const goal = filters.goals.find(goal => goal === currentTarget.value);
      if (!goal) setFilters({ ...filters, goals: [...filters.goals, currentTarget.value as Goal] });
      else {
        const newGoals = filters.goals.filter(item => item !== currentTarget.value);
        setFilters({ ...filters, goals: newGoals });
      }
    } else {
      const sport = filters.sports.find(sport => sport === currentTarget.value);

      if (!sport) setFilters({ ...filters, sports: [...filters.sports, currentTarget.value] });
      else {
        const newSports = filters.sports.filter(item => item !== currentTarget.value);
        setFilters({ ...filters, sports: newSports });
      }
    }
  };

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSetFilter = () => {
    currentRoute === ALL_CLIENTS ? dispatch(setClientsFilter(filters)) : dispatch(setGroupClientsFilter(filters));
    if ((!isEmpty(filters.goals) || !isEmpty(filters.sports)) && !filtersApplied) {
      setDropdownOpen(!dropdownOpen);
      currentRoute === ALL_CLIENTS
        ? setFiltersApplied(!filtersApplied)
        : setGroupClientFilterApplied && setGroupClientFilterApplied(!filtersApplied);
    }
  };

  const handleClearFilter = () => {
    setFilters({ goals: [], sports: [] });

    if (currentRoute === ALL_CLIENTS) dispatch(setClientsFilter({ goals: [], sports: [] }));
    else dispatch(setGroupClientsFilter({ goals: [], sports: [] }));

    if (filtersApplied && currentRoute === ALL_CLIENTS) setFiltersApplied(!filtersApplied);
    else setGroupClientFilterApplied && setGroupClientFilterApplied(false);

    dropdownOpen && setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={clsx("dropdown w-full min-w-[138px] z-30", !active && "pointer-events-none opacity-60")} ref={dropdownRef}>
      <label
        tabIndex={0}
        className={clsx(
          currentRoute === ALL_CLIENTS &&
            "btn no-animation w-40 normal-case text-white bg-background-300 hover:bg-background-300 text-base font-normal border-0 transition",
          filtersApplied && "ring-2 rounded-lg ring-activeblue-100",
        )}
      >
        <div
          className={clsx(
            "w-full flex justify-between items-center",
            currentRoute === ALL_CLIENTS && "text-sm",
            currentRoute?.includes(GROUPS) && "opacity-50",
          )}
          onClick={handleDropdownOpen}
        >
          {`${currentRoute === ALL_CLIENTS ? "Filter by " : "Select"}`}
          <ChevronUpIcon color="#FFFFFF" className={`transition-transform transform ${!dropdownOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
      </label>
      {dropdownOpen && (
        <div
          tabIndex={0}
          className="dropdown-content menu p-0 shadow bg-background-500 border-background-300 border-dropdown rounded-md w-full mt-3"
        >
          <div className="w-full p-2">
            <div className="label">Goal</div>
            <div className="form-control">
              <label className="container block label select-none relative justify-start gap-3 cursor-pointer text-sm">
                <input
                  onChange={handleOnChange}
                  name="goal"
                  type="checkbox"
                  value={Goal.Lose}
                  defaultChecked={filters?.goals.includes(Goal.Lose)}
                  className="absolute w-0 h-0"
                />
                <span className="checkmark"></span>
                <span className="ml-7">Lose</span>
              </label>
            </div>
            <div className="form-control">
              <label className="container block label select-none relative justify-start gap-3 cursor-pointer text-sm">
                <input
                  onChange={handleOnChange}
                  name="goal"
                  type="checkbox"
                  value={Goal.Maintain}
                  defaultChecked={filters?.goals.includes(Goal.Maintain)}
                  className="absolute w-0 h-0"
                />
                <span className="checkmark"></span>
                <span className="ml-7">Maintain</span>
              </label>
            </div>
            <div className="form-control">
              <label className="container block label select-none relative justify-start gap-3 cursor-pointer text-sm">
                <input
                  onChange={handleOnChange}
                  name="goal"
                  type="checkbox"
                  value={Goal.Gain}
                  defaultChecked={filters?.goals.includes(Goal.Gain)}
                  className="absolute w-0 h-0"
                />
                <span className="checkmark"></span>
                <span className="ml-7">Gain</span>
              </label>
            </div>
          </div>
          {!isEmpty(clientSports) && (
            <div className="w-full p-2">
              <div className="label">Sport</div>
              {clientSports?.map(sport => (
                <div className="form-control" key={sport}>
                  <label className="container block label select-none relative justify-start gap-3 cursor-pointer text-sm">
                    <div className="flex">
                      <div>
                        <input
                          onChange={handleOnChange}
                          type="checkbox"
                          name={sport}
                          value={sport}
                          defaultChecked={filters?.sports.includes(sport)}
                          className="absolute w-0 h-0"
                        />
                        <span className="checkmark"></span>
                      </div>
                      <span className="ml-7">{sport}</span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={handleSetFilter}
            className="label border-background-300 border-dropdown border-x-0 w-full p-3 text-sm transition hover:bg-activeblue-100"
          >
            Apply
          </button>
          <button
            onClick={handleClearFilter}
            className={clsx(
              "form-control w-full p-3 underline transition text-xs",
              filtersApplied && "hover:text-activeblue-100",
              groupFilters && "hover:text-activeblue-100",
            )}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
