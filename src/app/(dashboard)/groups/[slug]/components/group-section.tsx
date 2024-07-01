"use client";
import React, { useState } from "react";
import AddClientsModal from "./add-client-modal";
import AddGroupWorkoutModal from "./add-workout-modal";
import DropdownMenu from "hexis/components/common/dropdown";
import DebouncedSearch from "hexis/components/common/debounced-search";
import clsx from "clsx";

type Props = {
  active: boolean;
  sportsList: string[];
};

const GroupSection = ({ active, sportsList }: Props) => {
  const [filtersApplied, setFiltersApplied] = useState(false);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="rounded-lg bg-background-300 px-4 py-3 min-w-[200px] w-full">
            <p className="uppercase text-activeblue-100 text-[10px]">Search by name</p>
            <DebouncedSearch active={active} />
          </div>

          <div
            className={clsx(
              filtersApplied && "ring-2 rounded-lg ring-activeblue-100",
              "rounded-lg bg-background-300 px-4 py-3 min-w-[200px] w-full",
            )}
          >
            <p className="uppercase text-activeblue-100 text-[10px]">Filter</p>
            <div className="flex justify-between items-center">
              <DropdownMenu
                active={active}
                clientSports={sportsList}
                setGroupClientFilterApplied={setFiltersApplied}
                groupFilters={filtersApplied}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="min-w-[200px] w-full">
            <AddClientsModal />
          </div>

          <div className="min-w-[200px] w-full">
            <AddGroupWorkoutModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupSection;
